"""Regneskript for settet fl-f6: F6 Effektivitet, skattearbitrasje og demokrati (forelesning 6, 2026).
Kjør fra prosjektroten: python3 -I fag/fie432/_forelesning/fl-f6_regn.py
"""
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from felles import *

S = Sett("fl-f6")


def o(tekst, *tall):
    return (tekst, list(tall))


# ================= Oppgave 1: skattearbitrasje =================
K1, r1, tp, tk1, tn = 1_500_000, 0.06, 0.22, 0.16, 0.22
laan = r1 * K1 * (1 - tp)                    # 70 200
avk = r1 * K1 * (1 - tk1)                    # 75 600
gev = avk - laan                             # 5 400
assert lik(gev, r1 * K1 * (tp - tk1))
gev_no = r1 * K1 * (tn - tn)                 # 0
uten_fr = avk - r1 * K1                      # −14 400 rentefradraget glemt
uten_fr_no = r1 * K1 * (1 - tn) - r1 * K1    # −19 800
uten_r = K1 * (tp - tk1)                     # 90 000
S.oppgave("Lars låner til sitt eget selskap", "Bedriftens tilpasning", [9],
    f"<p>Lars låner kr {kr(K1)} privat til {pst(r1, 0)} rente og skyter beløpet inn som egenkapital i sitt eget AS. Selskapet plasserer pengene "
    f"i banken til samme rente. Renteutgifter gir fradrag hos Lars med {pst(tp, 0)}. Selskapet betaler {pst(tk1, 0)} skatt på renteinntekten. "
    f"Hvor stor er gevinsten per år? Hva blir den hvis begge satsene er {pst(tn, 0)}, som i Norge?</p>",
    [S.ledd("", "",
        riktig=o(f"Kr {kr(gev)} per år uten risiko. Med {kr(100 * tn)} % på begge nivåer blir gevinsten kr {kr(gev_no)}", kr(gev), kr(100 * tn), kr(gev_no)),
        gale=[o(f"Kr {kr(uten_fr)} per år. Med {kr(100 * tn)} % på begge nivåer blir resultatet kr {kr(uten_fr_no)}", kr(uten_fr), kr(100 * tn), kr(uten_fr_no)),
              o(f"Kr {kr(uten_r)} per år uten risiko. Med {kr(100 * tn)} % på begge nivåer blir gevinsten kr {kr(gev_no)}", kr(uten_r), kr(100 * tn), kr(gev_no)),
              o(f"Kr {kr(gev)} per år som betaling for risikoen han tar i selskapet. Med {kr(100 * tn)} % på begge nivåer blir gevinsten kr {kr(gev_no)}",
                kr(gev), kr(100 * tn), kr(gev_no))],
        solution=sol(
            "Skattearbitrasje: høyt beskattet inntekt gjøres om til lavt beskattet ved å utnytte satsforskjellen mellom person og bedrift. Lån og plassering har samme rente, så gevinsten er risikofri: rK(t<sub>p</sub> − t<sub>k</sub>).",
            [f"Renter etter skatt: {kr(K1)} × 6 % × 0,78 = {kr(laan)}.",
             f"Avkastning etter skatt i selskapet: {kr(K1)} × 6 % × 0,84 = {kr(avk)}.",
             f"Gevinst: <b>kr {kr(gev)}</b>. Med 22 % på begge nivåer er t<sub>p</sub> − t<sub>k</sub> = 0 og gevinsten <b>kr 0</b>."],
            [(f"Kr {kr(uten_fr)}", "glemt rentefradraget hos Lars."),
             (f"Kr {kr(uten_r)}", "ganger satsforskjellen med lånet, ikke med rentene."),
             ("Betaling for risiko", "lån og plassering har samme rente r. Det er ingen risiko, bare satsforskjellen.")],
            kontroll=f"{kr(K1)} × 0,06 × (0,22 − 0,16) = {kr(r1 * K1 * (tp - tk1))}.",
            kilde="F6 lb 4–6"),
        dekker=["f6-skattearbitrasje-01", "f6-skattearbitrasje-02", "f6-skattearbitrasje-03"])])

# ================= Oppgave 2: eier og bedrift i to perioder =================
body2 = ("<p>En eier fordeler inntekten Y<sub>1</sub> mellom konsum, sparing S i finansmarkedet til renten r og en realinvestering K i egen bedrift. "
         "Renteinntekt skattlegges med t<sub>a</sub> hos eieren. Bedriften betaler t<sub>k</sub> av skattemessig overskudd og kan trekke fra andelen α av rentekostnaden rK. "
         "En andel δ av kapitalen går med i kapitalslit og restverdien (1 − δ)K selges i periode 2.</p>")
a2 = S.ledd("a", "<p>Hvilket uttrykk viser verdien V av bedriften for eieren?</p>",
    riktig="V = −K + [F(K) + (1 − δ)K − t<sub>k</sub>(F(K) − (αr + δ)K)]/[1 + r(1 − t<sub>a</sub>)]",
    gale=["V = −K + [F(K) + (1 − δ)K − t<sub>k</sub>(F(K) − (αr + δ)K)]/(1 + r)",
          "V = −K + [F(K) + (1 − δ)K − t<sub>k</sub>(F(K) − (r + δ)K)]/[1 + r(1 − t<sub>a</sub>)]",
          "V = −K + [(1 − t<sub>k</sub>)(F(K) + (1 − δ)K) + t<sub>k</sub>(αr + δ)K]/[1 + r(1 − t<sub>a</sub>)]"],
    solution=begrep(
        "Virkelig overskudd er F(K) + (1 − δ)K. Skattemessig overskudd er F(K) − (αr + δ)K. Etter Fishers separasjonsteorem velger eieren først investeringen og fordeler så konsumet. Bedriftens kontantstrøm diskonteres med alternativavkastningen etter skatt, 1 + r(1 − t<sub>a</sub>).",
        "Restverdien er ikke skattlagt, bare andelen α av rentene trekkes fra og diskonteringen skjer med r(1 − t<sub>a</sub>).",
        [("/(1 + r)", "diskonterer med bruttorenten. Eierens alternativ, sparing, gir bare r(1 − t<sub>a</sub>)."),
         ("(r + δ)K", "trekker fra hele rentekostnaden også når α &lt; 1."),
         ("(1 − t<sub>k</sub>)(F(K) + (1 − δ)K)", "skattlegger også restverdien (1 − δ)K. Den er ikke en del av skattemessig overskudd.")],
        kilde="F6 lb 7–11 og lb 53, AS1 s. 332"),
    dekker=["f6-kapitalkostnad-08", "f6-kapitalkostnad-09"])

r2, d2, tk2, ta2, al2 = 0.04, 0.08, 0.25, 0.15, 0.4


def kapkost(r, d, tk, ta, al):
    return r * (1 + tk * (1 - al) / (1 - tk) - ta / (1 - tk)) + d


F_rett = kapkost(r2, d2, tk2, ta2, al2)                 # 12 %
F_bytt = kapkost(r2, d2, ta2, tk2, al2)                 # 11,25 %
F_fort = r2 * (1 + tk2 * (1 - al2) / (1 - tk2) + ta2 / (1 - tk2)) + d2   # 13,60 %
F_utd = F_rett - d2                                     # 4 %
assert lik(F_rett, r2 + d2) and lik(tk2 * (1 - al2), ta2)
b2 = S.ledd("b", f"<p>Anta r = {pst(r2, 0)}, δ = {pst(d2, 0)}, t<sub>k</sub> = {pst(tk2, 0)}, t<sub>a</sub> = {pst(ta2, 0)} og α = {kr(al2, 1)}. Hva blir kravet til grenseproduktiviteten F′(K)?</p>",
    riktig=o(f"{pst(F_rett)}. Skattekilen er null", pst(F_rett)),
    gale=[o(f"{pst(F_bytt)}. Skattekilen er negativ", pst(F_bytt)),
          o(f"{pst(F_fort)}. Skattekilen er positiv", pst(F_fort)),
          o(f"{pst(F_utd)}. Skattekilen er null", pst(F_utd))],
    solution=sol(
        "F′(K) = r[1 + t<sub>k</sub>(1 − α)/(1 − t<sub>k</sub>) − t<sub>a</sub>/(1 − t<sub>k</sub>)] + δ. Skattekilen er null når t<sub>k</sub>(1 − α) = t<sub>a</sub>.",
        [f"t<sub>k</sub>(1 − α)/(1 − t<sub>k</sub>) = 0,25 × 0,6/0,75 = {kr(tk2 * (1 - al2) / (1 - tk2), 2)}. t<sub>a</sub>/(1 − t<sub>k</sub>) = 0,15/0,75 = {kr(ta2 / (1 - tk2), 2)}.",
         f"F′(K) = 0,04 × (1 + 0,20 − 0,20) + 0,08 = <b>{pst(F_rett)}</b> = r + δ."],
        [(pst(F_bytt), "bytter om t<sub>k</sub> og t<sub>a</sub>."),
         (pst(F_fort), "plusstegn foran t<sub>a</sub>-leddet. Skatt på eierens renter gjør alternativet dårligere og senker kapitalkostnaden."),
         (pst(F_utd), "glemt kapitalslitet δ.")],
        kontroll="t<sub>k</sub>(1 − α) = 0,25 × 0,6 = 0,15 = t<sub>a</sub>. Lysbildet: nøytralitet er «vanskelig å få til».",
        kilde="F6 lb 12–15 og lb 53–55, AS1 s. 333"),
    dekker=["f6-kapitalkostnad-03", "f6-kapitalkostnad-04"])

r3, d3, t3 = 0.05, 0.10, 0.22
ek = kapkost(r3, d3, t3, t3, 0)       # 15 %
gj = kapkost(r3, d3, t3, t3, 1)       # 13,59 %
ek0 = kapkost(r3, d3, t3, 0, 0)       # 16,41 % t_a satt til null
gj0 = kapkost(r3, d3, t3, 0, 1)       # 15 %
assert gj < ek and lik(ek, r3 + d3)
c2 = S.ledd("c", f"<p>Anta nå norske satser: t<sub>k</sub> = t<sub>a</sub> = {pst(t3, 0)}, med r = {pst(r3, 0)} og δ = {pst(d3, 0)}. Hva blir F′(K) med ren egenkapital (α = 0) og med ren gjeld (α = 1)?</p>",
    riktig=o(f"EK {pst(ek)} og gjeld {pst(gj)}", pst(ek), pst(gj)),
    gale=[o(f"EK {pst(ek0)} og gjeld {pst(gj0)}", pst(ek0), pst(gj0)),
          o(f"EK {pst(ek)} og gjeld {pst(ek)}", pst(ek), pst(ek)),
          o(f"EK {pst(gj)} og gjeld {pst(ek)}", pst(gj), pst(ek))],
    solution=sol(
        "α = 0 gir F′(K) = r[1 + (t<sub>k</sub> − t<sub>a</sub>)/(1 − t<sub>k</sub>)] + δ, som er r + δ når t<sub>k</sub> = t<sub>a</sub>. α = 1 gir F′(K) = r[1 − t<sub>a</sub>/(1 − t<sub>k</sub>)] + δ, under r + δ når t<sub>a</sub> &gt; 0.",
        [f"EK: 0,05 × (1 + 0) + 0,10 = <b>{pst(ek)}</b>, nøytralt.",
         f"Gjeld: 0,05 × (1 − 0,22/0,78) + 0,10 = <b>{pst(gj)}</b>: kapitalen subsidieres."],
        [(f"EK {pst(ek0)}", "ser bort fra skatten på eierens renter. Det er bedriften sett isolert."),
         (f"Gjeld {pst(ek)}", "tror gjeld alltid gir nøytralitet. Det gjelder bare når t<sub>a</sub> = 0."),
         (f"EK {pst(gj)}", "byttet om. Gjeld gir lavest kapitalkostnad så lenge t<sub>k</sub> &gt; 0.")],
        kontroll="Forskjellen mellom EK og gjeld er r × t<sub>k</sub>/(1 − t<sub>k</sub>) = 0,05 × 0,282 = 1,41 prosentpoeng.",
        kilde="F6 lb 14 og lb 18–19, AS1 s. 333"),
    dekker=["f6-kapitalkostnad-05", "f6-kapitalkostnad-06", "f6-gjeld-ek-04"])
S.oppgave("Eieren og bedriften", "Bedriftens tilpasning", [9], body2, [a2, b2, c2])

# ================= Oppgave 3: gjeld eller egenkapital =================
r4, t4, A4 = 0.06, 0.22, 0.4
FA = r4 * (1 - A4 * t4) / (1 - t4)       # 7,02 %
FA_rA = r4 * A4 / (1 - t4)               # 3,08 %
FA_div = r4 / ((1 - t4) * A4)            # 19,23 %
FG, FE = r4, r4 / (1 - t4)               # 6 % og 7,69 %
FE_feil = r4 * (1 - t4)                  # 4,68 %
assert lik(r4 * (1 - 1 * t4) / (1 - t4), FG) and lik(r4 * (1 - 0 * t4) / (1 - t4), FE)
body3 = f"<p>Et selskap investerer K og maksimerer overskudd etter skatt. Renten er r = {pst(r4, 0)} og selskapsskatten t = {pst(t4, 0)}. Produksjonsfunksjonen F(K) har F′ &gt; 0 og F″ &lt; 0.</p>"
a3 = S.ledd("a", "<p>Hvilken påstand er riktig?</p>",
    riktig="Med bare gjeld er skattemessig og virkelig overskudd like, så skatten er nøytral. Med egenkapital kan alternativkostnaden ikke trekkes fra",
    gale=["Selv med riktig skattegrunnlag gir en høyere sats på overskuddet mindre investering, fordi selskapet da beholder mindre av hver krone det tjener",
          "Jo høyere skatten på eierens renteinntekt er, desto dyrere blir realinvesteringen i selskapet på marginen",
          "Sandmo mener at næringer med positive samfunnsvirkninger bør få lavere sats eller gunstigere avskrivningsregler"],
    solution=begrep(
        "Maks (1 − t)[F(K) − rK] gir F′(K) = r. Skatten er nøytral når alle reelle kostnader, også kapitalkostnaden, kan trekkes fra. Gjeldsrenter kan trekkes fra, men ikke alternativkostnaden ved egenkapital. Derfor favoriserer skattesystemet gjeld.",
        "Gjeld gir riktig grunnlag. Alternativkostnaden ved EK er ikke fradragsberettiget.",
        [("Høyere sats gir mindre investering", "satsen endrer bare nivået på overskuddet etter skatt, ikke hvor optimum ligger, så lenge grunnlaget er riktig."),
         ("Skatt på eierens renter", "snudd. Den gjør det finansielle alternativet dårligere og senker den relative kapitalkostnaden."),
         ("Lavere sats til næringer", "Sandmo (AS1) vil ha særskatt eller subsidie på selve aktiviteten, ikke variasjon i sats eller avskrivninger.")],
        kilde="F6 lb 13, 17 og 21, AS1 s. 330–331"),
    dekker=["f6-gjeld-ek-01", "f6-kapitalkostnad-01", "f6-kapitalkostnad-07", "f6-kapitalkostnad-10"])

b3 = S.ledd("b", f"<p>Selskapet kan bare trekke fra andelen A = {kr(A4, 1)} av rentekostnaden rK. Hva er kravet til grenseproduktiviteten F′(K)?</p>",
    riktig=o(pst(FA), pst(FA)),
    gale=[o(pst(FA_rA), pst(FA_rA)), o(pst(FA_div), pst(FA_div)), o(pst(FG), pst(FG))],
    solution=sol(
        "Maks F(K) − rK − t[F(K) − ArK] gir F′(K)(1 − t) = r(1 − At), altså F′(K) = r(1 − At)/(1 − t).",
        [f"1 − At = 1 − 0,4 × 0,22 = {kr(1 - A4 * t4, 3)}.",
         f"F′(K) = 0,06 × {kr(1 - A4 * t4, 3)}/0,78 = <b>{pst(FA)}</b>."],
        [(pst(FA_rA), "rA/(1 − t): tar med andelen som kan trekkes fra i stedet for kostnaden."),
         (pst(FA_div), "r/[(1 − t)A]: deler på A."),
         (pst(FG), "r: gjelder bare når A = 1 og alle renter kan trekkes fra.")],
        kontroll=f"A = 1 gir 0,06 = r. A = 0 gir 0,06/0,78 = {pst(FE)} = r/(1 − t).",
        kilde="F6 lb 17–18 og lb 21, H2025 o7a"),
    dekker=["f6-kapitalkostnad-02"])

c3 = S.ledd("c", "<p>Kapitalen består av gjeld G og egenkapital E, K = G + E. Gjeldsrentene kan trekkes fra, men ikke avkastningskravet på egenkapitalen. Hvilken påstand er riktig?</p>",
    riktig=o(f"F′<sub>E</sub> = {pst(FE)} og F′<sub>G</sub> = {pst(FG)}, så E* blir lavere enn G*", pst(FE), pst(FG)),
    gale=[o(f"F′<sub>E</sub> = {pst(FE_feil)} og F′<sub>G</sub> = {pst(FG)}, så E* blir høyere enn G*", pst(FE_feil), pst(FG)),
          o(f"F′<sub>E</sub> = {pst(FE)} og F′<sub>G</sub> = {pst(FG)}, så E* blir høyere enn G*", pst(FE), pst(FG)),
          o(f"F′<sub>E</sub> = {pst(FE)} og F′<sub>G</sub> = {pst(FE)}, så E* blir lik G*", pst(FE), pst(FE))],
    solution=sol(
        "Gjeld: maks (1 − t)[F(G) − rG] gir F′<sub>G</sub> = r. EK: maks F(E) − rE − tF(E) gir F′<sub>E</sub> = r/(1 − t). Med fallende grenseproduktivitet gir høyere krav lavere bruk.",
        [f"F′<sub>G</sub> = <b>{pst(FG)}</b>. F′<sub>E</sub> = 0,06/0,78 = <b>{pst(FE)}</b>.",
         "Høyest krav for EK, så E* &lt; G*."],
        [(f"F′<sub>E</sub> = {pst(FE_feil)}", "r(1 − t) i stedet for r/(1 − t)."),
         ("E* &gt; G*", "høyere krav gir mindre mengde, ikke mer, når F″ &lt; 0."),
         ("E* = G*", "gir gjeld samme krav som EK. Gjeldsrentene er fradragsberettiget, så kravet er r.")],
        kilde="F6 lb 20–22, H2025 o7b–c"),
    dekker=["f6-gjeld-ek-02", "f6-gjeld-ek-03"])
S.oppgave("Gjeld eller egenkapital", "Bedriftens tilpasning", [9], body3, [a3, b3, c3])

# ================= Oppgave 4: skatt og effektivitet =================
a_d, c_s = 100, 20


def marked(T):
    Q = (a_d - c_s - T) / 2
    P = a_d - Q
    return Q, P, P - T


Q1, P1, _ = marked(0)
QT, PT, pT = marked(10)
Q2T, P2T, p2T = marked(20)
tap1 = 0.5 * 10 * (Q1 - QT)                    # 25
tap2 = 0.5 * 20 * (Q1 - Q2T)                   # 100
assert lik(tap2, 4 * tap1)


def overskudd(T):
    Q, P, p = marked(T)
    return 0.5 * (a_d - P) * Q + 0.5 * (p - c_s) * Q


tot1 = overskudd(0) - overskudd(10)            # 375
tot2 = overskudd(0) - overskudd(20)            # 700
body4 = (f"<p>Etterspørselen etter en vare er P = {a_d} − Q og tilbudet (summen av bedriftenes grensekostnader) er P = {c_s} + Q. "
         f"Staten innfører en stykkskatt på kr 10 per enhet.</p>")


def eff(p, t1, t2):
    return o(f"Produsentprisen blir kr {kr(p)} og tapet kr {kr(t1)}. Ved kr 20 i skatt blir tapet kr {kr(t2)}", kr(p), kr(t1), "20", kr(t2))


a4 = S.ledd("a", "<p>Hva blir produsentprisen og effektivitetstapet? Hva blir tapet hvis skatten dobles til kr 20?</p>",
    riktig=eff(pT, tap1, tap2),
    gale=[eff(PT, tap1, tap2), eff(pT, tap1, 2 * tap1), eff(pT, tot1, tot2)],
    solution=sol(
        "Skatten skifter tilbudskurven opp med T. Produsenten får p<sub>2</sub> = P<sub>2</sub> − T. Tapet er trekanten ½ × T × ΔQ. Skatteinntekten T × Q<sub>2</sub> er en overføring, ikke et tap.",
        [f"Uten skatt: Q = {kr(Q1)}, P = {kr(P1)}. Med T = 10: {a_d} − Q = 30 + Q gir Q = {kr(QT)}, P = {kr(PT)} og p = {kr(pT)}.",
         f"Tap: ½ × 10 × {kr(Q1 - QT)} = <b>{kr(tap1)}</b>.",
         f"T = 20: Q = {kr(Q2T)}, tap ½ × 20 × {kr(Q1 - Q2T)} = <b>{kr(tap2)}</b>, fire ganger så stort."],
        [(f"Kr {kr(PT)}", "konsumentprisen. Produsentprisen leses på den opprinnelige tilbudskurven: P − T."),
         (f"Kr {kr(2 * tap1)} ved dobling", "tror tapet dobles. Både kilen og kvantumsfallet dobles, så tapet firedobles."),
         (f"Kr {kr(tot1)}", "hele nedgangen i konsument- og produsentoverskudd. Skatteinntekten er ikke et tap.")],
        kontroll="Lave skatter på brede grunnlag er god skattepolitikk.",
        kilde="F6 lb 26–28 og lb 30"),
    dekker=["f6-effektivitet-01", "f6-effektivitet-02", "f6-effektivitet-08"])

b4 = S.ledd("b", "<p>Hvilken påstand om skatt og effektivitet er riktig?</p>",
    riktig="Satsene bør være høyest der tilbud eller etterspørsel er uelastisk, fordi skatten da gir lite utslag i omsatt mengde",
    gale=["Pigou-skatter er vridende som andre skatter og reduserer verdiskapingen, også når de retter opp forurensning",
          "Laffer-kurven viser at lavere skattesatser alltid gir høyere skatteinntekter og større vekstevne for økonomien som helhet",
          "Skattekiler oppstår bare ved indirekte skatter, siden en inntektsskatt ikke endrer de relative prisene folk står overfor"],
    solution=begrep(
        "Uelastiske markeder gir lite kvantumsutslag og dermed lite effektivitetstap. Skatten slår ut i pris, ikke i mengde.",
        "Høyest sats der markedet er uelastisk.",
        [("Pigou-skatter", "er effektivitetsfremmende. De retter opp markedssvikt og kan gjøre alle bedre stilt."),
         ("Laffer-kurven", "gjelder bare til høyre for t*. Om et marked er der, er et empirisk spørsmål."),
         ("Bare indirekte skatter", "inntektsskatt på arbeid og kapital gir kiler mellom lønn betalt og mottatt og mellom avkastning og sparerens belønning.")],
        kilde="F6 lb 24–25 og lb 29–30, AS3 s. 281–282"),
    dekker=["f6-effektivitet-03", "f6-effektivitet-04", "f6-effektivitet-05", "f6-effektivitet-06"])

c4 = S.ledd("c", "<p>Kari får enten en rundsumskatt på kr 100 000 eller en proporsjonal inntektsskatt som gir staten like mye. Hvilken påstand er riktig?</p>",
    riktig="Begge gjør henne fattigere, men bare inntektsskatten gir en substitusjonsvirkning. Det er den som gir effektivitetstapet",
    gale=["Tapet måles ved hvor mye arbeidstilbudet faller totalt, så inntektsskatten gir ikke noe tap så lenge antall timer er uendret",
          "En flat inntektsskatt uten fradrag er en rundsumskatt og derfor både helt effektiv og rettferdig",
          "Høyere merverdiavgift på luksus enn på mat omfordeler mer effektivt enn en progressiv inntektsskatt"],
    solution=begrep(
        "Rundsumskatt og inntektsskatt har samme inntektsvirkning. Bare inntektsskatten tar en del av belønningen for siste time.",
        "Substitusjonsvirkningen gir tapet.",
        [("Totalt arbeidstilbud", "inntekts- og substitusjonsvirkningen kan oppheve hverandre. Tapet kommer fra substitusjonsvirkningen selv om timene er uendret."),
         ("Flat skatt er rundsum", "den har positiv marginalskatt. Knyttes en rundsum til skatteevne, blir den vridende igjen. Ingen skatt er både helt effektiv og rettferdig."),
         ("Mva på luksus", "lik sats på alle varer tilsvarer en inntektsskatt. Differensierte satser er et dårligere omfordelingsvirkemiddel (Little).")],
        kilde="AS3 s. 281–282, AS4 s. 54–57"),
    dekker=["f6-effektivitet-07", "f6-effektivitet-09", "f6-progressiv-sandmo-10"])
S.oppgave("Skatt og effektivitet", "Skatt og effektivitet", [9, 10], body4, [a4, b4, c4])

# ================= Oppgave 5: dobbeltbeskatning =================
tN = 0.22
land = {"A": (200_000, 0.15, "kredit"), "B": (100_000, 0.30, "kredit"), "C": (100_000, 0.25, "ingen"), "D": (100_000, 0.10, "unntak")}
norsk_grunnlag = sum(R for R, T, m in land.values() if m != "unntak")    # 400 000
norsk = tN * norsk_grunnlag                                              # 88 000
kred = {k: (min(R * T, R * tN) if m == "kredit" else 0) for k, (R, T, m) in land.items()}
betal = norsk - sum(kred.values())                                       # 36 000
b_refusjon = norsk - sum(R * T for R, T, m in land.values() if m == "kredit")   # 28 000
b_kredC = betal - min(land["C"][0] * land["C"][1], land["C"][0] * tN)           # 14 000
b_unntak = betal + land["D"][0] * tN - land["D"][0] * land["D"][1]              # 48 000
assert betal == 36_000

rad = "".join(f"<tr><td>{k}</td><td class=\"n\">{kr(R)}</td><td class=\"n\">{pst(T, 0)}</td><td>{ {'kredit': 'kreditmetoden', 'ingen': 'ingen avtale', 'unntak': 'unntaksmetoden'}[m] }</td></tr>"
              for k, (R, T, m) in land.items())
body5 = (f"<p>Ingrid er bosatt i Norge og skattlegges med {pst(tN, 0)} på kapitalinntekt. Hun har kapitalinntekt i fire land:</p>"
         f"<table class=\"data\"><tr><th>Land</th><th>Inntekt</th><th>Skatt der</th><th>Skatteavtale med Norge</th></tr>{rad}</table>"
         "<p>Norge gir bare lempning når en skatteavtale krever det.</p>")

a5 = S.ledd("a", "<p>Hvor mye skatt må Ingrid betale til Norge?</p>",
    riktig=o(f"Kr {kr(betal)}", kr(betal)),
    gale=[o(f"Kr {kr(b_unntak)}", kr(b_unntak)), o(f"Kr {kr(b_refusjon)}", kr(b_refusjon)), o(f"Kr {kr(b_kredC)}", kr(b_kredC))],
    solution=sol(
        "Norsk skatt beregnes på all inntekt Norge kan skattlegge. Kreditten per land er den laveste av utenlandsk skatt og norsk skatt på samme inntekt. Uten avtale gis ingen kreditt. Inntekt under unntaksmetoden holdes utenfor.",
        [f"Norsk skatt på A, B og C: {kr(norsk_grunnlag)} × 22 % = {kr(norsk)}.",
         f"Kreditt: A {kr(kred['A'])} (full), B {kr(kred['B'])} (begrenset av 22 000), C 0.",
         f"Betalbar: {kr(norsk)} − {kr(kred['A'])} − {kr(kred['B'])} = <b>{kr(betal)}</b>."],
        [(f"Kr {kr(b_unntak)}", "tar med D og gir kreditt. Unntaksmetoden holder D utenfor norsk grunnlag."),
         (f"Kr {kr(b_refusjon)}", "gir kreditt for hele skatten i B. Kreditten er begrenset til norsk skatt, 22 000."),
         (f"Kr {kr(b_kredC)}", "gir kreditt for C. Uten skatteavtale gir Norge ingen lempning.")],
        kilde="F6 lb 32–35, H2021 o4"),
    dekker=["f6-dobbeltbeskatning-01", "f6-dobbeltbeskatning-02", "f6-dobbeltbeskatning-07"])

RC, TC = land["C"][0], land["C"][1]
RD, TD = land["D"][0], land["D"][1]
C_rett, D_rett = RC * TC + RC * tN, RD * TD             # 47 000 og 10 000
C_kred = max(RC * TC, RC * tN)                          # 25 000
D_kred = max(RD * TD, RD * tN)                          # 22 000
D_dobb = RD * TD + RD * tN                              # 32 000


def cd(c, d):
    return o(f"C kr {kr(c)} og D kr {kr(d)}", kr(c), kr(d))


b5 = S.ledd("b", "<p>Hvor mye skatt betaler hun i alt, ute og hjemme, på inntekten fra C og på inntekten fra D?</p>",
    riktig=cd(C_rett, D_rett), gale=[cd(C_kred, D_rett), cd(C_rett, D_kred), cd(C_rett, D_dobb)],
    solution=sol(
        "Uten avtale skattlegger begge land fullt: full dobbeltbeskatning. Med unntaksmetoden skattlegger bare kildestaten.",
        [f"C: {kr(RC * TC)} + {kr(RC * tN)} = <b>{kr(C_rett)}</b>.",
         f"D: bare {kr(RD * TD)} i D = <b>{kr(D_rett)}</b>."],
        [(f"C kr {kr(C_kred)}", "gir kreditt for C. Uten avtale er det ingen lempning."),
         (f"D kr {kr(D_kred)}", "behandler D som kreditmetoden og fyller opp til norsk nivå."),
         (f"D kr {kr(D_dobb)}", "ser bort fra avtalen. Unntaksmetoden holder inntekten utenfor norsk grunnlag.")],
        kilde="F6 lb 31, H2020 o2 og H2024 o10 (fasit)"),
    dekker=["f6-dobbeltbeskatning-03", "f6-dobbeltbeskatning-04"])

c5 = S.ledd("c", "<p>Hvilken påstand om kreditmetoden er riktig?</p>",
    riktig="Er norsk sats høyest, betaler hun 22 % uansett land. Da investerer hun der avkastningen før skatt er høyest",
    gale=["Norge begrenser kreditten fordi skatteavtalene forbyr kreditt utover den norske skatten på inntekten",
          "Kreditten gis automatisk når inntekten er innrapportert, uten at hun selv må dokumentere skatten hun har betalt i utlandet",
          "Full kreditering betyr at Norge refunderer all skatt betalt ute, også den delen som overstiger 22 %"],
    solution=begrep(
        "Med t &gt; T er B = R − RT − R(t − T) = R(1 − t): samme skatt hjemme og ute. Kreditten er begrenset til norsk skatt fordi Norge ikke vil betale ut penger (svindel) og fordi andre land ellers kunne velte skatt over på Norge. Kreditt krever dokumentasjon sendt med skattemeldingen.",
        "Full kreditering gir samme skatt hjemme og ute.",
        [("Skatteavtalene forbyr", "lysbildet begrunner begrensningen med svindelrisiko og overvelting, ikke avtalen."),
         ("Automatisk", "skattyter må dokumentere betalt utenlandsk skatt."),
         ("Refunderer alt", "fradraget er aldri større enn den norske skatten på inntekten.")],
        kilde="F6 lb 33–35"),
    dekker=["f6-dobbeltbeskatning-05", "f6-dobbeltbeskatning-06", "f6-dobbeltbeskatning-08"])
S.oppgave("Ingrid har inntekt i fire land", "Internasjonal skatt", [13], body5, [a5, b5, c5])

# ================= Oppgave 6: grunnrente =================
tot, rf, rp = 0.135, 0.03, 0.045
gr = tot - rf - rp                     # 6,0 %
gr_rf = tot - rf                       # 10,5 %
alt = rf + rp                          # 7,5 %
a6 = S.ledd("a", f"<p>Et oppdrettsselskap med konsesjoner har en totalavkastning på {pst(tot, 1)}. Risikofri rente er {pst(rf, 1)} og risikopremien for "
                f"den risikoen som ikke kan diversifiseres bort, er {pst(rp, 1)}. Hvilken påstand er riktig?</p>",
    riktig=o(f"Grunnrenten er {pst(gr, 1)}. Den kan skyldes at konsesjonene begrenser konkurransen", pst(gr, 1)),
    gale=[o(f"Grunnrenten er {pst(gr_rf, 1)}. Den kan skyldes at konsesjonene begrenser konkurransen", pst(gr_rf, 1)),
          o(f"Grunnrenten er {pst(gr, 1)}. Den er kompensasjonen investor krever for å bære risiko", pst(gr, 1)),
          o(f"Grunnrenten er {pst(alt, 1)}. Grunnrente kan bare oppstå ved stedbundne naturressurser", pst(alt, 1))],
    solution=sol(
        "Totalavkastning = risikofri rente + risikopremie + grunnrente. De to første er investors alternativavkastning. Grunnrente kan komme fra naturressurser, myndighetsbestemte reguleringer som konsesjoner, markedsmakt eller teknologi.",
        [f"Alternativavkastning: {pst(rf, 1)} + {pst(rp, 1)} = {pst(alt, 1)}.",
         f"Grunnrente: {pst(tot, 1)} − {pst(alt, 1)} = <b>{pst(gr, 1)}</b>."],
        [(pst(gr_rf, 1), "trekker bare fra risikofri rente. Risikopremien er en del av alternativavkastningen."),
         ("Kompensasjon for risiko", "det er risikopremien. Grunnrenten er det som ligger over alternativavkastningen."),
         (pst(alt, 1), "er alternativavkastningen. Konsesjoner, markedsmakt og teknologi gir også grunnrente.")],
        kilde="F6 lb 38–39"),
    dekker=["f6-grunnrente-01", "f6-grunnrente-02", "f6-grunnrente-03"])

b6 = S.ledd("b", "<p>Hvilken påstand om kontantstrømsskatt er riktig?</p>",
    riktig="Staten tar like stor andel av utlegget og av inntektene, så nåverdien etter skatt er proporsjonal med den før skatt",
    gale=["Kontantstrømsskatten gir fullt fradrag for renteutgifter, men investeringen må avskrives gradvis over levetiden",
          "S-skatten vrir finansieringen mot lån, siden låneopptaket regnes med som inntekt i grunnlaget",
          "Med lik sats gir kontantstrømsskatten lavere samlet skatt i nåverdi enn en vanlig overskuddsskatt på samme prosjekt"],
    solution=begrep(
        "V = (1 − t)[−K + (F(K) + (1 − δ)K)/(1 + r)]. t forkortes bort og F′(K) = r + δ. Renter holdes utenfor (R-skatt) og investeringen utgiftsføres straks. S-skatten tar med lån, men lånebeløpene summerer seg til null i nåverdi.",
        "Nåverdien etter skatt er proporsjonal med nåverdien før skatt.",
        [("Rentefradrag og avskrivning", "snudd. Renter holdes utenfor og investeringen trekkes fra med en gang."),
         ("S-skatten vrir mot lån", "lån inn, renter og avdrag har null nåverdi. S-skatten er nøytral også for finansieringen."),
         ("Lavere nåverdi", "med lik sats er nåverdien av skatten den samme. Bare tidsprofilen er ulik: negativ skatt i investeringsåret.")],
        kilde="F6 lb 40–41, AS1 s. 331–332"),
    dekker=["f6-grunnrente-04", "f6-grunnrente-05", "f6-grunnrente-06", "f6-grunnrente-07"])
S.oppgave("Grunnrente i havbruk", "Grunnrenteskatt", [9], "<p>Laksenæringen har fått grunnrenteskatt. Spørsmålene gjelder grunnrente og nøytrale skatter på den.</p>", [a6, b6])

# ================= Oppgave 7: politiske systemer =================
eu_u, us_u, eu_o, us_o = 47.5, 31.3, 27.0, 10.8
f_o, f_u = eu_o / us_o, eu_u / us_u          # 2,5 og 1,5
body7 = (f"<p>Offentlige utgifter er {kr(eu_u, 1)} % av BNP i EU og {kr(us_u, 1)} % i USA. "
         f"Overføringer er {kr(eu_o, 0)} % av BNP i EU og {kr(us_o, 1)} % i USA.</p>")
a7 = S.ledd("a", "<p>Hvilken påstand er riktig?</p>",
    riktig=o(f"Europeerne omfordeler om lag {kr(f_o, 1)} ganger så mye som amerikanerne, mens utgiftene er om lag {kr(f_u, 1)} ganger så store", kr(f_o, 1), kr(f_u, 1)),
    gale=[o(f"Utgiftene er om lag {kr(f_o, 1)} ganger så store i EU som i USA, mens overføringene er om lag {kr(f_u, 1)} ganger så store", kr(f_o, 1), kr(f_u, 1)),
          "Forskning viser at overføringer godtas lettest i heterogene samfunn med store forskjeller mellom gruppene i befolkningen",
          "Forskning viser at amerikanere oftere enn europeere mener at fattigdom skyldes sosial tilhørighet"],
    solution=begrep(
        f"27/10,8 = {kr(f_o, 1)} for overføringene og 47,5/31,3 = {kr(f_u, 2)} for utgiftene. Overføringer godtas lettere i homogene samfunn. Amerikanere mener oftere at rikdom er belønning for hardt arbeid og at fattigdom skyldes mangel på initiativ.",
        "Overføringene er 2,5 ganger så store.",
        [("Utgiftene 2,5 ganger", "bytter om tallene. Det er overføringene som er 2,5 ganger."),
         ("Heterogene samfunn", "snudd. Omfordeling godtas lettest i homogene samfunn."),
         ("Amerikanere og sosial tilhørighet", "snudd. Det er europeerne som knytter fattigdom til sosial tilhørighet.")],
        kilde="F6 lb 44–46"),
    dekker=["f6-politikk-01", "f6-politikk-05", "f6-politikk-06"])

b7 = S.ledd("b", "<p>Hva forklarer forskjellen ifølge forelesningen?</p>",
    riktig="I USA setter én komité satsene før en annen fordeler pengene. Frykt for forfordeling holder skattene lave",
    gale=["Persson, Roland og Tabellini sammenligner bare EU og USA og finner at kulturen forklarer det meste av forskjellen",
          "Flertallsregjeringer gir størst utgiftsvekst, fordi de ikke trenger å hestehandle med støttepartier",
          "Forskjellen skyldes først og fremst at amerikanere mener rikdom er en belønning for hardt arbeid"],
    solution=begrep(
        "Budsjettprosessen er forskjellen. I USA er makten delt mellom to komiteer med senatorer fra ulike delstater. Inntektskomiteen holder satsene lave så utgiftskomiteen ikke kan forfordele egne regioner. Under parlamentarisme vedtar samme flertall begge sider. Hestehandel gir større utgifter.",
        "Totrinns budsjettprosess med maktdeling.",
        [("Bare EU og USA", "studien omfatter 54 demokratier: 37 % av BNP med parlamentarisme mot 19,8 % med president/kongress."),
         ("Flertallsregjeringer", "snudd. Mindretallsregjeringer og brede koalisjoner gir størst utgiftsvekst."),
         ("Kultur", "stereotypiene finnes, men forelesningen legger hovedvekten på det politiske systemet.")],
        kilde="F6 lb 47–52"),
    dekker=["f6-politikk-02", "f6-politikk-03", "f6-politikk-04"])
S.oppgave("EU og USA", "Politisk økonomi", [10], body7, [a7, b7])

# ================= Oppgave 8: progressiv skatt (Sandmo, AS4) =================
bf, sats = 150_000, 0.25
Y1, Y2 = 300_000, 900_000
g1, g2 = sats * (Y1 - bf) / Y1, sats * (Y2 - bf) / Y2       # 12,5 % og 20,83 %
assert g2 > g1


def pr(a, b, tekst):
    return o(f"{pst(a)} og {pst(b)}. {tekst}", pst(a), pst(b))


a8 = S.ledd("a", f"<p>En inntektsskatt har bunnfradrag kr {kr(bf)} og sats {pst(sats, 0)} over fradraget. Hva er gjennomsnittsskatten ved inntekt kr {kr(Y1)} og kr {kr(Y2)}? Hvilken påstand er riktig?</p>",
    riktig=pr(g1, g2, "Progressiv etter gjennomsnittsdefinisjonen, men ikke etter marginaldefinisjonen"),
    gale=[pr(g1, g2, "Proporsjonal, siden alle over bunnfradraget har samme marginalskatt"),
          pr(sats, sats, "Proporsjonal, men evneprinsippet er oppfylt fordi den rike betaler flere kroner"),
          pr(g1, g2, "Progressiv, slik lik absolutt byrde med avtakende grensenytte alltid krever")],
    solution=sol(
        "Vanligst: progressiv når gjennomsnittsskatten stiger med inntekten. Konkurrerende definisjon: når marginalskatten stiger.",
        [f"{kr(Y1)}: 25 % × {kr(Y1 - bf)}/{kr(Y1)} = <b>{pst(g1)}</b>.",
         f"{kr(Y2)}: 25 % × {kr(Y2 - bf)}/{kr(Y2)} = <b>{pst(g2)}</b>. Gjennomsnittet stiger, marginalskatten er 25 %."],
        [("Proporsjonal", "konstant marginalskatt gjør ikke skatten proporsjonal når gjennomsnittsskatten stiger."),
         ("25 % og evneprinsippet", "glemt bunnfradraget. Evneprinsippet alene gir ikke progresjon: en proporsjonal skatt gir også at den rike betaler flere kroner."),
         ("Lik absolutt byrde", "gir marginalskatt mellom 0 og 1, men ikke nødvendigvis progresjon. Med U = ln Y blir skatten proporsjonal.")],
        kilde="AS4 s. 51–53"),
    dekker=["f6-progressiv-sandmo-01", "f6-progressiv-sandmo-02", "f6-progressiv-sandmo-09"])

b8 = S.ledd("b", "<p>Hvilken påstand om idéhistorien i Sandmo (2016) er riktig?</p>",
    riktig="Edgeworth viste at lik nytte og gitt samlet inntekt gir full utjevning, men advarte selv mot virkningen på insentivene",
    gale=["Mill begrunnet sterk progresjon i inntektsskatten med at grensenytten av inntekt faller, slik utilitarismen hans tilsa",
          "Pigou viste at progressiv skatt er best også rent effektivitetsmessig når arbeidstilbudet er variabelt",
          "Adam Smith skilte skarpt mellom evneprinsippet og nytteprinsippet og valgte selv nytteprinsippet"],
    solution=begrep(
        "Edgeworth: med lik og konkav nytte maksimeres summen av nytte ved full utjevning, 100 % marginalskatt over gjennomsnittet. Han så selv at det ødelegger insentivene.",
        "Edgeworth og full utjevning med forbehold.",
        [("Mill", "tolket likt offer som proporsjonal skatt med en skattefri minsteinntekt. Han fant argumentet for progresjon for usikkert."),
         ("Pigou", "snudd. Med identiske individer og variabelt arbeid er regressiv skatt best rent effektivitetsmessig. Fordeling og effektivitet trekker hver sin vei."),
         ("Adam Smith", "hos ham pekte begge prinsippene mot inntekt: bidrag etter evne, målt ved inntekten man nyter under statens beskyttelse.")],
        kilde="AS4 s. 50–54"),
    dekker=["f6-progressiv-sandmo-04", "f6-progressiv-sandmo-05", "f6-progressiv-sandmo-06", "f6-progressiv-sandmo-07"])

c8 = S.ledd("c", "<p>Hvilken påstand er riktig ifølge Sandmo (2016)?</p>",
    riktig="Mirrlees fant at optimal marginalskatt ligger mellom 0 og 1 og er lavest for de aller høyeste inntektene",
    gale=["Wicksells nytteprinsipp gir rettferdig skatt uansett hvordan inntekten er fordelt fra før",
          "Piketty foreslår 65 % på inntekter over £200 000, mens Atkinson vil ha om lag 80 % for den øverste prosenten",
          "Formelle modeller som Mirrlees' er nok til å gi politikerne råd om hvor progressiv skatten skal være"],
    solution=begrep(
        "Mirrlees: gjennomsnittsskatten er negativ for de laveste og stigende, marginalskatten svakt stigende og så fallende. Optimum ligner en lineær skatt med rundsumoverføring.",
        "Mirrlees og fallende marginalskatt på toppen.",
        [("Wicksell", "«rettferdighet i beskatningen forutsetter rettferdighet i den eksisterende fordeling». Nytteprinsippet har også et gratispassasjerproblem."),
         ("Piketty og Atkinson", "byttet. Piketty foreslår om lag 80 %, Atkinson 65 % over £200 000."),
         ("Modellene er nok", "Sandmo mener råd krever etiske normer og spørsmålet om hvorfor folk har høy inntekt. Inntekt fra arbeid og talent har større legitimitet enn fra privilegier.")],
        kilde="AS4 s. 49, 54–58"),
    dekker=["f6-progressiv-sandmo-03", "f6-progressiv-sandmo-08", "f6-progressiv-sandmo-11", "f6-progressiv-sandmo-12"])
S.oppgave("Progressiv beskatning", "Progressivitet", [10], "<p>Spørsmålene bygger på Sandmo (2016), Progressiv beskatning.</p>", [a8, b8, c8])

S.skriv(
    label="F6 Effektivitet, skattearbitrasje og demokrati",
    note="Skattearbitrasje, kapitalkostnaden med person- og bedriftsskatt, gjeld mot egenkapital, effektivitetstap, kreditmetoden, grunnrente, politiske systemer og Sandmos progressive skatt.",
    facts=[f"{S.n} flervalg med fire alternativer. 3 poeng for rett, −1 for feil og 0 for blankt.",
           "Satser og regler står i oppgaveteksten, slik de blir oppgitt på eksamen.",
           "Sammen med de andre settene i fanen dekker settet hvert punkt i sjekklisten.",
           "Laget fra forelesningsnotatene 2026. Kurset har ikke kontrollert løsningene."],
    practiceNote="Sjekk formlene med spesialtilfeller: α = 1 og α = 0, A = 1 og A = 0, t<sub>a</sub> = 0. Kreditten er alltid den laveste av utenlandsk og norsk skatt. Uten avtale er den null.")
