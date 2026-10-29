# -*- coding: utf-8 -*-
"""Prøveeksamen 2 i FIE432 («ligner H2024», med skatterett-blokk).

Regner hvert tall i spørsmål, riktige svar og gale alternativer, kontrollerer
fasitplanen og skrivereglene og skriver fag/fie432/_prove/prove2.json.
Kjør på nytt med:  python3 -I prove2_regn.py
"""
import json
import math
import re

ROOT = "/Users/magnusfjeld/Documents/Magnus Fjeld/NHH/SuperEnkelEksamen"
OUT = ROOT + "/fag/fie432/_prove/prove2.json"
PLAN = ROOT + "/fag/fie432/_prove/fasitplan.json"


# ------------------------------------------------------------------ format
def n(x, d=0):
    """Tall med mellomrom som tusenskille og desimalkomma, minus som −."""
    neg = x < 0 and round(abs(x), d) != 0
    s = f"{abs(x):,.{d}f}".replace(",", " ").replace(".", ",")
    return ("−" if neg else "") + s


def kr(x, d=0):
    return "kr " + n(x, d)


def Kr(x, d=0):
    return "Kr " + n(x, d)


def pc(x, d=1):
    return n(x * 100, d) + " %"


def table(head, rows, numcols=()):
    h = "".join(f"<th>{c}</th>" for c in head)
    out = f'<table class="data"><tr>{h}</tr>'
    for r in rows:
        cells = []
        for i, c in enumerate(r):
            if i in numcols:
                cells.append(f'<td class="n">{c}</td>')
            else:
                cells.append(f"<td>{c}</td>")
        out += "<tr>" + "".join(cells) + "</tr>"
    return out + "</table>"


def annuitet(r, T):
    return (1 - (1 + r) ** -T) / r


def sluttfaktor(r, T):
    return ((1 + r) ** T - 1) / r


TE = 0.22 * 1.72  # effektiv eierskatt
assert abs(TE - 0.3784) < 1e-12

EX = []  # oppgavene i rekkefølge

# =================================================================== 1
K, r1, r2, r3 = 60_000, 0.025, 0.040, 0.035
D1, D2, P_salg = 400, 5_000, 75_000
f1 = K * r1                         # 1 500
U1 = max(0, f1 - D1)                # 1 100
S2 = K + U1                         # 61 100
f2 = S2 * r2                        # 2 444
tot2 = f2 + U1                      # 3 544
skp2 = max(0, D2 - tot2)            # 1 456
U2 = max(0, tot2 - D2)              # 0
gev = P_salg - K - U2               # 15 000
skatt = gev * TE                    # 5 676
assert (f1, U1, S2) == (1500, 1100, 61100)
assert round(f2, 6) == 2444 and round(tot2, 6) == 3544 and round(skp2, 6) == 1456 and U2 == 0
assert round(skatt, 2) == 5676.00
# gale
a_feil = {"fradrag": f1, "tapt": 0, "pluss": f1 + D1, "r2": K * r2 - D1}
b_feil = {"ikke_trukket": D2 - f2, "ikke_grunnlag": D2 - K * r2 - U1, "glemt": D2 - K * r2}
c_feil = {"skj3": (gev - K * r3) * TE, "U1_igjen": (gev - U1) * TE, "uten_oppj": gev * 0.22}
assert round(b_feil["ikke_trukket"]) == 2556 and round(b_feil["ikke_grunnlag"]) == 1500 and round(b_feil["glemt"]) == 2600
assert round(c_feil["skj3"], 2) == 4881.36 and round(c_feil["U1_igjen"], 2) == 5259.76 and round(c_feil["uten_oppj"], 2) == 3300.00
kontroll_1b = U1 * (1 + r2) + K * r2
assert abs(kontroll_1b - tot2) < 1e-9

EX.append(dict(
    title="Skjerming over tre år med salg i år 3", topic="Skjerming", chapters=[5],
    body=(f"<p>Ingrid kjøpte én aksje i Fjellbris ASA i januar år 1 for {kr(K)}. Hun eier aksjen ved utgangen av år 1 "
          f"og år 2 og selger den i november år 3. Skjermingsrenten er {pc(r1)} i år 1, {pc(r2)} i år 2 og {pc(r3)} i år 3. "
          f"Hun mottar {kr(D1)} i utbytte i år 1 og {kr(D2)} i år 2. Selskapet betaler ikke utbytte i år 3. "
          "Eierskatten er 22 % og oppjusteringsfaktoren 1,72.</p>"),
    parts=[
        dict(label="a",
             body="<p>Hvor stor ubenyttet skjerming framfører Ingrid fra år 1 til år 2?</p>",
             options=[Kr(f1), Kr(0), Kr(U1), Kr(f1 + D1)], answer=2,
             solution=(
                 "<p><b>Regelen.</b> Skjermingsfradraget er skjermingsgrunnlaget ganget med årets skjermingsrente. "
                 "Er fradraget større enn utbyttet, blir skattepliktig utbytte null. Resten går ikke tapt: den framføres "
                 "som ubenyttet skjerming på den samme aksjen.</p>"
                 "<p><b>Regnestykket.</b></p>"
                 f"<p>1. Grunnlaget i år 1 er kostprisen: {kr(K)}.<br>"
                 f"2. Årets fradrag: {n(K)} × {pc(r1)} = {kr(f1)}.<br>"
                 f"3. Utbyttet på {kr(D1)} er mindre enn fradraget, så skattepliktig utbytte er kr 0.<br>"
                 f"4. Ubenyttet skjerming: {n(f1)} − {n(D1)} = <b>{kr(U1)}</b>.</p>"
                 "<p><b>Hvorfor de andre er gale.</b></p>"
                 f"<p><b>{Kr(f1)}</b> = årets fradrag. Du har glemt at utbyttet brukte opp {kr(D1)} av det.<br>"
                 "<b>Kr 0</b> = du har trodd at skjerming som ikke brukes, går tapt. Den framføres.<br>"
                 f"<b>{Kr(f1 + D1)}</b> = {n(f1)} + {n(D1)}. Du har lagt utbyttet til fradraget i stedet for å trekke det fra.</p>"
                 f"<p><b>Kontroll.</b> Brukt skjerming pluss framført skjerming skal være lik årets fradrag: "
                 f"{n(D1)} + {n(U1)} = {n(f1)}. ✓</p>"
                 "<p><b>Strategi med minuspoeng.</b> I det første året kan framført skjerming ikke bli større enn årets fradrag, så "
                 f"{kr(f1 + D1)} kan strykes uten regning. Kr 0 forutsetter at ubrukt skjerming går tapt fra år til år. "
                 "Det gjør den ikke: den framføres. "
                 "Med to alternativer igjen lønner det seg å svare.</p>")),
        dict(label="b",
             body="<p>Hva er skattepliktig utbytte i år 2?</p>",
             options=[Kr(b_feil["ikke_trukket"]), Kr(b_feil["ikke_grunnlag"]), Kr(b_feil["glemt"]), Kr(skp2)], answer=3,
             solution=(
                 "<p><b>Regelen.</b> Ubenyttet skjerming fra året før teller to ganger: den legges til skjermingsgrunnlaget "
                 "og trekkes i tillegg fra utbyttet sammen med årets fradrag.</p>"
                 "<p><b>Regnestykket.</b></p>"
                 f"<p>1. Grunnlaget i år 2: {n(K)} + {n(U1)} = {kr(S2)}.<br>"
                 f"2. Årets fradrag: {n(S2)} × {pc(r2)} = {kr(f2)}.<br>"
                 f"3. Samlet fradrag: {n(f2)} + {n(U1)} = {kr(tot2)}.<br>"
                 f"4. Skattepliktig utbytte: {n(D2)} − {n(tot2)} = <b>{kr(skp2)}</b>.</p>"
                 "<p><b>Hvorfor de andre er gale.</b></p>"
                 f"<p><b>{Kr(b_feil['ikke_trukket'])}</b> = {n(D2)} − {n(f2)}. Du har lagt den ubenyttede skjermingen til grunnlaget, "
                 "men glemt å trekke den fra i tillegg.<br>"
                 f"<b>{Kr(b_feil['ikke_grunnlag'])}</b> = {n(D2)} − {n(K * r2)} − {n(U1)}. Du har trukket den fra, men glemt å legge den til grunnlaget.<br>"
                 f"<b>{Kr(b_feil['glemt'])}</b> = {n(D2)} − {n(K * r2)}. Du har glemt framføringen helt.</p>"
                 f"<p><b>Kontroll.</b> Framført skjerming forrenter seg med årets rente: {n(U1)} × 1,04 + {n(K)} × {pc(r2)} = "
                 f"{n(U1 * 1.04)} + {n(K * r2)} = {n(kontroll_1b)}. ✓ Utbyttet er større enn det samlede fradraget, "
                 "så ingenting framføres til år 3.</p>"
                 "<p><b>Strategi med minuspoeng.</b> Hver av de tre feilene utelater en del av skjermingen og gir et for "
                 "høyt skattepliktig utbytte. Det riktige svaret er det eneste der begge virkningene av framføringen er med.</p>")),
        dict(label="c",
             body=f"<p>Ingrid selger aksjen i november år 3 for {kr(P_salg)}. Hvor mye skatt betaler hun på gevinsten? Svar med to desimaler.</p>",
             options=[Kr(skatt, 2), Kr(c_feil["skj3"], 2), Kr(c_feil["U1_igjen"], 2), Kr(c_feil["uten_oppj"], 2)], answer=0,
             solution=(
                 "<p><b>Regelen.</b> Skjermingsfradraget gis til den som eier aksjen ved utgangen av året. Selger du før "
                 "årsskiftet, får du ingen skjerming i salgsåret, bare den ubenyttede skjermingen som allerede er framført. "
                 "Skattepliktig gevinst er salgspris minus kostpris minus framført ubenyttet skjerming. Gevinsten oppjusteres én gang.</p>"
                 "<p><b>Regnestykket.</b></p>"
                 f"<p>1. Framført skjerming etter år 2: utbyttet på {kr(D2)} var større enn det samlede fradraget på {kr(tot2)}, "
                 "så det framføres kr 0.<br>"
                 "2. Skjerming i år 3: ingen, fordi Ingrid ikke eier aksjen ved årsskiftet.<br>"
                 f"3. Gevinst: {n(P_salg)} − {n(K)} − 0 = {kr(gev)}.<br>"
                 f"4. Skatt: {n(gev)} × 1,72 × 22 % = {n(gev)} × 37,84 % = <b>{kr(skatt, 2)}</b>.</p>"
                 "<p><b>Hvorfor de andre er gale.</b></p>"
                 f"<p><b>{Kr(c_feil['skj3'], 2)}</b> = ({n(gev)} − {n(K * r3)}) × 37,84 %. Du har gitt Ingrid skjerming i salgsåret "
                 f"({n(K)} × {pc(r3)} = {n(K * r3)}). Renten for år 3 står i teksten for å friste.<br>"
                 f"<b>{Kr(c_feil['U1_igjen'], 2)}</b> = ({n(gev)} − {n(U1)}) × 37,84 %. Du har brukt den ubenyttede skjermingen fra år 1 "
                 "en gang til, men den ble brukt opp i år 2.<br>"
                 f"<b>{Kr(c_feil['uten_oppj'], 2)}</b> = {n(gev)} × 22 %. Du har glemt oppjusteringen.</p>"
                 f"<p><b>Kontroll.</b> Oppjuster grunnlaget i stedet for satsen: {n(gev)} × 1,72 = {n(gev * 1.72)}. Deretter "
                 f"{n(gev * 1.72)} × 22 % = {n(gev * 1.72 * 0.22, 2)}. ✓ Ingrid beholder {n(gev)} − {n(skatt)} = {n(gev - skatt)}, "
                 f"altså {pc((gev - skatt) / gev, 2)} av gevinsten, som er 1 − 37,84 %. ✓</p>"
                 "<p><b>Strategi med minuspoeng.</b> Når ett alternativ er 58 % av et annet (22/37,84), er det som regel "
                 f"paret med og uten oppjustering: {n(c_feil['uten_oppj'])} er {pc(c_feil['uten_oppj'] / skatt, 0)} av {n(skatt)}. "
                 "Det laveste av de to er nesten alltid feil.</p>")),
    ]))

# =================================================================== 2
Ys, Yt = 100_000, 400_000
tX, G = 0.40, 50_000
Ts, Tt = tX * Ys - G, tX * Yt - G
avs, avt = Ts / Ys, Tt / Yt
assert (Ts, Tt) == (-10_000, 110_000) and round(avs, 4) == -0.10 and round(avt, 4) == 0.275
feil_inntekt = ((Ys - G) * tX / Ys, (Yt - G) * tX / Yt)      # 20 %, 35 %
B_ekv = G / tX                                                # 125 000
assert B_ekv == 125_000 and abs(tX * (Ys - B_ekv) - Ts) < 1e-9 and abs(tX * (Yt - B_ekv) - Tt) < 1e-9
kopi, tZ = 20_000, 0.10
Zs, Zt = kopi + tZ * Ys, kopi + tZ * Yt
azs, azt = Zs / Ys, Zt / Yt
assert (Zs, Zt) == (30_000, 60_000) and round(azs, 4) == 0.30 and round(azt, 4) == 0.15
az_mill = (kopi + tZ * 1_000_000) / 1_000_000                # 12 %

EX.append(dict(
    title="Negativ inntektsskatt og kopiskatt", topic="Progressivitet", chapters=[1, 10],
    body=(f"<p>Siri har en inntekt på {kr(Ys)} og Tor en inntekt på {kr(Yt)}. Regjeringen vurderer to nye skattesystemer. "
          "Gjennomsnittsskatten er skatten delt på inntekten.</p>"),
    parts=[
        dict(label="a",
             body=(f"<p>System X er en negativ inntektsskatt: alle betaler {pc(tX, 0)} av hele inntekten og får samtidig "
                   f"en overføring på {kr(G)} som trekkes fra skatten. Hvilket alternativ angir både gjennomsnittsskatten til "
                   "Siri og Tor og hva slags system dette er?</p>"),
             options=[f"Siri {pc(feil_inntekt[0])} og Tor {pc(feil_inntekt[1])}, altså progressivt",
                      f"Siri {pc(avs)} og Tor {pc(avt)}, altså progressivt",
                      f"Siri {pc(tX)} og Tor {pc(tX)}, altså proporsjonalt",
                      f"Siri {pc(0)} og Tor {pc(avt)}, altså progressivt"],
             answer=1,
             solution=(
                 "<p><b>Regelen.</b> En negativ inntektsskatt er T(Y) = t × Y − G: en flat sats på hele inntekten minus en "
                 "fast overføring til alle. Gjennomsnittsskatten er T/Y = t − G/Y. Den stiger med inntekten, så systemet er "
                 "progressivt selv om det bare har én sats.</p>"
                 "<p><b>Regnestykket.</b></p>"
                 f"<p>1. Siri: {pc(tX, 0)} × {n(Ys)} − {n(G)} = {n(tX * Ys)} − {n(G)} = {n(Ts)}. Gjennomsnittsskatt "
                 f"{n(Ts)}/{n(Ys)} = <b>{pc(avs)}</b>. Hun mottar {kr(-Ts)} netto fra staten.<br>"
                 f"2. Tor: {pc(tX, 0)} × {n(Yt)} − {n(G)} = {n(tX * Yt)} − {n(G)} = {n(Tt)}. Gjennomsnittsskatt "
                 f"{n(Tt)}/{n(Yt)} = <b>{pc(avt)}</b>.<br>"
                 f"3. Gjennomsnittsskatten stiger fra {pc(avs)} til {pc(avt)}: <b>progressivt</b>.</p>"
                 "<p><b>Hvorfor de andre er gale.</b></p>"
                 f"<p><b>{pc(feil_inntekt[0])} og {pc(feil_inntekt[1])}</b> = du har trukket overføringen fra inntekten i stedet for fra skatten: "
                 f"({n(Ys)} − {n(G)}) × {pc(tX, 0)} og ({n(Yt)} − {n(G)}) × {pc(tX, 0)}. Konklusjonen er riktig, tallene er gale.<br>"
                 f"<b>{pc(tX)} og {pc(tX)}</b> = du har glemt overføringen og brukt marginalsatsen som gjennomsnittsskatt.<br>"
                 f"<b>{pc(0)} og {pc(avt)}</b> = du har behandlet systemet som en flat skatt med bunnfradrag, der skatten stopper "
                 "på null. En negativ inntektsskatt betaler ut under terskelen.</p>"
                 f"<p><b>Kontroll.</b> Systemet er det samme som en flat skatt på {pc(tX, 0)} over et bunnfradrag på "
                 f"G/t = {n(G)}/{pc(tX, 0)} = {n(B_ekv)}, bortsett fra at det betaler ut under terskelen. "
                 f"Siri: {pc(tX, 0)} × ({n(Ys)} − {n(B_ekv)}) = {n(Ts)}. ✓ Tor: {pc(tX, 0)} × ({n(Yt)} − {n(B_ekv)}) = {n(Tt)}. ✓</p>"
                 "<p><b>Strategi med minuspoeng.</b> Med én marginalsats og en overføring ligger gjennomsnittsskatten alltid "
                 f"under marginalsatsen. Alternativet med {pc(tX)} for begge kan strykes med en gang.</p>")),
        dict(label="b",
             body=(f"<p>System Z er en kopiskatt: alle betaler et fast beløp på {kr(kopi)} i skatt uansett inntekt og i tillegg "
                   f"{pc(tZ, 0)} av hele inntekten. Hva slags system er dette?</p>"),
             options=["Progressivt, fordi Tor betaler flere kroner i skatt enn Siri",
                      f"Proporsjonalt, fordi marginalskatten er {pc(tZ, 0)} for begge",
                      f"Progressivt, fordi gjennomsnittsskatten er {pc(azs, 0)} for Siri og {pc(azt, 0)} for Tor",
                      f"Regressivt, fordi gjennomsnittsskatten faller fra {pc(azs, 0)} for Siri til {pc(azt, 0)} for Tor"],
             answer=3,
             solution=(
                 "<p><b>Regelen.</b> Progressivt betyr at gjennomsnittsskatten stiger med inntekten, regressivt at den faller "
                 "og proporsjonalt at den er konstant. Det er andelen som avgjør, ikke kronebeløpet.</p>"
                 "<p><b>Regnestykket.</b></p>"
                 f"<p>1. Siri: {n(kopi)} + {pc(tZ, 0)} × {n(Ys)} = {n(Zs)}. Gjennomsnittsskatt {n(Zs)}/{n(Ys)} = {pc(azs, 0)}.<br>"
                 f"2. Tor: {n(kopi)} + {pc(tZ, 0)} × {n(Yt)} = {n(Zt)}. Gjennomsnittsskatt {n(Zt)}/{n(Yt)} = {pc(azt, 0)}.<br>"
                 f"3. Gjennomsnittsskatten faller fra {pc(azs, 0)} til {pc(azt, 0)}: <b>regressivt</b>.</p>"
                 "<p><b>Hvorfor de andre er gale.</b></p>"
                 f"<p><b>«Tor betaler flere kroner»</b> = kronebeløpsfeilen. Tor betaler dobbelt så mye i kroner, men en mindre andel av inntekten.<br>"
                 f"<b>«Proporsjonalt, marginalskatt {pc(tZ, 0)}»</b> = du har forvekslet marginalskatt og gjennomsnittsskatt. "
                 "Kopiskatten gjør at gjennomsnittet ligger over marginalsatsen og faller med inntekten.<br>"
                 f"<b>«Progressivt, {pc(azs, 0)} og {pc(azt, 0)}»</b> = riktige tall, men snudd definisjon. Fallende gjennomsnittsskatt er regressivt.</p>"
                 f"<p><b>Kontroll.</b> Gjennomsnittsskatten er {pc(tZ, 0)} + {n(kopi)}/Y, som faller i Y og nærmer seg {pc(tZ, 0)} ovenfra. "
                 f"Med inntekt {kr(1_000_000)} er den {pc(az_mill, 0)}. Kopiskatten er speilbildet av overføringen i system X: "
                 "et fast beløp lagt til skatten i stedet for trukket fra.</p>")),
    ]))

# =================================================================== 3
trinn = [(0, 200_000, 0.10), (200_000, 600_000, 0.25), (600_000, None, 0.35)]


def trinnskatt(Y, skip_first=False):
    s, rows = 0.0, []
    for i, (lo, hi, t) in enumerate(trinn):
        top = Y if hi is None else min(Y, hi)
        bel = max(0, top - lo) * t
        if skip_first and i == 0:
            bel = 0
        rows.append(bel)
        s += bel
    return s, rows


Yo, Yk = 750_000, 470_000
To, ro = trinnskatt(Yo)
Tk, rk = trinnskatt(Yk)
assert (To, Tk) == (172_500, 87_500)
ao, ak = To / Yo, Tk / Yk
assert (round(ao * 100, 1), round(ak * 100, 1)) == (23.0, 18.6)
f_marg = (0.35, 0.25)
f_skip = (trinnskatt(Yo, True)[0] / Yo, trinnskatt(Yk, True)[0] / Yk)
f_hele = ((0.25 * 600_000 + 0.35 * (Yo - 600_000)) / Yo, (0.25 * Yk) / Yk)
assert (round(f_skip[0] * 100, 1), round(f_skip[1] * 100, 1)) == (20.3, 14.4)
assert (round(f_hele[0] * 100, 1), round(f_hele[1] * 100, 1)) == (27.0, 25.0)
diff_kontroll = 0.25 * (600_000 - Yk) + 0.35 * (Yo - 600_000)
assert diff_kontroll == To - Tk
snitt600 = trinnskatt(600_000)[0] / 600_000
assert round(snitt600, 6) == 0.2

EX.append(dict(
    title="Gjennomsnittsskatt i et trinnsystem", topic="Progressivitet", chapters=[1],
    body=("<p>I landet Nordvik skattlegges inntekt etter disse trinnene:</p>"
          "<ul><li>10 % på inntekt opp til kr 200 000</li>"
          "<li>25 % på inntekt mellom kr 200 000 og kr 600 000</li>"
          "<li>35 % på inntekt over kr 600 000</li></ul>"
          f"<p>Ola har en inntekt på {kr(Yo)} og Kari en inntekt på {kr(Yk)}. Hva er gjennomsnittsskatten til Ola og Kari? "
          "Rund av til én desimal.</p>"),
    options=[f"Ola {pc(ao)} og Kari {pc(ak)}",
             f"Ola {pc(f_marg[0])} og Kari {pc(f_marg[1])}",
             f"Ola {pc(f_skip[0])} og Kari {pc(f_skip[1])}",
             f"Ola {pc(f_hele[0])} og Kari {pc(f_hele[1])}"],
    answer=0,
    solution=(
        "<p><b>Regelen.</b> I et trinnsystem skattlegges hvert intervall med sin egen sats. Gjennomsnittsskatten er samlet "
        "skatt delt på hele inntekten.</p>"
        "<p><b>Regnestykket.</b></p>"
        + table(["Trinn", "Sats", f"Ola ({n(Yo)})", f"Kari ({n(Yk)})"],
                [["0 til 200 000", "10 %", n(ro[0]), n(rk[0])],
                 ["200 000 til 600 000", "25 %", n(ro[1]), n(rk[1])],
                 ["over 600 000", "35 %", n(ro[2]), n(rk[2])],
                 ["<b>Sum skatt</b>", "", f"<b>{n(To)}</b>", f"<b>{n(Tk)}</b>"]], numcols=(1, 2, 3))
        + f"<p>Ola: {n(To)}/{n(Yo)} = <b>{pc(ao)}</b>. Kari: {n(Tk)}/{n(Yk)} = {pc(ak, 2)} → <b>{pc(ak)}</b>.</p>"
        "<p><b>Hvorfor de andre er gale.</b></p>"
        f"<p><b>{pc(f_marg[0])} og {pc(f_marg[1])}</b> = marginalsatsen brukt på hele inntekten.<br>"
        f"<b>{pc(f_skip[0])} og {pc(f_skip[1])}</b> = det laveste trinnet glemt, som om de første kr 200 000 var skattefrie: "
        f"{n(trinnskatt(Yo, True)[0])}/{n(Yo)} og {n(trinnskatt(Yk, True)[0])}/{n(Yk)}.<br>"
        f"<b>{pc(f_hele[0])} og {pc(f_hele[1])}</b> = satsen brukt på hele inntekten opp til øvre grense i stedet for bare "
        f"intervallet: Ola 25 % × 600 000 + 35 % × {n(Yo - 600_000)} = {n(f_hele[0] * Yo)}, Kari 25 % × {n(Yk)} = {n(f_hele[1] * Yk)}.</p>"
        f"<p><b>Kontroll.</b> Ola tjener {kr(Yo - Yk)} mer enn Kari. Av det ligger {n(600_000 - Yk)} i 25 %-trinnet og "
        f"{n(Yo - 600_000)} i 35 %-trinnet: {n(0.25 * (600_000 - Yk))} + {n(0.35 * (Yo - 600_000))} = {n(diff_kontroll)}. "
        f"Forskjellen i skatt er {n(To)} − {n(Tk)} = {n(To - Tk)}. ✓</p>"
        "<p><b>Strategi med minuspoeng.</b> Gjennomsnittsskatten er alltid lavere enn marginalsatsen når det finnes et lavere "
        "trinn. Kari har marginalsats 25 %, så 25,0 % er umulig for henne. Dermed faller to alternativer. Ved kr 600 000 er "
        f"gjennomsnittsskatten {n(trinnskatt(600_000)[0])}/600 000 = {pc(snitt600, 0)}, så Ola må ligge mellom 20 % og 35 %. "
        "Begge de gjenværende alternativene gjør det, så Kari må regnes.</p>")))

# =================================================================== 4
MV = {"Primærbolig": 20_000_000, "Sekundærbolig": 5_000_000, "Aksjer": 8_000_000, "Bank": 2_000_000}
gjeld = 10_500_000
T_prim = 14_000_000
fv = {"Primærbolig": 0.25 * T_prim + 0.70 * (MV["Primærbolig"] - T_prim),
      "Sekundærbolig": MV["Sekundærbolig"], "Aksjer": 0.80 * MV["Aksjer"], "Bank": MV["Bank"]}
sumMV = sum(MV.values())
andel = {k: v / sumMV for k, v in MV.items()}
g_ford = {k: gjeld * andel[k] for k in MV}
g_fr = {k: (g_ford[k] * 0.80 if k == "Aksjer" else g_ford[k]) for k in MV}
sum_fv = sum(fv.values())
sum_gfr = sum(g_fr.values())
nettof = sum_fv - sum_gfr
fskatt = (nettof - 1_900_000) * 0.01
assert sumMV == 35_000_000 and round(fv["Primærbolig"]) == 7_700_000 and round(sum_fv) == 21_100_000
assert round(g_ford["Aksjer"]) == 2_400_000 and round(sum_gfr) == 10_020_000
assert round(nettof) == 11_080_000 and nettof < 21_500_000 and round(fskatt) == 91_800
# gale (a)
feil_a_fv = gjeld - gjeld * fv["Aksjer"] / sum_fv * 0.20
feil_a_bolig = g_ford["Primærbolig"] * 0.25 + g_ford["Sekundærbolig"] + g_fr["Aksjer"] + g_ford["Bank"]
assert round(feil_a_fv) == 9_863_033 and round(feil_a_bolig) == 5_520_000
# gale (b)
fv_feil_prim = sum_fv - fv["Primærbolig"] + 0.25 * MV["Primærbolig"]
feil_b_prim = (fv_feil_prim - sum_gfr - 1_900_000) * 0.01
feil_b_sek = (sum_fv - fv["Sekundærbolig"] + 0.25 * MV["Sekundærbolig"] - sum_gfr - 1_900_000) * 0.01
feil_b_gjeld = (sum_fv - gjeld - 1_900_000) * 0.01
assert (round(feil_b_prim), round(feil_b_sek), round(feil_b_gjeld)) == (64_800, 54_300, 87_000)
aggr = gjeld * (1 - MV["Aksjer"] * 0.20 / sumMV)
assert abs(aggr - sum_gfr) < 1e-6
kvart4 = gjeld / 4
maksred4 = 0.20 * kvart4
gulv4 = gjeld - maksred4
assert MV["Aksjer"] / sumMV < 0.25 and round(maksred4) == 525_000 and round(gulv4) == 9_975_000
assert feil_a_fv < gulv4 and feil_a_bolig < gulv4 and gulv4 < sum_gfr <= gjeld

kol = list(MV)
EX.append(dict(
    title="Formuesskatt med primærbolig over terskelen", topic="Formuesskatt", chapters=[7],
    body=("<p>Hedda er enslig. Ved utgangen av 2026 eier hun følgende, målt i markedsverdi:</p>"
          f"<ul><li>primærbolig: {kr(MV['Primærbolig'])}</li>"
          f"<li>sekundærbolig (utleieleilighet): {kr(MV['Sekundærbolig'])}</li>"
          f"<li>børsnoterte aksjer: {kr(MV['Aksjer'])}</li>"
          f"<li>bankinnskudd: {kr(MV['Bank'])}</li></ul>"
          f"<p>Hun har {kr(gjeld)} i gjeld. Bruk 2026-reglene: primærbolig verdsettes til 25 % av verdien opp til "
          "kr 14 000 000 og 70 % av verdien over. Sekundærbolig og bankinnskudd verdsettes til 100 % og aksjer til 80 %. "
          "Gjelden skal fordeles forholdsmessig etter markedsverdiene. Gjeld som faller på aksjene, skal reduseres med "
          "aksjerabatten. Gjeld som faller på primærboligen, skal ikke reduseres.</p>"),
    parts=[
        dict(label="a",
             body="<p>Hvor stor er Heddas fradragsberettigede gjeld?</p>",
             options=[Kr(gjeld), Kr(feil_a_fv), Kr(sum_gfr), Kr(feil_a_bolig)], answer=2,
             solution=(
                 "<p><b>Regelen.</b> Gjelden fordeles etter markedsverdiene før rabatt. Den delen som faller på aksjene, "
                 "reduseres med aksjerabatten på 20 %. Gjeld på primærbolig reduseres ikke. Sekundærbolig og bankinnskudd "
                 "har ingen rabatt og utløser ingen reduksjon.</p>"
                 "<p><b>Regnestykket.</b></p>"
                 + table([""] + kol + ["Sum"],
                         [["Markedsverdi"] + [n(MV[k]) for k in kol] + [n(sumMV)],
                          ["Andel"] + [pc(andel[k], 2) for k in kol] + ["100 %"],
                          ["Formuesverdi"] + [n(fv[k]) for k in kol] + [n(sum_fv)],
                          ["Gjeld fordelt"] + [n(g_ford[k]) for k in kol] + [n(gjeld)],
                          ["Fradragsberettiget gjeld"] + [n(g_fr[k]) for k in kol] + [n(sum_gfr)]],
                         numcols=(1, 2, 3, 4, 5))
                 + f"<p>1. Gjeld på aksjene: {n(gjeld)} × {n(MV['Aksjer'])}/{n(sumMV)} = {n(g_ford['Aksjer'])}.<br>"
                 f"2. Reduksjon: {n(g_ford['Aksjer'])} × 20 % = {n(g_ford['Aksjer'] * 0.2)}.<br>"
                 f"3. Fradragsberettiget gjeld: {n(gjeld)} − {n(g_ford['Aksjer'] * 0.2)} = <b>{kr(sum_gfr)}</b>.</p>"
                 "<p><b>Hvorfor de andre er gale.</b></p>"
                 f"<p><b>{Kr(gjeld)}</b> = ingen gjeldsreduksjon, selv om oppgaven sier at den skal brukes.<br>"
                 f"<b>{Kr(feil_a_fv)}</b> = gjelden fordelt etter formuesverdiene i stedet for markedsverdiene: "
                 f"{n(gjeld)} × {n(fv['Aksjer'])}/{n(sum_fv)} = {n(gjeld * fv['Aksjer'] / sum_fv)} på aksjene, redusert med 20 %.<br>"
                 f"<b>{Kr(feil_a_bolig)}</b> = boliggjelden også redusert med 75 %: {n(g_ford['Primærbolig'])} × 25 % + "
                 f"{n(g_ford['Sekundærbolig'])} + {n(g_fr['Aksjer'])} + {n(g_ford['Bank'])}.</p>"
                 f"<p><b>Kontroll.</b> Aggregatformelen: {n(gjeld)} × (1 − {n(MV['Aksjer'])} × 20 %/{n(sumMV)}) = "
                 f"{n(gjeld)} × {n(1 - MV['Aksjer'] * 0.2 / sumMV, 6)} = {n(aggr)}. ✓</p>"
                 "<p><b>Strategi med minuspoeng.</b> Bare aksjene utløser reduksjon. Aksjene er 8 av 35 mill., altså under en "
                 f"fjerdedel av markedsverdiene. Gjelden på aksjene er derfor under en fjerdedel av {n(gjeld)}, altså under {n(kvart4)}. "
                 f"Reduksjonen er høyst 20 % av den, altså under {n(maksred4)}. Svaret må derfor ligge over {n(gulv4)}. "
                 f"{Kr(feil_a_fv)} og {kr(feil_a_bolig)} faller utenfor.</p>")),
        dict(label="b",
             body=("<p>Hva blir Heddas formuesskatt for 2026? Formuesskatten er 1,0 % av nettoformuen over et bunnfradrag "
                   "på kr 1 900 000 (1,1 % av nettoformuen over kr 21 500 000).</p>"),
             options=[Kr(feil_b_prim), Kr(feil_b_sek), Kr(fskatt), Kr(feil_b_gjeld)], answer=2,
             solution=(
                 "<p><b>Regelen.</b> Primærbolig verdsettes til 25 % av de første kr 14 000 000 og 70 % av resten. "
                 "Nettoformuen er summen av formuesverdiene minus fradragsberettiget gjeld. Formuesskatten er 1,0 % av "
                 "nettoformuen over bunnfradraget.</p>"
                 "<p><b>Regnestykket.</b></p>"
                 f"<p>1. Primærbolig: {n(T_prim)} × 25 % + {n(MV['Primærbolig'] - T_prim)} × 70 % = {n(0.25 * T_prim)} + "
                 f"{n(0.7 * (MV['Primærbolig'] - T_prim))} = {kr(fv['Primærbolig'])}.<br>"
                 f"2. Formuesverdier: {n(fv['Primærbolig'])} + {n(fv['Sekundærbolig'])} + {n(fv['Aksjer'])} + {n(fv['Bank'])} = {kr(sum_fv)}.<br>"
                 f"3. Nettoformue: {n(sum_fv)} − {n(sum_gfr)} = {kr(nettof)}. Den er under kr 21 500 000, så bare satsen 1,0 % brukes.<br>"
                 f"4. Formuesskatt: ({n(nettof)} − 1 900 000) × 1,0 % = <b>{kr(fskatt)}</b>.</p>"
                 "<p><b>Hvorfor de andre er gale.</b></p>"
                 f"<p><b>{Kr(feil_b_prim)}</b> = hele primærboligen verdsatt til 25 % ({kr(0.25 * MV['Primærbolig'])}). "
                 "Du har glemt 70 %-sjiktet over kr 14 000 000.<br>"
                 f"<b>{Kr(feil_b_sek)}</b> = sekundærboligen verdsatt som en primærbolig til 25 % ({kr(0.25 * MV['Sekundærbolig'])}). "
                 "Sekundærbolig verdsettes til 100 %.<br>"
                 f"<b>{Kr(feil_b_gjeld)}</b> = ({n(sum_fv)} − {n(gjeld)} − 1 900 000) × 1,0 %. Du har glemt gjeldsreduksjonen fra a.</p>"
                 "<p><b>Kontroll.</b> Aktivum for aktivum: "
                 + ", ".join(f"{k.lower()} {n(fv[k])} − {n(g_fr[k])} = {n(fv[k] - g_fr[k])}" for k in kol)
                 + f". Sum {n(sum(fv[k] - g_fr[k] for k in kol))}. ✓</p>")),
    ]))

# =================================================================== 5
FV_for, rab, tau = 20_000_000, 0.20, 0.01
W5 = FV_for * (1 - rab)
F5 = W5 * tau
D5 = F5 / (1 - TE)
assert W5 == 16_000_000 and round(F5) == 160_000 and round(D5) == 257_400
f5_rab = FV_for * tau / (1 - TE)
f5_oppa = F5 * (1 + TE)
f5_22 = F5 / 0.78
assert (round(f5_rab), round(f5_oppa), round(f5_22)) == (321_750, 220_544, 205_128)
assert abs(D5 - D5 * TE - F5) < 1e-6
belast5 = D5 / W5

EX.append(dict(
    title="Utbyttet som skal betale formuesskatten", topic="Formuesskatt som avkastningsskatt", chapters=[8],
    body=("<p>Lars eier alle aksjene i det unoterte selskapet Lager og Logistikk AS. Aksjenes formuesverdi før rabatt "
          f"(selskapets skattemessige formuesverdi) er {kr(FV_for)}. Aksjerabatten er 20 %. Lars har ingen andre eiendeler "
          "og ingen gjeld. Han må ta utbytte fra selskapet for å betale formuesskatten. Anta at formuesskatten er 1,0 % og se "
          "bort fra bunnfradraget. Eierskatten er 22 % og oppjusteringsfaktoren 1,72. Se bort fra skjermingsfradraget. "
          "Hvor stort utbytte må Lars ta ut for å ha nøyaktig nok til formuesskatten etter at utbytteskatten er betalt? "
          "Rund av til nærmeste krone.</p>"),
    options=[Kr(f5_rab), Kr(f5_oppa), Kr(D5), Kr(f5_22)], answer=2,
    solution=(
        "<p><b>Regelen.</b> Lars må sitte igjen med formuesskatten etter at utbyttet er skattlagt. Utbyttet må derfor "
        "brutto-regnes: D × (1 − t<sub>e</sub>) = formuesskatt, altså D = formuesskatt/(1 − t<sub>e</sub>).</p>"
        "<p><b>Regnestykket.</b></p>"
        f"<p>1. Formuesverdi etter rabatt: {n(FV_for)} × 80 % = {kr(W5)}.<br>"
        f"2. Formuesskatt: {n(W5)} × 1,0 % = {kr(F5)}.<br>"
        "3. Effektiv eierskatt: 22 % × 1,72 = 37,84 %.<br>"
        f"4. Utbytte: {n(F5)}/(1 − 0,3784) = {n(F5)}/0,6216 = {n(D5, 2)} → <b>{kr(D5)}</b>.</p>"
        "<p><b>Hvorfor de andre er gale.</b></p>"
        f"<p><b>{Kr(f5_rab)}</b> = {n(FV_for * tau)}/0,6216. Du har glemt aksjerabatten og regnet formuesskatten av {kr(FV_for)}.<br>"
        f"<b>{Kr(f5_oppa)}</b> = {n(F5)} × 1,3784. Du har lagt skatten oppå i stedet for å brutto-regne. Etter eierskatt gir det "
        f"bare {n(f5_oppa)} × 0,6216 = {n(f5_oppa * (1 - TE))}, som ikke rekker.<br>"
        f"<b>{Kr(f5_22)}</b> = {n(F5)}/0,78. Du har brukt 22 % uten oppjustering.</p>"
        f"<p><b>Kontroll.</b> Eierskatt på utbyttet: {n(D5, 2)} × 37,84 % = {n(D5 * TE, 2)}. Igjen: {n(D5, 2)} − {n(D5 * TE, 2)} = "
        f"{n(D5 - D5 * TE, 2)}, nøyaktig formuesskatten. ✓ Samlet belastning er {n(D5)}/{n(W5)} = {pc(belast5, 2)} av "
        "formuesverdien, ikke 1,0 %.</p>"
        "<p><b>Strategi med minuspoeng.</b> Gang hvert alternativ med 0,6216 og se om det gir "
        f"{kr(F5)}. Uten kalkulator: eierskatten er under 50 %, så utbyttet må være under det dobbelte av formuesskatten, "
        f"altså under {kr(2 * F5)}. Det stryker {kr(f5_rab)}.</p>")))

# =================================================================== 6
Dp, Sp = -1.0, 4.0                       # lovlige eksempelhelninger til kontrollen
dq = Sp / (Sp - Dp)
dp = Dp / (Sp - Dp)
assert abs(dq - 0.8) < 1e-12 and abs(dp + 0.2) < 1e-12 and abs(dq - dp - 1) < 1e-12
assert abs(dq / dp - Sp / Dp) < 1e-12
# grensetilfellet S′ = 0
dq0 = 0 / (0 - Dp)
dp0 = Dp / (0 - Dp)
assert dq0 == 0 and dp0 == -1
Slik = -Dp  # lik deling krever S′ = −D′
assert abs(Slik / (Slik - Dp) - 0.5) < 1e-12 and abs(Dp / (Slik - Dp) + 0.5) < 1e-12

EX.append(dict(
    title="Stykkskatt innkrevd fra kjøperne: formelgjenkjenning", topic="Skatteincidens", chapters=[11],
    body=("<p>I et frikonkurransemarked innfører myndighetene en stykkskatt på t kroner per enhet. Denne gangen kreves "
          "skatten inn fra <i>kjøperne</i>. La q være prisen kjøperne betaler inkludert skatten. La p være prisen selgerne mottar, "
          "slik at q = p + t. Likevekten er D(q) = S(q − t), der D′(q) &lt; 0 er den deriverte av etterspørselsfunksjonen og "
          "S′(p) &gt; 0 den deriverte av tilbudsfunksjonen.</p>"),
    parts=[
        dict(label="a",
             body="<p>Hvilket uttrykk viser hvordan prisen kjøperne betaler, endres når skatten øker marginalt?</p>",
             options=["∂q/∂t = D′(q)/(S′(p) − D′(q))",
                      "∂q/∂t = S′(p)/(S′(p) − D′(q))",
                      "∂q/∂t = (S′(p) − D′(q))/S′(p)",
                      "∂q/∂t = S′(p)/(D′(q) − S′(p))"],
             answer=1,
             solution=(
                 "<p><b>Regelen.</b> Det spiller ingen rolle hvem som krever inn skatten. Likevekten er den samme ligningen "
                 "som når selgerne betaler den inn. Det er helningene som avgjør fordelingen.</p>"
                 "<p><b>Regnestykket.</b></p>"
                 "<p>1. Deriver D(q) = S(q − t) med hensyn på t: D′ × ∂q/∂t = S′ × (∂q/∂t − 1).<br>"
                 "2. Samle leddene med ∂q/∂t: ∂q/∂t × (S′ − D′) = S′.<br>"
                 "3. <b>∂q/∂t = S′(p)/(S′(p) − D′(q))</b>. Telleren er positiv og mindre enn nevneren, så verdien ligger "
                 "mellom 0 og 1.</p>"
                 "<p><b>Hvorfor de andre er gale.</b></p>"
                 "<p><b>D′(q)/(S′(p) − D′(q))</b> = endringen i prisen selgerne mottar, ∂p/∂t. Den er negativ. "
                 "Kjøperprisen kan ikke falle når skatten øker.<br>"
                 "<b>(S′(p) − D′(q))/S′(p)</b> = den omvendte brøken. Den er alltid større enn 1, altså en kjøperpris som "
                 "stiger med mer enn skatten.<br>"
                 "<b>S′(p)/(D′(q) − S′(p))</b> = nevneren med snudd fortegn. Den er alltid negativ.</p>"
                 f"<p><b>Kontroll.</b> Velg lovlige helninger, for eksempel D′ = {n(Dp)} og S′ = {n(Sp)}. Da er "
                 f"∂q/∂t = {n(Sp)}/{n(Sp - Dp)} = {n(dq, 1)} og ∂p/∂t = {n(Dp)}/{n(Sp - Dp)} = {n(dp, 1)}. "
                 f"Differansen er {n(dq, 1)} − ({n(dp, 1)}) = {n(dq - dp)}, nøyaktig skatten. ✓</p>"
                 "<p><b>Strategi med minuspoeng.</b> Kjøperprisen må stige med mellom 0 og 1 krone per krone skatt. "
                 "Det filteret stryker tre av fire alternativer uten derivasjon.</p>")),
        dict(label="b",
             body=("<p>Hvilket uttrykk viser forholdet (∂q/∂t)/(∂p/∂t) mellom endringen i prisen kjøperne betaler og "
                   "endringen i prisen selgerne mottar?</p>"),
             options=["D′(q)/S′(p)", "−1", "S′(p)/(S′(p) − D′(q))", "S′(p)/D′(q)"],
             answer=3,
             solution=(
                 "<p><b>Regelen.</b> Siden q = p + t er ∂p/∂t = ∂q/∂t − 1 = D′/(S′ − D′). Forholdet mellom de to "
                 "prisendringene er forholdet mellom helningene.</p>"
                 "<p><b>Regnestykket.</b></p>"
                 "<p>1. ∂q/∂t = S′/(S′ − D′).<br>"
                 "2. ∂p/∂t = D′/(S′ − D′).<br>"
                 "3. Del: (∂q/∂t)/(∂p/∂t) = <b>S′(p)/D′(q)</b>. Nevnerne stryker hverandre.</p>"
                 "<p><b>Hvorfor de andre er gale.</b></p>"
                 "<p><b>D′(q)/S′(p)</b> = brøken snudd, altså forholdet (∂p/∂t)/(∂q/∂t).<br>"
                 "<b>−1</b> = gjelder bare når S′ = −D′, altså når de to helningene er like store i tallverdi. Du har "
                 "forvekslet forholdet med kontrollen ∂q/∂t − ∂p/∂t = 1.<br>"
                 "<b>S′(p)/(S′(p) − D′(q))</b> = ∂q/∂t alene, ikke forholdet.</p>"
                 f"<p><b>Kontroll.</b> Med D′ = {n(Dp)} og S′ = {n(Sp)}: {n(dq, 1)}/({n(dp, 1)}) = {n(dq / dp)}. Formelen gir "
                 f"S′/D′ = {n(Sp)}/({n(Dp)}) = {n(Sp / Dp)}. ✓ Forholdet er negativt fordi prisene går hver sin vei. Jo sterkere "
                 "tilbudet reagerer på pris sammenlignet med etterspørselen, jo større del av skatten bærer kjøperne.</p>")),
        dict(label="c",
             body=("<p>Anta nå at tilbudet er perfekt uelastisk, altså S′(p) = 0, for eksempel fordi varen er tomter i et "
                   "område der det ikke kan bygges ut mer. Hva blir ∂q/∂t og ∂p/∂t?</p>"),
             options=["∂q/∂t = 1 og ∂p/∂t = 0: kjøperne bærer hele skatten",
                      "∂q/∂t = 0 og ∂p/∂t = −1: selgerne bærer hele skatten",
                      "∂q/∂t = 0 og ∂p/∂t = 0: ingen bærer skatten fordi kvantum ikke endres",
                      "∂q/∂t = 0,5 og ∂p/∂t = −0,5: skatten deles likt mellom sidene"],
             answer=1,
             solution=(
                 "<p><b>Regelen.</b> Den minst elastiske siden av markedet bærer skatten. Perfekt uelastisk tilbud betyr "
                 "S′ = 0: tilbudt mengde er den samme uansett pris.</p>"
                 "<p><b>Regnestykket.</b></p>"
                 "<p>1. ∂q/∂t = S′/(S′ − D′) = 0/(0 − D′) = <b>0</b>.<br>"
                 "2. ∂p/∂t = D′/(S′ − D′) = D′/(−D′) = <b>−1</b>.<br>"
                 "3. Kjøperprisen står stille. Prisen selgerne mottar, faller med hele skatten. Selgerne bærer alt, selv om "
                 "det er kjøperne som betaler skatten inn.</p>"
                 "<p><b>Hvorfor de andre er gale.</b></p>"
                 "<p><b>∂q/∂t = 1 og ∂p/∂t = 0</b> = svaret for perfekt uelastisk <i>etterspørsel</i> (D′ = 0) eller perfekt "
                 "elastisk tilbud. Du har byttet om sidene.<br>"
                 "<b>∂q/∂t = 0 og ∂p/∂t = 0</b> = bryter identiteten ∂q/∂t − ∂p/∂t = 1. Staten får t per enhet. Noen må "
                 "betale det.<br>"
                 "<b>∂q/∂t = 0,5 og ∂p/∂t = −0,5</b> = lik deling. Paret består kontrollen ∂q/∂t − ∂p/∂t = 1, men lik deling "
                 "krever S′ = −D′, altså at tilbudet og etterspørselen reagerer like sterkt på pris. Med S′ = 0 reagerer "
                 "tilbudet ikke i det hele tatt.</p>"
                 "<p><b>Kontroll.</b> 0 − (−1) = 1. ✓ Tomteeieren kan ikke flytte tomten, har ingen alternativ anvendelse "
                 "og må ta hele skatten selv.</p>")),
    ]))

# =================================================================== 7
R7, r7 = 0.050, 0.035
tstar = (R7 - r7) / R7
assert round(tstar, 6) == 0.30
f7 = {"r_nevner": (R7 - r7) / r7, "rR": r7 / R7, "pp": R7 - r7}
assert round(f7["r_nevner"] * 100, 1) == 42.9 and round(f7["rR"], 3) == 0.7
inv = {"Anna": 0.22, "Bjørn": 0.28, "Cecilie": 0.35}
etter = {k: R7 * (1 - v) for k, v in inv.items()}
valg = {k: ("B" if etter[k] < r7 else "A") for k in inv}
assert valg == {"Anna": "A", "Bjørn": "A", "Cecilie": "B"}
gevinst_C = (inv["Cecilie"] - tstar) * R7
assert abs(gevinst_C - (r7 - etter["Cecilie"])) < 1e-12

EX.append(dict(
    title="Skattefri obligasjon: implisitt skatt og valgregelen", topic="Implisitt skatt", chapters=[12],
    body=(f"<p>To obligasjoner har samme risiko og samme løpetid. Obligasjon A gir {pc(R7)} skattepliktig rente. "
          f"Obligasjon B gir {pc(r7)} skattefri rente. Kapitalmarkedet er velfungerende og i likevekt.</p>"),
    parts=[
        dict(label="a",
             body="<p>Hvor stor er den implisitte skatten på obligasjon B? Rund av til én desimal.</p>",
             options=[pc(f7["r_nevner"]), pc(tstar), pc(f7["rR"]), pc(f7["pp"])], answer=1,
             solution=(
                 "<p><b>Regelen.</b> To papirer med samme risiko må gi samme avkastning etter skatt for den marginale "
                 "investoren: r = R × (1 − t*). Den implisitte skatten er t* = (R − r)/R, målt mot avkastningen før skatt.</p>"
                 "<p><b>Regnestykket.</b></p>"
                 f"<p>t* = ({n(R7 * 100, 1)} − {n(r7 * 100, 1)})/{n(R7 * 100, 1)} = {n((R7 - r7) * 100, 1)}/{n(R7 * 100, 1)} = <b>{pc(tstar)}</b>.</p>"
                 "<p><b>Hvorfor de andre er gale.</b></p>"
                 f"<p><b>{pc(f7['r_nevner'])}</b> = ({n(R7 * 100, 1)} − {n(r7 * 100, 1)})/{n(r7 * 100, 1)}. Feil nevner: en skattesats måles mot "
                 "grunnlaget før skatt, altså R.<br>"
                 f"<b>{pc(f7['rR'])}</b> = r/R = {n(r7 * 100, 1)}/{n(R7 * 100, 1)}. Det er andelen investoren beholder, ikke skatten. "
                 "Du har glemt å trekke fra 1.<br>"
                 f"<b>{pc(f7['pp'])}</b> = R − r. Det er en forskjell i prosentpoeng, ikke en skattesats.</p>"
                 f"<p><b>Kontroll.</b> {pc(R7)} × (1 − {n(tstar, 2)}) = {pc(R7 * (1 - tstar))}. ✓ En investor med {pc(tstar, 0)} "
                 "marginalskatt får like mye etter skatt fra begge papirene.</p>")),
        dict(label="b",
             body=("<p>Tre investorer vurderer de to obligasjonene. Anta at renteinntekter skattlegges med hver investors "
                   "egen marginalskatt: Anna 22 %, Bjørn 28 % og Cecilie 35 %. Hvem bør velge den skattefrie obligasjonen B?</p>"),
             options=["Alle tre, fordi renten på B er skattefri",
                      "Anna og Bjørn, fordi de har lavest marginalskatt",
                      "Ingen av dem, fordi B har lavere rente før skatt enn A",
                      "Bare Cecilie, fordi 35 % er over den implisitte skatten"],
             answer=3,
             solution=(
                 "<p><b>Regelen.</b> Valgregelen: har du høyere marginalskatt enn den implisitte skatten, velger du det "
                 "skattefrie papiret. Har du lavere, velger du det skattlagte.</p>"
                 "<p><b>Regnestykket.</b></p>"
                 + table(["Investor", "Marginalskatt", "A etter skatt", "B (skattefri)", "Valg"],
                         [[k, pc(v, 0), pc(etter[k], 2), pc(r7, 2), valg[k]] for k, v in inv.items()], numcols=(1, 2, 3))
                 + f"<p>Bare Cecilie har marginalskatt over den implisitte skatten på {pc(tstar, 0)}. <b>Bare Cecilie</b> bør velge B.</p>"
                 "<p><b>Hvorfor de andre er gale.</b></p>"
                 "<p><b>«Alle tre»</b> = du har sett bort fra at skattefordelen allerede er priset inn i den lave renten på B.<br>"
                 "<b>«Anna og Bjørn»</b> = valgregelen snudd. Lav marginalskatt gjør skattefritaket mindre verdt.<br>"
                 "<b>«Ingen av dem»</b> = du har sammenlignet rentene før skatt. Det er avkastningen etter din egen skatt som teller.</p>"
                 f"<p><b>Kontroll.</b> Cecilies gevinst ved å velge B er (35 % − {pc(tstar, 0)}) × {pc(R7)} = "
                 f"{n(gevinst_C * 100, 2)} prosentpoeng. Direkte: {n(r7 * 100, 2)} − {n(etter['Cecilie'] * 100, 2)} = {n(gevinst_C * 100, 2)}. ✓</p>")),
    ]))

# =================================================================== 8
I8, a8, T8, t8, rho8 = 300_000, 60_000, 5, 0.22, 0.07
naa = I8 * t8
arlig = a8 * t8
AF = annuitet(rho8, T8)
NV_ford = arlig * AF
diff8 = naa - NV_ford
SF = sluttfaktor(rho8, T8)
FV_ford = arlig * SF
assert naa == 66_000 and round(arlig) == 13_200 and round(NV_ford) == 54_123 and round(diff8) == 11_877 and round(FV_ford) == 75_910
assert abs(T8 * arlig - naa) < 1e-9
kontroll8 = (naa * (1 + rho8) ** T8 - FV_ford) / (1 + rho8) ** T8
assert abs(kontroll8 - diff8) < 1e-6

EX.append(dict(
    title="Utgiftsføre nå eller avskrive over fem år", topic="Fradragets tidsverdi", chapters=[2],
    body=(f"<p>Sigrids eiendomsselskap har kjøpt inventar til utleieboligene for {kr(I8)}. Selskapet kan enten utgiftsføre "
          f"hele beløpet med en gang eller avskrive {kr(a8)} i året i fem år. Selskapsskatten er 22 %. Selskapet har "
          "overskudd nok til å utnytte fradraget fullt ut uansett valg. Utgiftsfører selskapet alt, kommer hele "
          "skattebesparelsen i dag. Avskriver det, kommer besparelsen ved utgangen av hvert av de fem neste årene. "
          "Selskapet diskonterer med 7 %. Oppjusteringsfaktoren for utbytte er 1,72. Hva bør selskapet velge?</p>"),
    options=[f"Det spiller ingen rolle: skattebesparelsen er {kr(naa)} i begge tilfeller",
             f"Utgiftsføre alt nå: det er {kr(diff8)} mer verdt i nåverdi",
             f"Utgiftsføre alt nå: det er {kr(NV_ford)} mer verdt i nåverdi",
             f"Avskrive over fem år: besparelsene er da verdt {kr(FV_ford)}, mer enn {kr(naa)}"],
    answer=1,
    solution=(
        "<p><b>Regelen.</b> Et fradrag er mer verdt jo tidligere det kommer, fordi skattebesparelsen kan forrentes. "
        "Så lenge selskapet har inntekt å trekke fradraget fra og renten er positiv, lønner det seg å ta det så tidlig som mulig.</p>"
        "<p><b>Regnestykket.</b></p>"
        f"<p>1. Utgiftsføre alt nå: {n(I8)} × 22 % = {kr(naa)} i dag.<br>"
        f"2. Avskrive: {n(a8)} × 22 % = {kr(arlig)} i året i fem år.<br>"
        f"3. Annuitetsfaktor: (1 − 1,07<sup>−5</sup>)/0,07 = {n(AF, 4)}. Nåverdi: {n(arlig)} × {n(AF, 4)} = {kr(NV_ford)}.<br>"
        f"4. Forskjell: {n(naa)} − {n(NV_ford)} = <b>{kr(diff8)}</b> i favør av å utgiftsføre alt nå.</p>"
        "<p><b>Hvorfor de andre er gale.</b></p>"
        f"<p><b>«Spiller ingen rolle»</b> = du har sammenlignet udiskonterte kroner: 5 × {n(arlig)} = {n(naa)}. Beløpene er like, "
        "men tidspunktene er ulike.<br>"
        f"<b>«{kr(NV_ford)} mer verdt»</b> = nåverdien av avskrivningene, et mellomresultat, ikke forskjellen.<br>"
        f"<b>«Avskrive, {kr(FV_ford)}»</b> = {n(arlig)} × (1,07<sup>5</sup> − 1)/0,07 = {n(arlig)} × {n(SF, 4)}. Du har brukt "
        "sluttverdifaktoren i stedet for nåverdifaktoren og sammenlignet en sluttverdi med en nåverdi.</p>"
        f"<p><b>Kontroll.</b> Sammenlign på sluttidspunktet i stedet: {n(naa)} forrentet i fem år er {n(naa)} × 1,07<sup>5</sup> = "
        f"{n(naa * (1 + rho8) ** T8, 2)}, mot {n(FV_ford, 2)} for avskrivningene. Forskjellen {n(naa * (1 + rho8) ** T8 - FV_ford, 2)} "
        f"diskontert fem år er {n(kontroll8, 2)}. ✓ Oppjusteringsfaktoren har ingenting her å gjøre: den gjelder utbytte og "
        "aksjegevinst hos personlige aksjonærer.</p>"
        "<p><b>Strategi med minuspoeng.</b> Med positiv rente kan «spiller ingen rolle» aldri være riktig. «Avskrive» "
        "krever negativ rente. To alternativer faller før du regner.</p>")))

# =================================================================== 9
oms = {"Norge": 40_000_000, "Tyskland": 25_000_000, "Irland": 20_000_000, "Bahamas": 15_000_000}
sats = {"Norge": 0.22, "Tyskland": 0.30, "Irland": 0.125, "Bahamas": 0.10}
tn = sats["Norge"]
tot_oms = sum(oms.values())
lokal = {k: oms[k] * sats[k] for k in oms if k != "Norge"}
norsk_brutto = {k: oms[k] * tn for k in oms}
# Norge til Norge
til_norge = {"Norge": norsk_brutto["Norge"]}
# Irland: fullstendig unntak
til_norge["Irland"] = 0
# Tyskland: vanlig kredit
kred_T = min(lokal["Tyskland"], norsk_brutto["Tyskland"])
til_norge["Tyskland"] = max(0, norsk_brutto["Tyskland"] - kred_T)
ukred_T = max(0, lokal["Tyskland"] - norsk_brutto["Tyskland"])
# Bahamas: ingen avtale, ingen lempning
til_norge["Bahamas"] = norsk_brutto["Bahamas"]
sum_norge = sum(til_norge.values())
sum_lokal = sum(lokal.values())
assert tot_oms == 100_000_000
assert round(lokal["Irland"]) == 2_500_000 and round(lokal["Tyskland"]) == 7_500_000 and round(lokal["Bahamas"]) == 1_500_000
assert round(norsk_brutto["Tyskland"]) == 5_500_000 and round(til_norge["Tyskland"]) == 0 and round(ukred_T) == 2_000_000
assert round(sum_norge) == 12_100_000 and round(sum_lokal) == 11_500_000
# gale (a)
a9_feil = {"kilde": oms["Norge"], "avtaleland": oms["Norge"] + oms["Bahamas"], "irland": tot_oms - oms["Irland"]}
# gale (b)
b9_kredit = norsk_brutto["Irland"] - lokal["Irland"]
assert round(b9_kredit) == 1_900_000 and round(norsk_brutto["Irland"]) == 4_400_000
# gale (d)
d9_kredit = norsk_brutto["Bahamas"] - lokal["Bahamas"]
assert round(d9_kredit) == 1_800_000 and round(norsk_brutto["Bahamas"]) == 3_300_000
d9_sum = lokal["Bahamas"] + norsk_brutto["Bahamas"]
assert round(d9_sum) == 4_800_000
# gale (e)
e9 = {"bahamas_kredit": til_norge["Norge"] + d9_kredit,
      "bare_norge": til_norge["Norge"],
      "full_kredit": til_norge["Norge"] + (norsk_brutto["Tyskland"] - lokal["Tyskland"]) + til_norge["Bahamas"]}
assert (round(e9["bahamas_kredit"]), round(e9["bare_norge"]), round(e9["full_kredit"])) == (10_600_000, 8_800_000, 10_100_000)
total9 = sum_norge + sum_lokal
mer9 = total9 - tot_oms * tn
spor = (oms["Tyskland"] * (sats["Tyskland"] - tn), oms["Bahamas"] * sats["Bahamas"], oms["Irland"] * (sats["Irland"] - tn))
assert abs(sum(spor) - mer9) < 1e-6 and round(mer9) == 1_600_000
# exit (f)
inng, mv_exit, bunn = 2_000_000, 32_000_000, 3_000_000
latent = mv_exit - inng
grunnlag = latent - bunn
exit_skatt = grunnlag * TE
rate = exit_skatt / 12
assert round(exit_skatt) == 10_216_800 and round(rate) == 851_400
f_exit_bunn = latent * TE
f_exit_22 = grunnlag * 0.22
assert (round(f_exit_bunn), round(f_exit_bunn / 12)) == (11_352_000, 946_000)
assert (round(f_exit_22), round(f_exit_22 / 12)) == (5_940_000, 495_000)

rader9 = [["Norge", n(oms["Norge"]), "intern rett", "0", n(til_norge["Norge"])],
          ["Tyskland", n(oms["Tyskland"]), "vanlig kredit", n(lokal["Tyskland"]), n(til_norge["Tyskland"])],
          ["Irland", n(oms["Irland"]), "fullstendig unntak", n(lokal["Irland"]), n(til_norge["Irland"])],
          ["Bahamas", n(oms["Bahamas"]), "ingen avtale", n(lokal["Bahamas"]), n(til_norge["Bahamas"])],
          ["<b>Sum</b>", f"<b>{n(tot_oms)}</b>", "", f"<b>{n(sum_lokal)}</b>", f"<b>{n(sum_norge)}</b>"]]

EX.append(dict(
    title="Havbris Analytics AS: fire land og en utflytting", topic="Internasjonal skatt", chapters=[13, 6],
    body=("<p>Havbris Analytics AS er stiftet og hjemmehørende i Bergen og selger programvare for værvarsling til "
          "oppdrettsnæringen. Selskapet har egne kontorer med fast ansatte salgsteam i Tyskland, i Irland og på Bahamas. "
          "Skattemyndighetene i alle tre land har slått fast at kontorene er faste driftssteder. Den lokale omsetningen "
          "skattlegges derfor fullt ut der etter landets interne rett.</p>"
          f"<p>I 2026 har selskapet {kr(tot_oms)} i omsetning og ingen kostnader:</p>"
          f"<ul><li>{kr(oms['Norge'])} fra Norge</li><li>{kr(oms['Tyskland'])} fra Tyskland</li>"
          f"<li>{kr(oms['Irland'])} fra Irland</li><li>{kr(oms['Bahamas'])} fra Bahamas</li></ul>"
          "<p>Du kan forutsette at:</p>"
          "<ul><li>skatteavtalen mellom Norge og Tyskland bygger på den vanlige kreditmetoden</li>"
          "<li>skatteavtalen mellom Norge og Irland bygger på unntaksmetoden med fullstendig unntak</li>"
          "<li>det ikke finnes skatteavtale mellom Norge og Bahamas</li>"
          "<li>Norge gir bare lempning for utenlandsk skatt (unntak eller kreditfradrag) når en skatteavtale krever det. "
          "Se bort fra de ensidige kreditreglene i skatteloven.</li>"
          "<li>selskapsskatten er 22 % i Norge, 30 % i Tyskland, 12,5 % i Irland og 10 % på Bahamas</li></ul>"),
    parts=[
        dict(label="a",
             body="<p>Hvor mye av omsetningen er skattepliktig til Norge etter norsk intern rett isolert sett, før skatteavtalene er tatt hensyn til?</p>",
             options=[Kr(a9_feil["kilde"]), Kr(a9_feil["avtaleland"]), Kr(a9_feil["irland"]), Kr(tot_oms)], answer=3,
             solution=(
                 "<p><b>Regelen.</b> Et selskap som er hjemmehørende i Norge, har globalskatteplikt etter norsk intern rett: "
                 "hele verdensinntekten er skattepliktig hit. Skatteavtalene kan begrense den retten, men «isolert sett» betyr "
                 "at de ikke er tatt hensyn til ennå.</p>"
                 "<p><b>Regnestykket.</b></p>"
                 f"<p>{n(oms['Norge'])} + {n(oms['Tyskland'])} + {n(oms['Irland'])} + {n(oms['Bahamas'])} = <b>{kr(tot_oms)}</b>.</p>"
                 "<p><b>Hvorfor de andre er gale.</b></p>"
                 f"<p><b>{Kr(a9_feil['kilde'])}</b> = bare den norske omsetningen. Det er kildeprinsippet, ikke globalskatteplikten.<br>"
                 f"<b>{Kr(a9_feil['avtaleland'])}</b> = Norge og Bahamas. Du har trukket fra all omsetning fra avtaleland, men "
                 "avtalene skal ikke brukes ennå. Kreditmetoden fjerner dessuten ikke Norges rett til å skattlegge inntekten fra Tyskland.<br>"
                 f"<b>{Kr(a9_feil['irland'])}</b> = alt unntatt Irland. Du har brukt unntaksavtalen før spørsmålet ber om det.</p>"
                 "<p><b>Kontroll.</b> Et fast driftssted i utlandet gir kildestaten rett til å skattlegge, men endrer ikke ett ord "
                 "i skatteloven. Norges interne rett er den samme.</p>")),
        dict(label="b",
             body="<p>Hvordan skattlegges omsetningen fra Irland når skatteavtalen tas hensyn til?</p>",
             options=[f"Både i Irland og i Norge: {kr(lokal['Irland'])} til Irland og {kr(b9_kredit)} til Norge",
                      f"Bare i Norge: {kr(norsk_brutto['Irland'])}, fordi selskapet har globalskatteplikt hit",
                      "Ingen av landene skattlegger den, fordi unntaksmetoden fritar inntekten",
                      f"Bare i Irland: {kr(lokal['Irland'])} til Irland og ingenting til Norge"],
             answer=3,
             solution=(
                 "<p><b>Regelen.</b> Under unntaksmetoden med fullstendig unntak gir Norge helt avkall på inntekten. "
                 "Kildestaten skattlegger alene, med sin egen sats.</p>"
                 "<p><b>Regnestykket.</b></p>"
                 f"<p>Irland: {n(oms['Irland'])} × 12,5 % = <b>{kr(lokal['Irland'])}</b>. Norge: kr 0.</p>"
                 "<p><b>Hvorfor de andre er gale.</b></p>"
                 f"<p><b>«Både i Irland og i Norge»</b> = kreditmetoden: {n(oms['Irland'])} × 22 % − {n(lokal['Irland'])} = "
                 f"{n(b9_kredit)}. Avtalen med Irland bygger på unntak.<br>"
                 "<b>«Bare i Norge»</b> = globalskatteplikten uten avtalen. Den var svaret i a, ikke her.<br>"
                 "<b>«Ingen av landene»</b> = unntaket gjelder Norge, ikke Irland. Dobbelt ikke-beskatning oppstår bare hvis "
                 "kildestaten selv lar være å skattlegge.</p>"
                 "<p><b>Kontroll.</b> Samlet sats på inntekten fra Irland blir 12,5 %, lavere enn den norske. Unntaksmetoden "
                 "fjerner dobbeltbeskatning, men den utjevner ikke satser.</p>")),
        dict(label="c",
             body="<p>Hvordan blir omsetningen fra Tyskland skattlagt i Norge når skatteavtalen tas hensyn til?</p>",
             options=[f"Norge krever ingen skatt og betaler i tillegg tilbake {kr(ukred_T)}, fordi kreditten er hele den tyske skatten",
                      f"Norge krever ingen skatt. {Kr(ukred_T)} av den tyske skatten blir stående uten kreditfradrag",
                      f"Norge krever {kr(norsk_brutto['Tyskland'])} i tillegg til den tyske skatten, fordi selskapet har globalskatteplikt",
                      f"Norge krever {kr(ukred_T)}, som er differansen mellom tysk og norsk skatt på inntekten"],
             answer=1,
             solution=(
                 "<p><b>Regelen.</b> Under vanlig kreditmetode skattlegger begge land, men Norge gir fradrag for tysk skatt "
                 "begrenset til den norske skatten på samme inntekt: kreditfradrag = min(tysk skatt; norsk skatt). "
                 "Restskatten til Norge kan ikke bli negativ.</p>"
                 "<p><b>Regnestykket.</b></p>"
                 f"<p>1. Tysk skatt: {n(oms['Tyskland'])} × 30 % = {kr(lokal['Tyskland'])}.<br>"
                 f"2. Norsk skatt på samme inntekt: {n(oms['Tyskland'])} × 22 % = {kr(norsk_brutto['Tyskland'])}.<br>"
                 f"3. Kreditfradrag: min({n(lokal['Tyskland'])}; {n(norsk_brutto['Tyskland'])}) = {kr(kred_T)}.<br>"
                 f"4. Restskatt til Norge: {n(norsk_brutto['Tyskland'])} − {n(kred_T)} = <b>kr 0</b>.<br>"
                 f"5. Tysk skatt uten kreditfradrag: {n(lokal['Tyskland'])} − {n(kred_T)} = <b>{kr(ukred_T)}</b>.</p>"
                 "<p><b>Hvorfor de andre er gale.</b></p>"
                 f"<p><b>«Betaler tilbake {kr(ukred_T)}»</b> = full kredit. Vanlig kredit har et tak. Ingen stat betaler ut "
                 "penger for å dekke en annen stats skatt.<br>"
                 f"<b>«Krever {kr(norsk_brutto['Tyskland'])} i tillegg»</b> = ingen lempning, som om avtalen ikke fantes.<br>"
                 f"<b>«Krever {kr(ukred_T)}»</b> = differansen mellom skattene, men med feil fortegn. Restskatt til Norge oppstår "
                 "bare når kildeskatten er lavere enn den norske.</p>"
                 "<p><b>Kontroll.</b> Under vanlig kredit ender samlet sats på den høyeste av de to satsene: maks(22 %; 30 %) = 30 %. "
                 f"Det gir {n(oms['Tyskland'])} × 30 % = {n(lokal['Tyskland'])}. ✓</p>")),
        dict(label="d",
             body="<p>Hvordan blir omsetningen fra Bahamas skattlagt?</p>",
             options=[f"Begge land skattlegger etter sin interne rett: {kr(lokal['Bahamas'])} til Bahamas og {kr(norsk_brutto['Bahamas'])} til Norge",
                      f"Bare Bahamas skattlegger, fordi det ikke finnes avtale som gir Norge rett: {kr(lokal['Bahamas'])}",
                      f"Begge land skattlegger, men Norge gir kreditfradrag: {kr(lokal['Bahamas'])} til Bahamas og {kr(d9_kredit)} til Norge",
                      f"Bare Norge skattlegger, fordi selskapet har globalskatteplikt hit: {kr(norsk_brutto['Bahamas'])}"],
             answer=0,
             solution=(
                 "<p><b>Regelen.</b> Uten skatteavtale skattlegger begge land etter sin interne rett. Oppgaven forutsetter at "
                 "Norge bare lemper når en avtale krever det, så det gis verken unntak eller kreditfradrag.</p>"
                 "<p><b>Regnestykket.</b></p>"
                 f"<p>1. Bahamas: {n(oms['Bahamas'])} × 10 % = {kr(lokal['Bahamas'])}.<br>"
                 f"2. Norge: {n(oms['Bahamas'])} × 22 % = {kr(norsk_brutto['Bahamas'])}.<br>"
                 f"3. Samlet: <b>{kr(d9_sum)}</b>, altså {pc(d9_sum / oms['Bahamas'], 0)} av inntekten.</p>"
                 "<p><b>Hvorfor de andre er gale.</b></p>"
                 "<p><b>«Bare Bahamas»</b> = det motsatte av regelen. Det er en avtale som kunne gitt Bahamas eneretten. Uten "
                 "avtale er det ingenting som stanser Norge.<br>"
                 "<b>«Norge gir kreditfradrag»</b> = kreditmetoden brukt uten avtale. Oppgaven har sagt at Norge bare lemper "
                 "når en avtale krever det.<br>"
                 "<b>«Bare Norge»</b> = norsk lov binder ikke Bahamas, som skattlegger det faste driftsstedet etter sin egen rett.</p>"
                 f"<p><b>Kontroll.</b> Uten avtale legges satsene sammen: 22 % + 10 % = 32 %. Det gir {n(oms['Bahamas'])} × 32 % = {n(d9_sum)}. ✓</p>")),
        dict(label="e",
             body="<p>Hvor mye betaler Havbris Analytics AS til sammen i skatt til Norge for 2026?</p>",
             options=[Kr(e9["bahamas_kredit"]), Kr(sum_norge), Kr(e9["bare_norge"]), Kr(e9["full_kredit"])], answer=1,
             solution=(
                 "<p><b>Regelen.</b> Regn ett land om gangen med den metoden som gjelder for det landet. Legg så sammen det "
                 "som går til Norge.</p>"
                 "<p><b>Regnestykket.</b></p>"
                 + table(["Marked", "Omsetning", "Metode", "Skatt lokalt", "Skatt til Norge"], rader9, numcols=(1, 3, 4))
                 + f"<p>Skatt til Norge: {n(til_norge['Norge'])} + 0 + 0 + {n(til_norge['Bahamas'])} = <b>{kr(sum_norge)}</b>.</p>"
                 "<p><b>Hvorfor de andre er gale.</b></p>"
                 f"<p><b>{Kr(e9['bahamas_kredit'])}</b> = kreditfradrag også for skatten på Bahamas: {n(til_norge['Norge'])} + {n(d9_kredit)}.<br>"
                 f"<b>{Kr(e9['bare_norge'])}</b> = bare skatten på den norske omsetningen. Du har latt Bahamas skattlegge alene, "
                 "som om manglende avtale ga kildestaten eneretten (feilen fra d).<br>"
                 f"<b>{Kr(e9['full_kredit'])}</b> = full kredit for Tyskland, slik at Norge «betaler tilbake» {n(ukred_T)}: "
                 f"{n(til_norge['Norge'])} − {n(ukred_T)} + {n(til_norge['Bahamas'])}.</p>"
                 f"<p><b>Kontroll.</b> Samlet skatt er {n(sum_lokal)} + {n(sum_norge)} = {n(total9)}, altså {pc(total9 / tot_oms)} av "
                 f"omsetningen. Mot ren norsk beskatning på {n(tot_oms * tn)} er merbelastningen {n(mer9)}. Den skal kunne spores: "
                 f"Tyskland {n(oms['Tyskland'])} × (30 % − 22 %) = {n(spor[0])}, Bahamas {n(oms['Bahamas'])} × 10 % = {n(spor[1])} "
                 f"og Irland {n(oms['Irland'])} × (12,5 % − 22 %) = {n(spor[2])}. Sum {n(sum(spor))}. ✓</p>")),
        dict(label="f",
             body=("<p>Medgründeren Henrik eier 5 % av aksjene i Havbris Analytics AS. Han kjøpte dem for "
                   f"{kr(inng)}, har bodd i Norge hele livet og flytter til Portugal i 2026. Dagen før utflyttingen er aksjene "
                   f"hans verdt {kr(mv_exit)}. Hva blir konsekvensen etter reglene for exit-skatt som gjelder i 2026? "
                   f"Bunnfradraget er {kr(bunn)}. Eierskatten er 22 % med oppjusteringsfaktor 1,72.</p>"),
             options=[f"Exit-skatt på {kr(f_exit_bunn)}, som han kan betale i tolv rentefrie årlige rater på {kr(f_exit_bunn / 12)}",
                      "Ingen skatt nå: skatten på den latente gevinsten bortfaller hvis han ikke selger aksjene innen fem år",
                      f"Exit-skatt på {kr(exit_skatt)}, som han kan betale i tolv rentefrie årlige rater på {kr(rate)}",
                      f"Exit-skatt på {kr(f_exit_22)}, som han kan betale i tolv rentefrie årlige rater på {kr(f_exit_22 / 12)}"],
             answer=2,
             solution=(
                 "<p><b>Regelen.</b> Etter reglene som har gjeldt siden 20. mars 2024, anses latent gevinst på aksjer realisert "
                 "dagen før utflytting. Exit-skatt = (markedsverdi − inngangsverdi − bunnfradrag) × 37,84 %. Skatten kan betales "
                 "i tolv rentefrie årlige rater, som én sum etter tolv år med renter eller med en gang. Femårsregelen ble "
                 "opphevet i 2022.</p>"
                 "<p><b>Regnestykket.</b></p>"
                 f"<p>1. Latent gevinst: {n(mv_exit)} − {n(inng)} = {kr(latent)}.<br>"
                 f"2. Etter bunnfradrag: {n(latent)} − {n(bunn)} = {kr(grunnlag)}.<br>"
                 f"3. Exit-skatt: {n(grunnlag)} × 1,72 × 22 % = {n(grunnlag)} × 37,84 % = <b>{kr(exit_skatt)}</b>.<br>"
                 f"4. Tolv rentefrie rater: {n(exit_skatt)}/12 = <b>{kr(rate)}</b> i året.</p>"
                 "<p><b>Hvorfor de andre er gale.</b></p>"
                 f"<p><b>{Kr(f_exit_bunn)}</b> = {n(latent)} × 37,84 %. Du har glemt bunnfradraget.<br>"
                 "<b>«Bortfaller etter fem år»</b> = femårsregelen, som gjaldt fram til november 2022. Den står i H2022 "
                 "oppgave 4, men er ikke gjeldende rett.<br>"
                 f"<b>{Kr(f_exit_22)}</b> = {n(grunnlag)} × 22 %. Du har glemt oppjusteringen.</p>"
                 f"<p><b>Kontroll.</b> 12 × {n(rate)} = {n(12 * rate)}. ✓ Skatteavtalen med Portugal hjelper ikke: skatten "
                 "utløses dagen før utflyttingen, før avtalen får virkning for Henrik. Merk også at en gave av aksjer til "
                 "nærstående i utlandet utløser exit-skatt på hele gevinsten når netto gevinst i året overstiger kr 100 000. "
                 "Bunnfradraget gjelder bare når du selv flytter.</p>")),
    ]))

# =================================================================== 10
W10, L10, p10 = 360_000, 200_000, 0.10
prem_akt = p10 * L10
EU_uten = (1 - p10) * math.sqrt(W10) + p10 * math.sqrt(W10 - L10)
CE10 = EU_uten ** 2
Pmax = W10 - CE10
EW10 = (1 - p10) * W10 + p10 * (W10 - L10)
RP10 = EW10 - CE10
assert prem_akt == 20_000 and round(EU_uten, 9) == 580 and round(CE10) == 336_400 and round(Pmax) == 23_600 and round(RP10) == 3_600
EU_full = math.sqrt(W10 - prem_akt)
EU_halv = (1 - p10) * math.sqrt(W10 - prem_akt / 2) + p10 * math.sqrt(W10 - L10 + L10 / 2 - prem_akt / 2)
assert EU_uten < EU_halv < EU_full
# gale (b): båten som hele formuen
EU_baat = (1 - p10) * math.sqrt(L10)
Pmax_baat = L10 - EU_baat ** 2
assert round(Pmax_baat) == 38_000
feil_hele = p10 * W10
assert feil_hele == 36_000

EX.append(dict(
    title="Båtforsikring: rettferdig pris og maksimal premie", topic="Forsikring og forventet nytte", chapters=[17],
    body=(f"<p>Elias har en formue på {kr(W10)}. Av den er {kr(L10)} en seilbåt. Sannsynligheten for at båten blir "
          f"totalskadd i løpet av året er {pc(p10, 0)}. Da mister den hele verdien. Elias har nyttefunksjonen U(W) = √W, "
          "der W er formuen hans.</p>"),
    parts=[
        dict(label="a",
             body=("<p>Et forsikringsselskap tilbyr dekning til aktuarisk rettferdig pris. Elias kan selv velge hvor stor "
                   "del av båtens verdi han vil forsikre. Hvilket alternativ angir både den aktuarisk rettferdige premien for full "
                   "dekning og den dekningen han bør velge?</p>"),
             options=[f"{Kr(prem_akt)}: han bør velge delvis dekning, fordi en egenandel alltid er optimal",
                      f"{Kr(feil_hele)}: han er likegyldig, fordi forventet formue er den samme uansett dekning",
                      f"{Kr(feil_hele)}: han bør velge full dekning",
                      f"{Kr(prem_akt)}: han bør velge full dekning"],
             answer=3,
             solution=(
                 "<p><b>Regelen.</b> Aktuarisk rettferdig premie er sannsynligheten for skade ganget med tapet. Til den prisen "
                 "er forventet formue den samme uansett dekning, mens risikoen faller jo mer som er dekket. En risikoavers person "
                 "velger derfor full dekning.</p>"
                 "<p><b>Regnestykket.</b></p>"
                 f"<p>1. Premie for full dekning: {pc(p10, 0)} × {n(L10)} = <b>{kr(prem_akt)}</b>.<br>"
                 f"2. Forventet formue uten forsikring: 0,9 × {n(W10)} + 0,1 × {n(W10 - L10)} = {n(EW10)}. Med full dekning: "
                 f"{n(W10)} − {n(prem_akt)} = {n(W10 - prem_akt)} sikkert. Lik forventning.<br>"
                 f"3. Forventet nytte uten: 0,9 × √{n(W10)} + 0,1 × √{n(W10 - L10)} = 0,9 × {n(math.sqrt(W10))} + 0,1 × "
                 f"{n(math.sqrt(W10 - L10))} = {n(EU_uten)}. Med full dekning: √{n(W10 - prem_akt)} = {n(EU_full, 2)}. "
                 "<b>Full dekning</b> gir høyest nytte.</p>"
                 "<p><b>Hvorfor de andre er gale.</b></p>"
                 "<p><b>«Delvis dekning, egenandel alltid optimal»</b> = gjelder bare når premien har et påslag over aktuarisk "
                 "pris. Til rettferdig pris koster hver krone dekning nøyaktig det den forventes å gi tilbake.<br>"
                 f"<b>«{Kr(feil_hele)}: likegyldig»</b> = to feil: premien er regnet av hele formuen ({pc(p10, 0)} × {n(W10)}) i stedet for "
                 "av tapet. Formuer er dessuten sammenlignet i stedet for nytter. Med √W er Elias risikoavers. Samme forventning "
                 "med mindre risiko er da bedre.<br>"
                 f"<b>«{Kr(feil_hele)}: full dekning»</b> = riktig valg, men premien er regnet av hele formuen i stedet for av tapet.</p>"
                 f"<p><b>Kontroll.</b> Halv dekning til rettferdig pris (premie {kr(prem_akt / 2)}) gir 0,9 × √{n(W10 - prem_akt / 2)} + "
                 f"0,1 × √{n(W10 - L10 / 2 - prem_akt / 2)} = {n(EU_halv, 2)}, som ligger mellom {n(EU_uten)} og {n(EU_full, 2)}. "
                 "Mer dekning gir høyere nytte hele veien opp til full dekning. ✓</p>"
                 f"<p><b>Strategi med minuspoeng.</b> Alternativene er to premier ganger to valg. Avgjør premien først: "
                 f"{pc(p10, 0)} × {n(L10)} = {n(prem_akt)}. Da står to igjen. Valget mellom dem avgjøres av at Elias er risikoavers.</p>")),
        dict(label="b",
             body="<p>Hva er den høyeste premien Elias er villig til å betale for full dekning? Rund av til nærmeste krone.</p>",
             options=[Kr(Pmax), Kr(Pmax_baat), Kr(prem_akt), Kr(RP10)], answer=0,
             solution=(
                 "<p><b>Regelen.</b> Maksimal premie gjør Elias akkurat likegyldig: U(W − P<sub>maks</sub>) = forventet nytte "
                 "uten forsikring. Med √W blir P<sub>maks</sub> = W − (E[U])².</p>"
                 "<p><b>Regnestykket.</b></p>"
                 f"<p>1. Forventet nytte uten forsikring: {n(EU_uten)} (fra a).<br>"
                 f"2. Sikkerhetsekvivalent: {n(EU_uten)}² = {n(CE10)}.<br>"
                 f"3. Maksimal premie: {n(W10)} − {n(CE10)} = <b>{kr(Pmax)}</b>.</p>"
                 "<p><b>Hvorfor de andre er gale.</b></p>"
                 f"<p><b>{Kr(Pmax_baat)}</b> = du har regnet som om båten var hele formuen: 0,9 × √{n(L10)} = {n(EU_baat, 2)}. "
                 f"Det gir {n(L10)} − {n(EU_baat, 2)}² = {n(Pmax_baat)}. Elias har {kr(W10 - L10)} i tillegg. Den som har mer "
                 "annen formue, er villig til å betale mindre for å fjerne samme tap.<br>"
                 f"<b>{Kr(prem_akt)}</b> = den aktuarisk rettferdige premien. En risikoavers person betaler mer enn det.<br>"
                 f"<b>{Kr(RP10)}</b> = risikopremien alene, et mellomresultat.</p>"
                 f"<p><b>Kontroll.</b> Maksimal premie = aktuarisk premie + risikopremie. Forventet formue uten forsikring er "
                 f"{n(EW10)}, så risikopremien er {n(EW10)} − {n(CE10)} = {n(RP10)}. {n(prem_akt)} + {n(RP10)} = {n(prem_akt + RP10)}. ✓</p>"
                 "<p><b>Strategi med minuspoeng.</b> For en risikoavers person ligger maksimal premie alltid over den aktuariske "
                 f"premien. Det stryker {kr(prem_akt)} og {kr(RP10)}. Mellom de to som står igjen, må du regne.</p>")),
    ]))

# =================================================================== 11
sC, sD = 0.15, 0.25
w_neg = sD / (sC + sD)
w_null = sD ** 2 / (sC ** 2 + sD ** 2)
rho = -1
w_gen = (sD ** 2 - rho * sC * sD) / (sC ** 2 + sD ** 2 - 2 * rho * sC * sD)
assert round(w_neg, 4) == 0.625 and abs(w_gen - w_neg) < 1e-12 and round(w_null * 100, 1) == 73.5
assert abs(w_neg * sC - (1 - w_neg) * sD) < 1e-12

EX.append(dict(
    title="Negativ korrelasjon og valutasikring", topic="Porteføljevalg", chapters=[14],
    body="<p>Oppgaven har to uavhengige delspørsmål om portefølje.</p>",
    parts=[
        dict(label="a",
             body=("<p>Aksje C har forventet avkastning 6 % og standardavvik 15 %. Aksje D har forventet avkastning 9 % og "
                   "standardavvik 25 %. Korrelasjonen mellom dem er −1. Du kan bare investere i disse to aksjene. Shortsalg "
                   "er ikke tillatt. Hvor stor andel bør du investere i aksje C dersom du vil ha lavest mulig standardavvik? "
                   "Rund av til én desimal.</p>"),
             options=[pc(w_neg), pc(1.0), pc(w_null), pc(0.5)], answer=0,
             solution=(
                 "<p><b>Regelen.</b> Med korrelasjon −1 kan risikoen fjernes helt uten shortsalg. Andelen i C som gir null "
                 "standardavvik, er σ<sub>D</sub>/(σ<sub>C</sub> + σ<sub>D</sub>).</p>"
                 "<p><b>Regnestykket.</b></p>"
                 "<p>1. Med ρ = −1 er σ<sub>p</sub> = |w × 15 % − (1 − w) × 25 %|.<br>"
                 "2. Sett lik null: 15w = 25(1 − w), altså 40w = 25.<br>"
                 f"3. w = 25/40 = <b>{pc(w_neg)}</b> i C og {pc(1 - w_neg)} i D.</p>"
                 "<p><b>Hvorfor de andre er gale.</b></p>"
                 "<p><b>100,0 %</b> = svaret når korrelasjonen er +1. Da finnes ingen diversifiseringsgevinst. Alt skal i "
                 "aksjen med lavest standardavvik.<br>"
                 f"<b>{pc(w_null)}</b> = σ<sub>D</sub>²/(σ<sub>C</sub>² + σ<sub>D</sub>²) = 0,0625/0,085, minimum-varians-vekten "
                 "når korrelasjonen er 0.<br>"
                 "<b>50,0 %</b> = lik fordeling. Den gir null risiko bare når standardavvikene er like store.</p>"
                 f"<p><b>Kontroll.</b> {n(w_neg, 3)} × 15 % − {n(1 - w_neg, 3)} × 25 % = {n(w_neg * 15, 3)} % − "
                 f"{n((1 - w_neg) * 25, 3)} % = 0. ✓ Den generelle formelen gir det samme: (σ<sub>D</sub>² − ρσ<sub>C</sub>σ<sub>D</sub>)/"
                 "(σ<sub>C</sub>² + σ<sub>D</sub>² − 2ρσ<sub>C</sub>σ<sub>D</sub>) = (0,0625 + 0,0375)/(0,0225 + 0,0625 + 0,075) = "
                 f"0,1/0,16 = {pc(w_gen)}. ✓ Forventet avkastning er ikke med i regnestykket: spørsmålet gjelder bare risikoen.</p>"
                 "<p><b>Strategi med minuspoeng.</b> Ved ρ = +1 må svaret være et hjørne, ved ρ = −1 en indre andel som "
                 "legger mest i aksjen med lavest standardavvik. Det stryker 100 % og 50 % uten regning.</p>")),
        dict(label="b",
             body=("<p>Ahmed jobber i en eksportbedrift. Arbeidsinntekten hans er høyest når kronen er svak. Han vurderer "
                   "et globalt indeksfond med eller uten valutasikring. Han er risikoavers og bryr seg om summen av "
                   "arbeidsinntekt og avkastning på fondet. Hva bør han gjøre?</p>"),
             options=["Valutasikre, fordi det usikrede fondet gir mest nettopp når arbeidsinntekten også er høy",
                      "Ikke valutasikre, fordi et fond i utenlandsk valuta alltid er en naturlig sikring av norsk lønn",
                      "Det spiller ingen rolle, fordi valutasikring gir samme utbetaling uansett",
                      "Valutasikre bare dersom han er lite risikoavers"],
             answer=0,
             solution=(
                 "<p><b>Regelen.</b> Vurder et aktivum etter hvordan det samvarierer med resten av inntekten din, "
                 "humankapitalen inkludert, ikke etter dets eget standardavvik.</p>"
                 "<p><b>Resonnementet.</b></p>"
                 "<p>1. Ahmeds lønn er høy når kronen er svak.<br>"
                 "2. Et usikret globalt fond er verdt mer i kroner når kronen er svak.<br>"
                 "3. Lønn og fond går dermed opp og ned sammen. Det usikrede fondet forsterker svingningene i samlet inntekt.<br>"
                 "4. Valutasikring fjerner denne samvariasjonen. <b>Han bør valutasikre.</b></p>"
                 "<p><b>Hvorfor de andre er gale.</b></p>"
                 "<p><b>«Ikke valutasikre, alltid naturlig sikring»</b> = svaret fra H2024 oppgave 12c brukt mekanisk. Der var "
                 "lønnen høy når kronen var <i>sterk</i>. Om fondet sikrer lønnen, avhenger av fortegnet på samvariasjonen.<br>"
                 "<b>«Spiller ingen rolle»</b> = valutasikring fjerner valutasvingningene, ikke aksjesvingningene. Utbetalingen "
                 "er langt fra sikker.<br>"
                 "<b>«Bare dersom lite risikoavers»</b> = fortegnet snudd. Jo mer risikoavers han er, jo mer er det verdt å "
                 "fjerne samvariasjonen.</p>"
                 "<p><b>Kontroll.</b> Snu forutsetningen: var lønnen høy når kronen var sterk, ville det usikrede fondet betalt "
                 "mest når lønnen var lav. Da skulle han latt være å sikre. Samme regel, motsatt svar.</p>")),
    ]))

# =================================================================== 12
ips_maks = 25_000
ips_spar = ips_maks * 0.22
assert ips_spar == 5_500

EX.append(dict(
    title="Innskuddspensjon og IPS", topic="Pensjon", chapters=[15],
    body="<p>Oppgaven har to uavhengige delspørsmål om pensjonssparing.</p>",
    parts=[
        dict(label="a",
             body="<p>Line har innskuddspensjon gjennom arbeidsgiveren sin. Hvilken påstand er riktig?</p>",
             options=["Arbeidsgiveren garanterer at pensjonen blir en fast andel av sluttlønnen hennes",
                      "Arbeidsgiveren bærer avkastningsrisikoen, fordi det er arbeidsgiveren som betaler innskuddene",
                      "Line bærer avkastningsrisikoen selv. Bytter hun jobb, tar hun med seg det som er spart",
                      "Line kan ta ut beholdningen før pensjonsalder dersom hun trenger penger til bolig"],
             answer=2,
             solution=(
                 "<p><b>Regelen.</b> Ved innskuddspensjon er innskuddet avtalt. Ved ytelsespensjon er ytelsen avtalt. "
                 "Den parten som ikke har fått noe avtalt, bærer risikoen.</p>"
                 "<p><b>Begrunnelsen.</b> Line har fått avtalt et innskudd, så pensjonen blir det beholdningen er verdt ved "
                 "uttak. Hun bærer avkastningsrisikoen og velger selv risikoprofil. Bytter hun jobb, følger det oppsparte med "
                 "henne som pensjonskapitalbevis eller på egen pensjonskonto.</p>"
                 "<p><b>Hvorfor de andre er gale.</b></p>"
                 "<p><b>«Fast andel av sluttlønnen»</b> = beskrivelsen av ytelsespensjon.<br>"
                 "<b>«Arbeidsgiveren bærer risikoen fordi den betaler»</b> = arbeidsgiveren har bare lovet innskuddet. Den som "
                 "betaler, bærer ikke dermed risikoen.<br>"
                 "<b>«Ta ut før pensjonsalder til bolig»</b> = pengene er bundet til pensjonsalder.</p>"
                 "<p><b>Kontroll.</b> Spør hvem som bærer risikoen i hvert alternativ. Passer beskrivelsen på ytelsespensjon, stryk den.</p>")),
        dict(label="b",
             body="<p>Hvilken påstand om individuell pensjonssparing (IPS) i 2026 er riktig?</p>",
             options=[f"Innskudd inntil {kr(ips_maks)} gir fradrag i alminnelig inntekt. Uttak skattlegges som alminnelig inntekt",
                      "Innskudd gir fradrag direkte i skatten med 10 % av innskuddet, slik som for BSU-sparing",
                      "Uttakene skattlegges som pensjonsinntekt. Hovedfordelen er at marginalskatten din da er lavere",
                      "Innskudd inntil kr 15 000 gir fradrag i alminnelig inntekt, men saldoen på kontoen teller med i formuesskatten"],
             answer=0,
             solution=(
                 "<p><b>Regelen.</b> IPS gir fradrag i alminnelig inntekt for innskuddet, ingen løpende skatt på avkastningen, "
                 f"fritak for formuesskatt og skatt på alminnelig inntekt ved uttak. Fra 2026 er grensen {kr(ips_maks)} i året.</p>"
                 "<p><b>Regnestykket.</b></p>"
                 f"<p>Største skattebesparelse nå: {n(ips_maks)} × 22 % = <b>{kr(ips_spar)}</b>. Ved uttak skattlegges pengene med "
                 "22 % som alminnelig inntekt. Satsen er den samme inn og ut, så fordelen er utsettelsen, ikke en lavere sats.</p>"
                 "<p><b>Hvorfor de andre er gale.</b></p>"
                 "<p><b>«Fradrag i skatten med 10 %, som BSU»</b> = BSU-regelen. IPS gir fradrag i inntekten, ikke i skatten.<br>"
                 "<b>«Pensjonsinntekt, lavere marginalskatt»</b> = IPS-uttak er alminnelig inntekt med 22 %, uten trygdeavgift og "
                 "trinnskatt. Det finnes ingen satsforskjell å tjene på.<br>"
                 "<b>«Kr 15 000 og formuesskatt på saldoen»</b> = grensen fra 2025. IPS er dessuten fritatt for formuesskatt.</p>"
                 "<p><b>Kontroll.</b> Netto ut av IPS = innskudd × (1 + r)<sup>n</sup> × (1 − 22 %) = [innskudd × (1 − 22 %)] × "
                 "(1 + r)<sup>n</sup>. Det er det samme som en konto der avkastningen på dine egne penger er skattefri. Det er "
                 "dette eksamen kaller et rentefritt lån fra staten.</p>")),
    ]))

# =================================================================== 13
ER, rf, sig, gam, F13 = 0.07, 0.03, 0.16, 3, 3_000_000
w13 = (ER - rf) / (gam * sig ** 2)
assert round(w13 * 100, 1) == 52.1
f13 = {"sigma": (ER - rf) / (gam * sig), "uten_gamma": (ER - rf) / sig ** 2, "ER": ER / (gam * sig ** 2)}
assert (round(f13["sigma"] * 100, 1), round(f13["uten_gamma"] * 100, 1), round(f13["ER"] * 100, 1)) == (8.3, 156.3, 91.1)
belop13 = w13 * F13
assert round(belop13) == 1_562_500
assert abs((ER - rf) / (w13 * sig ** 2) - gam) < 1e-12

EX.append(dict(
    title="Mertons aksjeandel for en pensjonist", topic="Porteføljevalg", chapters=[14],
    body=(f"<p>Randi er pensjonist og har bare finansiell formue, {kr(F13)}. Hun kan plassere den i et globalt aksjefond "
          "med forventet avkastning 7 % og standardavvik 16 % eller på en risikofri bankkonto med 3 % rente. Risikoaversjonen "
          "hennes er γ = 3. Hvor stor andel av formuen bør hun ifølge Mertons formel ha i aksjefondet? Rund av til én desimal.</p>"),
    options=[pc(f13["sigma"]), pc(f13["uten_gamma"]), pc(w13), pc(f13["ER"])], answer=2,
    solution=(
        "<p><b>Regelen.</b> Mertons formel gir andelen i aksjer: w = (E(R) − r<sub>f</sub>)/(γσ²). Uten humankapital er "
        "totalformuen lik finansformuen.</p>"
        "<p><b>Regnestykket.</b></p>"
        "<p>1. Meravkastning: 7 % − 3 % = 0,04.<br>"
        "2. Varians: 0,16² = 0,0256.<br>"
        f"3. w = 0,04/(3 × 0,0256) = 0,04/0,0768 = {n(w13, 4)} → <b>{pc(w13)}</b>.<br>"
        f"4. Beløp: {n(w13, 4)} × {n(F13)} = {kr(belop13)} i aksjefondet.</p>"
        "<p><b>Hvorfor de andre er gale.</b></p>"
        f"<p><b>{pc(f13['sigma'])}</b> = 0,04/(3 × 0,16). Du har brukt standardavviket der formelen krever variansen.<br>"
        f"<b>{pc(f13['uten_gamma'])}</b> = 0,04/0,0256. Du har glemt γ.<br>"
        f"<b>{pc(f13['ER'])}</b> = 0,07/0,0768. Du har brukt forventet avkastning i stedet for meravkastningen over risikofri rente.</p>"
        f"<p><b>Kontroll.</b> Snu formelen: γ = 0,04/({n(w13, 4)} × 0,0256) = {n((ER - rf) / (w13 * sig ** 2), 1)}. ✓</p>"
        f"<p><b>Strategi med minuspoeng.</b> {pc(f13['uten_gamma'])} krever at hun låner for å kjøpe aksjer. Ser du to alternativer "
        f"der det ene er {n(sig / sig ** 2, 2)} ganger det andre (0,16/0,0256), er det paret standardavvik mot varians: "
        f"{pc(w13)} er {n(w13 / f13['sigma'], 2)} ganger {pc(f13['sigma'])}.</p>")))

# =================================================================== 14
Y14, studie, bolig, disp, rente = 800_000, 300_000, 4_200_000, 270_000, 0.045
stress = max(rente + 0.03, 0.07)
AF14 = annuitet(stress, 30)
L_stress = disp * AF14
L_gjeld = 5 * Y14 - studie
L_belaan = 0.90 * bolig
L14 = min(L_stress, L_gjeld, L_belaan)
assert abs(stress - 0.075) < 1e-12 and L14 == L_stress
assert round(L_gjeld) == 3_700_000 and round(L_belaan) == 3_780_000
f14_gammel = disp * annuitet(rente + 0.05, 30)
f14_femgang = 5 * Y14
assert abs(L_stress / AF14 - disp) < 1e-6
print("Lån 14:", round(L_stress, 2), "gammelt påslag:", round(f14_gammel, 2), "AF:", round(AF14, 4))

EX.append(dict(
    title="Hvor mye kan Mina låne", topic="Lån", chapters=[16],
    body=(f"<p>Mina har en brutto årsinntekt på {kr(Y14)} og et studielån på {kr(studie)}. Hun vil kjøpe en leilighet til "
          f"{kr(bolig)} og har nok egenkapital. Banken regner med at hun kan bruke {kr(disp)} i året på å betjene boliglånet. "
          "Dagens rente er 4,5 %. Utlånsforskriften krever at</p>"
          "<ul><li>samlet gjeld er høyst 5 ganger brutto årsinntekt</li>"
          "<li>lånet er høyst 90 % av boligens verdi</li>"
          "<li>hun tåler en rente lik dagens rente pluss 3 prosentpoeng, minst 7 %, på et annuitetslån over 30 år med årlige terminer</li></ul>"
          "<p>Se bort fra bankens fleksibilitetskvote. Hva er det største boliglånet Mina kan få? Rund av til nærmeste krone.</p>"),
    options=[Kr(L_stress), Kr(L_gjeld), Kr(f14_femgang), Kr(f14_gammel)], answer=0,
    solution=(
        "<p><b>Regelen.</b> Regn hver skranke i utlånsforskriften for seg. Den som gir det laveste lånet, binder.</p>"
        "<p><b>Regnestykket.</b></p>"
        f"<p>1. Gjeldsgrad: 5 × {n(Y14)} − {n(studie)} = {kr(L_gjeld)}.<br>"
        f"2. Belåningsgrad: 90 % × {n(bolig)} = {kr(L_belaan)}.<br>"
        f"3. Stresstest: 4,5 % + 3 prosentpoeng = {pc(stress)}, som er over minstekravet på 7 %. Annuitetsfaktor over 30 år: "
        f"(1 − 1,075<sup>−30</sup>)/0,075 = {n(AF14, 4)}. Lån: {n(disp)} × {n(AF14, 4)} = {kr(L_stress)}.<br>"
        f"4. Stresstesten gir det laveste lånet og binder: <b>{kr(L_stress)}</b>.</p>"
        "<p><b>Hvorfor de andre er gale.</b></p>"
        f"<p><b>{Kr(L_gjeld)}</b> = gjeldsgradskravet alene. Du har glemt stresstesten.<br>"
        f"<b>{Kr(f14_femgang)}</b> = 5 × {n(Y14)}. Du har glemt både studielånet og stresstesten.<br>"
        f"<b>{Kr(f14_gammel)}</b> = stresstest med 5 prosentpoeng påslag (9,5 %), som var kravet da H2020 og H2021 ble gitt. "
        "Dagens forskrift krever 3 prosentpoeng og minst 7 %.</p>"
        f"<p><b>Kontroll.</b> Snu stresstesten: et lån på {n(L_stress)} over 30 år til {pc(stress)} krever {n(L_stress)}/{n(AF14, 4)} = "
        f"{n(L_stress / AF14)} i året, nøyaktig det hun kan betale. ✓</p>"
        f"<p><b>Strategi med minuspoeng.</b> {Kr(f14_femgang)} er umulig så lenge hun har studielån, fordi gjeldsgraden måles på "
        "samlet gjeld.</p>")))

# =================================================================== 15
spar, gjeld15, rs15, rk15 = 60_000, 50_000, 0.03, 0.21
spart_rente = gjeld15 * rk15                  # 10 500 slipper hun å betale
tapt_rente = gjeld15 * rs15                   # 1 500 mister hun på kontoen
tap15 = spart_rente - tapt_rente              # 9 000
assert round(spart_rente) == 10_500 and round(tapt_rente) == 1_500 and round(tap15) == 9_000
f15_hele = spar * (rk15 - rs15)               # 10 800: differansen på hele sparebeløpet
assert round(f15_hele) == 10_800
netto_med = (spar - gjeld15) * rs15           # 300
netto_uten = spar * rs15 - gjeld15 * rk15     # −8 700
assert round(netto_med) == 300 and round(netto_uten) == -8_700 and abs(netto_med - netto_uten - tap15) < 1e-9

EX.append(dict(
    title="Sparepenger og kredittkortgjeld samtidig", topic="Finansiell psykologi", chapters=[18, 16],
    body=(f"<p>Sara har {kr(spar)} på en sparekonto med {pc(rs15, 0)} rente. Hun har kalt kontoen «feriepenger». Samtidig har "
          f"hun {kr(gjeld15)} i kredittkortgjeld til {pc(rk15, 0)} rente. Hun lar sparepengene stå urørt fordi de «skal gå til "
          "ferie», selv om hun kan bruke kredittkortet igjen hvis hun trenger pengene senere. Se bort fra skatt. Hvilket "
          "alternativ angir både skjevheten Sara viser og hvor mye den koster henne i året sammenlignet med å bruke "
          "sparepengene til å betale ned kredittkortgjelden?</p>"),
    options=[f"Overkonfidens: den koster henne {kr(spart_rente)} i året",
             f"Mental regnskapsføring: den koster henne {kr(tap15)} i året",
             f"Mental regnskapsføring: den koster henne {kr(spart_rente)} i året",
             f"Mental regnskapsføring: den koster henne {kr(f15_hele)} i året"],
    answer=1,
    solution=(
        "<p><b>Regelen.</b> Mental regnskapsføring er å merke penger etter kilde og formål i stedet for å telle dem som én "
        "formue. Den typiske prisen er dyr gjeld og sparepenger samtidig. Den rasjonelle regelen er å betale ned lånet med "
        "høyest rente først (kapittel 16).</p>"
        "<p><b>Regnestykket.</b></p>"
        f"<p>1. Betaler hun ned hele kredittkortgjelden med sparepengene, slipper hun {n(gjeld15)} × {pc(rk15, 0)} = {kr(spart_rente)} i renter.<br>"
        f"2. Hun mister {n(gjeld15)} × {pc(rs15, 0)} = {kr(tapt_rente)} i sparerente.<br>"
        f"3. Netto: {n(spart_rente)} − {n(tapt_rente)} = <b>{kr(tap15)}</b> i året. Kortere: {n(gjeld15)} × ({pc(rk15, 0)} − {pc(rs15, 0)}) = {n(tap15)}.</p>"
        "<p><b>Hvorfor de andre er gale.</b></p>"
        f"<p><b>«Overkonfidens, {kr(spart_rente)}»</b> = to feil. Overkonfidens er å tro at du vet mer enn markedet og derfor "
        "handle for mye, men Sara handler ikke. Hun har gitt pengene en merkelapp. Beløpet er dessuten bare kredittkortrenten.<br>"
        f"<b>{Kr(spart_rente)}</b> = bare kredittkortrenten. Du har glemt at sparerenten faller bort når pengene tas ut.<br>"
        f"<b>{Kr(f15_hele)}</b> = {n(spar)} × ({pc(rk15, 0)} − {pc(rs15, 0)}). Du har brukt hele sparebeløpet, men bare "
        f"{kr(gjeld15)} trengs for å innfri gjelden. De siste {kr(spar - gjeld15)} kan stå.</p>"
        f"<p><b>Kontroll.</b> Regn netto renter i begge tilfeller. Med nedbetaling: {n(spar - gjeld15)} × {pc(rs15, 0)} = {n(netto_med)}. "
        f"Uten: {n(spar)} × {pc(rs15, 0)} − {n(gjeld15)} × {pc(rk15, 0)} = {n(spar * rs15)} − {n(gjeld15 * rk15)} = {n(netto_uten)}. "
        f"Forskjellen er {n(netto_med)} − ({n(netto_uten)}) = {n(netto_med - netto_uten)}. ✓ Formuen er den samme uansett merkelapp: "
        f"{n(spar)} − {n(gjeld15)} = {n(spar - gjeld15)}.</p>"
        "<p><b>Strategi med minuspoeng.</b> Avgjør skjevheten først: overkonfidens handler om handel, så det alternativet faller. "
        "Kostnaden er rentedifferansen på det beløpet som faktisk kan flyttes, altså gjelden.</p>")))

# ================================================================ sett
for i, ex in enumerate(EX, start=1):
    ex["n"] = i
    if "parts" in ex:
        for p in ex["parts"]:
            p["points"] = 3
        ex["points"] = 3 * len(ex["parts"])
    else:
        ex["points"] = 3


def ordne(ex):
    keys = ["n", "title", "points", "topic", "chapters", "body"]
    out = {k: ex[k] for k in keys}
    if "parts" in ex:
        out["parts"] = [{"label": p["label"], "points": p["points"], "body": p["body"], "options": p["options"],
                         "answer": p["answer"], "solution": p["solution"]} for p in ex["parts"]]
    else:
        out["options"] = ex["options"]
        out["answer"] = ex["answer"]
        out["solution"] = ex["solution"]
    return out


SETT = {
    "id": "prove2",
    "kind": "mock",
    "label": "Prøveeksamen 2",
    "minutes": 240,
    "points": 90,
    "format": "30 flervalg · fire alternativer · 3 poeng for rett, −1 for feil",
    "note": ("Ligner H2024: skjermingskjede over tre år, progressivitet og trinnskatt, formuesskatt med gjeldsfordeling, "
             "insidens som formelgjenkjenning og implisitt skatt. Oppgave 9 er en skatterett-blokk på seks ledd med "
             "globalskatteplikt, unntak, kredit med tak, land uten avtale og exit-skatt etter 2026-reglene. Finansdelen "
             "vektlegger forventet nytte, portefølje, pensjon og utlånsforskriften."),
    "facts": [
        "4 timer, skoleeksamen, kalkulator tillatt.",
        "30 flervalgsledd med fire alternativer og nøyaktig ett riktig.",
        "3 poeng for rett, −1 for feil og 0 for ubesvart. Maksimalt 90 poeng.",
        "Skattedelen har 21 ledd og finansdelen 9 ledd.",
        "Oppgave 9 er én sammenhengende skatterettscase på seks ledd, slik H2024 oppgave 10 var.",
        "Alle satser du skal regne med, står i oppgaveteksten. Faktaspørsmål om 2026-regler må du kunne.",
    ],
    "practiceNote": ("Kjør settet på tid med minuspoeng slått på. Regn ferdig før du ser på alternativene: de gale er nesten "
                     "alltid et mellomresultat eller samme regnestykke med ett ledd utelatt. Kan du stryke ett alternativ, "
                     "lønner det seg å svare."),
    "mc": {"wrongFactor": -1 / 3},
    "exercises": [ordne(e) for e in EX],
}

# ============================================================ kontroller
plan = json.load(open(PLAN))["p2"]
ledd = []
for ex in SETT["exercises"]:
    if "parts" in ex:
        for p in ex["parts"]:
            ledd.append((f"{ex['n']}{p['label']}", ex["topic"], p))
    else:
        ledd.append((f"{ex['n']}", ex["topic"], ex))
assert len(ledd) == 30, len(ledd)
assert [l[2]["answer"] for l in ledd] == plan, ([l[2]["answer"] for l in ledd], plan)
assert sum(e["points"] for e in SETT["exercises"]) == 90
skatt_ledd = sum(1 for l in ledd if int(re.match(r"\d+", l[0]).group()) <= 9)
assert skatt_ledd == 21, skatt_ledd

lengst = 0
for navn, topic, p in ledd:
    opts = p["options"]
    assert len(opts) == 4, navn
    assert len(set(opts)) == 4, (navn, opts)
    if max(range(4), key=lambda i: len(opts[i])) == p["answer"] and len(opts[p["answer"]]) > sorted(map(len, opts))[-2]:
        lengst += 1

tekst = json.dumps(SETT, ensure_ascii=False)
for forbudt in ["—", " – ", "&mdash;"]:
    assert forbudt not in tekst, forbudt
m = re.findall(r".{0,40},\s+og\b.{0,20}", tekst)
assert not m, m
m = re.findall(r"[^\s(]\s+%", "")  # plass for flere sjekker

with open(OUT, "w", encoding="utf-8") as fh:
    json.dump(SETT, fh, ensure_ascii=False, indent=2)
    fh.write("\n")

print("Skrev", OUT)
print("Ledd:", len(ledd), "· skatt:", skatt_ledd, "· finans:", 30 - skatt_ledd)
print("Fasitposisjoner:", [l[2]["answer"] for l in ledd])
print("Fordeling av fasitposisjoner:", {i: sum(1 for l in ledd if l[2]["answer"] == i) for i in range(4)})
print("Riktig alternativ er strengt lengst i", lengst, "av 30 ledd")
for navn, topic, p in ledd:
    print(f"  {navn:4s} {topic:34s} svar {p['answer']}: {p['options'][p['answer']][:70]}")
