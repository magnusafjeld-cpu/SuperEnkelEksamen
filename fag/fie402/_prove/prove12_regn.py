"""Prøveeksamen 12 i FIE402 (runde 3, bredden): alle tall regnes her, og settet bygges herfra.

Kjør:  python3 -I prove12_regn.py

Planen står i docs/fie402-prediksjon.md, del 5 (prove12): H2024-formen med to
kapitalstrukturoppgaver, verdsetting og realopsjon. To teorioppgaver (opsjonsintuisjon uten regning:
volatilitet, løpetid, rente, utbytte mot tilbakekjøp; governance: giftpille, hvit ridder og greenmail
ved et fiendtlig bud), deretter arbitrasjebeviset for MM I med risikable kontantstrømmer og
overpriset gearet egenkapital (PS1 E2 er typen, nye tall og motsatt retning: hjemmelaget gjeld),
spin-off som flytter obligasjonen til den risikable delen med tre tilstander, r_f > 0 og
kunngjøringseffekt på aksje og obligasjon (PS1 E8 er typen, nytt firma og nye tall), voksende gjeld
med konstant D/E, APV, WACC baklengs, beta-sjekk og FTE med FCF bygd fra EBIT (PS2 E6 er typen)
og en utvidelsesopsjon med prisusikkerhet der rho hentes fra et notert royaltyselskap som eier samme
kontantstrøm (L11 s13-15 og H2024 E6 er typen; S0, Su og Sd gjelder samme papir, og Su og Sd
inkluderer betalingen på dato 1).

Skriptet regner hvert tall som står i oppgavetekst, løsning og kriterier, og sjekker med assert:
- E3: lånet er risikofritt, hjemmelaget gjeld gir samme utbetaling som Seljes aksjer i begge
  tilstander, arbitrasjen gir null ved t = 1 og gevinst i dag, og likevekten oppfyller MM II
  (ekte kontroll: den fanger pålydende brukt i stedet for markedsverdi, 87 gir 17.24 % mot 13.45 %).
- E4: verdiene tilstand for tilstand, valget av selskap for obligasjonen, kursendringene og at
  eiernes gevinst minus kreditorenes tap = tapte synergier (identitet, merket som det).
- E5: APV, WACC baklengs = r_U − (D/V)τ r_D (identitet under konvensjonen), beta-sjekk (identitet)
  og FTE = APV (fastpunkt). Alle merket som det de er.
- E6: rho reprisar royaltyselskapet (konstruksjon), utvidelse nå priset med rho = a) (ekte kontroll:
  feiler med feil rho), replikering gir samme opsjonsverdi, og fellen (Su og Sd uten betalingen på
  dato 1) gir et annet tall.

Deretter sjekkes skrivereglene (ingen tankestrek, ingen komma foran «and», ingen markup i
criteria), poengene (12/12/18/18/20/20, rytmen fra planen, del a lett, minst én konstruksjonsdel på
8-12 poeng), at facts, note og emneetiketter ikke røper noe, at ingen oppgavetekst inneholder et svar
fra samme oppgave, lengden (1 000-1 250 ord) og antall leveranser (30-40). Er alt rent, skrives
prove12.json og prove12_oppgave.md (bare oppgaveteksten) i samme mappe. Er noe galt, skrives
ingenting.

Formatet følger docs/fie402-proveeksamen-spek.md. Konvensjonene (skatteskjold ved konstant D/E
diskontert med r_U, ukorrigerte vekter i beta-sjekken, diskret diskontering, sikre kontantstrømmer
med r_f, ingen BS-regning) følger docs/fie402-forelesninger-2026.md.
"""
import json
import os
import re
import sys

HER = os.path.dirname(os.path.abspath(__file__))
UT = os.path.join(HER, "prove12.json")
UT_MD = os.path.join(HER, "prove12_oppgave.md")


# ------------------------------------------------------------------ hjelpere
def f(x, d=4):
    """Engelsk tallformat: tusenskille med komma, desimalpunktum, ekte minustegn."""
    r = round(x, d)
    s = f"{abs(r):,.{d}f}"
    return ("−" if r < 0 else "") + s


def g(x):
    """Kortest eksakte form med høyst 3 desimaler, ellers 4 desimaler."""
    for d in (0, 1, 2, 3):
        if abs(round(x, d) - x) < 1e-9:
            return f(x, d)
    return f(x, 4)


def pc(x):
    """Rente som prosent: eksakt kort form (10%, 6.25%) eller 4 desimaler (7.6563%)."""
    return g(100 * x) + "%"


def near(a, b, tol=1e-9):
    return abs(a - b) <= tol


def vis(tittel, **kw):
    print(f"\n{tittel}")
    for k, v in kw.items():
        print(f"   {k:24} {v}")


# ============================== Oppgave 3: arbitrasjebeviset (MM I)
XH, XL, p3 = 205.0, 125.0, 0.5           # salgsverdi ved t = 1, NOK mill.
F3, rf3 = 63.0, 0.05                       # Seljes lån (pålydende) og risikofri rente
EL3, ES3 = 150.0, 96.0                     # markedsverdier av egenkapitalen
assert F3 < XL                             # lånet betales fullt i begge tilstander
D3 = F3 / (1 + rf3)
eqS = (XH - F3, XL - F3)
assert near(D3, 60) and eqS == (142.0, 62.0)
# b) firmaverdier og forventet avkastning
VL3, VS3 = EL3, ES3 + D3
EX3 = p3 * XH + (1 - p3) * XL
EeqS = p3 * eqS[0] + (1 - p3) * eqS[1]
rL3 = EX3 / EL3 - 1
rS3 = EeqS / ES3 - 1
assert near(VS3, 156) and near(EX3, 165) and near(EeqS, 102)
assert near(rL3, 0.10) and near(rS3, 0.0625) and rS3 < rL3        # den gearede lover mindre
# c) Kari: 10 % av Selje mot 10 % av Lind med personlig lån
a3, W3 = 0.10, 9.6
assert near(W3, a3 * ES3)
utS = (a3 * eqS[0], a3 * eqS[1])
kost_L = a3 * EL3
lan3 = kost_L - W3
tilbake3 = lan3 * (1 + rf3)
utL = (a3 * XH - tilbake3, a3 * XL - tilbake3)
mer3 = utL[0] - utS[0]
assert near(lan3, 5.4) and near(tilbake3, 5.67)
assert near(utL[0], 14.83) and near(utL[1], 6.83)
assert near(mer3, utL[1] - utS[1]) and near(mer3, 0.63)            # bedre i begge tilstander
lan3_feil = (a3 * XH - lan3, a3 * XL - lan3)                      # glemt renten på lånet
# d) arbitrasjen: selg Selje short, kjøp Lind, lån 10 % av Seljes lån
lan3d = a3 * D3
tilbake3d = a3 * F3
netto3 = a3 * ES3 - kost_L + lan3d
for X, eS in zip((XH, XL), eqS):
    assert near(a3 * X - tilbake3d - a3 * eS, 0)                  # null ved t = 1 i begge tilstander
assert near(netto3, 0.6) and near(netto3, a3 * (VS3 - VL3))
gevinst3_t1 = netto3 * (1 + rf3)
assert near(gevinst3_t1, mer3)                                     # samme gevinst, bare tidspunktet
ES3_lv = EL3 - D3
rS3_lv = EeqS / ES3_lv - 1
mm2 = rL3 + (D3 / ES3_lv) * (rL3 - rf3)
assert near(ES3_lv, 90) and near(rS3_lv, mm2)                     # MM II i likevekt (kan feile:)
mm2_96 = rL3 + (D3 / ES3) * (rL3 - rf3)
assert abs(rS3 - mm2_96) > 0.05                                    # ved 96 feiler den
ES3_pal = EL3 - F3                                                 # feil: pålydende i stedet for verdi
rS3_pal = EeqS / ES3_pal - 1
mm2_pal = rL3 + (D3 / ES3_pal) * (rL3 - rf3)
assert near(ES3_pal, 87) and abs(rS3_pal - mm2_pal) > 0.03          # kontrollen fanger feilen
vis("Oppgave 3", D=D3, VS=VS3, rL=rL3, rS=rS3, utS=utS, utL=utL, mer=mer3, netto=netto3,
    ES_lv=ES3_lv, rS_lv=rS3_lv, mm2=mm2, mm2_96=mm2_96)

# ============================== Oppgave 4: spin-off som flytter obligasjonen
pr4 = (0.25, 0.50, 0.25)
H4 = (140.0, 150.0, 160.0)
S4 = (20.0, 110.0, 260.0)
F4, rf4, N4, tap4 = 150.0, 0.05, 10.0, 6.0


def pv4(x):
    return sum(p * v for p, v in zip(pr4, x)) / (1 + rf4)


K4 = tuple(h + s for h, s in zip(H4, S4))
assert min(K4) >= F4                                               # obligasjonen er sikker i dag
D4 = pv4([min(k, F4) for k in K4])
E4 = pv4([max(k - F4, 0) for k in K4])
V4 = pv4(K4)
P4 = E4 / N4
assert near(D4, F4 / (1 + rf4)) and near(D4 + E4, V4)
EK4 = sum(p * k for p, k in zip(pr4, K4))
assert near(EK4, 275)
# b) etter splitten
H4b = tuple(h - tap4 for h in H4)
S4b = tuple(s - tap4 for s in S4)
assert min(S4b) > 0
# obligasjonen på Seismikk
DS = pv4([min(s, F4) for s in S4b])
ES_S = pv4([max(s - F4, 0) for s in S4b])
EH_fri = pv4(H4b)
Etot_S = ES_S + EH_fri
# obligasjonen på Havn
DH = pv4([min(h, F4) for h in H4b])
EH_H = pv4([max(h - F4, 0) for h in H4b])
ES_fri = pv4(S4b)
Etot_H = EH_H + ES_fri
assert Etot_S > E4 > Etot_H                                        # Seismikk er valget
forv_S = [max(s - F4, 0) for s in S4b]
forv_H = [max(h - F4, 0) for h in H4b]
assert forv_S == [0, 0, 104] and forv_H == [0, 0, 4]
assert near(sum(p * x for p, x in zip(pr4, forv_S)), 26) and near(sum(p * x for p, x in zip(pr4, H4b)), 144)
assert near(sum(p * x for p, x in zip(pr4, forv_H)), 1) and near(sum(p * x for p, x in zip(pr4, S4b)), 119)
# c) kursendringer
endrD4 = DS / D4 - 1
P4b = Etot_S / N4
endrP4 = P4b / P4 - 1
assert near(endrD4, -0.38) and near(endrP4, 0.36)
P4_feil = ES_S / N4                                                # bare Seismikk-aksjen
y4b = F4 / DS - 1                                                  # lovet avkastning etter
# d) hvem vinner og taper
gevE4 = Etot_S - E4
tapD4 = DS - D4
syn4 = 2 * tap4 / (1 + rf4)
assert near(gevE4 + tapD4, -syn4)                                  # identitet: V = D + E i hver tilstand
assert near((DS + Etot_S) - V4, -syn4)
assert gevE4 > 0 and -tapD4 > gevE4
# alternativet med obligasjonen på Havn: kreditorene taper litt der også
tapD4_H = DH - D4
gevE4_H = Etot_H - E4
assert near(tapD4_H + gevE4_H, -syn4)
vis("Oppgave 4", D=D4, E=E4, V=V4, P=P4, DS=DS, ES_S=ES_S, EH_fri=EH_fri, Etot_S=Etot_S,
    DH=DH, EH_H=EH_H, ES_fri=ES_fri, Etot_H=Etot_H, endrD=endrD4, P_etter=P4b, endrP=endrP4,
    y_etter=y4b, gevE=gevE4, tapD=tapD4, syn=syn4, alternativ=(tapD4_H, gevE4_H))

# ============================== Oppgave 5: voksende gjeld, APV, WACC og FTE
EBIT5, Dep5, Cap5, dNWC5 = 500.0, 80.0, 120.0, 20.0
tau5, g5, D5, N5 = 0.22, 0.025, 2500.0, 50.0
rf5, rm5, bU5 = 0.04, 0.09, 0.8
FCF5 = EBIT5 * (1 - tau5) + Dep5 - Cap5 - dNWC5
rU5 = rf5 + bU5 * (rm5 - rf5)
VU5 = FCF5 / (rU5 - g5)
assert near(FCF5, 330) and near(rU5, 0.08) and near(VU5, 6000)
FCF5_feil = FCF5 + dNWC5                                           # glemt ΔNWC
VU5_feil = FCF5_feil / (rU5 - g5)
rD5 = rf5                                                          # risikofri gjeld
int5 = rD5 * D5
TS5 = tau5 * int5
PVTS5 = TS5 / (rU5 - g5)
PVTS5_feil = TS5 / (rD5 - g5)                                      # feil rente
PVTS5_ME = PVTS5 * (1 + rU5) / (1 + rD5)                           # Miles-Ezzell
assert near(PVTS5_ME, TS5 / (1 + rD5) + (TS5 * (1 + g5) / (rU5 - g5)) / (1 + rD5))
assert near(int5, 100) and near(TS5, 22) and near(PVTS5, 400)
VL5 = VU5 + PVTS5
E5 = VL5 - D5
P5 = E5 / N5
d5 = D5 / VL5
assert near(VL5, 6400) and near(E5, 3900) and near(P5, 78) and near(d5, 0.390625)
rw5 = FCF5 / VL5 + g5
assert near(rw5, rU5 - d5 * tau5 * rD5)                            # identitet under konvensjonen
rE5 = (rw5 - d5 * (1 - tau5) * rD5) / (1 - d5)
assert near(rE5, rU5 + (D5 / E5) * (rU5 - rD5))                   # MM II gir det samme
bE5 = (rE5 - rf5) / (rm5 - rf5)
bD5 = 0.0
assert near((1 - d5) * bE5 + d5 * bD5, bU5)                        # identitet: før-skatt-WACC = r_U
netto5 = g5 * D5
FCFE5 = FCF5 - (1 - tau5) * int5 + netto5
E5_fte = FCFE5 / (rE5 - g5)
assert near(FCFE5, 314.5) and near(E5_fte, E5)                     # fastpunkt
E5_feil = (FCFE5 - netto5) / (rE5 - g5)
PV_netto5 = netto5 / (rE5 - g5)
assert near(E5 - E5_feil, PV_netto5)
DPS5 = FCFE5 / N5
assert near(DPS5 / (rE5 - g5), P5)
vis("Oppgave 5", FCF=FCF5, rU=rU5, VU=VU5, VU_feil=VU5_feil, int=int5, TS=TS5, PVTS=PVTS5,
    PVTS_feil=PVTS5_feil, VL=VL5, E=E5, P=P5, d=d5, rw=rw5, rE=rE5, bE=bE5, FCFE=FCFE5,
    E_fte=E5_fte, E_feil=E5_feil, PV_netto=PV_netto5, DPS=DPS5)

# ============================== Oppgave 6: utvidelsesopsjon, rho fra royaltyselskapet
qT6, S0_6 = 1000.0, 245.0               # tonn per år og markedsverdi (USD mill.)
Pu6, Pd6, rf6 = 11000.0, 7500.0, 0.04    # USD per tonn
dq6, c6, I6 = 3000.0, 7000.0, 200.0      # tonn per år, USD per tonn, USD mill.
mio = 1e6
# a) utvide nå: salget er 3 ganger royaltyselskapets strøm, kostnadene er sikre
skala6 = dq6 / qT6
inn6 = skala6 * S0_6
kost6 = dq6 * c6 / mio / rf6
NPV6a = inn6 - kost6 - I6
assert near(inn6, 735) and near(kost6, 525) and near(NPV6a, 10)
# b) vente til t = 1
mu6 = dq6 * (Pu6 - c6) / mio
md6 = dq6 * (Pd6 - c6) / mio
Vu6, Vd6 = mu6 / rf6, md6 / rf6                                   # fra år 2, verdi ved t = 1
NPVu6, NPVd6 = Vu6 - I6, Vd6 - I6
assert near(mu6, 12) and near(md6, 1.5) and near(NPVu6, 100) and near(NPVd6, -162.5)
P_grense6 = c6 + I6 * mio * rf6 / dq6
assert near(dq6 * (P_grense6 - c6) / mio / rf6, I6) and Pd6 < P_grense6 < Pu6
NPVu6_0 = NPVu6 / (1 + rf6)                                        # samme tall fra i dag, per tilstand
# c) rho fra royaltyselskapet: samme papir, Su og Sd med betalingen ved t = 1
betu6, betd6 = qT6 * Pu6 / mio, qT6 * Pd6 / mio
Su6 = betu6 + betu6 / rf6
Sd6 = betd6 + betd6 / rf6
assert near(Su6, 286) and near(Sd6, 195)
rho6 = ((1 + rf6) * S0_6 - Sd6) / (Su6 - Sd6)
assert 0 < rho6 < 1 and near(rho6, 23 / 35)
assert near((rho6 * Su6 + (1 - rho6) * Sd6) / (1 + rf6), S0_6)     # konstruksjon
Ppris6 = rho6 * Pu6 + (1 - rho6) * Pd6                             # risikonøytral forventet pris
assert near(qT6 * Ppris6 / mio * (1 + 1 / rf6) / (1 + rf6), S0_6)
Su6_feil, Sd6_feil = betu6 / rf6, betd6 / rf6                     # fellen: uten betalingen ved t = 1
rho6_feil = ((1 + rf6) * S0_6 - Sd6_feil) / (Su6_feil - Sd6_feil)
assert 0 < rho6_feil < 1 and abs(rho6_feil - rho6) > 0.05
# d) opsjonsverdien og valget
C6 = (rho6 * max(NPVu6, 0) + (1 - rho6) * max(NPVd6, 0)) / (1 + rf6)
assert C6 > NPV6a > 0                                              # vent
fleks6 = C6 - NPV6a
# kontroll som kan feile: utvide nå priset med rho tilstand for tilstand = a)
nu_u6, nu_d6 = mu6 + Vu6, md6 + Vd6
NPV6a_rho = (rho6 * nu_u6 + (1 - rho6) * nu_d6) / (1 + rf6) - I6
assert near(NPV6a_rho, NPV6a)
NPV6a_rhofeil = (rho6_feil * nu_u6 + (1 - rho6_feil) * nu_d6) / (1 + rf6) - I6
assert abs(NPV6a_rhofeil - NPV6a) > 5                              # feil rho fanges
C6_feil = rho6_feil * NPVu6 / (1 + rf6)
# replikering: Δ andeler av royaltyselskapet og risikofritt lån
Delta6 = (NPVu6 - 0) / (Su6 - Sd6)
B6 = (0 - Delta6 * Sd6) / (1 + rf6)
assert near(Delta6 * S0_6 + B6, C6)
vis("Oppgave 6", inn=inn6, kost=kost6, NPVa=NPV6a, NPVu=NPVu6, NPVd=NPVd6, grense=P_grense6,
    Su=Su6, Sd=Sd6, rho=rho6, Ppris=Ppris6, rho_feil=rho6_feil, C=C6, fleks=fleks6,
    NPVa_rhofeil=NPV6a_rhofeil, C_feil=C6_feil, Delta=Delta6, B=B6)


# ============================== Oppgave 1 b: intern kontroll (vises aldri, ingen BS-regning)
def _bs_put(S, K, T, r, sig):
    """Black-Scholes-put med diskret rente omregnet til kontinuerlig. Bare for å sjekke påstanden i
    modellsvaret: også en at-the-money-put kan falle med lengre løpetid når volatiliteten er lav og
    renten høy."""
    from math import erf, log, sqrt
    N = lambda x: 0.5 * (1 + erf(x / sqrt(2)))
    rc = log(1 + r)
    d1 = (log(S / K) + (rc + sig * sig / 2) * T) / (sig * sqrt(T))
    d2 = d1 - sig * sqrt(T)
    return K * (1 + r) ** -T * N(-d2) - S * N(-d1)


assert _bs_put(200, 200, 5, 0.08, 0.10) < _bs_put(200, 200, 2, 0.08, 0.10)    # lav σ, høy rente
assert _bs_put(200, 200, 5, 0.03, 0.35) > _bs_put(200, 200, 2, 0.03, 0.35)    # ellers som regel opp


# ======================================================================
#                              TEKSTENE
# ======================================================================
ex1 = {
    "n": 1, "title": "Options", "points": 12, "topic": "Options",
    "chapters": [15, 21, 23],
    "body": (
        "<p>Halsnøy Halvleder ASA trades at NOK 200 and has never paid a dividend. Consider European "
        "calls and puts on its shares with strike NOK 200 and two years to expiry. Treat each part "
        "separately; no calculations, 2-3 sentences per part (3 points each).</p>"
        "<p>a) Ingrid expects the share to become far more volatile than the market expects, with no "
        "view on its direction. If the market comes round to her view while the share is still at "
        "NOK 200, which option gains more?</p>"
        "<p>b) Are five-year European options with the same strike worth more than the two-year "
        "call and put?</p>"
        "<p>c) A colleague says: «A higher risk-free rate discounts the payoffs more, so it lowers "
        "both option values.» Is he right if the share price is unchanged?</p>"
        "<p>d) Halsnøy will pay out NOK 20 per share next month, as a dividend or as a repurchase "
        "at the market price. Which method would a call holder prefer and which a put holder?</p>"
    ),
    "solution": (
        "<p>Four answers of 2-3 sentences, 3 points each.</p>"
        "<p><b>a) Both gain, by the same amount.</b> An option's payoff is cut off at zero, so a "
        "wider spread of the share price adds value in the tail where the option pays and costs "
        "nothing in the other: higher volatility raises both the call and the put. With S "
        "unchanged, put-call parity C − P = S − PV(K) does not contain σ, so the call and the put "
        "must rise by exactly the same amount.</p>"
        "<p><b>b) The call: yes, at least as much. The put: not necessarily.</b> Without dividends a "
        "call is worth at least S − PV(K); a longer life both lowers PV(K) and gives the share more "
        "time to rise, so the five-year call is worth at least as much as the two-year call. "
        "For the put the two effects pull apart: more time adds volatility value, but the holder "
        "receives K later, so even this at-the-money put can be worth less with a longer life when "
        "volatility is low and the interest rate high.</p>"
        "<p><b>c) No: the call rises and the put falls.</b> The call holder pays K only at expiry, so "
        "a higher rate lowers PV(K), today's cost of exercising, while the put holder receives K at "
        "expiry and that is now worth less today. Parity confirms it: with S fixed, C − P = S − "
        "PV(K) rises when PV(K) falls.</p>"
        "<p><b>d) The call holder prefers the repurchase; the put holder prefers the dividend.</b> "
        "The dividend lowers the share price by about NOK 20 on the ex-dividend date and option "
        "holders receive none of the cash, so the call loses and the put gains. A repurchase at the "
        "market price leaves the price per share unchanged (MM), so neither option is affected.</p>"
        "<p><b>Also accepted.</b> In a): «the put gains slightly more if time passes before the "
        "market comes round», since PV(K) then rises towards K and C − P = S − PV(K) falls; buying "
        "both options (a straddle) as the way to bet on volatility. In b): the argument that a "
        "European call on a share without dividends is never exercised early, so it is worth the "
        "same as an American call, which can only gain from a longer life. In d): that managers paid "
        "in options therefore favour repurchases, or that paying out cash makes the remaining "
        "shares slightly riskier, which helps both options a little whichever method is used.</p>"
    ),
    "criteria": [
        "Four parts graded separately, 3 points each: about 1 point for the direction (for both "
        "options where asked) and 2 for the reason. A direction without a reason earns at most 1 "
        "point.",
        "a) Both rise with volatility because the payoff is one-sided. They rise by the same "
        "amount, since sigma is not in C − P = S − PV(K). «The put slightly more if time passes» is accepted "
        "with the PV(K) argument. Saying the put falls when volatility rises is the error.",
        "b) Call: worth at least as much (no dividends, lower PV(K), more time). Put: not "
        "necessarily, because K arrives later; with low volatility and a high rate the longer put "
        "can be worth less. «Both are worth more» with a correct argument for the call earns 2 of "
        "3.",
        "c) The colleague is wrong: the call rises and the put falls, because PV(K) falls. A "
        "parity argument earns full credit for the reason.",
        "d) Dividend: the share drops ex-dividend, so the call falls and the put rises. Repurchase "
        "at the market price: price unchanged, options unaffected. The call holder prefers the "
        "repurchase and the put holder the dividend.",
        "(bonus) Managers paid in options favour repurchases; naming the straddle in a).",
        "No calculation is expected. Keep to 2-3 sentences per part.",
    ],
}

ex2 = {
    "n": 2, "title": "Governance", "points": 12, "topic": "Corporate governance",
    "chapters": [26, 27],
    "body": (
        "<p>Corwin Instruments Inc., a US-listed firm with dispersed ownership, has lagged its "
        "peers for three years. Halberd Partners, a private equity firm holding 9% of the "
        "shares, has launched a hostile tender offer at a 30% premium. Corwin's board considers "
        "three responses:</p>"
        "<p>(1) a poison pill adopted without a shareholder vote;<br>"
        "(2) a white knight: a friendly bidder that would keep the managers;<br>"
        "(3) greenmail: buying Halberd's stake at a premium if it drops the bid.</p>"
        "<p>For each: how does it work against the bid? Who is likely to gain and who to lose "
        "among the managers, the other shareholders and Halberd? 2-3 sentences and 4 points "
        "each.</p>"
    ),
    "solution": (
        "<p>Three answers of 2-3 sentences, 4 points each.</p>"
        "<p><b>(1) The poison pill.</b> If a holder crosses a trigger (say 15%) without the board's "
        "approval, every other shareholder may buy new shares at a deep discount, so Halberd would "
        "be diluted and its offer cannot succeed unless the board redeems the pill; Halberd must "
        "negotiate with the board or replace it in a proxy contest. The managers gain time and job "
        "security and Halberd loses; the other shareholders lose the 30% premium if the pill blocks "
        "the bid, but can gain if the board uses it only to bargain for a higher price.</p>"
        "<p><b>(2) The white knight.</b> The board invites a friendlier buyer, which starts an "
        "auction: Halberd must raise its offer or lose the deal. The other shareholders gain if the "
        "competition lifts the premium above 30%, the managers keep their jobs if the knight wins "
        "and Halberd loses the deal but sells its 9% to the winner at the higher price. The risk is "
        "that the board picks the bidder that is kindest to the managers rather than the one that "
        "pays the most.</p>"
        "<p><b>(3) Greenmail.</b> Corwin pays Halberd more than the market price for its stake, with "
        "the other shareholders' money, in return for dropping the bid (usually with a standstill "
        "agreement not to buy again). Halberd earns a premium on 9% without buying the firm and the "
        "managers keep their jobs; the other shareholders lose twice, through the premium paid out "
        "of the firm and through the loss of the 30% offer and of the takeover threat that "
        "disciplines the managers, so the share price typically falls on greenmail.</p>"
        "<p><b>Also accepted.</b> In (1): the point that a pill combined with a staggered board is "
        "very hard to overcome. In (2): a white squire (a friendly buyer of a block that will vote "
        "with the board). In (3): that the firm's other owners may oppose greenmail at the general "
        "meeting or forbid it in the charter.</p>"
    ),
    "criteria": [
        "Three responses graded separately, 4 points each: about 2 for how it works and 2 for who "
        "gains and who loses among the three parties.",
        "(1) Pill: discounted new shares for everyone but the holder above the trigger, so the bid "
        "fails unless the board redeems it. Managers gain, Halberd loses; shareholders lose the "
        "premium if the bid is blocked, or gain if the pill is only a bargaining tool. Either "
        "reading earns full marks if argued.",
        "(2) White knight: a rival bid creates competition. Shareholders can gain a higher premium, "
        "managers keep their jobs, Halberd loses the deal but profits on its stake. Naming the risk "
        "of a knight chosen for the managers' sake is a bonus.",
        "(3) Greenmail: a repurchase at a premium from the bidder only. Halberd and the managers "
        "gain; the other shareholders lose the premium paid and the offer.",
        "Each answer must say who gains and who loses, not only how the defence works; a pure "
        "description earns at most 2 of the 4 points.",
        "Keep to 2-3 sentences per response. A general (US-style) frame is expected; no country's "
        "law is needed.",
    ],
}

# ---------------------------------------------------------------- Oppgave 3
tab3a = (
    "<table class=\"data\"><tr><th>State at t = 1</th><th>Lind shareholders</th><th>Selje's lender"
    "</th><th>Selje shareholders</th></tr>"
    f"<tr><td>High prices</td><td class=\"n\">{g(XH)}</td><td class=\"n\">{g(F3)}</td>"
    f"<td class=\"n\">{g(XH)} − {g(F3)} = {g(eqS[0])}</td></tr>"
    f"<tr><td>Low prices</td><td class=\"n\">{g(XL)}</td><td class=\"n\">{g(F3)}</td>"
    f"<td class=\"n\">{g(XL)} − {g(F3)} = {g(eqS[1])}</td></tr></table>"
)
tab3c = (
    "<table class=\"data\"><tr><th>Plan</th><th>Cost today</th><th>High prices</th>"
    "<th>Low prices</th></tr>"
    f"<tr><td>10% of Selje</td><td class=\"n\">{g(W3)}</td><td class=\"n\">{g(utS[0])}</td>"
    f"<td class=\"n\">{g(utS[1])}</td></tr>"
    f"<tr><td>10% of Lind, loan {g(lan3)}</td><td class=\"n\">{g(kost_L)} − {g(lan3)} = {g(W3)}</td>"
    f"<td class=\"n\">{g(a3 * XH)} − {g(tilbake3)} = <b>{g(utL[0])}</b></td>"
    f"<td class=\"n\">{g(a3 * XL)} − {g(tilbake3)} = <b>{g(utL[1])}</b></td></tr></table>"
)
tab3d = (
    "<table class=\"data\"><tr><th>Position</th><th>Today</th><th>High prices</th><th>Low prices</th>"
    "</tr>"
    f"<tr><td>Sell 10% of Selje's shares short</td><td class=\"n\">+{g(a3 * ES3)}</td>"
    f"<td class=\"n\">−{g(utS[0])}</td><td class=\"n\">−{g(utS[1])}</td></tr>"
    f"<tr><td>Buy 10% of Lind's shares</td><td class=\"n\">−{g(kost_L)}</td>"
    f"<td class=\"n\">+{g(a3 * XH)}</td><td class=\"n\">+{g(a3 * XL)}</td></tr>"
    f"<tr><td>Borrow at 5%</td><td class=\"n\">+{g(lan3d)}</td><td class=\"n\">−{g(tilbake3d)}</td>"
    f"<td class=\"n\">−{g(tilbake3d)}</td></tr>"
    f"<tr><td><b>Total</b></td><td class=\"n\"><b>+{g(netto3)}</b></td><td class=\"n\">0</td>"
    "<td class=\"n\">0</td></tr></table>"
)
ex3 = {
    "n": 3, "title": "Capital Structure", "points": 18, "topic": "Capital structure",
    "chapters": [6],
    "body": (
        "<p>Lind Havbruk AS and Selje Havbruk AS each own one identical salmon farm and nothing "
        "else. At t = 1 each sells its farm and is wound up; a farm fetches NOK "
        f"{g(XH)} million if salmon prices are high and NOK {g(XL)} million if low ({pc(p3)} "
        f"each). Lind has no debt; Selje owes NOK {g(F3)} million (face value) on a zero-coupon "
        f"loan due at t = 1. Markets are perfect and everyone can borrow and lend at {pc(rf3)}. "
        f"Lind's equity trades at NOK {g(EL3)} million, Selje's at NOK {g(ES3)} million.</p>"
    ),
    "parts": [
        {
            "label": "a", "points": 3,
            "body": (
                "<p>What do each firm's shareholders receive at t = 1 in each state and what is "
                "Selje's loan worth today?</p>"
            ),
            "solution": (
                tab3a +
                f"<p>The loan is paid in full in both states ({g(F3)} &lt; {g(XL)}), so it is "
                f"risk-free and worth D = {g(F3)}/{g(1 + rf3)} = <b>{g(D3)}</b>.</p>"
            ),
            "criteria": [
                f"Lind's shareholders get the whole cash flow: {g(XH)} and {g(XL)}.",
                f"Selje's shareholders get {g(eqS[0])} and {g(eqS[1])}; the lender gets {g(F3)} in both "
                "states.",
                f"D = {g(F3)}/{g(1 + rf3)} = {g(D3)}, risk-free because {g(F3)} is below {g(XL)}. "
                f"Using the face value {g(F3)} as today's value is the error.",
            ],
        },
        {
            "label": "b", "points": 3,
            "body": (
                "<p>What are the two firms worth and what expected return does each firm's equity "
                "offer?</p>"
            ),
            "solution": (
                f"<p><b>Step 1. Firm values.</b> V<sub>Lind</sub> = <b>{g(VL3)}</b>; V<sub>Selje</sub> "
                f"= E + D = {g(ES3)} + {g(D3)} = <b>{g(VS3)}</b>. The market values identical cash "
                f"flows {g(VS3 - VL3)} higher when they come with debt.</p>"
                f"<p><b>Step 2. Expected returns.</b> Lind: ({g(p3)} × {g(XH)} + {g(p3)} × {g(XL)})/"
                f"{g(EL3)} − 1 = {g(EX3)}/{g(EL3)} − 1 = <b>{pc(rL3)}</b>. Selje: ({g(p3)} × "
                f"{g(eqS[0])} + {g(p3)} × {g(eqS[1])})/{g(ES3)} − 1 = {g(EeqS)}/{g(ES3)} − 1 = "
                f"<b>{pc(rS3)}</b>.</p>"
                "<p><b>Note (not required).</b> This cannot be right: Selje's shares carry the same business risk plus leverage "
                f"(their payoff swings by {g(eqS[0] - eqS[1])} on a price of {g(ES3)}, Lind's by "
                f"{g(XH - XL)} on {g(EL3)}), yet they promise a lower return. One of the two "
                "prices must be wrong.</p>"
            ),
            "criteria": [
                f"V_Lind = {g(VL3)}; V_Selje = {g(ES3)} + {g(D3)} = {g(VS3)}: the same cash flows "
                "valued differently.",
                f"Expected returns: Lind {g(EX3)}/{g(EL3)} − 1 = {pc(rL3)}; Selje {g(EeqS)}/{g(ES3)} "
                f"− 1 = {pc(rS3)}.",
                "(bonus) Notes that the levered shares are riskier yet promise less, so the prices "
                "cannot both be right.",
            ],
        },
        {
            "label": "c", "points": 4,
            "body": (
                f"<p>With NOK {g(W3)} million, Kari can buy 10% of Selje's shares, or 10% of Lind's "
                f"shares with the rest borrowed at {pc(rf3)} in her own name. What does each plan "
                "pay at t = 1 in each state and which is better?</p>"
            ),
            "solution": (
                f"<p><b>Step 1. Selje.</b> 10% of Selje costs {g(W3)} and pays 10% of {g(eqS[0])} or "
                f"{g(eqS[1])}.</p>"
                f"<p><b>Step 2. Lind with a personal loan.</b> 10% of Lind costs {g(kost_L)}, so she "
                f"borrows {g(kost_L)} − {g(W3)} = {g(lan3)} and repays {g(lan3)} × {g(1 + rf3)} = "
                f"{g(tilbake3)} at t = 1.</p>"
                + tab3c +
                f"<p><b>The Lind plan is better:</b> for the same {g(W3)} it pays <b>{g(mer3)} more in "
                "both states</b>. Kari can create Selje's leverage herself (homemade leverage) more "
                "cheaply than the market sells it.</p>"
            ),
            "criteria": [
                f"Selje plan: 10% × ({g(eqS[0])}, {g(eqS[1])}) = {g(utS[0])} and {g(utS[1])}.",
                f"Lind plan: loan {g(kost_L)} − {g(W3)} = {g(lan3)}, repayment {g(tilbake3)}; payoff "
                f"{g(utL[0])} and {g(utL[1])}.",
                f"The Lind plan pays {g(mer3)} more in both states, so it dominates.",
                f"Repaying only {g(lan3)} (no interest on the personal loan) gives {g(lan3_feil[0])} "
                f"and {g(lan3_feil[1])} and is the error.",
            ],
        },
        {
            "label": "d", "points": 4,
            "body": (
                "<p>Construct an arbitrage that needs no money of your own, trading 10% of each "
                "firm's shares. What is your profit and at what value of Selje's equity would the "
                "arbitrage disappear?</p>"
            ),
            "solution": (
                "<p><b>Step 1. Copy Selje's shares and sell the expensive original.</b> 10% of Lind "
                f"plus a loan that repays 10% of {g(F3)} = {g(tilbake3d)} pays exactly what 10% of "
                "Selje's shares pay, in both states:</p>"
                + tab3d +
                f"<p><b>Profit: NOK {g(netto3)} million today</b>, risk-free and with no money of your "
                f"own (equivalently {g(netto3)} × {g(1 + rf3)} = {g(gevinst3_t1)} at t = 1, by investing the "
                f"{g(netto3)} at {pc(rf3)} or by borrowing only {g(lan3)}). It equals 10% of the gap in firm values, {g(VS3)} − "
                f"{g(VL3)}.</p>"
                f"<p><b>Step 2. Equilibrium.</b> Selling Selje and buying Lind continues until "
                f"V<sub>Selje</sub> = V<sub>Lind</sub> = {g(VL3)}, that is <b>E<sub>Selje</sub> = "
                f"{g(EL3)} − {g(D3)} = {g(ES3_lv)}</b>.</p>"
                f"<p><b>Check.</b> At {g(ES3_lv)} Selje's expected return is {g(EeqS)}/{g(ES3_lv)} − 1 = "
                f"{pc(rS3_lv)}; MM II gives {pc(rL3)} + ({g(D3)}/{g(ES3_lv)}) × ({pc(rL3)} − "
                f"{pc(rf3)}) = {pc(mm2)} ✓. It catches the face value used in place of the market value: "
                f"E = {g(EL3)} − {g(F3)} = {g(ES3_pal)} gives an expected return of {pc(round(rS3_pal, 6))}, "
                f"while MM II with the loan at its market value of {g(D3)} gives {pc(round(mm2_pal, 6))}.</p>"
            ),
            "criteria": [
                "Sells Selje's shares short and buys Lind's shares with a personal loan (homemade "
                "leverage). Buying Selje and selling Lind is the wrong direction.",
                f"Positions: +{g(a3 * ES3)}, −{g(kost_L)}, +{g(lan3d)} (repay {g(tilbake3d)}); "
                "zero at t = 1 in both states, shown state by state.",
                f"Profit {g(netto3)} today or {g(gevinst3_t1)} at t = 1. Another scale is accepted if "
                f"stated (all the shares give {g(10 * netto3)} today).",
                f"The arbitrage disappears at E_Selje = {g(EL3)} − {g(D3)} = {g(ES3_lv)}, where both "
                f"firms are worth {g(VL3)}.",
                f"(bonus) Checks the equilibrium with MM II: {pc(rS3_lv)} both ways.",
            ],
        },
        {
            "label": "e", "points": 4,
            "body": (
                "<p>Which theorem does this illustrate? State it and the assumptions about investors "
                "that your strategy in d) relies on. (3-4 sentences)</p>"
            ),
            "solution": (
                "<p><b>Model answer (4 sentences).</b> This is Modigliani-Miller Proposition I: in a "
                "perfect capital market the total value of a firm does not depend on its capital "
                "structure, because investors can copy or undo any leverage the firm chooses. My "
                "strategy needed investors to borrow at the same rate as the firm, here "
                f"{pc(rf3)}; if a personal loan cost more, homemade leverage would be dearer than "
                "corporate leverage and a levered firm could trade at a premium. It also needed short "
                "sales and no taxes or transaction costs, so that the trade costs nothing to set up. "
                "Finally, all investors must know that the two farms are identical, so that the "
                "shares are perfect substitutes.</p>"
            ),
            "criteria": [
                "Names MM Proposition I and states it: firm value does not depend on capital "
                "structure in a perfect market (the law of one price).",
                "Names the borrowing assumption: investors borrow and lend at the same rate as firms, "
                "which makes homemade leverage a perfect substitute.",
                "Names at least one more assumption the strategy uses: short selling, no taxes, no "
                "transaction costs, the same information.",
                "A list of perfect-market conditions that never says which ones the strategy in d) "
                "relies on earns at most half.",
                "Keep to 3-4 sentences.",
            ],
        },
    ],
}

# ---------------------------------------------------------------- Oppgave 4
tab4 = (
    f"<table class=\"data\"><tr><th>State (probability)</th><th class=\"n\">Bust ({pc(pr4[0])})"
    f"</th><th class=\"n\">Normal ({pc(pr4[1])})</th><th class=\"n\">Boom ({pc(pr4[2])})</th></tr>"
    "<tr><td>Havn</td>" + "".join(f"<td class=\"n\">{g(x)}</td>" for x in H4) + "</tr>"
    "<tr><td>Seismikk</td>" + "".join(f"<td class=\"n\">{g(x)}</td>" for x in S4) + "</tr></table>"
)


def rad(navn, x):
    return f"<tr><td>{navn}</td>" + "".join(f"<td class=\"n\">{g(v)}</td>" for v in x) + "</tr>"


tab4b = (
    "<table class=\"data\"><tr><th>After the split</th><th class=\"n\">Bust</th>"
    "<th class=\"n\">Normal</th><th class=\"n\">Boom</th><th class=\"n\">Value today</th></tr>"
    + rad("Havn ASA, cash flow", H4b)[:-5] + "<td></td></tr>"
    + rad("Seismikk ASA, cash flow", S4b)[:-5] + "<td></td></tr>"
    + "<tr><td colspan=\"5\"><i>Bond on Seismikk</i></td></tr>"
    + rad("Bond", [min(s, F4) for s in S4b])[:-5] + f"<td class=\"n\">{f(DS)}</td></tr>"
    + rad("Seismikk equity", forv_S)[:-5] + f"<td class=\"n\">{f(ES_S)}</td></tr>"
    + rad("Havn equity", H4b)[:-5] + f"<td class=\"n\">{f(EH_fri)}</td></tr>"
    + "<tr><td colspan=\"5\"><i>Bond on Havn</i></td></tr>"
    + rad("Bond", [min(h, F4) for h in H4b])[:-5] + f"<td class=\"n\">{f(DH)}</td></tr>"
    + rad("Havn equity", forv_H)[:-5] + f"<td class=\"n\">{f(EH_H)}</td></tr>"
    + rad("Seismikk equity", S4b)[:-5] + f"<td class=\"n\">{f(ES_fri)}</td></tr></table>"
)
tab4d = (
    "<table class=\"data\"><tr><th>Group</th><th class=\"n\">Before</th><th class=\"n\">After</th>"
    "<th class=\"n\">Change</th></tr>"
    f"<tr><td>Shareholders</td><td class=\"n\">{f(E4)}</td><td class=\"n\">{f(Etot_S)}</td>"
    f"<td class=\"n\"><b>+{f(gevE4)}</b></td></tr>"
    f"<tr><td>Bondholders</td><td class=\"n\">{f(D4)}</td><td class=\"n\">{f(DS)}</td>"
    f"<td class=\"n\"><b>{f(tapD4)}</b></td></tr>"
    f"<tr><td>Firm (D + E)</td><td class=\"n\">{f(V4)}</td><td class=\"n\">{f(DS + Etot_S)}</td>"
    f"<td class=\"n\"><b>{f(-syn4)}</b></td></tr></table>"
)
ex4 = {
    "n": 4, "title": "Debt and risk", "points": 18, "topic": "Debt and risk",
    "chapters": [9, 10],
    "body": (
        "<p>Leirvåg Gruppen ASA has two divisions, Havn (ports) and "
        "Seismikk (seismic surveys). It will be wound up at t = 1, when they produce these cash "
        "flows (NOK million):</p>"
        + tab4 +
        f"<p>Its only debt is a zero-coupon bond with face value NOK {g(F4)} million due at t = 1. "
        f"Investors are risk neutral, the risk-free rate is {pc(rf4)} and there are no taxes. Use 4 "
        "decimal places.</p>"
    ),
    "parts": [
        {
            "label": "a", "points": 3,
            "body": "<p>What are Leirvåg's bond and equity worth today?</p>",
            "solution": (
                f"<p>Together the divisions produce {g(K4[0])}, {g(K4[1])} and {g(K4[2])}. Even in "
                f"a bust {g(K4[0])} ≥ {g(F4)}, so the bond is always paid in full: <b>D = {g(F4)}/"
                f"{g(1 + rf4)} = {f(D4)}</b>.</p>"
                f"<p>Equity receives {g(K4[0] - F4)}, {g(K4[1] - F4)} and {g(K4[2] - F4)}: E = "
                f"({g(pr4[0])} × {g(K4[0] - F4)} + {g(pr4[1])} × {g(K4[1] - F4)} + {g(pr4[2])} × "
                f"{g(K4[2] - F4)})/{g(1 + rf4)} = {g(EK4 - F4)}/{g(1 + rf4)} = <b>{f(E4)}</b>.</p>"
                f"<p><b>Identity.</b> D + E = {f(V4)} = {g(EK4)}/{g(1 + rf4)}, the value of all the "
                "cash flows; it holds by construction (D + E = V in every state).</p>"
            ),
            "criteria": [
                f"The bond is risk-free ({g(K4[0])} ≥ {g(F4)} in a bust): D = {g(F4)}/{g(1 + rf4)} = "
                f"{f(D4)}.",
                f"E = {g(EK4 - F4)}/{g(1 + rf4)} = {f(E4)}.",
                f"Risk-neutral investors: expected values discounted at {pc(rf4)}.",
            ],
        },
        {
            "label": "b", "points": 6,
            "body": (
                "<p>The CEO proposes to split Leirvåg into Havn ASA and Seismikk ASA, giving each "
                "shareholder one share in each. The bond terms let him move the whole bond to either "
                f"firm. The split costs synergies: each firm's cash flow falls by NOK {g(tap4)} "
                "million in every state. Which firm should take the bond if the CEO acts for the "
                "shareholders? Find their total equity value under both choices.</p>"
            ),
            "solution": (
                "<p>Value each firm's debt and equity state by state (risk neutral, discount at "
                f"{pc(rf4)}):</p>"
                + tab4b +
                f"<p><b>Bond on Seismikk:</b> equity = {f(ES_S)} + {f(EH_fri)} = <b>{f(Etot_S)}</b>. "
                f"<b>Bond on Havn:</b> equity = {f(EH_H)} + {f(ES_fri)} = <b>{f(Etot_H)}</b>.</p>"
                "<p><b>The bond goes to Seismikk.</b> With limited liability the shareholders walk "
                "away from the bond in the states where its firm cannot pay, so they want it on the "
                f"most volatile cash flow: Seismikk cannot pay {g(F4)} in two states out of three and "
                "the bondholders absorb those shortfalls.</p>"
            ),
            "criteria": [
                "About 2 points for each allocation valued state by state and 2 for the choice "
                "with its reason.",
                f"Cash flows after the split: Havn {', '.join(g(x) for x in H4b)}; Seismikk "
                f"{', '.join(g(x) for x in S4b)}.",
                f"Bond on Seismikk: equity (0, 0, {g(forv_S[2])}) plus Havn's cash flow: "
                f"{f(ES_S)} + {f(EH_fri)} = {f(Etot_S)}.",
                f"Bond on Havn: equity (0, 0, {g(forv_H[2])}) plus Seismikk's cash flow: "
                f"{f(EH_H)} + {f(ES_fri)} = {f(Etot_H)}.",
                "Choice: Seismikk, the riskier division. Choosing Havn because it can «carry» the "
                "bond, or comparing only total expected cash flows (the same under both choices), "
                "is the error.",
                            ],
        },
        {
            "label": "c", "points": 3,
            "body": (
                "<p>For the CEO's choice, by what percentage do the value of the bond and the "
                "shareholders' total wealth change when the plan is announced?</p>"
            ),
            "solution": (
                f"<p><b>Step 1. The bond.</b> It now pays {', '.join(g(min(s, F4)) for s in S4b)}: D "
                f"= ({g(pr4[0])} × {g(min(S4b[0], F4))} + {g(pr4[1])} × {g(min(S4b[1], F4))} + "
                f"{g(pr4[2])} × {g(F4)})/{g(1 + rf4)} = <b>{f(DS)}</b>, a change of {f(DS)}/{f(D4)} "
                f"− 1 = <b>{pc(endrD4)}</b>.</p>"
                "<p><b>Step 2. The shareholders.</b> They now own the equity of both firms, "
                f"{f(Etot_S)} against {f(E4)} before: {f(Etot_S)}/{f(E4)} − 1 = <b>+{pc(endrP4)}</b>.</p>"
                f"<p>The bond's promised yield jumps from {pc(rf4)} to {g(F4)}/{f(DS)} − 1 = "
                f"{pc(round(y4b, 6))}, while its expected return stays {pc(rf4)} (risk neutrality). "
                "Shares up and bonds down on the same news is the signature of a wealth transfer "
                "(Marriott's split in 1993 is the classic case).</p>"
            ),
            "criteria": [
                f"D = {g(sum(p * min(s, F4) for p, s in zip(pr4, S4b)))}/{g(1 + rf4)} = "
                f"{f(DS)}.",
                f"Bond: {f(DS)}/{f(D4)} − 1 = {pc(endrD4)}.",
                f"Shareholders: equity of both firms, {f(Etot_S)}/{f(E4)} − 1 = +{pc(endrP4)}. Counting "
                f"only Seismikk's equity ({f(ES_S)}) is the error.",
                "Stating that the share price rises while the bond falls (opposite signs) earns credit "
                "even with an arithmetic slip.",
            ],
        },
        {
            "label": "d", "points": 3,
            "body": (
                "<p>Who wins and who loses from the split and by how much? Does it create value?</p>"
            ),
            "solution": (
                tab4d +
                f"<p><b>The shareholders gain {f(gevE4)} and the bondholders lose {f(-tapD4)}.</b> "
                f"The firm as a whole loses {f(syn4)} = {g(2 * tap4)}/{g(1 + rf4)}, the present value "
                "of the destroyed synergies, so the split <b>destroys value</b>: the shareholders "
                "gain only because they take more than the whole loss from the bondholders. It is a "
                "wealth transfer through risk shifting, with the lost synergies as its deadweight "
                "cost.</p>"
                f"<p><b>Identity.</b> {f(gevE4)} − {f(-tapD4)} = {f(-syn4)}: since D + E = V in every "
                "state, the gains must sum to the change in firm value. It checks the arithmetic, "
                "not the choice in b).</p>"
            ),
            "criteria": [
                f"Shareholders +{f(gevE4)} ({f(Etot_S)} − {f(E4)}); bondholders {f(tapD4)} "
                f"({f(DS)} − {f(D4)}).",
                f"The firm loses {f(syn4)}, the present value of the {g(2 * tap4)} of synergies lost at "
                "t = 1: the split destroys value.",
                "Names the mechanism: a wealth transfer from bondholders to shareholders (risk "
                "shifting), larger than the value destroyed.",
                f"(bonus) States the identity {f(gevE4)} − {f(-tapD4)} = {f(-syn4)} and says it "
                "cannot catch a wrong choice in b).",
            ],
        },
        {
            "label": "e", "points": 3,
            "body": (
                "<p>In the long run, who bears the cost of such transactions and are covenants that "
                "forbid them good or bad for shareholders? (2-3 sentences)</p>"
            ),
            "solution": (
                "<p><b>Model answer (3 sentences).</b> In the long run the shareholders bear it: "
                "lenders learn that firms can move risk onto them and demand a higher rate or lend "
                "less, so the expected loss, including any synergies destroyed, is charged up front. "
                "Covenants that forbid moving debt or assets are therefore good for "
                "shareholders before the loan is made, a «necessary evil»: the firm gives up some "
                "flexibility but borrows more cheaply, because a credible promise not to expropriate "
                "the lenders is worth more than the option to do it. Once the bond is sold the same "
                "covenant blocks gains like the one in d), which is why managers then try to escape "
                "it.</p>"
                "<p><b>Also accepted.</b> Convertible debt or shorter maturities as other remedies; "
                "renegotiation with the lenders.</p>"
            ),
            "criteria": [
                "The shareholders bear the cost in the long run: lenders anticipate and price it "
                "(higher rate, less debt).",
                "Covenants are good for shareholders ex ante: cheaper debt in exchange for less "
                "flexibility (a «necessary evil»).",
                "(bonus) Covenants are bad ex post for the current shareholders, or names other "
                "remedies (convertible debt, short maturities, renegotiation).",
                "Keep to 2-3 sentences.",
            ],
        },
    ],
}

# ---------------------------------------------------------------- Oppgave 5
ex5 = {
    "n": 5, "title": "Valuation", "points": 20, "topic": "WACC, APV and FTE",
    "chapters": [2, 3, 4, 17, 18, 19],
    "body": (
        "<p>Kjølvik Lager AS, a cold-storage firm, expects for Year 1 (NOK million): "
        f"EBIT {g(EBIT5)}, depreciation {g(Dep5)}, capital expenditure {g(Cap5)} and an increase in "
        f"net working capital of {g(dNWC5)}, all growing by {pc(g5)} a year forever. The tax rate "
        f"is {pc(tau5)}. Kjølvik has NOK {g(D5)} million of risk-free debt and keeps its "
        f"debt-to-equity ratio constant, so the debt is expected to grow by {pc(g5)} a year; "
        "interest is paid at year end on the opening debt. The risk-free rate "
        f"is {pc(rf5)}, the expected market return {pc(rm5)} and the asset beta {g(bU5)}. Use 4 "
        "decimal places.</p>"
    ),
    "parts": [
        {
            "label": "a", "points": 3,
            "body": "<p>Find Kjølvik's free cash flow in Year 1 and its unlevered value.</p>",
            "solution": (
                f"<p><b>Step 1. FCF.</b> FCF<sub>1</sub> = EBIT(1 − τ) + Dep − CapEx − ΔNWC = "
                f"{g(EBIT5)} × {g(1 - tau5)} + {g(Dep5)} − {g(Cap5)} − {g(dNWC5)} = <b>{g(FCF5)}</b>. "
                "No interest is deducted: the financing is valued separately.</p>"
                f"<p><b>Step 2. r<sub>U</sub> and V<sup>U</sup>.</b> r<sub>U</sub> = {pc(rf5)} + "
                f"{g(bU5)} × ({pc(rm5)} − {pc(rf5)}) = {pc(rU5)}; V<sup>U</sup> = {g(FCF5)}/"
                f"({pc(rU5)} − {pc(g5)}) = <b>NOK {g(VU5)} million</b>.</p>"
            ),
            "criteria": [
                f"FCF = {g(EBIT5)} × {g(1 - tau5)} + {g(Dep5)} − {g(Cap5)} − {g(dNWC5)} = {g(FCF5)}.",
                f"r_U = {pc(rf5)} + {g(bU5)} × {pc(rm5 - rf5)} = {pc(rU5)} from the asset beta.",
                f"V^U = {g(FCF5)}/({pc(rU5)} − {pc(g5)}) = {g(VU5)}, a growing perpetuity.",
                f"Forgetting the change in working capital (FCF {g(FCF5_feil)}, V^U {f(VU5_feil)}) "
                "or deducting interest is the error.",
            ],
        },
        {
            "label": "b", "points": 5,
            "body": (
                "<p>Find the interest tax shield in Year 1 and the present value of all interest tax "
                "shields. Which rate do you use and why?</p>"
            ),
            "solution": (
                f"<p><b>Step 1. Year 1.</b> The debt is risk-free, so r<sub>D</sub> = r<sub>f</sub> = "
                f"{pc(rD5)}: interest = {pc(rD5)} × {g(D5)} = {g(int5)}; tax shield = {pc(tau5)} × "
                f"{g(int5)} = <b>{g(TS5)}</b>. With a constant D/E the debt grows with the firm, so "
                f"the tax shields are expected to grow at {pc(g5)} a year.</p>"
                f"<p><b>Step 2. PV(TS)</b> = {g(TS5)}/({pc(rU5)} − {pc(g5)}) = <b>NOK {g(PVTS5)} "
                f"million</b>, discounted at <b>r<sub>U</sub> = {pc(rU5)}</b>. The debt is rebalanced "
                "to keep D/E constant: when the firm's value rises or falls, the future debt and the "
                "future tax shields follow. The tax shields therefore carry the risk of the firm's "
                "assets.</p>"
            ),
            "criteria": [
                f"Interest on the opening debt {pc(rD5)} × {g(D5)} = {g(int5)}; tax shield "
                f"{pc(tau5)} × {g(int5)} = {g(TS5)}, growing at {pc(g5)} with the debt.",
                f"PV(TS) = {g(TS5)}/({pc(rU5)} − {pc(g5)}) = {g(PVTS5)}.",
                "Rate r_U, because the debt is rebalanced with firm value, so the future tax shields "
                "have the assets' risk.",
                f"Discounting all the tax shields at r_D = {pc(rD5)} gives {f(PVTS5_feil)} and is the "
                "error.",
                f"Discounting the first year's tax shield at r_D and the later ones at r_U "
                f"(Miles-Ezzell) gives {f(PVTS5_ME)} and is accepted if argued; follow-through is "
                "then accepted in c) to f).",
            ],
        },
        {
            "label": "c", "points": 3,
            "body": "<p>Find Kjølvik's levered value with APV and the value of its equity.</p>",
            "solution": (
                f"<p>V<sup>L</sup> = V<sup>U</sup> + PV(TS) = {g(VU5)} + {g(PVTS5)} = <b>{g(VL5)}</b>; "
                f"E = {g(VL5)} − {g(D5)} = <b>{g(E5)}</b>. Leverage: D/V = {g(D5)}/{g(VL5)} = "
                f"{f(d5)}.</p>"
            ),
            "criteria": [
                f"V^L = {g(VU5)} + {g(PVTS5)} = {g(VL5)}.",
                f"E = {g(VL5)} − {g(D5)} = {g(E5)}.",
                "Follow-through from a) and b) earns full credit.",
            ],
        },
        {
            "label": "d", "points": 2,
            "body": (
                "<p>What after-tax WACC is consistent with the free cash flow and the levered value "
                "in c)?</p>"
            ),
            "solution": (
                f"<p>V<sup>L</sup> = FCF<sub>1</sub>/(r<sub>wacc</sub> − g), so r<sub>wacc</sub> = "
                f"{g(FCF5)}/{g(VL5)} + {pc(g5)} = {f(FCF5 / VL5, 7)} + {g(g5)} = {f(rw5, 7)} = "
                f"<b>{pc(rw5)}</b>.</p>"
                f"<p><b>Identity.</b> r<sub>U</sub> − (D/V)τr<sub>D</sub> = {pc(rU5)} − {f(d5, 6)} "
                f"× {g(tau5)} × {pc(rD5)} = {pc(rw5)}. It holds by construction under this debt "
                "policy, so it confirms the arithmetic only.</p>"
            ),
            "criteria": [
                f"r_wacc = {g(FCF5)}/{g(VL5)} + {pc(g5)} = {pc(rw5)}.",
                "Reaching it with r_U − (D/V)τ r_D, or with MM II and the WACC formula, is "
                "equally accepted.",
                "A precision error of about 0.001 percentage points is fine; 0.05 is too much.",
            ],
        },
        {
            "label": "e", "points": 3,
            "body": (
                "<p>Find Kjølvik's cost of equity and equity beta. Do its equity and debt betas, "
                "weighted by value, average to its asset beta?</p>"
            ),
            "solution": (
                f"<p><b>Step 1. r<sub>E</sub>.</b> From the WACC formula: {pc(rw5)} = {f(1 - d5, 6)} "
                f"r<sub>E</sub> + {f(d5, 6)} × {g(1 - tau5)} × {pc(rD5)}, so r<sub>E</sub> = "
                f"<b>{pc(rE5)}</b>. MM II gives the same: {pc(rU5)} + ({g(D5)}/{g(E5)}) × "
                f"({pc(rU5)} − {pc(rD5)}) = {pc(rE5)}.</p>"
                f"<p><b>Step 2. β<sub>E</sub>.</b> ({pc(rE5)} − {pc(rf5)})/{pc(rm5 - rf5)} = "
                f"<b>{f(bE5)}</b>.</p>"
                f"<p><b>Step 3. Yes.</b> The debt is risk-free, so β<sub>D</sub> = 0: {f(1 - d5, 6)} × "
                f"{f(bE5)} + {f(d5, 6)} × 0 = <b>{f((1 - d5) * bE5 + d5 * bD5)}</b> = β<sub>U</sub> ✓. "
                "This is an identity under a constant D/E (pre-tax WACC = r<sub>U</sub>), so it "
                "confirms the arithmetic, not the debt policy.</p>"
            ),
            "criteria": [
                f"r_E = {pc(rE5)}, from the WACC formula or from MM II.",
                f"β_E = ({pc(rE5)} − {pc(rf5)})/{pc(rm5 - rf5)} = {f(bE5)}.",
                f"Yes: {g(1 - d5)} × {f(bE5)} + {g(d5)} × 0 = {f((1 - d5) * round(bE5, 4))}, with "
                "β_D = 0 because the debt is risk-free.",
            ],
        },
        {
            "label": "f", "points": 4,
            "body": (
                "<p>Find the free cash flow to equity in Year 1 and value the equity with the "
                "flow-to-equity method. Compare with c).</p>"
            ),
            "solution": (
                f"<p><b>Step 1. FCFE.</b> The debt grows with the firm, so the shareholders also "
                f"receive the net borrowing, {pc(g5)} × {g(D5)} = {g(netto5)} in Year 1. "
                f"FCFE<sub>1</sub> = FCF − (1 − τ) × interest + net borrowing = {g(FCF5)} − "
                f"{g(1 - tau5)} × {g(int5)} + {g(netto5)} = <b>{g(FCFE5)}</b>, growing at "
                f"{pc(g5)}.</p>"
                f"<p><b>Step 2. FTE.</b> E = {g(FCFE5)}/({pc(rE5)} − {pc(g5)}) = <b>{g(E5_fte)}</b>, "
                "the same as in c). The agreement is a fixed point, since r<sub>E</sub> came from "
                "V<sup>L</sup>; it catches a wrong FCFE, not a wrong V<sup>L</sup>. Leaving out the "
                f"net borrowing would cut the equity value by its present value, {f(PV_netto5)}, to "
                f"{f(E5_feil)}.</p>"
            ),
            "criteria": [
                f"Net borrowing {pc(g5)} × {g(D5)} = {g(netto5)}, paid to the shareholders.",
                f"FCFE = {g(FCF5)} − {g(1 - tau5)} × {g(int5)} + {g(netto5)} = {g(FCFE5)}: after-tax "
                "interest, not the full interest.",
                f"E = {g(FCFE5)}/({pc(rE5)} − {pc(g5)}) = {g(E5)}, discounted at r_E, equal to c).",
                f"Leaving out the net borrowing is the error; stating the resulting {f(E5_feil)} is "
                "optional.",
                "(bonus) Notes that FTE = APV is a fixed point here, not an independent test.",
            ],
        },
    ],
}

# ---------------------------------------------------------------- Oppgave 6
tab6c = (
    "<table class=\"data\"><tr><th>Nordmalm at t = 1 (USD million)</th><th>Payment at t = 1</th>"
    "<th>Later payments, valued at t = 1</th><th>Total</th></tr>"
    f"<tr><td>High price, S<sub>u</sub></td><td class=\"n\">{g(qT6)} × {g(Pu6)} = {g(betu6)}</td>"
    f"<td class=\"n\">{g(betu6)}/{g(rf6)} = {g(betu6 / rf6)}</td><td class=\"n\"><b>{g(Su6)}</b></td></tr>"
    f"<tr><td>Low price, S<sub>d</sub></td><td class=\"n\">{g(qT6)} × {g(Pd6)} = {g(betd6)}</td>"
    f"<td class=\"n\">{g(betd6)}/{g(rf6)} = {g(betd6 / rf6)}</td><td class=\"n\"><b>{g(Sd6)}</b></td></tr>"
    "</table>"
)
ex6 = {
    "n": 6, "title": "Real Options", "points": 20, "topic": "Real options, risk-neutral valuation",
    "chapters": [22, 25],
    "body": (
        f"<p>Kobbervik Gruve AS can expand its copper mine by {g(dq6)} tonnes a year forever for "
        f"USD {g(I6)} million. The extra copper costs USD {g(c6)} per tonne to produce and is sold "
        "at each year end at that year's price. At t = 1 the copper price becomes USD "
        f"{g(Pu6)} or USD {g(Pd6)} per tonne and stays there forever; nobody knows the "
        f"probabilities. The risk-free rate is {pc(rf6)}.</p>"
        f"<p>Listed Nordmalm Royalty ASA, worth USD {g(S0_6)} million, owns only the right to "
        f"{g(qT6)} tonnes of copper a year forever from t = 1; it sells each year's copper at that "
        "year's price and pays out at once.</p>"
    ),
    "parts": [
        {
            "label": "a", "points": 3,
            "body": (
                "<p>What is the NPV of expanding now (output from Year 1)? Value the sales with "
                "Nordmalm's market value.</p>"
            ),
            "solution": (
                f"<p><b>Step 1. Sales.</b> {g(dq6)} tonnes a year from Year 1 is {g(skala6)} times "
                f"Nordmalm's stream, so the market values it at {g(skala6)} × {g(S0_6)} = "
                f"<b>{g(inn6)}</b>. No probabilities or risk premium are needed: they are in "
                "Nordmalm's price.</p>"
                f"<p><b>Step 2. Costs.</b> {g(dq6)} × {g(c6)} = USD {g(dq6 * c6 / mio)} million a "
                f"year, certain, so discount at r<sub>f</sub>: {g(dq6 * c6 / mio)}/{g(rf6)} = "
                f"<b>{g(kost6)}</b>.</p>"
                f"<p>NPV = {g(inn6)} − {g(kost6)} − {g(I6)} = <b>USD {g(NPV6a)} million</b>, "
                "positive.</p>"
            ),
            "criteria": [
                f"Sales = {g(skala6)} × {g(S0_6)} = {g(inn6)}: the same stream as Nordmalm's, scaled.",
                f"Costs {g(dq6 * c6 / mio)} a year are certain: {g(dq6 * c6 / mio)}/{g(rf6)} = "
                f"{g(kost6)}.",
                f"NPV = {g(inn6)} − {g(kost6)} − {g(I6)} = {g(NPV6a)}.",
            ],
        },
        {
            "label": "b", "points": 5,
            "body": (
                "<p>Instead, Kobbervik can decide at t = 1, when the price is known, paying USD "
                f"{g(I6)} million then; output starts in Year 2. What is the NPV of expanding in each "
                "state, measured at t = 1? Above which price does Kobbervik expand?</p>"
            ),
            "solution": (
                "<p>From t = 1 the price is known and fixed, so the margins are certain: discount at "
                f"r<sub>f</sub>. Output from Year 2 is a perpetuity whose value at t = 1 is "
                "margin/r<sub>f</sub>.</p>"
                f"<p><b>High price.</b> Margin {g(dq6)} × ({g(Pu6)} − {g(c6)}) = USD {g(mu6)} million "
                f"a year; value {g(mu6)}/{g(rf6)} = {g(Vu6)}; NPV<sub>1</sub> = {g(Vu6)} − {g(I6)} = "
                f"<b>{g(NPVu6)}</b>: expand.</p>"
                f"<p><b>Low price.</b> Margin {g(dq6)} × ({g(Pd6)} − {g(c6)}) = {g(md6)}; value "
                f"{g(md6)}/{g(rf6)} = {g(Vd6)}; NPV<sub>1</sub> = {g(Vd6)} − {g(I6)} = "
                f"<b>{g(NPVd6)}</b>: do not expand.</p>"
                f"<p><b>Threshold.</b> The NPV at t = 1 is zero when {g(dq6)} × (P − {g(c6)})/{g(rf6)} = "
                f"USD {g(I6 * mio)}: P − {g(c6)} = {g(I6 * mio)} × {g(rf6)}/{g(dq6)} = "
                f"{f(P_grense6 - c6, 2)}, so P = <b>USD {f(P_grense6, 2)} per tonne</b>.</p>"
            ),
            "criteria": [
                f"High: {g(mu6)}/{g(rf6)} − {g(I6)} = {g(NPVu6)}. Low: {g(md6)}/{g(rf6)} − {g(I6)} = "
                f"{g(NPVd6)}.",
                "Values the Year-2 perpetuity at t = 1 as margin/r_f (no extra discounting, no "
                "Year-1 cash flow).",
                "Expands only at the high price; at the low price the value is 0, not the negative "
                "NPV.",
                f"Threshold price USD {f(P_grense6, 2)} per tonne.",
                f"Discounting the state values to today ({f(NPVu6_0)} and {f(NPVd6 / (1 + rf6))}) "
                "is also accepted if stated.",
            ],
        },
        {
            "label": "c", "points": 8,
            "body": (
                "<p>What is the risk-neutral probability of the high price? Explain briefly why true "
                "probabilities are not needed.</p>"
            ),
            "solution": (
                "<p><b>Step 1. One traded security, valued today and in both states.</b> Nordmalm "
                f"is priced at S<sub>0</sub> = {g(S0_6)}. At t = 1 its holder owns the payment made "
                "then plus the rest of the stream, which is certain from then on, so S<sub>u</sub> "
                "and S<sub>d</sub> include the t = 1 payment, as a share's value includes a dividend "
                "just paid:</p>"
                + tab6c +
                f"<p><b>Step 2. The formula sheet.</b> ρ = [(1 + r<sub>f</sub>)S<sub>0</sub> − "
                f"S<sub>d</sub>]/(S<sub>u</sub> − S<sub>d</sub>) = ({g(1 + rf6)} × {g(S0_6)} − "
                f"{g(Sd6)})/({g(Su6)} − {g(Sd6)}) = {g((1 + rf6) * S0_6 - Sd6)}/{g(Su6 - Sd6)} = "
                f"<b>{f(rho6)}</b>; 1 − ρ = {f(1 - rho6)}.</p>"
                f"<p><b>The trap.</b> S<sub>0</sub> = {g(S0_6)} includes the payment at t = 1, so "
                "S<sub>u</sub> and S<sub>d</sub> must include it too. Leaving it out "
                f"({g(Su6_feil)} and {g(Sd6_feil)}) mixes two different streams and gives "
                f"{f(rho6_feil)}. That still lies between 0 and 1, so a range check misses it; repricing "
                "the expansion with it does not return a) (the check in d)).</p>"
                f"<p><b>Check.</b> [{f(rho6)} × {g(Su6)} + {f(1 - rho6)} × {g(Sd6)}]/{g(1 + rf6)} = "
                f"{g(S0_6)} ✓ (true by construction). The market prices copper as if the expected "
                f"price were {f(rho6, 6)} × {g(Pu6)} + {f(1 - rho6, 6)} × {g(Pd6)} = USD "
                f"{g(Ppris6)}.</p>"
                "<p><b>Why no true probabilities.</b> The expansion's payoff depends only on the "
                "price state; Nordmalm plus risk-free borrowing can replicate any such payoff. "
                "Its value then follows from no arbitrage, whatever the true probabilities or "
                "investors' risk aversion: both are already in Nordmalm's price.</p>"
            ),
            "criteria": [
                f"Uses one security for S_0, S_u and S_d: Nordmalm, S_0 = {g(S0_6)}.",
                f"Includes the payment at t = 1: S_u = {g(betu6)} + {g(betu6)}/{g(rf6)} = {g(Su6)} "
                f"and S_d = {g(betd6)} + {g(betd6)}/{g(rf6)} = {g(Sd6)}.",
                f"ρ = ({g(1 + rf6)} × {g(S0_6)} − {g(Sd6)})/({g(Su6)} − {g(Sd6)}) = {f(rho6)}.",
                f"Leaving out the t = 1 payment gives {f(rho6_feil)} and is the error; it lies between "
                "0 and 1, so only the rule or a repricing check catches it.",
                "Why: the payoff can be replicated with the traded security and the risk-free "
                "bond, so its price cannot depend on true probabilities or risk preferences.",
                "(bonus) Verifies that ρ reprices Nordmalm, or reads off the risk-neutral expected "
                f"price USD {g(Ppris6)}.",
            ],
        },
        {
            "label": "d", "points": 4,
            "body": (
                "<p>Without expanding now, what is Kobbervik's right to expand at t = 1 worth today? "
                "Do you expand now or wait? Briefly comment.</p>"
            ),
            "solution": (
                f"<p><b>Step 1. The option.</b> C<sub>0</sub> = [ρ × {g(NPVu6)} + (1 − ρ) × 0]/"
                f"{g(1 + rf6)} = {f(rho6)} × {g(NPVu6)}/{g(1 + rf6)} = <b>USD {f(C6)} million</b>.</p>"
                f"<p><b>Step 2. Decision: wait.</b> {f(C6)} &gt; {g(NPV6a)}: expanding now has a "
                f"positive NPV, but it is worth {f(fleks6)} less than keeping the option. Waiting "
                f"costs only one year of margin, while committing now means expanding also in the "
                f"low state, where it destroys {g(-NPVd6)} at t = 1.</p>"
                f"<p><b>Check.</b> Expanding now, priced state by state with ρ: [{f(rho6)} × "
                f"({g(mu6)} + {g(Vu6)}) + {f(1 - rho6)} × ({g(md6)} + {g(Vd6)})]/{g(1 + rf6)} − "
                f"{g(I6)} = {g(NPV6a_rho)} = a) ✓. This check can fail: with ρ = {f(rho6_feil)} it "
                f"gives {g(NPV6a_rhofeil)}.</p>"
                f"<p><b>Also accepted.</b> Replication: hold Δ = {g(NPVu6)}/{g(Su6 - Sd6)} = "
                f"{f(Delta6, 6)} times Nordmalm's equity and borrow {f(-B6)}: {f(Delta6, 6)} × "
                f"{g(S0_6)} − {f(-B6)} = {f(Delta6 * S0_6)} − {f(-B6)} = {f(C6)}.</p>"
            ),
            "criteria": [
                f"C_0 = {f(rho6)} × {g(NPVu6)}/{g(1 + rf6)} = {f(C6)}, with 0 in the low state "
                "(about 2 points).",
                f"Wait: {f(C6)} is more than the NPV of {g(NPV6a)} from expanding now. Investing "
                "because the NPV is positive is the error.",
                f"Comment: committing now gives up the right to skip the low state (the flexibility is "
                f"worth {f(fleks6)}); waiting costs only the Year-1 margin. A positive NPV is not "
                "enough.",
                f"With the wrong ρ from c) ({f(rho6_feil)}) the value is {f(C6_feil)}; follow-through "
                "earns the decision points.",
            ],
        },
    ],
}

SETT = {
    "id": "prove12",
    "kind": "mock",
    "label": "Mock exam 12",
    "minutes": 180,
    "points": 100,
    "format": "6 exercises · no multiple choice · calculator permitted",
    "note": (
        "Written for this app in Kurbatov's format (H2024, H2025), round three of the 2026 "
        "prediction: breadth, in the shape of the autumn 2024 paper with two capital-structure "
        "exercises. Two verbal exercises on option values and a hostile bid, then four "
        "calculations: two identical firms financed differently, a group that splits in two, a "
        "growing firm valued three ways and a mine that can expand later. New firms and numbers "
        "throughout. Not an official exam: the course has not checked the solutions."
    ),
    "facts": [
        "Mock exam in Kurbatov's format (H2024, H2025): 180 minutes, 100 points, six exercises, no "
        "multiple choice. Pen and paper, calculator and one bilingual dictionary.",
        "Points per exercise: 12 · 12 · 18 · 18 · 20 · 20. Exercises 1 and 2 are verbal with a "
        "sentence budget; exercises 3 to 6 are chains of calculations, most of which end with a "
        "short verbal question.",
        "The formula sheet is handed out. Results from the lectures that are not on it must be "
        "known by heart.",
        "Show every calculation and carry 4 decimals where the exercise asks for it. Answer in "
        "English.",
        "Written for practice in this app, not an official exam. The course has not checked the "
        "solutions.",
    ],
    "exercises": [ex1, ex2, ex3, ex4, ex5, ex6],
}


# ======================================================================
#                         KONTROLL AV SETTET
# ======================================================================
def alle_tekster(o, sti="sett"):
    if isinstance(o, str):
        yield sti, o
    elif isinstance(o, dict):
        for k, v in o.items():
            yield from alle_tekster(v, f"{sti}.{k}")
    elif isinstance(o, list):
        for i, v in enumerate(o):
            yield from alle_tekster(v, f"{sti}[{i}]")


feil = []
POENG = [12, 12, 18, 18, 20, 20]
assert sum(POENG) == SETT["points"]
for ex, p in zip(SETT["exercises"], POENG):
    if ex["points"] != p:
        feil.append(f"oppgave {ex['n']}: {ex['points']} poeng, skal være {p}")
    if "parts" in ex:
        s = sum(d["points"] for d in ex["parts"])
        if s != ex["points"]:
            feil.append(f"oppgave {ex['n']}: deloppgavene summerer til {s}")
        if not 3 <= len(ex["parts"]) <= 9:
            feil.append(f"oppgave {ex['n']}: {len(ex['parts'])} deloppgaver")
        for d in ex["parts"]:
            if not 2 <= d["points"] <= 12:
                feil.append(f"oppgave {ex['n']}{d['label']}: {d['points']} poeng")
            if not 3 <= len(d["criteria"]) <= 7:
                feil.append(f"oppgave {ex['n']}{d['label']}: {len(d['criteria'])} kriterier")
    else:
        if not 3 <= len(ex["criteria"]) <= 7:
            feil.append(f"oppgave {ex['n']}: {len(ex['criteria'])} kriterier")
# rytmen: planen i del 5, justert etter blindkontrollen 14.11 (E4 b tyngst, E5 b slått sammen med c,
# E6 c beholder 8 poeng som konstruksjonsdel og d får 4)
RYTME = {3: [3, 3, 4, 4, 4], 4: [3, 6, 3, 3, 3], 5: [3, 5, 3, 2, 3, 4], 6: [3, 5, 8, 4]}
for ex in SETT["exercises"]:
    if ex["n"] in RYTME and [d["points"] for d in ex["parts"]] != RYTME[ex["n"]]:
        feil.append(f"oppgave {ex['n']}: rytmen følger ikke planen")
deler = [d for ex in SETT["exercises"] for d in ex.get("parts", [])]
if not any(8 <= d["points"] <= 12 for d in deler):
    feil.append("ingen konstruksjonsdel på 8–12 poeng")
for ex in SETT["exercises"]:
    if "parts" in ex and ex["parts"][0]["points"] > 4:
        feil.append(f"oppgave {ex['n']}a er tung ({ex['parts'][0]['points']} poeng)")

for sti, t in alle_tekster(SETT):
    if "—" in t or "&mdash;" in t:
        feil.append(f"tankestrek i {sti}")
    for m in re.finditer(r",\s+and\b", t):
        feil.append(f"komma foran «and» i {sti}: …{t[max(0, m.start() - 40):m.end() + 10]}…")
    if ".criteria" in sti and (re.search(r"<[a-zA-Z/!]", t) or re.search(r"&[a-z#0-9]+;", t)):
        feil.append(f"markup eller entitet i kriterium {sti}")
    if re.search(r"\d,\d{1,2}(?!\d)", t):
        feil.append(f"mulig norsk desimalkomma i {sti}")
    if "nan" in t.split() or "inf" in t.split():
        feil.append(f"nan/inf i {sti}")
    if t.count("<p>") != t.count("</p>") or t.count("<b>") != t.count("</b>"):
        feil.append(f"ubalanserte tagger i {sti}")
    if t.count("<table") != t.count("</table>") or t.count("<tr>") != t.count("</tr>"):
        feil.append(f"ubalansert tabell i {sti}")

# facts, note og emneetiketter vises før start: ingen formler og ingen mekanismenavn som røper svar
FORBUDT = ["overhang", "covenant", "put-call", "parity", "risk shifting", "wealth transfer",
           "homemade", "arbitrage", "modigliani", "mm ", "mm,", "r_wacc", "apv", "wacc",
           "risk-neutral", "limited liability", "straddle", "poison", "greenmail", "white knight",
           "spin-off", "royalty", "dilut", "law of one price"]
for t in [SETT["note"]] + SETT["facts"]:
    if re.search(r"[=<>]|<sub>|<sup>", t):
        feil.append(f"formel i facts/note: {t[:40]}…")
    for w in FORBUDT:
        if w in t.lower():
            feil.append(f"facts/note røper «{w}»")
TOPIC_FORBUDT = ["mm", "modigliani", "arbitrage", "homemade", "risk shifting", "wealth transfer",
                 "covenant", "put-call", "parity", "spin-off", "volatility", "takeover defen"]
for ex in SETT["exercises"]:
    for w in TOPIC_FORBUDT:
        if re.search(r"\b" + re.escape(w) + r"\b", ex["topic"].lower()):
            feil.append(f"emneetiketten i oppgave {ex['n']} røper «{w}»")


# ------------------------------------------- lekkasje: svar som står i oppgaveteksten
def ren(h):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", h).replace("&lt;", "<").replace("&gt;", ">"))


SVAR = {
    3: [g(D3), g(VS3), pc(rS3), g(utL[0]), g(utL[1]), g(mer3), g(netto3), g(ES3_lv), pc(rS3_lv)],
    4: [f(D4), f(E4), f(Etot_S), f(Etot_H), f(DS), pc(endrD4), pc(endrP4),
        f(gevE4), f(-tapD4), f(syn4)],
    5: [g(FCF5), g(VU5), g(PVTS5), g(VL5), g(E5), pc(rw5), pc(rE5), f(bE5), g(FCFE5)],
    6: [g(inn6), g(kost6), g(NPVu6), g(NPVd6), f(P_grense6, 2), f(rho6), f(C6), g(Su6), g(Sd6)],
}
for ex in SETT["exercises"]:
    tekster = [ren(ex["body"])] + [ren(d["body"]) for d in ex.get("parts", [])]
    for s in SVAR.get(ex["n"], []):
        mønster = r"(?<![\d.,])" + re.escape(s) + r"(?![\d])"
        for t in tekster:
            if re.search(mønster, t):
                feil.append(f"oppgave {ex['n']}: svaret {s} står i oppgaveteksten")


# ------------------------------------------------- oppgaveteksten som Markdown
def til_md(h):
    """Enkel HTML til Markdown for oppgaveteksten (p, b, i, br, sub, sup, tabeller)."""
    def tabell(m):
        rader = re.findall(r"<tr>(.*?)</tr>", m.group(0), re.S)
        ut = []
        for i, r in enumerate(rader):
            celler = re.findall(r"<t[hd][^>]*>(.*?)</t[hd]>", r, re.S)
            ut.append("| " + " | ".join(c.strip() for c in celler) + " |")
            if i == 0:
                ut.append("|" + "---|" * len(celler))
        return "\n\n" + "\n".join(ut) + "\n\n"
    s = re.sub(r"<table[^>]*>.*?</table>", tabell, h, flags=re.S)
    s = re.sub(r"<b>(.*?)</b>", r"**\1**", s, flags=re.S)
    s = re.sub(r"<i>(.*?)</i>", r"*\1*", s, flags=re.S)
    s = re.sub(r"<sub>(.*?)</sub>", r"_\1", s)
    s = re.sub(r"<sup>(.*?)</sup>", r"^\1", s)
    s = s.replace("<br>", "  \n").replace("<p>", "").replace("</p>", "\n\n")
    s = s.replace("&gt;", ">").replace("&lt;", "<").replace("&amp;", "&")
    assert not re.search(r"<[a-zA-Z/]", s), s
    return re.sub(r"\n{3,}", "\n\n", s).strip()


HODE = [f"# FIE402 Corporate Finance · {SETT['label']}", "",
        "180 minutes · 100 points · 6 exercises · no multiple choice · calculator and one "
        "bilingual dictionary permitted. The formula sheet is handed out. Show every calculation.", ""]
md = []
for ex in SETT["exercises"]:
    del_md = [f"## Exercise {ex['n']}: {ex['title']} ({ex['points']} points)", "", til_md(ex["body"]), ""]
    for d in ex.get("parts", []):
        del_md += [f"**{d['label']}) ({d['points']} points)** " + til_md(d["body"]), ""]
    t = "\n".join(del_md)
    print(f"   oppgave {ex['n']}: {len(t.split())} ord, {t.count('?')} spørsmål")
    md += del_md
kropp_md = "\n".join(md).rstrip() + "\n"
md_tekst = "\n".join(HODE) + "\n" + kropp_md
if "—" in md_tekst or re.search(r",\s+and\b", md_tekst):
    feil.append("skriveregel brutt i oppgaveteksten (md)")

# lengde målt som i den kontrollerte prove7 (ren tekst i body og deloppgaver, slik H2025 har
# 1 149 ord og H2024 1 027); md-tellingen etter hodet (med overskrifter, poengmerker og tabellstreker)
# vises også og skal ikke ligge over prove7-nivået (1 280). Leveranser = spørsmål + imperativer.
ord_md = len(kropp_md.split())
ren_tekst = re.sub(r"<[^>]+>", " ", "".join(ex["body"] + "".join(d["body"] for d in ex.get("parts", []))
                                             for ex in SETT["exercises"]))
ord_n = len(ren_tekst.split())
sporsmal = len(re.findall(r"\?", kropp_md))
imperativ = len(re.findall(
    r"(?:^|[.)?]\s+|\*\*\s)(Find|Explain|Give|Name|Propose|Show|Describe|Compare|Construct|"
    r"Calculate|Comment|State|Estimate)\b", kropp_md))
leveranser = sporsmal + imperativ
print(f"\nOppgavetekst: {ord_n} ord i ren tekst ({ord_md} i md etter hodet), "
      f"{sporsmal} spørsmål + {imperativ} imperativer = {leveranser} leveranser, {len(deler)} deloppgaver")
if not 1000 <= ord_n <= 1250:
    feil.append(f"oppgaveteksten har {ord_n} ord (skal være 1 000–1 250)")
if ord_md > 1280:
    feil.append(f"md-teksten har {ord_md} ord (over prove7-nivået 1 280)")
if not 30 <= leveranser <= 40:
    feil.append(f"{leveranser} leveranser (skal være 30–40)")

if feil:
    print("\nFEIL, prove12.json ble ikke skrevet:")
    for x in feil:
        print("  ✗", x)
    sys.exit(1)

with open(UT, "w", encoding="utf-8") as fh:
    json.dump(SETT, fh, ensure_ascii=False, indent=2)
    fh.write("\n")
with open(UT_MD, "w", encoding="utf-8") as fh:
    fh.write(md_tekst)
print(f"\nAlle kontroller bestått. Skrev {UT} og {UT_MD}")
