"""Regneskript for settet fl-f9: F9 Hvem betaler egentlig skatten (skatteinsidens)."""
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from felles import *

S = Sett("fl-f9")

def k2(x):
    return kr(x, 2)

# =====================================================================
# Oppgave 1: Moms på melk
# =====================================================================
melk, moms = 20, 0.25
full = melk * (1 + moms)
o1 = S.ledd("", "",
    riktig=f"Prisen stiger normalt med mindre enn kr {kr(full - melk)}, fordi momsen deles mellom kundene og butikkene",
    gale=[f"Prisen stiger til kr {kr(full)}, fordi det er butikkene som har plikt til å kreve inn momsen fra kundene",
          "En stykkskatt per liter med samme proveny ville fordelt seg annerledes mellom kunder og butikker enn momsen",
          "En økning i selskapsskatten bæres derimot alltid fullt ut av aksjonærene, fordi selskapet betaler den inn"],
    solution=begrep(
        f"Å heve prisen fra kr {melk} til kr {kr(full)} er normalt ikke profittmaksimerende. Høyere pris gir lavere salg, så momsen deles mellom kunde og butikk etter hvor prisfølsomme de er. Hvem som krever inn skatten, betyr ingenting for hvem som bærer den.",
        "Prisen stiger med mindre enn hele momsen.",
        [(f"Kr {kr(full)}", "blander formell og reell insidens. Full overvelting krever helt uelastisk etterspørsel eller helt elastisk tilbud."),
         ("Stykkskatt annerledes", "under frikonkurranse virker en verdiskatt og en stykkskatt med samme proveny likt. Bare kilen mellom prisene teller."),
         ("Selskapsskatt", "også selskapsskatten kan veltes over på priser og lønninger. I USA antar Congressional Budget Office at 50 % veltes over.")],
        kilde="F9 lb 2–4, lb 14 og S s. 488–490"),
    dekker=["f9-tall-06", "f9-utl-07", "f9-utl-09", "f9-fak-03"])
S.oppgave("Moms på melk", "Skatteincidens", [11],
    f"<p>Regjeringen innfører 25 % moms på matvarer. Butikkene skal kreve inn momsen. En liter melk koster i dag kr {melk}. Markedet har frikonkurranse. Hvilket utsagn er riktig?</p>",
    [o1])

# =====================================================================
# Oppgave 2: Avgift i et marked med lineære kurver
# =====================================================================
a_d, b_d = 600, 20      # x = 600 − 20P
a_s, b_s = 150, 30      # x = 30p − 150
t = 4
P0 = (a_d + a_s) / (b_d + b_s)
x0 = a_d - b_d * P0
p1 = (a_d - b_d * t + a_s) / (b_d + b_s)
P1 = p1 + t
x1 = b_s * p1 - a_s
assert lik(P0, 15) and lik(x0, 300) and lik(p1, 13.4) and lik(x1, 252)
assert lik(a_d - b_d * P1, x1)
kj = P1 - P0            # kjøpernes andel i kroner
se = P0 - p1            # selgernes andel i kroner
assert lik(kj + se, t)

o2a = S.ledd("a", "<p>Hvor mye får selgerne per enhet? Hvor mye av avgiften bærer kjøperne per enhet?</p>",
    riktig=(f"Kr {k2(p1)} og kr {k2(kj)}", [k2(p1), k2(kj)]),
    gale=[(f"Kr {k2(P0)} og kr {k2(t)}", [k2(P0), k2(t)]),
          (f"Kr {k2(p1)} og kr {k2(se)}", [k2(p1), k2(se)]),
          (f"Kr {k2(P1)} og kr {k2(kj)}", [k2(P1), k2(kj)])],
    solution=sol(
        "Kjøperne betaler P = p + t, selgerne får p. Likevekten er D(p + t) = S(p), uansett hvem som betaler avgiften inn.",
        steg=[f"Uten avgift: 600 − 20P = 30P − 150 gir P = {kr(P0)} og x = {kr(x0)}.",
              f"Med avgift: 600 − 20(p + 4) = 30p − 150 gir 670 = 50p, så p = <b>{k2(p1)}</b>.",
              f"Kjøperne betaler {k2(P1)}, altså <b>{k2(kj)}</b> mer enn før. Selgerne bærer {k2(se)}."],
        gale=[(f"Kr {k2(P0)} og kr {k2(t)}", "tror kjøperne bærer hele avgiften fordi de betaler den inn."),
              (f"Kr {k2(se)}", "bytter andelene. 1,60 er selgernes del."),
              (f"Kr {k2(P1)}", "prisen kjøperne betaler, avgiften medregnet. Selgerne får 4 kroner mindre.")],
        kontroll=f"Kjøpernes andel er S′/(S′ − D′) = 30/50 = 60 %. 60 % × 4 = {k2(kj)}.",
        kilde="F9 lb 7–8, lb 12 og lb 14"),
    dekker=["f9-utl-01", "f9-utl-07", "f9-tall-01"])

# et annet marked: finne helningene baklengs
Pb0, xb0, tb, Pb1, xb1 = 8, 200, 2, 8.5, 170
pb1 = Pb1 - tb
Dd = (xb1 - xb0) / (Pb1 - Pb0)
Sd = (xb1 - xb0) / (pb1 - Pb0)
assert lik(Dd, -60) and lik(Sd, 20) and lik(Sd / (Sd - Dd), (Pb1 - Pb0) / tb)
o2b = S.ledd("b", f"<p>I et annet marked er prisen kr {kr(Pb0)} og mengden {kr(xb0)} enheter. Etter en avgift på kr {kr(tb)} per enhet betaler kjøperne kr {k2(Pb1)} og mengden faller til {kr(xb1)}. Kurvene er rette linjer. Hvilke helninger D′ og S′ (endring i mengde per krone) ligger bak tallene?</p>",
    riktig=(f"D′ = {kr(Dd)} og S′ = {kr(Sd)}", [kr(Dd), kr(Sd)]),
    gale=[(f"D′ = {kr(-Sd)} og S′ = {kr(-Dd)}", [kr(-Sd), kr(-Dd)]),
          (f"D′ = {kr((xb1 - xb0) / tb)} og S′ = {kr(-(xb1 - xb0) / tb)}", [kr((xb1 - xb0) / tb), kr(-(xb1 - xb0) / tb)]),
          (f"D′ = {kr(Dd)} og S′ = {kr(-Dd)}", [kr(Dd), kr(-Dd)])],
    solution=sol(
        "Etterspørselen avhenger av kjøperprisen, tilbudet av selgerprisen. Del mengdeendringen på endringen i den prisen som hører til kurven. Forholdet mellom prisendringene er ΔP/Δp = S′/D′.",
        steg=[f"Kjøperprisen stiger {k2(Pb1 - Pb0)}: D′ = −30/0,50 = <b>{kr(Dd)}</b>.",
              f"Selgerprisen er {k2(Pb1)} − 2 = {k2(pb1)}, et fall på 1,50: S′ = −30/(−1,50) = <b>{kr(Sd)}</b>."],
        gale=[(f"D′ = {kr(-Sd)}", "bytter prisendringene mellom kurvene. Da blir ΔP/Δp = D′/S′, ikke S′/D′."),
              (f"D′ = {kr((xb1 - xb0) / tb)}", "deler mengdefallet på hele avgiften for begge kurvene."),
              (f"S′ = {kr(-Dd)}", "bruker kjøperprisens endring også for tilbudet.")],
        kontroll=f"∂P/∂t = S′/(S′ − D′) = 20/80 = 0,25. 0,25 × 2 = 0,50, som er prisøkningen kjøperne fikk.",
        kilde="F9 lb 7, lb 9–10 og lb 12"),
    dekker=["f9-tall-04", "f9-utl-05"])

prov = t * x1
dwl = 0.5 * t * (x0 - x1)
assert lik(dwl, 96) and lik(prov, 1008)
o2c = S.ledd("c", "<p>Gå tilbake til markedet i innledningen. Hva er effektivitetstapet av avgiften på kr 4?</p>",
    riktig=(f"Kr {kr(dwl)}: trekanten mellom kurvene fra {kr(x1)} til {kr(x0)} enheter, med høyde kr {kr(t)}", [kr(dwl), kr(x1), kr(x0), kr(t)]),
    gale=[(f"Kr {kr(prov)}: det staten får inn i avgift på de {kr(x1)} enhetene som fortsatt omsettes", [kr(prov), kr(x1)]),
          (f"Kr {kr(prov + dwl)}: hele tapet i konsument- og produsentoverskudd som avgiften fører til", [kr(prov + dwl)]),
          (f"Kr {kr(2 * dwl)}: avgiften flytter både tilbuds- og etterspørselskurven med kr {kr(t)}", [kr(2 * dwl), kr(t)])],
    solution=sol(
        "Effektivitetstapet er tapt konsument- og produsentoverskudd som ikke blir til skatteinntekt: trekanten mellom tilbud og etterspørsel fra nytt til gammelt kvantum. I figuren skifter én kurve med t, enten tilbudet opp eller etterspørselen ned.",
        steg=[f"Mengden faller fra {kr(x0)} til {kr(x1)}, altså {kr(x0 - x1)} enheter.",
              f"Tap = ½ × {kr(t)} × {kr(x0 - x1)} = <b>kr {kr(dwl)}</b>."],
        gale=[(f"Kr {kr(prov)}", "provenyet er en overføring til staten, ikke et tap for samfunnet."),
              (f"Kr {kr(prov + dwl)}", "regner provenyet med i tapet."),
              (f"Kr {kr(2 * dwl)}", "flytter begge kurvene. Da blir kilen 8, ikke 4. Bare én kurve skal flyttes.")],
        kilde="F9 lb 7 og lb 18"),
    dekker=["f9-tall-03", "f9-tall-02"])

eD = -b_d * P0 / x0
eS = b_s * P0 / x0
andel = eS / (eS + abs(eD))
assert lik(eD, -1) and lik(eS, 1.5) and lik(andel, 0.6) and lik(andel * t, kj)
o2d = S.ledd("d", "<p>Hvilket utsagn om fordelingen av avgiften på kr 4 er riktig? Elastisitetene måles i likevekten før avgiften.</p>",
    riktig=(f"Elastisitetene er {kr(eD)} og {kr(eS, 1)}, så kjøperne bærer {kr(eS, 1)}/(1 + {kr(eS, 1)}) = {kr(100 * andel)} % av avgiften",
            [kr(eD), kr(eS, 1), kr(eS, 1), "1", kr(eS, 1), kr(100 * andel)]),
    gale=[(f"Elastisitetene er {kr(eD)} og {kr(eS, 1)}, så kjøperne bærer 1/(1 + {kr(eS, 1)}) = {kr(100 * (1 - andel))} % av avgiften",
           [kr(eD), kr(eS, 1), "1", "1", kr(eS, 1), kr(100 * (1 - andel))]),
          (f"Kjøperne bærer {kr(100 * andel)} %, fordi etterspørselskurven er den flateste av de to i en pris-mengde-figur",
           [kr(100 * andel)]),
          (f"Kjøperne bærer {kr(100 * andel)} %, fordi forholdet mellom prisendringene er ΔP/Δp = D′/S′ = −20/30",
           [kr(100 * andel), "−20", "30"])],
    solution=sol(
        "Den minst prisfølsomme parten bærer mest. Konsumentens andel er ε<sub>S</sub>/(ε<sub>S</sub> + |ε<sub>D</sub>|). Forholdet mellom prisendringene er ΔP/Δp = S′/D′.",
        steg=[f"ε<sub>D</sub> = −20 × 15/300 = {kr(eD)}. ε<sub>S</sub> = 30 × 15/300 = {kr(eS, 1)}.",
              f"Kjøpernes andel: 1,5/2,5 = <b>{kr(100 * andel)} %</b>. Etterspørselen er minst elastisk."],
        gale=[("40 %", "bytter andelene. Den minst prisfølsomme parten bærer mest, ikke minst."),
              ("Flateste kurve", "etterspørselen har helning 1/20 og tilbudet 1/30 i en figur med pris på y-aksen. Etterspørselen er brattest. Bratt betyr lite elastisk."),
              ("D′/S′", f"riktig forhold er S′/D′ = 30/(−20) = −1,5. Prisendringene er +{k2(kj)} og −{k2(se)}.")],
        kontroll=f"{kr(100 * andel)} % × 4 = {k2(kj)}, som i a.",
        kilde="F9 lb 7, lb 12, lb 14, lb 17–18 og S s. 493"),
    dekker=["f9-utl-10", "f9-utl-08", "f9-gr-07", "f9-utl-05"])

S.oppgave("Avgift på en vare", "Skatteincidens", [11],
    "<p>I et marked med frikonkurranse er etterspørselen x = 600 − 20P, der P er prisen kjøperne betaler, avgiften medregnet. Tilbudet er x = 30p − 150, der p er prisen selgerne får. Staten innfører en avgift på kr 4 per enhet. Avgiften skal betales inn av kjøperne.</p>",
    [o2a, o2b, o2c, o2d])

# =====================================================================
# Oppgave 3: Formlene
# =====================================================================
# Talltest av formlene med D′ = −20 og S′ = 30 fra oppgave 2
Dp, Sp = -b_d, b_s
dp = Dp / (Sp - Dp); dP = Sp / (Sp - Dp)
assert lik(dP - dp, 1) and lik(dP * t, kj) and lik(-dp * t, se)
o3 = S.ledd("", "",
    riktig="∂p/∂t = D′/(S′ − D′) og ∂P/∂t = S′/(S′ − D′)",
    gale=["∂p/∂t = S′/(S′ − D′) og ∂P/∂t = D′/(S′ − D′)",
          "∂p/∂t = D′/(D′ − S′) og ∂P/∂t = S′/(D′ − S′)",
          "∂p/∂t = −D′/(S′ − D′) og ∂P/∂t = S′/(S′ − D′)"],
    solution=sol(
        "Skriv likevekten som funksjon av p og t: S(p) = D(p + t). Deriver med hensyn på t og husk kjerneregelen.",
        steg=["S′ · ∂p/∂t = D′ · (∂p/∂t + 1).",
              "∂p/∂t · (S′ − D′) = D′, så <b>∂p/∂t = D′/(S′ − D′)</b>, mellom −1 og 0.",
              "∂P/∂t = ∂p/∂t + 1 = <b>S′/(S′ − D′)</b>, mellom 0 og 1."],
        gale=[("Teller byttet", "gir ∂P/∂t ≤ 0. Konsumentprisen kan ikke falle når skatten øker."),
              ("D′ − S′ i nevneren", "snur fortegnet: produsentprisen ville stige og konsumentprisen falle."),
              ("−D′ i telleren", "det er produsentens andel, ikke ∂p/∂t. Da blir ∂P/∂t − ∂p/∂t ikke lik 1.")],
        kontroll="Med D′ = −20 og S′ = 30 fra forrige oppgave: ∂P/∂t = 0,6 og ∂p/∂t = −0,4. Forskjellen er 1.",
        kilde="F9 lb 8–10 og lb 12"),
    dekker=["f9-utl-02", "f9-utl-03", "f9-utl-04", "f9-utl-06"])
S.oppgave("Utledning av prisendringene", "Skatteincidens", [11],
    "<p>En stykkskatt t legges på en vare i et marked med frikonkurranse. Konsumentprisen er P = p + t, der p er produsentprisen. Etterspørselen er D(P) med D′ &lt; 0. Tilbudet er S(p) med S′ &gt; 0. Hvilket par av uttrykk er riktig?</p>",
    [o3])

# =====================================================================
# Oppgave 4: Grensetilfellene
# =====================================================================
P4, t4 = 40, 8
kjX = P4 + t4          # helt uelastisk etterspørsel: kjøperne bærer alt
selY = P4 - t4         # helt elastisk etterspørsel: selgerne bærer alt
o4a = S.ledd("a", "<p>I marked X er etterspørselen helt uelastisk. I marked Y er etterspørselen helt elastisk. Tilbudskurvene er stigende. Hva betaler kjøperne i X? Hva får selgerne i Y?</p>",
    riktig=(f"Kr {kjX} i X og kr {selY} i Y", [str(kjX), str(selY)]),
    gale=[(f"Kr {P4} i X og kr {P4} i Y", [str(P4), str(P4)]),
          (f"Kr {kjX} i X og kr {P4} i Y", [str(kjX), str(P4)]),
          (f"Kr {P4 + t4 // 2} i X og kr {P4 - t4 // 2} i Y", [str(P4 + t4 // 2), str(P4 - t4 // 2)])],
    solution=sol(
        "D′ = 0 gir ∂P/∂t = 1: kjøperne bærer alt. D′ → −∞ gir ∂p/∂t → −1: selgerne bærer alt. Flytt den prisen som tar hele skatten med t og la den andre stå.",
        steg=[f"X: kjøperne betaler {P4} + {t4} = <b>kr {kjX}</b>. Mengden er uendret.",
              f"Y: kjøperprisen blir {P4}. Selgerne får {P4} − {t4} = <b>kr {selY}</b>."],
        gale=[(f"{P4} og {P4}", "snur tilfellene. Det er kjøperne i X og selgerne i Y som ikke kan unngå skatten."),
              (f"{kjX} og {P4}", "tror kjøperne bærer alt i begge markedene. I Y kjøper de ingenting til høyere pris."),
              (f"{P4 + t4 // 2} og {P4 - t4 // 2}", "deler likt. Det gjelder ikke i grensetilfellene.")],
        kilde="F9 lb 11, lb 15–16"),
    dekker=["f9-gr-01", "f9-gr-04", "f9-gr-05"])

o4b = S.ledd("b", "<p>I hvilke to tilfeller bærer selgerne hele avgiften i et marked med frikonkurranse?</p>",
    riktig="Helt uelastisk tilbud, som for ubebygd tomt, eller helt elastisk etterspørsel",
    gale=["Helt elastisk tilbud, som når prisen er gitt, eller helt uelastisk etterspørsel",
          "Helt uelastisk tilbud eller helt uelastisk etterspørsel, fordi mengden da er uendret",
          "Bare når selgeren har monopol, ellers kan avgiften alltid veltes over på kjøperne"],
    solution=begrep(
        "S′ = 0 gir ∂p/∂t = −1 og ∂P/∂t = 0: tilbudet er fast uansett pris, så selgerne tar alt. Klassisk eksempel er ubebygd tomt, der eieren bærer skatten. D′ → −∞ gir det samme: kjøperne har perfekte alternativer.",
        "Uelastisk tilbud eller elastisk etterspørsel.",
        [("Elastisk tilbud eller uelastisk etterspørsel", "snudd. Da bærer kjøperne alt (∂P/∂t = 1)."),
         ("Uelastisk etterspørsel", "da er det kjøperne som bærer alt, som for insulin."),
         ("Monopol", "selgeren trenger ingen markedsmakt for å bære skatten. Det avgjøres av elastisitetene.")],
        kilde="F9 lb 11, lb 13 og S s. 492–495"),
    dekker=["f9-gr-03", "f9-gr-02", "f9-gr-01", "f9-fak-04"])

S.oppgave("To markeder og en avgift", "Skatteincidens", [11],
    f"<p>I to markeder med frikonkurranse er likevektsprisen kr {P4} før avgift. Staten legger en avgift på kr {t4} per enhet på selgerne.</p>",
    [o4a, o4b])

# =====================================================================
# Oppgave 5: Subsidie til storfekjøtt
# =====================================================================
o5 = S.ledd("", "",
    riktig="Bøndene på kort sikt, konsumentene på lang sikt",
    gale=["Konsumentene på kort sikt, bøndene på lang sikt",
          "Bøndene både på kort og lang sikt, fordi subsidien utbetales til dem",
          "Konsumentene både på kort og lang sikt, fordi prisen alltid faller med hele subsidien"],
    solution=begrep(
        "En subsidie er en negativ stykkskatt og analyseres likt. På kort sikt er tilbudet helt uelastisk: mengden og dermed kjøperprisen endres ikke, så bøndene får hele subsidien. På lang sikt er tilbudet horisontalt: produsentprisen er fast. Kjøperprisen faller med hele subsidien.",
        "Bøndene på kort sikt, konsumentene på lang sikt.",
        [("Snudd", "bytter om kort og lang sikt. Tilbudet er minst elastisk på kort sikt."),
         ("Bøndene alltid", "blander formell og reell insidens. Hvem som får utbetalingen, avgjør ikke hvem som får fordelen."),
         ("Konsumentene alltid", "på kort sikt kan ikke produksjonen øke, så prisen faller ikke.")],
        kilde="F9 lb 11, lb 14 og S s. 488–489"),
    dekker=["f9-gr-06", "f9-gr-09"])
S.oppgave("Subsidie til storfekjøtt", "Skatteincidens", [11],
    "<p>Staten innfører en subsidie på kr 6 per kg storfekjøtt. Subsidien betales ut til bøndene. På kort sikt kan bøndene ikke endre produksjonen. På lang sikt kan nye produsenter komme inn til samme kostnad, slik at tilbudet blir helt elastisk. Etterspørselen er fallende. Hvem får fordelen av subsidien?</p>",
    [o5])

# =====================================================================
# Oppgave 6: Monopol
# =====================================================================
A, c, tm = 24, 4, 6
def mono(cost):
    Q = (A - cost) / 2
    return Q, A - Q
Q0, Pm0 = mono(c)
Q1, Pm1 = mono(c + tm)
assert lik(Pm0, 14) and lik(Pm1, 17) and lik(Pm1 - Pm0, tm / 2)
P_fk = c + tm
Q_full = A - (Pm0 + tm)
pi_full = (Pm0 + tm - c - tm) * Q_full
pi_opt = (Pm1 - c - tm) * Q1
assert pi_opt > pi_full
o6a = S.ledd("a", f"<p>Staten innfører en avgift på kr {tm} per enhet. Hva blir prisen?</p>",
    riktig=(f"Kr {kr(Pm1)}", [kr(Pm1)]),
    gale=[(f"Kr {kr(Pm0 + tm)}", [kr(Pm0 + tm)]), (f"Kr {kr(Pm0)}", [kr(Pm0)]), (f"Kr {kr(P_fk)}", [kr(P_fk)])],
    solution=sol(
        "Monopolisten setter MR = MC. Avgiften løfter MC. Med lineær etterspørsel og konstant grensekostnad stiger prisen med halve avgiften.",
        steg=[f"MR = 24 − 2Q. Før: 24 − 2Q = {c} gir Q = {kr(Q0)} og P = {kr(Pm0)}.",
              f"Etter: 24 − 2Q = {c + tm} gir Q = {kr(Q1)} og P = <b>{kr(Pm1)}</b>."],
        gale=[(f"Kr {kr(Pm0 + tm)}", f"full overvelting. Da selges {kr(Q_full)} enheter og profitten blir {kr(pi_full)} mot {kr(pi_opt)} ved {kr(Pm1)}."),
              (f"Kr {kr(Pm0)}", "tror monopolisten bærer hele avgiften."),
              (f"Kr {kr(P_fk)}", "setter pris lik grensekostnad pluss avgift, som under frikonkurranse.")],
        kontroll=f"p = (a + c + t)/2 = (24 + 4 + 6)/2 = {kr(Pm1)}.",
        kilde="F9 lb 19–21"),
    dekker=["f9-mon-01", "f9-mon-02", "f9-mon-03"])

o6b = S.ledd("b", "<p>Hvilket utsagn om skatteinsidens under andre markedsformer er riktig?</p>",
    riktig="Under oligopol avhenger insidensen blant annet av om bedriftene konkurrerer på pris eller mengde",
    gale=["En monopolist kan aldri øke prisen med mer enn halve avgiften, uansett hvilken form etterspørselen har",
          "Med loddrett grensekostnadskurve øker monopolisten prisen med hele avgiften, fordi mengden er fast",
          "Under monopol virker en verdiavgift og en stykkavgift med samme proveny helt likt, som i frikonkurranse"],
    solution=begrep(
        "Under oligopol finnes ingen entydig regel. Insidensen avhenger av pris- eller kvantumskonkurranse, antall bedrifter, formen på kurvene og hvor nære substitutter produktene er.",
        "Oligopol har ingen entydig regel.",
        [("Aldri mer enn halve", "halve avgiften gjelder lineær etterspørsel. Med konstant elastisitet kan prisen stige med mer enn avgiften (Stiglitz)."),
         ("Loddrett MC", "da endres verken mengde eller pris. Monopolisten bærer hele avgiften."),
         ("Verdiavgift lik stykkavgift", "under monopol gir verdiavgift høyere mengde enn en stykkavgift med samme proveny.")],
        kilde="F9 lb 6, lb 22 og S s. 498–501"),
    dekker=["f9-mon-06", "f9-mon-04", "f9-mon-05", "f9-mon-08"])

S.oppgave("Bryggeriet i Nordvik", "Skatteincidens", [11],
    f"<p>Et bryggeri har monopol. Etterspørselen er P = {A} − Q, der P er prisen og Q mengden. Grensekostnaden er konstant lik kr {c}.</p>",
    [o6a, o6b])

# =====================================================================
# Oppgave 7: Plattformer og andre påstander
# =====================================================================
ol0, olt = 1.00, 0.10
o7 = S.ledd("", "",
    riktig="En skatt på datainnsamling hos et sosialt medium som er gratis, kan føre til at brukerne må betale",
    gale=[f"I Stiglitz' eksempel med 10 cent avgift på en flaske øl stiger prisen fra {k2(ol0)} til {k2(ol0 + olt)} dollar",
          "Jo mer prisfølsom etterspørselen er, jo mindre blir velferdstapet av en avgift på varen",
          "En merverdiavgift på avisabonnementer kan aldri føre til at avisen senker prisen for leserne"],
    solution=begrep(
        "Plattformer betjener to gjensidig avhengige kundegrupper. Pris lik grensekostnad gjelder ikke. En skatt på den ene siden kan endre prisene på begge sider: skatt på datainnsamling kan gi månedsavgift for brukerne.",
        "Brukerne kan måtte betale.",
        [("Ølskatten", f"prisen stiger bare til {k2(ol0 + olt / 2)} dollar. Produsentene får {k2(ol0 - olt / 2)}. Etterspørselen faller når prisen stiger."),
         ("Prisfølsom etterspørsel", "motsatt. Prisfølsom etterspørsel gir stort fall i mengden og stort velferdstap."),
         ("Aviser", "moms på aviser kan få avisen til å senke prisen for å holde på leserne og annonseinntektene.")],
        kilde="F9 lb 18, lb 23–24 og S s. 486–487"),
    dekker=["f9-mon-07", "f9-tall-05", "f9-gr-08"])
S.oppgave("Tre påstander om insidens", "Skatteincidens", [11], "<p>Hvilket utsagn er riktig?</p>", [o7])

# =====================================================================
# Oppgave 8: Skatt på arbeid, kapital og tomt
# =====================================================================
o8 = S.ledd("", "",
    riktig="En lønnsskatt i en by der arbeid og kapital kan flytte fritt, bæres i stor grad av grunneierne i byen",
    gale=["Arbeidsgiveravgiften bæres av arbeidsgiverne, fordi det er arbeidsgiverne som betaler den inn til staten",
          "En skatt på renter i en liten åpen økonomi med gitt verdensrente bæres av dem som låner ut kapitalen",
          "En lønnsskatt kan aldri senke lønnen med mer enn skatten, uansett hvordan arbeidstilbudet ser ut"],
    solution=begrep(
        "Skatter på mobile faktorer veltes over på de immobile. I Philadelphia må lønn og avkastning etter skatt holdes uendret fordi arbeid og kapital kan flytte. Bare tomten har uelastisk tilbud, så grunneierne bærer skatten.",
        "Grunneierne bærer lønnsskatten.",
        [("Arbeidsgiveravgift", "hvem som betaler inn, er uten betydning. Med lite elastisk arbeidstilbud bærer arbeidstakerne mesteparten."),
         ("Renteskatt", "kapitalen tilbys perfekt elastisk til verdensrenten. Låntakerne betaler i + t. Långiverne får uendret avkastning."),
         ("Aldri mer enn skatten", "med bakoverbøyd arbeidstilbud øker tilbudet når lønnen faller. Da kan lønnen falle med mer enn skatten.")],
        kilde="S s. 483–484 og s. 493–497"),
    dekker=["f9-fak-05", "f9-fak-01", "f9-fak-02", "f9-fak-06"])
S.oppgave("Skatt på arbeid, kapital og tomt", "Skatteincidens", [11],
    "<p>Hvilket utsagn er i tråd med pensum?</p>", [o8])

# =====================================================================
# Oppgave 9: Hytter og tidsinkonsistens
# =====================================================================
o9 = S.ledd("", "",
    riktig="Ventes det eiendomsskatt, vil hytteprisene falle, fordi det blir dyrere å eie hytte i kommunen",
    gale=["Skatteinsidens handler bare om hvordan prisene endrer seg den dagen en ny skatt blir innført",
          "Tidsinkonsistensproblemet løses best ved at politikerne fritt kan endre skattefritakene over tid",
          "Hytteeierne kan stemme ned eiendomsskatt ved lokalvalget, så risikoen for ny skatt er liten"],
    solution=begrep(
        "Et aktivum blir mindre verdt når en ny skatt gjør det dyrere å eie det. Hytteeiere fra andre kommuner kan ikke stemme ved lokalvalget, så sjansen er stor for at skatten kommer. Den som allerede har kjøpt, er låst fast og bærer skatten.",
        "Hytteprisene faller.",
        [("Bare innføringsdagen", "det er den direkte insidensen. Den dynamiske kommer av at myndighetene endrer politikken etter at folk har tilpasset seg."),
         ("Fritt endre", "det er selve problemet, som med bompengefritaket for elbiler. Løsningen er troverdig binding, som Norges Banks uavhengighet."),
         ("Stemme ned", "hytteeierne stemmer i kommunen der de bor, ikke der hytta ligger.")],
        kilde="F9 lb 5 og lb 25–26"),
    dekker=["f9-dyn-03", "f9-dyn-01", "f9-dyn-02"])
S.oppgave("Hytta i Fjellheim", "Skatteincidens", [11],
    "<p>I Fjellheim kommune eies de fleste hyttene av folk som bor i andre kommuner. Kommunen har ikke eiendomsskatt i dag. Hvilket utsagn er i tråd med forelesningen?</p>",
    [o9])

S.skriv(
    label="F9 Hvem betaler egentlig skatten",
    note="Stykkskatt under frikonkurranse med utledning, talleksempel og velferdstap, grensetilfellene, subsidier, monopol, oligopol og plattformer, skatt på faktorer og dynamisk insidens.",
    facts=["14 ledd med fire alternativer: 3 poeng for rett, −1 for feil og 0 for blankt.",
           "Satser og regler står i oppgaveteksten, slik de blir oppgitt på eksamen.",
           "Sammen med de andre settene i fanen dekker settet hvert punkt i sjekklisten.",
           "Laget fra forelesningsnotatene 2026. Kurset har ikke kontrollert løsningene."],
    practiceNote="Sjekk hvert svar med to kontroller: ∂P/∂t − ∂p/∂t = 1. Den minst prisfølsomme parten bærer mest. I grensetilfellene flytter du den ene prisen med hele skatten og lar den andre stå.")
