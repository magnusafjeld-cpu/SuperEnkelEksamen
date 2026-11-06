"""Regneskript for settet fl-f5: F5 Inntektsskiftningsligningen og de rikeste (forelesning 5, 2026).
Kjør fra prosjektroten: python3 -I fag/fie432/_forelesning/fl-f5_regn.py
"""
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from felles import *

S = Sett("fl-f5")


def o(tekst, *tall):
    return (tekst, list(tall))


def y2(x):
    return kr(x, 2)


# ================= Oppgave 1: inntektsskiftningsligningen 2026 =================
alm, trinn, trygd, trygd_n, aga_u, ts, te = 22.0, 17.8, 7.6, 10.8, 14.1, 22.0, 22.0
aga = 100 * aga_u / (100 + aga_u)                     # 12,36 ≈ 12,4 % av samlet lønnskostnad
aga_r = 12.4                                          # forelesningen runder til 12,4
assert abs(aga - aga_r) < 0.05
lonn = alm + trinn + trygd                            # 47,4
assert lik(lonn, 47.4)
y = (lonn + aga_r - ts) / te                          # 1,72
y_141 = (lonn + aga_u - ts) / te                      # 1,80
y_uten = (lonn - ts) / te                             # 1,15
y_naer = (alm + trinn + trygd_n + aga_r - ts) / te    # 1,86
assert lik(ts + te * y, lonn + aga_r)

body1 = (f"<p>Satsene for 2026: alminnelig inntekt {kr(alm, 0)} %, trinnskatt i høyeste trinn {kr(trinn, 1)} %, trygdeavgift på lønn {kr(trygd, 1)} % "
         f"(på næringsinntekt {kr(trygd_n, 1)} %) og arbeidsgiveravgift {kr(aga_u, 1)} % av utbetalt lønn. Selskapsskatten er {kr(ts, 0)} % og den nominelle "
         f"utbytteskatten {kr(te, 0)} %. Arbeidstakeren bærer hele arbeidsgiveravgiften. Satsene skal gjøre det like lønnsomt for en eier å ta ut "
         f"en krone som lønn og som utbytte.</p>")

def es2(v):
    return pst(te * float(rund(v, 2)) / 100)


a1 = S.ledd("a", "<p>Hva blir oppjusteringsfaktoren y og eierskatten på utbytte? Avrund y til to desimaler før du regner eierskatten.</p>",
    riktig=o(f"y ≈ {y2(y)} og eierskatt {es2(y)}", y2(y), es2(y)),
    gale=[o(f"y ≈ {y2(y_141)} og eierskatt {es2(y_141)}", y2(y_141), es2(y_141)),
          o(f"y ≈ {y2(y_uten)} og eierskatt {es2(y_uten)}", y2(y_uten), es2(y_uten)),
          o(f"y ≈ {y2(y_naer)} og eierskatt {es2(y_naer)}", y2(y_naer), es2(y_naer))],
    solution=sol(
        "Høyeste marginalskatt på lønn + arbeidsgiveravgift = selskapsskatt + nominell eierskatt × y. Avgiften måles som andel av bedriftens samlede lønnskostnad: 14,1/114,1 = 12,4 %.",
        [f"Lønnssiden: {kr(alm, 0)} + {kr(trinn, 1)} + {kr(trygd, 1)} + {kr(aga_r, 1)} = {kr(lonn + aga_r, 1)} %.",
         f"y = ({kr(lonn + aga_r, 1)} − {kr(ts, 0)})/{kr(te, 0)} = <b>{y2(y)}</b>.",
         f"Eierskatt: {kr(te, 0)} % × {y2(y)} = <b>{es2(y)}</b>."],
        [(f"y ≈ {y2(y_141)}", "bruker 14,1 % av utbetalt lønn. Av 100 kr i lønnskostnad går 12,4 kr til avgift."),
         (f"y ≈ {y2(y_uten)}", "glemt arbeidsgiveravgiften på lønnssiden."),
         (f"y ≈ {y2(y_naer)}", "bruker trygdeavgiften på næringsinntekt. Ligningen gjelder lønn med 7,6 %.")],
        kontroll=f"{kr(ts, 0)} + {kr(te, 0)} × {y2(y)} = {kr(ts + te * y, 1)} = {kr(lonn, 1)} + {kr(aga_r, 1)}.",
        kilde="F5 lb 3–5 og lb 9–10"),
    dekker=["f5-inntektsskifting-02", "f5-inntektsskifting-03", "f5-inntektsskifting-04", "f5-aga-03"])

trygd_ny = 9.2
y_t = (alm + trinn + trygd_ny + aga_r - ts) / te          # 1,79
y_t_uten = (alm + trinn + trygd_ny - ts) / te             # 1,23
y_t_utenTS = (alm + trinn + trygd_ny + aga_r) / te        # 2,79 selskapsskatten glemt på kapitalsiden
assert y_t > y
b1 = S.ledd("b", f"<p>Trygdeavgiften på lønn skal økes fra {kr(trygd, 1)} % til {kr(trygd_ny, 1)} % fra neste år. Ligningen skal fortsatt holde. Hvilken påstand er riktig?</p>",
    riktig=o(f"y ≈ {y2(y_t)}. Eierne bør ta ut utbytte før økningen trer i kraft", y2(y_t)),
    gale=[o(f"y ≈ {y2(y_t_uten)}. Eierne bør ta ut utbytte før økningen trer i kraft", y2(y_t_uten)),
          o(f"y ≈ {y2(y_t)}. Eierne bør vente med utbyttet til økningen har trådt i kraft", y2(y_t)),
          o(f"y ≈ {y2(y_t_utenTS)}. Eierne bør ta ut utbytte før økningen trer i kraft", y2(y_t_utenTS))],
    solution=sol(
        "Høyere skatt på lønn krever høyere eierskatt for å hindre inntektsskifting. Ventes eierskatten å stige, lønner det seg å fremskynde utbyttet.",
        [f"Lønnssiden: {kr(alm, 0)} + {kr(trinn, 1)} + {kr(trygd_ny, 1)} + {kr(aga_r, 1)} = {kr(alm + trinn + trygd_ny + aga_r, 1)} %.",
         f"y = ({kr(alm + trinn + trygd_ny + aga_r, 1)} − 22)/22 = <b>{y2(y_t)}</b>, eierskatt {pst(te * y_t / 100)}."],
        [(f"y ≈ {y2(y_t_uten)}", "glemt arbeidsgiveravgiften på lønnssiden."),
         ("Vente med utbyttet", "snudd. Eierskatten stiger fra 37,84 % til " + pst(te * y_t / 100) + ", så utbytte nå er billigere."),
         (f"y ≈ {y2(y_t_utenTS)}", "glemt selskapsskatten på kapitalsiden av ligningen.")],
        kontroll="Utbyttene økte i 2005 før utbytteskatten kom i 2006 og i 2014–2015 før økningen fra 27 % til 31,7 % (HBS s. 5).",
        kilde="F5 lb 4 og lb 6"),
    dekker=["f5-satsendringer-01", "f5-inntektsskifting-01"])

ts1, alm2, ts3 = 21.0, 21.0, 25.0
y_i = (lonn + aga_r - ts1) / te                           # 1,76
y_ii = (alm2 + trinn + trygd + aga_r - alm2) / te         # 1,72
y_iii = (lonn + aga_r - ts3) / te                         # 1,58
y_i_begge = (alm2 + trinn + trygd + aga_r - ts1) / te     # 1,72 endrer lønnssiden også
y_i_snudd = (lonn + aga_r - ts - (ts - ts1)) / te         # 1,67 høyere y når selskapsskatten øker
y_iii_snudd = (lonn + aga_r - ts + (ts3 - ts)) / te       # 1,85
y_ii_feil = (alm2 + trinn + trygd + aga_r - alm2) / alm2  # 1,80 bruker 21 % som eierskattesats
assert lik(y_ii, y) and y_iii < y < y_i


def tre(a, b, c):
    return o(f"(i) {y2(a)} (ii) {y2(b)} (iii) {y2(c)}", y2(a), y2(b), y2(c))


c1 = S.ledd("c", f"<p>Stortinget vurderer tre endringer: (i) selskapsskatten senkes til {kr(ts1, 0)} %, mens lønn fortsatt skattlegges med 22 % alminnelig inntekt. "
               f"(ii) Alminnelig sats senkes til {kr(alm2, 0)} % for både lønn og selskap. (iii) Selskapsskatten heves til {kr(ts3, 0)} %. Den nominelle "
               f"utbytteskatten er 22 % i alle tre tilfeller. Hva blir y?</p>",
    riktig=tre(y_i, y_ii, y_iii),
    gale=[tre(y_i_begge, y_ii, y_iii), tre(y_i_snudd, y_ii, y_iii_snudd), tre(y_i, y_ii_feil, y_iii)],
    solution=sol(
        "y = (lønnssiden − selskapsskatt)/nominell eierskatt. Høyere selskapsskatt senker y. En endring som står på begge sider, endrer ikke y.",
        [f"(i) (59,8 − {kr(ts1, 0)})/22 = <b>{y2(y_i)}</b>.",
         f"(ii) ({kr(alm2, 0)} + 17,8 + 7,6 + 12,4 − {kr(alm2, 0)})/22 = 37,8/22 = <b>{y2(y_ii)}</b>, uendret.",
         f"(iii) (59,8 − {kr(ts3, 0)})/22 = <b>{y2(y_iii)}</b>: eierskatten faller for å kompensere."],
        [(f"(i) {y2(y_i_begge)}", "senker også lønnssiden i (i). Der beholdes 22 % på lønn."),
         (f"(i) {y2(y_i_snudd)} og (iii) {y2(y_iii_snudd)}", "snudd fortegn: høyere selskapsskatt krever lavere, ikke høyere, eierskatt."),
         (f"(ii) {y2(y_ii_feil)}", "deler på 21 % som om den nominelle eierskatten også falt. Oppgaven sier 22 %.")],
        kontroll="Det er produktet y × 22 % som balanserer ligningen: (i) 38,8 %, (ii) 37,8 %, (iii) 34,8 %.",
        kilde="F5 lb 7–8"),
    dekker=["f5-satsendringer-02", "f5-satsendringer-03", "f5-satsendringer-04", "f5-satsendringer-06"])
S.oppgave("Satsene i 2026", "Aksjonærmodellen", [1, 5], body1, [a1, b1, c1])

# ================= Oppgave 2: effektiv form fra eldre eksamener =================
tw, tA, te2 = 0.46, 0.22, 0.25
y_eff = (tw - tA) / ((1 - tA) * te2)          # 1,23
y_nom = (tw - tA) / te2                       # 0,96
y_aga = (tw + 0.124 - tA) / ((1 - tA) * te2)  # 1,87
y_utenA = tw / ((1 - tA) * te2)               # 2,36
assert lik(tA + (1 - tA) * te2 * y_eff, tw)
S.oppgave("En eldre eksamensoppgave", "Aksjonærmodellen", [1, 5],
    f"<p>En eldre eksamensoppgave sier: marginalskatten på arbeid skal være lik den effektive skatten på bedrift og eier når hele overskuddet tas ut som utbytte. "
    f"Marginalskatten på arbeid er {pst(tw, 0)}, selskapsskatten {pst(tA, 0)} og den nominelle utbytteskatten {pst(te2, 0)}. "
    f"Arbeidsgiveravgiften skal ikke tas med. Hva blir y og eierskatten? Avrund y til to desimaler.</p>",
    [S.ledd("", "",
        riktig=o(f"y ≈ {y2(y_eff)} og eierskatt {pst(te2 * y_eff, 1)}", y2(y_eff), pst(te2 * y_eff, 1)),
        gale=[o(f"y ≈ {y2(y_nom)} og eierskatt {pst(te2 * y_nom, 1)}", y2(y_nom), pst(te2 * y_nom, 1)),
              o(f"y ≈ {y2(y_aga)} og eierskatt {pst(te2 * y_aga, 1)}", y2(y_aga), pst(te2 * y_aga, 1)),
              o(f"y ≈ {y2(y_utenA)} og eierskatt {pst(te2 * y_utenA, 1)}", y2(y_utenA), pst(te2 * y_utenA, 1))],
        solution=sol(
            "Effektiv form: t<sub>w</sub> = t<sub>A</sub> + (1 − t<sub>A</sub>) × t<sub>e</sub> × y. Eierskatten treffer bare de 78 % som er igjen etter selskapsskatt.",
            [f"0,46 = 0,22 + 0,78 × 0,25 × y.",
             f"y = 0,24/0,195 = <b>{y2(y_eff)}</b>, eierskatt 25 % × {y2(y_eff)} = <b>{pst(te2 * y_eff, 1)}</b>."],
            [(f"y ≈ {y2(y_nom)}", "nominell form fra F5 (0,24/0,25). Teksten ber om den effektive skatten når alt tas ut."),
             (f"y ≈ {y2(y_aga)}", "blander formene og legger 12,4 % arbeidsgiveravgift til lønnssiden."),
             (f"y ≈ {y2(y_utenA)}", "glemt å trekke fra selskapsskatten.")],
            kontroll=f"0,22 + 0,78 × {pst(te2 * y_eff, 1)} = {pst(tA + (1 - tA) * te2 * y_eff, 1)}.",
            kilde="F5 lb 4–5, H2020 o1e"),
        dekker=["f5-inntektsskifting-06"])])

# ================= Oppgave 3: hele kjeden med y = effektiv/nominell =================
ov, ts_k, te_nom, te_eff = 400_000, 0.22, 0.22, 0.396
yk = te_eff / te_nom                       # 1,8
utb = ov * (1 - ts_k)                      # 312 000
opp = utb * yk                             # 561 600
es = opp * te_nom                          # 123 552
sam = (ov * ts_k + es) / ov                # 52,89 %
sam_nom = ts_k + te_eff                    # 61,6 %
sam_uopp = (ov * ts_k + utb * te_nom) / ov  # 39,16 %
sam_dob = (ov * ts_k + opp * te_eff) / ov   # 77,60 %
assert lik(sam, ts_k + (1 - ts_k) * te_eff)
S.oppgave("Holmen AS deler ut alt", "Aksjonærmodellen", [1, 5],
    f"<p>Holmen AS har et overskudd før skatt på kr {kr(ov)}. Selskapsskatten er {pst(ts_k, 0)}. Den nominelle eierskatten er {pst(te_nom, 0)} og "
    f"den effektive eierskatten er {pst(te_eff, 1)}. Hele overskuddet etter skatt deles ut til eieren. Se bort fra skjerming. "
    f"Hvor stor er samlet skatt i prosent av overskuddet før skatt?</p>",
    [S.ledd("", "",
        riktig=o(pst(sam), pst(sam)),
        gale=[o(pst(sam_nom), pst(sam_nom)), o(pst(sam_uopp), pst(sam_uopp)), o(pst(sam_dob), pst(sam_dob))],
        solution=sol(
            "y = effektiv/nominell eierskatt. Utbyttet oppjusteres med y og skattlegges med den nominelle satsen.",
            [f"y = 39,6/22 = {kr(yk, 1)}. Utbytte: {kr(ov)} × 0,78 = {kr(utb)}.",
             f"Oppjustert: {kr(utb)} × {kr(yk, 1)} = {kr(opp)}. Eierskatt: × 22 % = {kr(es)}.",
             f"Samlet: ({kr(ov * ts_k)} + {kr(es)})/{kr(ov)} = <b>{pst(sam)}</b>."],
            [(pst(sam_nom), "legger 22 % og 39,6 % rett sammen. Eierskatten treffer bare de 78 % som er igjen."),
             (pst(sam_uopp), "glemt oppjusteringen: skatter utbyttet med 22 %."),
             (pst(sam_dob), "dobbel oppjustering: ganger det oppjusterte utbyttet med den effektive satsen.")],
            kontroll=f"22 % + 78 % × 39,6 % = {pst(sam)}.",
            kilde="F4 lb 64, H2023 o2"),
        dekker=["f5-inntektsskifting-07"])])

# ================= Oppgave 4: arbeidsgiveravgiften =================
a4 = S.ledd("a", "<p>Hvilken påstand om arbeidsgiveravgiften i inntektsskiftningsligningen er riktig?</p>",
    riktig="Ligningen forutsetter at arbeidstakeren bærer hele avgiften gjennom lavere lønn, selv om bedriften betaler den inn",
    gale=["Ligningen forutsetter at bedriften bærer avgiften, siden det er bedriften som formelt betaler den inn til staten",
          "Norske studier finner full overvelting på kontraktslønnen og Gavrilova mfl. (2023) bekrefter det for grunnlønnen",
          "Bærer bedriften en del av avgiften, må eierskatten settes høyere enn 37,84 % for å hindre inntektsskifting"],
    solution=begrep(
        "Ligningen fører hele avgiften på lønnssiden. Det forutsetter full overvelting: lønnen presses ned med hele avgiften. Empirien finner mindre. Dale-Olsen, Ku mfl. og Stokke finner 15–30 % i Norge. Gavrilova mfl. finner 20–50 % på kontraktslønnen (upresist) og nær full overvelting bare på full lønn med bonus og overtid.",
        "Arbeidstakeren bærer avgiften gjennom lavere lønn.",
        [("Bedriften bærer den", "blander hvem som betaler inn og hvem som bærer."),
         ("Full overvelting på kontraktslønnen", "norske studier finner 15–30 %. Gavrilova finner full overvelting bare på full lønn."),
         ("Høyere eierskatt", "snudd. Den delen bedriften bærer, flyttes til kapitalsiden, så y og eierskatten faller.")],
        kilde="F5 lb 9–12, F4 lb 55"),
    dekker=["f5-aga-01", "f5-aga-07", "f5-aga-08", "f5-aga-09"])


def y_del(aL_andel, total=aga_r):
    aL = aL_andel * total
    return (lonn + aL - ts - (total - aL)) / te


andeler = [0.0, 0.2, 0.5]
rett = [y_del(a) for a in andeler]                                         # 0,59 0,82 1,15
dropp = [(lonn + a * aga_r - ts) / te for a in andeler]                    # 1,15 1,27 1,44
bytt = [y_del(1 - a) for a in andeler]                                     # 1,72 1,49 1,15
m141 = [y_del(a, aga_u) for a in andeler]                                  # 0,51 0,77 1,15
assert lik(rett[2], y_uten) and rett[0] < 1


def trio(v):
    return o(f"{y2(v[0])}; {y2(v[1])}; {y2(v[2])}", *[y2(x) for x in v])


b4 = S.ledd("b", "<p>Anta at arbeidstakeren bærer 0 %, 20 % og 50 % av avgiften. Bruk 12,4 % som samlet avgift og satsene over. Hva blir y i de tre tilfellene?</p>",
    riktig=trio(rett), gale=[trio(dropp), trio(bytt), trio(m141)],
    solution=sol(
        "Delen arbeidstakeren bærer (a<sub>L</sub>), står på lønnssiden. Delen bedriften bærer (a<sub>F</sub>), står på kapitalsiden sammen med selskapsskatten: 47,4 + a<sub>L</sub> = 22 + a<sub>F</sub> + 22y.",
        [f"0 %: (47,4 − 22 − 12,4)/22 = <b>{y2(rett[0])}</b>.",
         f"20 %: (47,4 + 2,48 − 22 − 9,92)/22 = <b>{y2(rett[1])}</b>.",
         f"50 %: (47,4 + 6,2 − 22 − 6,2)/22 = <b>{y2(rett[2])}</b>. 6,2 står på begge sider."],
        [(trio(dropp)[0], "dropper bedriftens del i stedet for å føre den på kapitalsiden."),
         (trio(bytt)[0], "bytter andelene: leser 20 % som bedriftens del."),
         (trio(m141)[0], "deler 14,1 % i stedet for 12,4 %.")],
        kontroll="F5 lb 10 gir 1,15 ved 50/50 og 0,6 når bedriften bærer alt. F4 lb 53 skriver 0,8 ved 50/50, som er en regnefeil.",
        kilde="F5 lb 10–12"),
    dekker=["f5-aga-02", "f5-aga-04", "f5-aga-05", "f5-aga-06"])
S.oppgave("Hvem bærer arbeidsgiveravgiften?", "Aksjonærmodellen", [1, 5],
    "<p>Bruk satsene fra 2026: høyeste marginalskatt på lønn 47,4 %, arbeidsgiveravgift 12,4 % av samlet lønnskostnad, selskapsskatt 22 % og nominell utbytteskatt 22 %.</p>",
    [a4, b4])

# ================= Oppgave 5: AERT for bedriften =================
inn5, mask, saldo, t5 = 500_000, 200_000, 0.20, 0.22
sk_full = (inn5 - mask) * t5                 # 66 000
sk_saldo = (inn5 - saldo * mask) * t5        # 101 200
a_full, a_saldo = sk_full / inn5, sk_saldo / inn5
f_netto = (sk_full / (inn5 - mask), sk_saldo / (inn5 - mask))   # 22 % og 33,73 %
a5 = S.ledd("a", f"<p>Hva er den effektive gjennomsnittlige skattesatsen (AERT) i år 1 med full utgiftsføring og med saldoavskrivning på {pst(saldo, 0)}?</p>",
    riktig=o(f"{pst(a_full)} og {pst(a_saldo)}", pst(a_full), pst(a_saldo)),
    gale=[o(f"{pst(t5)} og {pst(t5)}", pst(t5), pst(t5)),
          o(f"{pst(a_saldo)} og {pst(a_full)}", pst(a_saldo), pst(a_full)),
          o(f"{pst(f_netto[0])} og {pst(f_netto[1])}", pst(f_netto[0]), pst(f_netto[1]))],
    solution=sol(
        "AERT = betalt skatt / brutto inntekt før skatt. Den er lavere enn 22 % når fradragene er større enn de virkelige kostnadene i året.",
        [f"Full utgiftsføring: ({kr(inn5)} − {kr(mask)}) × 22 % = {kr(sk_full)}. AERT = {kr(sk_full)}/{kr(inn5)} = <b>{pst(a_full)}</b>.",
         f"Saldo: fradrag {kr(saldo * mask)}, skatt ({kr(inn5)} − {kr(saldo * mask)}) × 22 % = {kr(sk_saldo)}. AERT = <b>{pst(a_saldo)}</b>."],
        [("22 % og 22 %", "deler på skattepliktig overskudd. Da får man alltid den nominelle satsen."),
         (f"{pst(a_saldo)} og {pst(a_full)}", "byttet om. Full utgiftsføring gir lavest skatt i år 1."),
         (f"{pst(f_netto[0])} og {pst(f_netto[1])}", "deler på inntekt minus hele maskinkostnaden i begge tilfeller.")],
        kilde="F5 lb 16–17"),
    dekker=["f5-aert-02", "f5-aert-03"])

c_marg, t6, beta = 200, 0.22, 0.75
p_rett = c_marg * (1 - t6 * beta) / (1 - t6)    # 214,10
p_snudd = c_marg * (1 - t6) / (1 - t6 * beta)   # 186,83
p_ingen = c_marg / (1 - t6)                     # 256,41
b5 = S.ledd("b", f"<p>Skattepliktig overskudd er π<sub>t</sub> = px − βc(x) og virkelig overskudd π<sub>v</sub> = px − c(x). Bedriften maksimerer π<sub>v</sub> − tπ<sub>t</sub>. "
               f"Anta t = {pst(t6, 0)}, β = {kr(beta, 2)} og grensekostnad c′(x) = kr {kr(c_marg)}. Hvilken påstand er riktig?</p>",
    riktig=o(f"Prisen må være minst kr {kr(p_rett, 2)}. Skatten er nøytral bare når β = 1", kr(p_rett, 2), "1"),
    gale=[o(f"Prisen må være minst kr {kr(p_snudd, 2)}. Skatten er nøytral bare når β = 1", kr(p_snudd, 2), "1"),
          o(f"Prisen må være minst kr {kr(p_ingen, 2)}. Skatten blir nøytral når satsen t senkes nok", kr(p_ingen, 2)),
          o(f"Prisen må være minst kr {kr(c_marg, 2)}. Skatten treffer bare ren profitt med denne satsen", kr(c_marg, 2))],
    solution=sol(
        "Førsteordensbetingelsen p(1 − t) = c′(x)(1 − tβ) gir p = c′(x)(1 − tβ)/(1 − t). β er nåverdien av fradraget som andel av kostnaden. Kilen er 1 bare når β = 1.",
        [f"(1 − 0,22 × 0,75)/(1 − 0,22) = 0,835/0,78 = {kr((1 - t6 * beta) / (1 - t6), 4)}.",
         f"p = {kr(c_marg)} × {kr((1 - t6 * beta) / (1 - t6), 4)} = <b>kr {kr(p_rett, 2)}</b>."],
        [(f"Kr {kr(p_snudd, 2)}", "kilen snudd. Med β &lt; 1 er kilen over 1 og prisen over grensekostnaden."),
         (f"Kr {kr(p_ingen, 2)} og lav sats", "behandler kostnaden som ikke fradragsberettiget (β = 0). Satsen alene gjør ikke skatten nøytral. Det er kombinasjonen av t og β."),
         (f"Kr {kr(c_marg, 2)}", "gjelder bare ved β = 1. Avskrivning over tid er en ekstra skatt på bedriften.")],
        kontroll="Avskrivningsregler er investeringspolitikk: lavere β gir høyere skatt uten at satsen 22 % endres.",
        kilde="F5 lb 18–21"),
    dekker=["f5-aert-04", "f5-aert-08"])
S.oppgave("Fjordprint AS kjøper en maskin", "Effektiv skattesats", [1, 9],
    f"<p>Fjordprint AS har en inntekt på kr {kr(inn5)} i år 1 og kjøper en maskin til kr {kr(mask)}. Selskapsskatten er {pst(t5, 0)}. Se bort fra andre kostnader.</p>",
    [a5, b5])

# ================= Oppgave 6: eier mot lønnstaker =================
alfa, pinn, pskatt, sinn = 0.6, 400_000, 100_000, 3_000_000
sskatt = 0.22 * sinn                                            # 660 000
aert = (pskatt + alfa * sskatt) / (pinn + alfa * sinn)          # 22,55 %
aert_p = pskatt / pinn                                          # 25 %
aert_ut = (pskatt + alfa * sskatt) / (alfa * sinn)              # 27,56 %
aert_teller = (pskatt + alfa * sskatt) / (pinn + sinn)          # 14,59 %
a6 = S.ledd("a", "<p>Hva er Lises effektive gjennomsnittlige skattesats (AERT) som eier?</p>",
    riktig=o(pst(aert), pst(aert)),
    gale=[o(pst(aert_p), pst(aert_p)), o(pst(aert_ut), pst(aert_ut)), o(pst(aert_teller), pst(aert_teller))],
    solution=sol(
        "For en eier legges eierandelen α av selskapets betalte skatt og brutto inntekt inn i både teller og nevner. Ellers måles skatten bare på en brøkdel av inntekten hennes.",
        [f"Teller: {kr(pskatt)} + 0,6 × {kr(sskatt)} = {kr(pskatt + alfa * sskatt)}.",
         f"Nevner: {kr(pinn)} + 0,6 × {kr(sinn)} = {kr(pinn + alfa * sinn)}.",
         f"AERT = <b>{pst(aert)}</b>."],
        [(pst(aert_p), "bare personnivået. Selskapsinntekten hun eier, blir usynlig."),
         (pst(aert_ut), "glemt personinntekten i nevneren."),
         (pst(aert_teller), "tar α med i telleren, men hele selskapsinntekten i nevneren.")],
        kilde="F5 lb 22–25"),
    dekker=["f5-aert-05", "f5-aert-06"])

marg = 0.22 + 0.78 * 0.3784                                     # 51,5 %
lonnsum = 0.474 + 0.124                                         # 59,8 %
b6 = S.ledd("b", "<p>Lises selskap deler i stedet ut hele overskuddet. Selskapsskatten er 22 % og eierskatten 37,84 %. Se bort fra skjerming. Hvilken påstand om skatten på én ekstra krone overskudd er riktig?</p>",
    riktig=o(f"Den er {pst(marg, 1)}. Det er en marginalsats regnet med nominelle satser, ikke det eieren betaler i gjennomsnitt", pst(marg, 1)),
    gale=[o(f"Den er {pst(lonnsum, 1)}, like mye som en krone lønn med avgift. Det er også det eieren faktisk betaler i gjennomsnitt", pst(lonnsum, 1)),
          o(f"Den er {pst(marg, 1)}. Det er eierens AERT, altså betalt skatt i prosent av brutto inntekt de siste årene", pst(marg, 1)),
          o(f"Den er {pst(lonnsum, 1)}. Ligningen sørger for at eiere og lønnstakere får samme gjennomsnittsskatt", pst(lonnsum, 1))],
    solution=sol(
        "Én krone møter selskapsskatt og så utbytteskatt på det som er igjen. 59,8 % er bare nominelle satser lagt sammen. AERT er faktisk betalt skatt delt på brutto inntekt, målt bakover i tid. Ligningen gjelder marginen og høyeste sats, ikke gjennomsnittsskatten.",
        [f"0,22 + 0,78 × 0,3784 = <b>{pst(marg, 1)}</b>: 22 øre selskapsskatt, {kr(78 * 0.3784, 1)} øre utbytteskatt."],
        [(f"{pst(lonnsum, 1)} og faktisk betalt", "59,8 % er nominelle satser lagt sammen, ikke en effektiv skatt."),
         ("Eierens AERT", "forveksler marginalsats og effektiv gjennomsnittssats. AERT for de rikeste er om lag 20 %."),
         ("Samme gjennomsnittsskatt", "ligningen gjør bare den marginale kronen like lønnsom som lønn og som utbytte.")],
        kontroll="51,5 % er en øvre grense: utsatt utdeling og skjerming gir lavere byrde (F5 lb 28).",
        kilde="F5 lb 5, 15 og 27–28"),
    dekker=["f5-inntektsskifting-05", "f5-inntektsskifting-08", "f5-aert-01"])
S.oppgave("Lise eier Nordlys AS", "Effektiv skattesats", [1],
    f"<p>Lise eier {pst(alfa, 0)} av Nordlys AS. Hun har en brutto personinntekt på kr {kr(pinn)} og betaler kr {kr(pskatt)} i personskatt. "
    f"Nordlys AS har en skattepliktig inntekt på kr {kr(sinn)} og betaler 22 % selskapsskatt. Overskuddet holdes tilbake i selskapet.</p>",
    [a6, b6])

# ================= Oppgave 7: den rike investoren =================
X, r7, rab, fs, te7, aetr, tsf = 100, 0.10, 0.20, 0.01, 0.3784, 13.1, 22.0
V = X / r7                                         # 1 000
fv_b = V * (1 - rab)                               # 800
fs_b = fs * fv_b                                   # 8
utb_b = fs_b / (1 - te7)                           # 12,87
us_b = utb_b * te7                                 # 4,87
aert_b = aetr + fs_b + us_b                        # 25,97
aert_b_form = tsf + fs_b + us_b                    # 34,87
us_b78 = fs_b / 0.78 * te7
aert_b78 = aetr + fs_b + us_b78                    # 24,98
body7 = (f"<p>Ola eier et selskap som gir kr {X} i realavkastning hvert år til evig tid. Avkastningskravet er {pst(r7, 0)}. "
         f"Selskapet betaler faktisk {kr(aetr, 1)} kr i selskapsskatt per 100 kr overskudd (den nominelle satsen er 22 %). Formuesskatten er {pst(fs, 0)}. "
         f"Ola tar bare ut utbytte for å betale formuesskatten og utbyttet skattlegges med {pst(te7)}. Selskapet har ingen gjeld. Se bort fra skjerming.</p>")
a7 = S.ledd("a", f"<p>Selskapet er børsnotert med {pst(rab, 0)} aksjerabatt. Hvilken påstand er riktig?</p>",
    riktig=o(f"AERT er {pst(aert_b / 100)}. Tar Ola ut mer utbytte enn formuesskatten krever, stiger AERT", pst(aert_b / 100)),
    gale=[o(f"AERT er {pst(aert_b_form / 100)}. Tar Ola ut mer utbytte enn formuesskatten krever, stiger AERT", pst(aert_b_form / 100)),
          o(f"AERT er {pst(aert_b78 / 100)}. Tar Ola ut mer utbytte enn formuesskatten krever, stiger AERT", pst(aert_b78 / 100)),
          o(f"AERT er {pst(aert_b / 100)}. Tar Ola ut mer utbytte enn formuesskatten krever, faller AERT", pst(aert_b / 100))],
    solution=sol(
        "AERT = (faktisk selskapsskatt + formuesskatt + utbytteskatt)/100. Utbyttet må dekke både formuesskatten og skatten på seg selv.",
        [f"Verdi {X}/{kr(r7, 2)} = {kr(V)}. Formuesverdi {kr(V)} × 0,8 = {kr(fv_b)}. Formuesskatt {kr(fs_b, 2)}.",
         f"Utbytte {kr(fs_b, 2)}/(1 − 0,3784) = {kr(utb_b, 2)}. Utbytteskatt {kr(us_b, 2)}.",
         f"AERT = {kr(aetr, 1)} + {kr(fs_b, 2)} + {kr(us_b, 2)} = <b>{pst(aert_b / 100)}</b>."],
        [(pst(aert_b_form / 100), "bruker den nominelle selskapsskatten 22 % i stedet for den faktisk betalte."),
         (pst(aert_b78 / 100), "deler formuesskatten på 0,78 i stedet for 0,6216 for å finne utbyttet."),
         ("Faller AERT", "snudd. Mer utbytte gir mer utbytteskatt og høyere AERT.")],
        kilde="F5 lb 35–38 og lb 43"),
    dekker=["f5-rikeste-01", "f5-rikeste-02", "f5-rikeste-08"])

fv_u = 0.35 * V
fs_u = fs * fv_u
us_u = fs_u / (1 - te7) * te7
aert_u = aetr + fs_u + us_u                         # 18,73
port = aert_b / 3 + 2 * aert_u / 3                  # 21,14
port_5050 = (aert_b + aert_u) / 2                   # 22,35
fv_u8 = 0.35 * 0.8 * V
aert_u8 = aetr + fs * fv_u8 + fs * fv_u8 / (1 - te7) * te7
port_u8 = aert_b / 3 + 2 * aert_u8 / 3              # 20,39
b7 = S.ledd("b", "<p>Ola holder i stedet 1/3 børsnoterte og 2/3 unoterte aksjer, som topp 1 % gjør. Formuesverdien av unoterte aksjer er 35 % av markedsverdien, aksjerabatten inkludert. Hvilken påstand er riktig?</p>",
    riktig=o(f"AERT for porteføljen er {pst(port / 100)}. Forskjellen mellom de to aksjetypene skyldes verdsettelsen av formuen", pst(port / 100)),
    gale=[o(f"AERT for porteføljen er {pst(port_5050 / 100)}. Forskjellen mellom de to aksjetypene skyldes verdsettelsen av formuen", pst(port_5050 / 100)),
          o(f"AERT for porteføljen er {pst(port / 100)}. Forskjellen skyldes at unoterte selskaper betaler lavere selskapsskatt", pst(port / 100)),
          o(f"AERT for porteføljen er {pst(port_u8 / 100)}. Forskjellen skyldes særlig at eierne av unoterte aksjer unngår utbytteskatt", pst(port_u8 / 100))],
    solution=sol(
        "Unoterte aksjer verdsettes til 35 % av markedsverdien. Det gir lavere formuesskatt, mindre utbytte og lavere AERT. Begge aksjetypene har samme faktiske selskapsskatt.",
        [f"Unotert: formuesverdi {kr(fv_u)}, formuesskatt {kr(fs_u, 2)}, utbytteskatt {kr(us_u, 2)}. AERT = {pst(aert_u / 100)}.",
         f"Portefølje: {pst(aert_b / 100)} × 1/3 + {pst(aert_u / 100)} × 2/3 = <b>{pst(port / 100)}</b>."],
        [(pst(port_5050 / 100), "vekter 50/50."),
         ("Lavere selskapsskatt", "begge bruker samme faktiske selskapsskatt. Verdsettelsen er mekanismen."),
         (pst(port_u8 / 100), "ganger med 0,8 i tillegg til 35 %. Lav verdsettelse og lav faktisk selskapsskatt forklarer den lave skatten, ikke unngått utbytteskatt.")],
        kontroll="F5 lb 40 får 20,3 % med 12,22 % avkastningskrav og 1,1 % formuesskatt.",
        kilde="F5 lb 39–42, HBS s. 14–15"),
    dekker=["f5-rikeste-03", "f5-rikeste-04", "f5-rikeste-07", "f5-hbs-06"])
S.oppgave("Ola og selskapet", "Formuesskatt som avkastningsskatt", [1, 7, 8], body7, [a7, b7])

# ================= Oppgave 8: de rikeste i statistikken =================
S.oppgave("Den rikeste prosenten", "Effektiv skattesats", [1, 7],
    "<p>Hvilken påstand om den rikeste prosenten i Norge er riktig ifølge forelesningen?</p>",
    [S.ledd("", "",
        riktig="Topp 0,1 % betaler en lavere andel av inntekten i skatt enn topp 1 %. Over 90 % av inntekten deres er selskapsinntekt",
        gale=["De har mesteparten av formuen i bolig og eiendom og er i stor grad lånefinansiert, slik at gjeldsgraden stiger mot toppen",
              "Offisiell statistikk overvurderer inntekten deres, fordi overskudd som holdes tilbake i selskapene, regnes med som inntekt",
              "Tas formuesskatten og selskapsskatten med, betaler de en større andel av inntekten i skatt enn lærere og sykepleiere"],
        solution=begrep(
            "Aaberge mfl. (2020): topp 1 % betalte om lag 22 % av inntekten i skatt i 2004–2018, 90.–99. persentil 33 % og topp 0,1 % bare 9–17 %. Jo lenger opp, jo mer unoterte aksjer og selskapsinntekt.",
            "Topp 0,1 % betaler lavere andel enn topp 1 %.",
            [("Bolig og lån", "snudd. Topp 1 % har lite bolig, mye finansformue og lav gjeldsgrad."),
             ("Overvurderer inntekten", "snudd. Tilbakeholdt overskudd teller ikke som inntekt, så gruppen ser fattigere ut og skatten høyere."),
             ("Mer enn lærere", "de betaler ikke en større andel enn lærere og sykepleiere, selv med selskaps- og formuesskatt. En lønn på 660 000 gir om lag 24,9 %.")],
            kilde="F5 lb 32–34 og lb 44–46"),
        dekker=["f5-rikeste-05", "f5-rikeste-06", "f5-rikeste-09", "f5-rikeste-10"])])

# ================= Oppgave 9: HBS =================
V9 = 100 / 0.1222
andel, rab9, gjeld, fs9, aetr9, us9 = 0.35, 0.067, 100, 0.01, 13.1, 0.245


def hbs(unotert, us=us9, med_gjeld=True, med_rab=True):
    fv = V9 * (andel if unotert else 1) * ((1 - rab9) if med_rab else 1) - (gjeld if med_gjeld else 0)
    f = fs9 * fv
    return aetr9 + f + f / (1 - us) * us


h_rett = (hbs(True), hbs(False))           # 15,32 og 21,89
h_3784 = (hbs(True, us=0.3784), hbs(False, us=0.3784))
h_gjeld = (hbs(True, med_gjeld=False), hbs(False, med_gjeld=False))
h_rab = (hbs(True, med_rab=False), hbs(False, med_rab=False))


def par(v):
    return o(f"{pst(v[0] / 100)} og {pst(v[1] / 100)}", pst(v[0] / 100), pst(v[1] / 100))


a9 = S.ledd("a", "<p>Hva blir den effektive skatten i prosent av overskuddet når investoren eier (1) unoterte og (2) noterte aksjer og i begge tilfeller tar utbytte for å betale formuesskatten?</p>",
    riktig=par(h_rett), gale=[par(h_3784), par(h_gjeld), par(h_rab)],
    solution=sol(
        "Skatten er faktisk selskapsskatt + formuesskatt + utbytteskatt. Formuesverdien er markedsverdien, for unoterte ganget med 35 %, så med aksjerabatten og minus gjelden.",
        [f"Markedsverdi 100/0,1222 = {kr(V9, 1)}.",
         f"Unotert: ({kr(V9, 1)} × 0,35 × 0,933 − {gjeld}) × 1 % = {kr(fs9 * (V9 * andel * (1 - rab9) - gjeld), 2)}; utbytteskatt {kr(fs9 * (V9 * andel * (1 - rab9) - gjeld) / 0.755 * 0.245, 2)}; i alt <b>{pst(h_rett[0] / 100)}</b>.",
         f"Notert: ({kr(V9, 1)} × 0,933 − {gjeld}) × 1 % = {kr(fs9 * (V9 * (1 - rab9) - gjeld), 2)}; utbytteskatt {kr(fs9 * (V9 * (1 - rab9) - gjeld) / 0.755 * 0.245, 2)}; i alt <b>{pst(h_rett[1] / 100)}</b>."],
        [(par(h_3784)[0], "bruker 37,84 % i stedet for snittsatsen 24,5 % for perioden."),
         (par(h_gjeld)[0], "glemt gjeldsfradraget."),
         (par(h_rab)[0], "glemt aksjerabatten på 6,7 %.")],
        kontroll="Med gjeld på 134 som i artikkelen blir tallene 14,9 % og 21,4 %.",
        kilde="HBS s. 9–13"),
    dekker=["f5-hbs-02", "f5-hbs-03", "f5-hbs-04", "f5-hbs-05"])

b9 = S.ledd("b", "<p>Hvilken påstand om artikkelen og AERT-målet for eiere er riktig?</p>",
    riktig="Tilbakeholdt overskudd regnes som inntekt. En mulig framtidig utbytteskatt trekkes ikke fra, fordi ingen vet om den kommer",
    gale=["Artikkelen viser at skattesystemet er progressivt helt til toppen når selskapsskatten og formuesskatten regnes med",
          "Fra 1992 til 2006 ble utbytte skattlagt med 28 % hos personlige eiere, så de rikeste tok nesten ikke ut utbytte i perioden",
          "AERT for eiere tar med formuesskatten. Eierandelen α er også lett å fastsette ved eierskap gjennom holdingselskaper"],
    solution=begrep(
        "AERT måler skatt som er betalt. Latent utbytteskatt er ikke med. Formuesskatten er holdt utenfor og α er vanskelig å finne gjennom holdingselskaper. HBS forsvarer at tilbakeholdt overskudd er inntekt: inntekt kan konsumeres eller spares.",
        "Tilbakeholdt overskudd er inntekt og latent utbytteskatt trekkes ikke fra.",
        [("Progressivt til toppen", "snudd. Artikkelen forklarer hvorfor systemet er regressivt på toppen: 14–21 %."),
         ("28 % på utbytte før 2006", "utbytte var skattefritt hos personen fra 1992 til 2006. Nesten alle utbytter gikk da til topp 1 %."),
         ("Formuesskatt med og α lett", "begge er forbeholdene ved målet: formuesskatten er holdt utenfor og α er vanskelig ved indirekte eierskap.")],
        kilde="F5 lb 26, HBS s. 1–5 og 13–14"),
    dekker=["f5-hbs-01", "f5-hbs-07", "f5-hbs-08", "f5-aert-07"])
S.oppgave("Investoren med holdingselskap", "Formuesskatt som avkastningsskatt", [1, 7],
    f"<p>Bjerksund, Hopland og Schjelderup (2024) ser på en investor som gjennom et holdingselskap eier et selskap med 100 kr i skattbart overskudd hvert år. "
    f"Avkastningskravet er 12,22 %. Unoterte aksjer har formuesverdi 35 % av markedsverdien. Aksjerabatten er 6,7 %, formuesskatten 1 % og investoren har "
    f"kr {gjeld} i gjeld. Faktisk selskapsskatt er 13,1 % og utbytteskatten 24,5 % (snitt for 2004–2018). Se bort fra skjerming.</p>",
    [a9, b9])

S.skriv(
    label="F5 Inntektsskiftningsligningen og de rikeste",
    note="Inntektsskiftningsligningen med arbeidsgiveravgiften og satsendringer, nominell, effektiv og marginal skattesats (AERT) og hvor mye de rikeste faktisk betaler, med HBS.",
    facts=[f"{S.n} flervalg med fire alternativer. 3 poeng for rett, −1 for feil og 0 for blankt.",
           "Satser og regler står i oppgaveteksten, slik de blir oppgitt på eksamen.",
           "Sammen med de andre settene i fanen dekker settet hvert punkt i sjekklisten.",
           "Laget fra forelesningsnotatene 2026. Kurset har ikke kontrollert løsningene."],
    practiceNote="Skriv alltid ligningen før du regner: lønnssiden med 12,4 % og bare den delen arbeidstakeren bærer, kapitalsiden med selskapsskatten og bedriftens del. Bruk 1,15 ved 50/50, ikke 0,8 fra F4 lb 53.")
