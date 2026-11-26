"""Skribent W2: «Må kunne», typen mm-rekap (MM-rekapitalisering, utbytte og tilbakekjøp i
perfekt marked, tier 1, 20 poeng per oppgave).

Kjør fra hvor som helst:  python3 -I w2_regn.py

Spesifikasjonen står i docs/fie402-mk-spek.md (raden mm-rekap). Tre oppgaver:

  mk-mm-rekap-1  EUR. Bompengebro uten gjeld, evigrente. Forelesning 5-formen i samme
                 rekkefølge: kurs og utbytte, ekstra utbytte i år 1 finansiert med nye aksjer
                 (to likninger, kursen etter utbyttet), kursen i dag og om eierne er bedre
                 eller verre stilt, tilbakekjøp i år 1 med hele kontantstrømmen (to likninger,
                 kursen i år 1 er ikke dagens kurs), tre posisjoner sammenlignet.
  mk-mm-rekap-2  USD. Dyreklinikkjede. H2024 E3-formen: r_U fra r_E og risikofri gjeld, ny
                 gjeld til et mål for D/E (konstruksjonsleddet: V er uendret), utbytte og kurs,
                 ny r_E med risikabel ny gjeld, tilbakekjøp i stedet (to likninger), og en
                 hale om finansdirektørens påstand om billig gjeld.
  mk-mm-rekap-3  NOK. Heisfirma med evigrente og risikabel gjeld (r_D > r_f). Det varslede
                 tillegget: gammel risikabel gjeld innfris med en emisjon og et risikofritt lån,
                 så r_D endres. r_U og r_E, kurs ved kunngjøring og antall nye aksjer, ny r_E
                 med ny r_D, utbytte per aksje før og etter som sjekk, hvem er bedre stilt.

Tier 2 (lagt til 26. november 2026):

  mk-skatt-rekap-1  USD. Lastebilfirma. Forelesning 3-formen: V^U, τD, kurshopp ved kunngjøring,
                    tilbakekjøp til ny kurs, r_E fra utbytte og kurs, hvem får gevinsten.
  mk-skatt-rekap-2  NOK. Grusprodusent, EBIT i tre tilstander (PS1 E4). Konstruksjonsleddet: et
                    åtteårig lån med renter hvert år, skjoldet som annuitet; hale om finans-
                    direktørens τD-påstand.
  mk-skatt-rekap-3  EUR. Treningssentre. Det varslede tillegget: renter som fast andel av fri
                    kontantstrøm, V^L = (1 + τk)V^U, gjeld i dag fra neste års rente; hale om
                    diskonteringsrenten for skjoldet og hvem som får fremtidige skjold.
  mk-teori-kapital-1/2/3  Teori, 10 p: ulemper ved gjeld med to firmaer (eiendom mot programvare),
                    fire bruk av fri kontantstrøm for et vekstfirma, fire fakta som bryter MM.
  Andre vinkler enn hint2-1 og hint2-2 (_del/h2.json), som har SEO-fallet på 12 %, fire bruk for
  et modent firma, direkte og indirekte kostnader og MM mot virkeligheten med tre eksempler.

Tier 3 (lagt til 26. november 2026):

  mk-signal-1  NOK. Båtbygger. SEO-eksemplet i forelesning 7 i samme rekkefølge: verdi og kurs,
               andel ved samlet pris, hvem som utsteder, kurs og antall aksjer når emisjonen avslører
               typen, effektivitet og hvem som taper.
  mk-signal-2  USD. Sensorprodusent, 30 % sannsynlighet for høy type. HA1 E3 og PS2 E1 strammet inn.
               Konstruksjonsleddet er høyeste gebyr for en sertifisering; hale om rasjonell tro.
  mk-signal-3  EUR. Vingård, 60 % høy type. Det varslede tillegget: risikofritt lån i stedet for aksjer,
               begge typer investerer; hale om hakkeorden og risikabel gjeld.

Reserveverdier («If you could not solve (b), use …») står der et senere ledd trenger et tall fra
et tidligere og en feil ellers ville forplante seg. Svarene som bygger på dem ligger som alt i
svar-dataene. Feltnavnene (navn) vises før studenten svarer og røper aldri et svar eller en retning.

Skriptet regner hvert tall i oppgavetekst, løsning og kriterier og sjekker med assert:
  V uendret, kursen uendret der MM sier det, P0 = (Div1 + P1)/(1 + r), Div/r_E = kursen,
  r_wacc = r_U før og etter, likningssystemene for emisjon og tilbakekjøp, D/E-målet nådd,
  samlet formue uendret for hver gruppe, og at fellene ligger utenfor toleransen (1 %).
Til slutt sjekkes poeng, skrivereglene og at hvert tall i svar-dataene står i løsningsteksten
(samme regel som tools/sjekk-svar.js). Er noe galt, skrives ingenting.
"""
import json
import os
import re

HER = os.path.dirname(os.path.abspath(__file__))
UT = os.path.join(HER, "w2.json")
UT_SVAR = os.path.join(HER, "w2_svar.json")


# ------------------------------------------------------------------ hjelpere
def f(x, d=4):
    r = round(x, d)
    if r == 0:
        r = 0.0
    s = f"{abs(r):,.{d}f}"
    return ("−" if r < 0 else "") + s


def g(x):
    for d in (0, 1, 2, 3):
        if abs(round(x, d) - x) < 1e-9:
            return f(x, d)
    return f(x, 4)


def fx(x):
    """Opptil 6 desimaler uten etterfølgende nuller, så viste faktorer gir de viste produktene."""
    return f(x, 6).rstrip("0").rstrip(".")


def pc(x, d=None):
    """Prosent: pc(0.091) = 9.1%, pc(0.091, 4) = 9.1000%."""
    return (f(100 * x, d) if d is not None else g(100 * x)) + "%"


def near(a, b, tol=1e-9):
    return abs(a - b) <= tol


def utenfor(feil, riktig, tol=0.01):
    """En felle må ligge utenfor rettetoleransen (ov-spek § 6b.1)."""
    return abs(feil - riktig) > tol * abs(riktig)


def tab(head, rows):
    h = "<tr>" + "".join(f"<th>{c}</th>" for c in head) + "</tr>"
    b = ""
    for r in rows:
        b += "<tr>" + "".join(
            (f'<td class="n">{c[1:]}</td>' if isinstance(c, str) and c.startswith("#") else f"<td>{c}</td>")
            for c in r) + "</tr>"
    return f'<table class="data">{h}{b}</table>'


def T(navn, verdi, enhet, **kw):
    d = {"navn": navn, "verdi": round(verdi, 10), "enhet": enhet}   # full presisjon uten flyttallsstøy
    d.update(kw)
    return d


OPPG = {}
SVAR = {}

# ======================================================================
# mk-mm-rekap-1 · Lindewaard Toll Bridge (forelesning 5-formen)
# ======================================================================
FCF, r, N = 31.5, 0.07, 12.5          # € m per år, kapitalkostnad, m aksjer
V = FCF / r
P0 = V / N
dps0 = FCF / N
Pex0 = (V) / N                         # kurs etter utbyttet i år 1 under gammel politikk
assert near(P0, (dps0 + Pex0) / (1 + r))
assert near(V, 450) and near(P0, 36) and near(dps0, 2.52)

# (b) ekstra utbytte i år 1, underskuddet hentes med nye aksjer rett etter utbyttet
SD = 50.0
sd_ps = SD / N
gap = SD - FCF
E1 = FCF / r                           # aksjene etter emisjonen: utbyttene fra år 2
Pn = (E1 - gap) / N                    # likningene: Pn·n = gap og Pn·(N + n) = E1
nn = gap / Pn
assert near(Pn * nn, gap) and near(Pn * (N + nn), E1)
dps2b = FCF / (N + nn)
assert near(dps2b / r, Pn)
P0b = (sd_ps + Pn) / (1 + r)
assert near(P0b, P0)                    # kursen i dag uendret
# verdien av mer i år 1 mot mindre senere, per aksje i dag
pv_mer = (sd_ps - dps0) / (1 + r)
pv_mindre = ((dps0 - dps2b) / r) / (1 + r)
assert near(pv_mer, pv_mindre)
krav_ny = gap * r                      # forelesning 5: de nye investorenes evigvarende krav
assert near((FCF - krav_ny) / r / N, Pn)
# felle: nye aksjer solgt til dagens kurs eller til kursen med utbyttet
felle_b1 = gap / P0
assert utenfor(felle_b1, nn) and utenfor(gap / ((V + FCF) / N), nn)

# (d) tilbakekjøp i år 1 med hele kontantstrømmen
Pb = (V + FCF) / N                     # Pb·m = FCF og Pb·(N − m) = V
m = FCF / Pb
assert near(Pb * m, FCF) and near(Pb * (N - m), V)
Nrest = N - m
dps2d = FCF / Nrest
assert near(dps2d / r, Pb)
P0d = Pb / (1 + r)
assert near(P0d, P0)
felle_d = FCF / P0                     # «they divide it by their original price»
assert utenfor(felle_d, m)
assert utenfor(P0, Pb)                 # dagens kurs er ikke tilbakekjøpskursen
# (e) tre posisjoner ved slutten av år 1, per aksje i dag
pos_gammel = dps0 + Pex0
pos_selger = Pb
pos_beholder = dps2d / r
assert near(pos_gammel, pos_selger) and near(pos_selger, pos_beholder)
assert near(sd_ps + Pn, pos_gammel)     # også ekstrautbyttet gir det samme
assert near(Pn, 34.52) and near(Pb, 38.52)

cur = "€"
ex = {
    "n": 1, "title": "Payout Policy", "points": 20,
    "topic": "MM in perfect markets, dividends and repurchases", "chapters": [6, 15],
    "merke": "Samme form som utbytte- og tilbakekjøpseksemplet i forelesning 5",
    "body": (f"<p>Lindewaard Toll Bridge NV operates in a perfect capital market (MM propositions hold, no "
             f"taxes). It has no debt and {g(N)} million shares. Its free cash flow of €{g(FCF)} million a year in "
             f"perpetuity, the first in one year, is all paid out as dividends at year-end. Its cost of capital is "
             f"{pc(r)}. Use 4 decimal places.</p>"),
}
pa = {
    "label": "a", "points": 3,
    "body": "<p>What are the firm value, the share price today and the dividend per share at the end of Year 1?</p>",
    "solution": (
        f"<p><b>Step 1. Firm value.</b> The firm is a perpetuity of €{g(FCF)}M discounted at {pc(r)}:</p>"
        f"<p>V = FCF / r = {g(FCF)} / {g(r)} = <b>€{g(V)}M</b></p>"
        f"<p><b>Step 2. Share price.</b> There is no debt, so E = V and P<sub>0</sub> = {g(V)} / {g(N)} = "
        f"<b>€{f(P0, 2)} per share</b>.</p>"
        f"<p><b>Step 3. Dividend.</b> Div<sub>1</sub> = {g(FCF)} / {g(N)} = <b>€{f(dps0, 2)} per share</b>.</p>"
        f"<p><b>Check.</b> P<sub>0</sub> = Div<sub>1</sub> / r = {f(dps0, 2)} / {g(r)} = €{f(P0, 2)}. ✓</p>"),
    "criteria": [
        f"V = {g(FCF)}/{g(r)} = €{g(V)}M as a perpetuity. Using an annuity or adding the first cash flow at t = 0 is wrong: the first cash flow comes in one year.",
        f"P0 = €{g(V)}M / {g(N)}M shares = €{f(P0, 2)}.",
        f"Div1 = €{g(FCF)}M / {g(N)}M = €{f(dps0, 2)} per share.",
        "All three numbers are asked for. Answering only the firm value loses points (the lecturer warns about this in lecture 6).",
    ],
}
pb = {
    "label": "b", "points": 5,
    "body": (f"<p>The board announces today a Year 1 dividend of €{g(SD)} million in total. The shortfall is raised "
             f"by selling new shares at the market price right after the payment. From Year 2 on, all free cash flow "
             f"is paid out as before.</p>"
             f"<p>What is the Year 1 dividend per share? At what price are the new shares sold and how many? What is "
             f"the dividend per share from Year 2 on?</p>"),
    "solution": (
        f"<p><b>Step 1. The Year 1 dividend.</b> €{g(SD)}M / {g(N)}M = <b>€{f(sd_ps, 2)} per share</b>. The Year 1 "
        f"free cash flow covers €{g(FCF)}M, so €{g(SD)}M − €{g(FCF)}M = <b>€{g(gap)}M</b> must come from new "
        f"shares.</p>"
        f"<p><b>Step 2. What the shares are worth after the dividend.</b> Right after the payment the firm still "
        f"owns the bridge, which pays €{g(FCF)}M a year from Year 2 on. All shares together, old and new, are "
        f"therefore worth {g(FCF)} / {g(r)} = €{g(E1)}M. The new shares are sold at the market price P<sub>1</sub> "
        f"(n = number of new shares, in millions). Two equations:</p>"
        f"<p>P<sub>1</sub> × n = {g(gap)} (the issue raises the shortfall)<br>"
        f"P<sub>1</sub> × ({g(N)} + n) = {g(E1)} (all shares are worth the firm)</p>"
        f"<p>Subtract the first from the second: {g(N)} × P<sub>1</sub> = {g(E1)} − {g(gap)} = {g(E1 - gap)}, so "
        f"<b>P<sub>1</sub> = €{f(Pn, 2)}</b> and n = {g(gap)} / {f(Pn, 2)} = <b>{f(nn)} million new shares</b>.</p>"
        f"<p><b>Equivalently (the route in lecture 5).</b> The new investors pay €{g(gap)}M for a perpetual claim "
        f"of {g(gap)} × {g(r)} = €{g(krav_ny)}M a year from Year 2. The old shareholders keep {g(FCF)} − "
        f"{g(krav_ny)} = €{g(FCF - krav_ny)}M a year, worth {g(FCF - krav_ny)} / {g(r)} = €{g((FCF - krav_ny) / r)}M "
        f"or €{f(Pn, 2)} per share.</p>"
        f"<p><b>Step 3. The dividend from Year 2 on.</b> €{g(FCF)}M is now shared by {g(N)} + {f(nn)} = "
        f"{f(N + nn)}M shares:</p>"
        f"<p>Div = {g(FCF)} / {f(N + nn)} = <b>€{f(dps2b)} per share</b></p>"
        f"<p><b>Check.</b> {f(dps2b)} / {g(r)} = €{f(dps2b / r, 2)} = P<sub>1</sub>. ✓ The new shareholders paid "
        f"€{f(Pn, 2)} for a share worth €{f(Pn, 2)}.</p>"),
    "criteria": [
        f"Year 1 dividend €{f(sd_ps, 2)} per share and a shortfall of €{g(gap)}M to be raised with new shares.",
        f"Prices the new shares ex dividend: the firm left after the payment is worth {g(FCF)}/{g(r)} = €{g(E1)}M and the old shareholders keep {g(E1)} − {g(gap)} = {g(E1 - gap)}, so P1 = {g(E1 - gap)}/{g(N)} = €{f(Pn, 2)}. The two equations (P1 × n = {g(gap)} and P1 × ({g(N)} + n) = {g(E1)}) or, equivalently, the lecture 5 route through the new investors' perpetual claim ({g(gap)} × {g(r)} = {g(krav_ny)} a year, so the old shareholders keep {g(FCF - krav_ny)} a year) are both accepted.",
        f"n = {g(gap)}/{f(Pn, 2)} = {f(nn)} million. Selling at today's €{f(P0, 2)} gives {f(felle_b1)} million and is the classic error: the new shares are sold at the price that holds when they are sold.",
        f"Dividend from Year 2 = {g(FCF)}/{f(N + nn)} = €{f(dps2b)}, on the larger share count.",
        "Show the calculation. No calculation, no points.",
    ],
}
pc_ = {
    "label": "c", "points": 3,
    "body": ("<p>What is the share price today, after the announcement in (b)? Are the current shareholders better "
             "or worse off? Explain briefly.</p>"),
    "solution": (
        f"<p><b>Step 1. Price today.</b> A share pays €{f(sd_ps, 2)} at the end of Year 1 and is then worth "
        f"€{f(Pn, 2)}:</p>"
        f"<p>P<sub>0</sub> = ({f(sd_ps, 2)} + {f(Pn, 2)}) / {g(1 + r)} = {f(sd_ps + Pn, 2)} / {g(1 + r)} = "
        f"<b>€{f(P0b, 2)}</b>, unchanged.</p>"
        f"<p><b>Step 2. Better or worse off?</b> <b>Neither.</b> The current shareholders get "
        f"€{f(sd_ps - dps0, 2)} more per share in Year 1 (€{f(sd_ps, 2)} instead of €{f(dps0, 2)}) and "
        f"€{f(dps0 - dps2b)} less every year after that (€{f(dps2b)} instead of €{f(dps0, 2)}). The two are "
        f"worth the same today: {f(sd_ps - dps0, 2)} / {g(1 + r)} = {f(pv_mer)} and "
        f"({f(dps0 - dps2b)} / {g(r)}) / {g(1 + r)} = {f(pv_mindre)}. The extra cash is paid for by the new "
        f"shareholders, who buy a fair claim on part of the future dividends. There is no wealth transfer: we "
        f"live in a perfect capital market, so the firm value stays at €{g(V)}M. Payout policy only changes "
        f"when the shareholders receive the value, not how much it is.</p>"),
    "criteria": [
        f"P0 = ({f(sd_ps, 2)} + {f(Pn, 2)})/{g(1 + r)} = €{f(P0b, 2)}: the price does not change on announcement.",
        f"Answers the question: the current shareholders are neither better nor worse off. A higher dividend now is offset by a lower dividend later ({f(dps2b)} instead of {f(dps0, 2)}). Both have the same present value ({f(pv_mer)}).",
        "Gives the reason: perfect capital market (MM), the firm's free cash flow does not change and the new shares are sold at a fair price, so the firm value is unchanged.",
    ],
}
pd = {
    "label": "d", "points": 5,
    "body": ("<p>Instead, the board considers spending the whole Year 1 free cash flow on a buyback at the market "
             "price at the end of Year 1, with no Year 1 dividend and all free cash flow paid out from Year 2 on.</p>"
             "<p>At what price are the shares bought back and how many? What is the dividend per share from Year 2 "
             "on?</p>"),
    "solution": (
        f"<p><b>Step 1. Two equations.</b> At the end of Year 1 the firm holds €{g(FCF)}M of cash and the bridge, "
        f"whose cash flows from Year 2 on are worth {g(FCF)} / {g(r)} = €{g(V)}M. Let P<sub>1</sub> be the buyback "
        f"price and m the number of shares bought back (millions):</p>"
        f"<p>P<sub>1</sub> × m = {g(FCF)} (the cash spent on the buyback)<br>"
        f"P<sub>1</sub> × ({g(N)} − m) = {g(V)} (the shares that remain are worth the firm)</p>"
        f"<p>Add the two: {g(N)} × P<sub>1</sub> = {g(FCF)} + {g(V)} = {g(FCF + V)}, so "
        f"<b>P<sub>1</sub> = €{f(Pb, 2)} per share</b> and m = {g(FCF)} / {f(Pb, 2)} = "
        f"<b>{f(m)} million shares</b>. {f(Nrest)} million shares remain.</p>"
        f"<p>The buyback price is not today's €{f(P0, 2)}. A year has passed and the firm is holding the Year 1 "
        f"cash, so the share is worth €{f(P0, 2)} × {g(1 + r)} = €{f(Pb, 2)} when the buyback takes place. Dividing "
        f"€{g(FCF)}M by €{f(P0, 2)} (giving {f(felle_d)} million) is the mistake the lecturer calls the biggest one "
        f"in the exam.</p>"
        f"<p><b>Step 2. The dividend from Year 2 on.</b> Div = {g(FCF)} / {f(Nrest)} = "
        f"<b>€{f(dps2d)} per share</b>.</p>"
        f"<p><b>Check.</b> {f(dps2d)} / {g(r)} = €{f(dps2d / r, 2)} = P<sub>1</sub>. Also "
        f"{f(Nrest)} × {f(Pb, 2)} = €{g(Nrest * Pb)}M. ✓</p>"),
    "criteria": [
        f"Sets up the system of two equations, P1 × m = {g(FCF)} and P1 × ({g(N)} − m) = {g(V)}, or equivalent direct reasoning (the share is worth ({g(V)} + {g(FCF)})/{g(N)} just before the buyback, then m = cash/P1). The lecturer stresses that a repurchase always gives two equations.",
        f"P1 = ({g(FCF)} + {g(V)})/{g(N)} = €{f(Pb, 2)}, the price at the end of Year 1 with the cash still in the firm.",
        f"m = {g(FCF)}/{f(Pb, 2)} = {f(m)} million shares. Dividing by today's €{f(P0, 2)} ({f(felle_d)} million) is the classic error and loses most of the points.",
        f"Dividend from Year 2 = {g(FCF)}/{f(Nrest)} = €{f(dps2d)}, on the smaller share count.",
        "Show the calculation. No calculation, no points.",
    ],
}
pe = {
    "label": "e", "points": 4,
    "body": ("<p>Compare the position at the end of Year 1, per share held today, of a shareholder under the old "
             "policy, one who sells in the buyback and one who keeps the share. Comment.</p>"),
    "solution": (
        f"<p>All three positions are worth <b>€{f(pos_gammel, 2)}</b> at the end of Year 1.</p>"
        + tab(["Position", "What they hold at the end of Year 1", "Value"], [
            ["Old policy", f"Dividend €{f(dps0, 2)} plus a share worth {f(dps0, 2)} / {g(r)} = €{f(Pex0, 2)}",
             f"#€{f(pos_gammel, 2)}"],
            ["Buyback, sells", "Cash from the buyback", f"#€{f(pos_selger, 2)}"],
            ["Buyback, keeps", f"A share paying €{f(dps2d)} a year from Year 2: {f(dps2d)} / {g(r)}",
             f"#€{f(pos_beholder, 2)}"],
        ])
        + f"<p>The plan in (b) gives the same: {f(sd_ps, 2)} + {f(Pn, 2)} = €{f(sd_ps + Pn, 2)}. So today's price "
          f"is {f(Pb, 2)} / {g(1 + r)} = €{f(P0d, 2)} under every plan.</p>"
          f"<p><b>Comment.</b> In a perfect capital market payout policy is irrelevant: a dividend and a buyback "
          f"are equivalent and nobody is better or worse off. The firm value stays at €{g(V)}M because the "
          f"bridge's free cash flow does not depend on how it is paid out. The seller is paid the fair price; the "
          f"holder gets a higher dividend per share later because there are fewer shares. Only the form of the "
          f"payout differs (cash now or a larger claim later), which matters only once frictions such as taxes or "
          f"investor preferences come in.</p>"),
    "criteria": [
        f"All three positions are stated and all come to €{f(pos_gammel, 2)}: {f(dps0, 2)} + {f(Pex0, 2)} under the old policy, {f(Pb, 2)} in cash for the seller, {f(dps2d)}/{g(r)} = {f(pos_beholder, 2)} for the holder. The comparison is what is graded.",
        "Comment: anything reasonable about MM. Names payout irrelevance (a dividend and a buyback are equivalent), says why the firm value is unchanged (perfect capital market, the free cash flow is the same) and that the seller gets a fair price, so there is no wealth transfer between sellers and holders.",
        f"Bonus: noticing that the plan in (b) also gives €{f(sd_ps + Pn, 2)} at the end of Year 1 ({f(sd_ps, 2)} + {f(Pn, 2)}).",
    ],
}
ex["parts"] = [pa, pb, pc_, pd, pe]
OPPG["mk-mm-rekap-1"] = ex
SVAR["mk-mm-rekap-1:1:a"] = {"type": "tall", "tall": [T("V", V, "€ m"), T("P<sub>0</sub>", P0, "€ per share"),
                                                      T("Div<sub>1</sub>", dps0, "€ per share")]}
SVAR["mk-mm-rekap-1:1:b"] = {"type": "tall", "tall": [T("Year 1 dividend per share", sd_ps, "€ per share"),
                                                      T("Price of the new shares", Pn, "€ per share"),
                                                      T("New shares", nn, "m shares"),
                                                      T("Dividend from Year 2", dps2b, "€ per share")]}
SVAR["mk-mm-rekap-1:1:c"] = {"type": "blandet", "tall": [T("P<sub>0</sub> after the announcement", P0b, "€ per share")],
                             "tallPoeng": 1,
                             "tekstLedd": "Are the current shareholders better or worse off than under the old policy? Explain briefly."}
SVAR["mk-mm-rekap-1:1:d"] = {"type": "tall", "tall": [T("Buyback price", Pb, "€ per share"),
                                                      T("Shares bought back", m, "m shares"),
                                                      T("Dividend from Year 2", dps2d, "€ per share")]}
SVAR["mk-mm-rekap-1:1:e"] = {"type": "blandet", "tall": [T("Old policy, end of Year 1", pos_gammel, "€ per share"),
                                                         T("Sells in the buyback", pos_selger, "€ per share"),
                                                         T("Keeps the share", pos_beholder, "€ per share")],
                             "tallPoeng": 2, "tekstLedd": "Comment.",
                             "merknad": "Ingen reserveverdi for (d): enhver annen tilbakekjøpskurs enn 38.52 bryter likheten som kommentaren handler om. Posisjonen under gammel politikk avhenger bare av (a)."}

# ======================================================================
# mk-mm-rekap-2 · Hollis Creek Veterinary (H2024 E3-formen)
# ======================================================================
N, P0, D0, rf, rE0 = 18.0, 70.0, 315.0, 0.035, 0.105
E0 = N * P0
V = E0 + D0
rU = (E0 / V) * rE0 + (D0 / V) * rf
assert near(rE0, rU + (D0 / E0) * (rU - rf))
de = 0.75
D1 = V * de / (1 + de)                 # V er uendret (MM I)
E1 = V - D1
assert near(D1 / E1, de)
div = D1 - D0
dps = div / N
P1 = E1 / N
assert near(P1 + dps, P0)              # kurs etter + utbytte = kurs før
assert near(N * P1 + div, E0)          # samlet formue uendret
rD1 = 0.055
rE1 = rU + (D1 / E1) * (rU - rD1)
assert near((E1 / V) * rE1 + (D1 / V) * rD1, rU)
assert rE1 > rE0
# feller i (d)
felle_d_gammel = rU + (D1 / E1) * (rU - rf)       # gammel r_D
felle_d_dv = rU + (D1 / V) * (rU - rD1)           # D/V i stedet for D/E
assert utenfor(felle_d_gammel, rE1) and utenfor(felle_d_dv, rE1) and utenfor(rE0, rE1)
# feller i (b): ny gjeld = D/E × V, eller hele beløpet som utbytte
assert utenfor(de * V, D1) and utenfor(D1 / N, dps)
# (e) tilbakekjøp i stedet: Pr·n = div og Pr·(N − n) = E1
Pr = (div + E1) / N
nr = div / Pr
assert near(Pr, P0) and near(Pr * (N - nr), E1)
assert near(D1 / E1, de)               # samme D/E, samme r_E
felle_e = D1 / P0                      # kjøper tilbake for hele lånet
assert utenfor(felle_e, nr)
assert near(rU, 0.091) and near(D1, 675) and near(dps, 20) and near(P1, 50)
# reserveverdier (ikke svaret) og svarene som bygger på dem
D1_res, rU_res = 630.0, 0.095
assert utenfor(D1_res, D1) and utenfor(rU_res, rU)
P1_res = (V - D1_res) / N
rE1_res = rU_res + de * (rU_res - rD1)
nr_res = (D1_res - D0) / ((D1_res - D0 + V - D1_res) / N)
assert near((D1_res - D0 + V - D1_res) / N, P0)        # kursen er uendret også med reserveverdien
assert near(P1_res + (D1_res - D0) / N, P0)            # MM holder også med reserveverdien
for res, svar_ in ((P1_res, P1), (rE1_res, rE1), (nr_res, nr)):
    assert utenfor(res, svar_)
assert utenfor(rE1_res, felle_d_gammel) and utenfor(rE1_res, felle_d_dv)

ex = {
    "n": 1, "title": "Capital Structure", "points": 20,
    "topic": "MM in perfect markets, recapitalisation", "chapters": [4, 6, 15],
    "merke": "Samme form som H2024 E3: ny gjeld, utbytte og tilbakekjøp som alternativ",
    "body": (f"<p>Hollis Creek Veterinary Inc., a US chain of veterinary clinics, has {g(N)} million shares outstanding at a "
             f"share price of ${g(P0)}. The company operates in perfect capital markets with no taxes and has "
             f"${g(D0)} million of debt. The debt is risk-free with an expected return of {pc(rf)}. The equity cost "
             f"of capital is {pc(rE0)}. Use 4 decimal places.</p>"),
}
pa = {
    "label": "a", "points": 3,
    "body": "<p>What is the unlevered cost of capital (r<sub>U</sub>) of the firm?</p>",
    "solution": (
        f"<p><b>Step 1. Market values.</b> E = {g(N)}M × ${g(P0)} = <b>${g(E0)}M</b>, D = ${g(D0)}M, "
        f"V = E + D = <b>${g(V)}M</b>. Weights: E/V = {g(E0 / V)} and D/V = {g(D0 / V)}.</p>"
        f"<p><b>Step 2. r<sub>U</sub> is the pre-tax WACC</b> (no taxes, so no (1 − τ<sub>c</sub>)):</p>"
        f"<p>r<sub>U</sub> = {g(E0 / V)} × {pc(rE0)} + {g(D0 / V)} × {pc(rf)} = {pc((E0 / V) * rE0)} + "
        f"{pc((D0 / V) * rf)} = <b>{pc(rU, 4)}</b></p>"
        f"<p><b>Cross-check with MM II.</b> {pc(rU)} + ({g(D0)}/{g(E0)})({pc(rU)} − {pc(rf)}) = {pc(rU)} + "
        f"{f(D0 / E0)} × {pc(rU - rf)} = {pc(rE0)}. ✓</p>"),
    "criteria": [
        f"E = {g(N)} × {g(P0)} = ${g(E0)}M from the share price. V = E + D = ${g(V)}M.",
        f"Uses market-value weights E/V = {g(E0 / V)} and D/V = {g(D0 / V)}, with no (1 − τ) term because there are no taxes.",
        f"r_U = {pc(rU, 4)}.",
    ],
}
pb = {
    "label": "b", "points": 4,
    "body": (f"<p>The management announces that it will issue new debt, use it to repay all the existing debt and pay "
             f"out the rest as a special dividend right away. After the transaction the debt-to-equity ratio (D/E) "
             f"will be {g(de)}.</p>"
             f"<p>How much new debt must be issued in total and what is the dividend per share? What happens to the "
             f"share price immediately upon announcement? Explain briefly.</p>"),
    "solution": (
        f"<p><b>Step 1. The firm value does not change.</b> We live in a perfect capital market: there are no "
        f"taxes (so no tax shield) and no costs of distress. By MM I the firm value is set by the clinics' cash "
        f"flows, not by how they are split between debt and equity. V stays at <b>${g(V)}M</b>.</p>"
        f"<p><b>Step 2. The new debt.</b> D/E = {g(de)} means D/V = {g(de)} / {g(1 + de)} = {f(D1 / V)}:</p>"
        f"<p>D<sub>new</sub> = {f(D1 / V)} × {g(V)} = <b>${g(D1)}M in total</b> (a net increase of "
        f"{g(D1)} − {g(D0)} = ${g(div)}M)</p>"
        f"<p><b>Step 3. The dividend.</b> ${g(D1)}M − ${g(D0)}M to repay the old debt = ${g(div)}M, or "
        f"{g(div)} / {g(N)} = <b>${f(dps, 2)} per share</b>.</p>"
        f"<p><b>Step 4. The share price on announcement.</b> <b>Nothing happens: it stays at ${f(P0, 2)}.</b> The "
        f"firm value is unchanged and nothing has been paid out yet, so each share is still worth "
        f"{g(E0)} / {g(N)} = ${f(P0, 2)} (cum dividend).</p>"),
    "criteria": [
        f"Keeps V at ${g(V)}M and converts D/E = {g(de)} into D/V = {f(D1 / V)}: new debt = ${g(D1)}M. Using {g(de)} × {g(V)} = {g(de * V)} confuses D/E with D/V.",
        f"Dividend = {g(D1)} − {g(D0)} = ${g(div)}M, or ${f(dps, 2)} per share. Paying out the whole ${g(D1)}M forgets the old debt.",
        f"Share price on announcement: unchanged at ${f(P0, 2)}.",
        "Gives the reason: perfect capital market (MM I), no taxes and so no tax shield, so the financing decision does not change the firm value. One line is enough, as in the lecturer's key to H2024 E3.",
    ],
}
pc_ = {
    "label": "c", "points": 3,
    "body": (f"<p>What is the share price after the dividend has been paid? Are the shareholders better or worse "
             f"off? (If you could not solve (b), use ${g(D1_res)} million of new debt in total.)</p>"),
    "solution": (
        f"<p><b>Step 1. The new equity value.</b> E = V − D = {g(V)} − {g(D1)} = <b>${g(E1)}M</b>. A dividend "
        f"retires no shares, so the share count is still {g(N)}M:</p>"
        f"<p>P = {g(E1)} / {g(N)} = <b>${f(P1, 2)} per share</b></p>"
        f"<p><b>Step 2. Better or worse off?</b> <b>Neither.</b> Each shareholder now holds a share worth "
        f"${f(P1, 2)} plus ${f(dps, 2)} in cash, which is ${f(P1 + dps, 2)}, exactly the ${f(P0, 2)} before. The "
        f"price falls by the dividend, which is the ordinary ex-dividend drop and not a loss.</p>"
        f"<p><b>Check.</b> {g(N)} × {f(P1, 2)} + {g(div)} = ${g(N * P1 + div)}M, the equity value before the "
        f"transaction. ✓ With the fallback of ${g(D1_res)}M: P = ({g(V)} − {g(D1_res)}) / {g(N)} = "
        f"${f(P1_res, 2)}, plus a dividend of ${f((D1_res - D0) / N, 2)}, again ${f(P0, 2)}.</p>"),
    "criteria": [
        f"E = {g(V)} − {g(D1)} = ${g(E1)}M over an unchanged {g(N)}M shares: P = ${f(P1, 2)}. Reducing the share count confuses a dividend with a repurchase.",
        f"Answers the second question: neither better nor worse off, because ${f(P1, 2)} + ${f(dps, 2)} = ${f(P0, 2)}.",
        "Names the mechanism: MM I in a perfect capital market and the ex-dividend price drop, so there is no wealth transfer. A lower price is not a loss.",
    ],
}
pd = {
    "label": "d", "points": 3,
    "body": (f"<p>After the transaction the debt is risky and has an expected return of {pc(rD1)}. What is the new "
             f"equity cost of capital? (If you could not solve (a), use r<sub>U</sub> = {pc(rU_res)}.)</p>"),
    "solution": (
        f"<p><b>Step 1. The new capital structure.</b> D = ${g(D1)}M and E = ${g(E1)}M, so D/E = {g(D1 / E1)}. "
        f"r<sub>U</sub> is still {pc(rU, 4)}: the clinics and their business risk have not changed.</p>"
        f"<p><b>Step 2. From r<sub>U</sub> to the new r<sub>E</sub> (MM II with the new r<sub>D</sub>).</b></p>"
        f"<p>r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>) = {pc(rU)} + {g(D1 / E1)} × "
        f"({pc(rU)} − {pc(rD1)}) = {pc(rU)} + {g(D1 / E1)} × {pc(rU - rD1)} = <b>{pc(rE1, 4)}</b></p>"
        f"<p><b>Check</b> (an identity once MM II is used, so it only catches arithmetic slips): "
        f"{f(E1 / V)} × {pc(rE1)} + {f(D1 / V)} × {pc(rD1)} = {f((E1 / V) * rE1)} + {f((D1 / V) * rD1)} = "
        f"{f(rU)} = r<sub>U</sub>. ✓ With the fallback r<sub>U</sub> = {pc(rU_res)}: {pc(rU_res)} + {g(de)} × "
        f"({pc(rU_res)} − {pc(rD1)}) = {pc(rE1_res, 4)}.</p>"),
    "criteria": [
        f"Uses the post-transaction D/E = {g(D1)}/{g(E1)} = {g(D1 / E1)}, not D/V = {f(D1 / V)} ({pc(felle_d_dv, 4)}) and not the old {f(D0 / E0)}.",
        f"Keeps r_U = {pc(rU, 4)} and uses the NEW r_D = {pc(rD1)}. The old {pc(rf)} gives {pc(felle_d_gammel, 4)} and is the error.",
        f"r_E = {pc(rE1, 4)}.",
    ],
}
pe = {
    "label": "e", "points": 4,
    "body": (f"<p>Instead of the dividend, the management considers issuing the same new debt, repaying the old debt and "
             "using the rest to repurchase shares. What is the share price after the transaction? How many shares are "
             f"repurchased? (If you could not solve (b), use ${g(D1_res)} million of new debt in total.)</p>"),
    "solution": (
        f"<p><b>Step 1. Two equations.</b> The firm has ${g(div)}M to spend after repaying the old debt. Let P be "
        f"the price after the transaction and n the number of shares repurchased (millions). The equity left must "
        f"be worth V − D = ${g(E1)}M:</p>"
        f"<p>P × n = {g(div)} (the repurchase)<br>"
        f"P × ({g(N)} − n) = {g(E1)} (the remaining equity)</p>"
        f"<p>Add them: {g(N)} × P = {g(div + E1)}, so <b>P = ${f(Pr, 2)}</b>, unchanged. Since we live in a perfect "
        f"capital market, the repurchase at the market price is a fair exchange of cash for shares.</p>"
        f"<p><b>Step 2. Shares repurchased.</b> n = {g(div)} / {f(Pr, 2)} = <b>{f(nr)} million shares</b>, leaving "
        f"{f(N - nr)} million.</p>"
        f"<p><b>Check.</b> {g(E1)} / {f(N - nr)} = ${f(E1 / (N - nr), 2)}. ✓ D/E is again {g(de)}, so r<sub>E</sub> "
        f"is the same {pc(rE1, 4)} as in (d). With the fallback of ${g(D1_res)}M: the price is still "
        f"${f(P0, 2)} and n = {g(D1_res - D0)} / {f(P0, 2)} = {f(nr_res)} million.</p>"),
    "criteria": [
        f"Share price unchanged at ${f(Pr, 2)}. Bonus: the reason (a repurchase at a fair price in a perfect capital market).",
        f"Uses only the ${g(div)}M left after repaying the old debt: n = {g(div)}/{f(Pr, 2)} = {f(nr)} million. Using the whole ${g(D1)}M ({f(felle_e)} million) is the error.",
        f"Sets up the two equations P × n = {g(div)} and P × ({g(N)} − n) = {g(E1)}, as in the lecturer's key to H2024 E3, or equivalent direct reasoning (the price stays at ${f(Pr, 2)}, so n = {g(div)}/{f(Pr, 2)}), as in the key to H2025 E3.",
        f"Bonus: the comparison with (c). The dividend leaves ${f(P1, 2)} + ${f(dps, 2)}, the repurchase ${f(Pr, 2)} in cash or in shares, so a dividend and a repurchase are equivalent.",
    ],
}
pf = {
    "label": "f", "points": 3,
    "body": (f"<p>The CFO argues: «Our new debt costs only {pc(rD1)}, much less than our equity. Replacing equity "
             f"with this cheap debt lowers our cost of capital and therefore raises the value of the firm.» Is the "
             f"CFO right? Explain briefly (3 to 4 sentences).</p>"),
    "solution": (
        f"<p><b>No.</b> Every dollar of debt makes the remaining equity riskier, so r<sub>E</sub> rises from "
        f"{pc(rE0)} to {pc(rE1)} (MM II) and the cheaper debt is exactly offset: the WACC is {f(E1 / V)} × "
        f"{pc(rE1)} + {f(D1 / V)} × {pc(rD1)} = {pc(rU)} = r<sub>U</sub>, the same as before "
        f"({g(E0 / V)} × {pc(rE0)} + {g(D0 / V)} × {pc(rf)}). The firm value stays at ${g(V)}M because we live in "
        f"a perfect capital market: with no taxes there is no tax shield and the clinics' cash flows do not "
        f"depend on how they are financed. That the new debt is risky only moves part of the same total risk "
        f"from the shareholders to the lenders.</p>"),
    "criteria": [
        "Says clearly that the CFO is wrong.",
        "Mechanism: cheaper debt is offset by a higher cost of equity (MM II), because the equity holders carry the same business risk over a smaller base.",
        f"The WACC stays at r_U = {pc(rU)} and the firm value at ${g(V)}M, because we live in a perfect capital market (no taxes, no tax shield). Stating this reason is required for full marks.",
        "Bonus: the one-line WACC check before and after, or noting that the risky debt shifts part of the same risk to the lenders.",
    ],
}
ex["parts"] = [pa, pb, pc_, pd, pe, pf]
OPPG["mk-mm-rekap-2"] = ex
SVAR["mk-mm-rekap-2:1:a"] = {"type": "tall", "tall": [T("r<sub>U</sub>", 100 * rU, "%")]}
SVAR["mk-mm-rekap-2:1:b"] = {"type": "blandet", "tall": [T("New debt issued", D1, "$ m"),
                                                         T("Dividend per share", dps, "$ per share"),
                                                         T("Share price on announcement", P0, "$ per share")],
                             "tallPoeng": 3,
                             "tekstLedd": "Why does the share price react as it does upon announcement?"}
SVAR["mk-mm-rekap-2:1:c"] = {"type": "blandet", "tall": [T("Share price after the dividend", P1, "$ per share", alt=[round(P1_res, 10)])],
                             "tallPoeng": 1.5, "tekstLedd": "Are the shareholders better or worse off?",
                             "merknad": f"alt {g(P1_res)} er svaret med reserveverdien ${g(D1_res)}M ny gjeld."}
SVAR["mk-mm-rekap-2:1:d"] = {"type": "tall", "tall": [T("New r<sub>E</sub>", 100 * rE1, "%", alt=[round(100 * rE1_res, 10)])],
                             "merknad": f"alt {g(100 * rE1_res)} er svaret med reserveverdien r_U = {pc(rU_res)}. Fellene {g(100 * felle_d_gammel)} (gammel r_D) og {f(100 * felle_d_dv)} (D/V) avvises."}
SVAR["mk-mm-rekap-2:1:e"] = {"type": "tall", "tall": [T("Share price after the repurchase", Pr, "$ per share"),
                                                      T("Shares repurchased", nr, "m shares", alt=[round(nr_res, 10)])],
                             "merknad": f"alt {g(nr_res)} er svaret med reserveverdien ${g(D1_res)}M ny gjeld (kursen er 70 uansett)."}
SVAR["mk-mm-rekap-2:1:f"] = {"type": "tekst"}

# ======================================================================
# mk-mm-rekap-3 · Heggedal Heis (risikabel gammel gjeld innfris, r_D endres)
# ======================================================================
FCF, N, P0, D0, rD0, rf = 228.0, 32.0, 45.0, 960.0, 0.065, 0.04
E0 = N * P0
V = E0 + D0
rU = FCF / V
til_D0 = rD0 * D0
rE0 = (FCF - til_D0) / E0
assert near(rU, (E0 / V) * rE0 + (D0 / V) * rD0)
assert near(rE0, rU + (D0 / E0) * (rU - rD0))
felle_a = rU + (D0 / E0) * (rU - rf)               # r_f for den risikable gjelden
assert utenfor(felle_a, rE0)
dps0 = (FCF - til_D0) / N
assert near(dps0 / rE0, P0)
# (b) emisjon og nytt risikofritt lån innfrir all gammel gjeld til markedsverdi
EQ, L = 600.0, 360.0
assert near(EQ + L, D0)
D1 = L
E1 = V - D1
Pn = (E1 - EQ) / N                     # Pn·n = EQ og Pn·(N + n) = E1
nn = EQ / Pn
assert near(Pn, P0) and near(Pn * (N + nn), E1)
N1 = N + nn
# (c) ny r_E med r_D = r_f
rE1 = rU + (D1 / E1) * (rU - rf)
assert near((E1 / V) * rE1 + (D1 / V) * rf, rU)
felle_c_gammel = rU + (D1 / E1) * (rU - rD0)
felle_c_dv = rU + (D1 / V) * (rU - rf)
assert utenfor(felle_c_gammel, rE1) and utenfor(felle_c_dv, rE1) and utenfor(rE0, rE1)
# (d) utbytte per aksje før og etter, og kursen fra utbyttet
til_D1 = rf * D1
dps1 = (FCF - til_D1) / N1
Pd = dps1 / rE1
assert near(Pd, P0)
assert near(rE1, (FCF - til_D1) / E1)
# sjekken feiler på en gal r_E fra (c)
P_feil_gammel = dps1 / felle_c_gammel
P_feil_dv = dps1 / felle_c_dv
assert utenfor(P_feil_gammel, P0) and utenfor(P_feil_dv, P0)
assert dps1 < dps0
# (e) ingen er bedre eller verre stilt
assert near(N * Pd, E0)                # eksisterende eiere
assert near(nn * Pd, EQ)               # nye eiere
assert near(D0, EQ + L)                # gamle långivere får markedsverdien
assert near(rU, 0.095) and near(rE0, 0.115) and near(nn, 40 / 3)
# reserveverdier (ikke svaret) og svarene som bygger på dem
rU_res3, nn_res, rE1_res3 = 0.10, 12.0, 0.11
assert utenfor(rU_res3, rU) and utenfor(nn_res, nn) and utenfor(rE1_res3, rE1)
rE1_fra_res = rU_res3 + (D1 / E1) * (rU_res3 - rf)          # (c) med reserve-r_U
dps1_res = (FCF - til_D1) / (N + nn_res)                      # (d) med reserveantallet
P_res = [dps1_res / rE1_res3,                                 # begge reserveverdiene
         dps1 / rE1_res3,                                     # bare reserve-r_E
         dps1 / rE1_fra_res,                                  # r_E fra reserve-r_U i (c)
         dps1_res / rE1,                                      # bare reserveantallet
         dps1_res / rE1_fra_res]                              # reserveantallet og r_E fra reserve-r_U i (c)
for x in [rE1_fra_res]:
    assert utenfor(x, rE1) and utenfor(x, felle_c_gammel) and utenfor(x, felle_c_dv) and utenfor(x, rE0)
assert utenfor(dps1_res, dps1) and utenfor(dps1_res, (FCF - til_D1) / N)
for x in P_res:
    assert utenfor(x, P0) and utenfor(x, P_feil_gammel) and utenfor(x, P_feil_dv)

ex = {
    "n": 1, "title": "Capital Structure", "points": 20,
    "topic": "MM in perfect markets, recapitalisation", "chapters": [4, 5, 6],
    "merke": "Samme form som PS1 E3 i forelesning 6, med evigrente og en emisjon som innfrir gjelden",
    "body": (f"<p>Heggedal Heis ASA, an elevator service company, operates in a perfect capital market (MM "
             f"propositions hold, no taxes). It has {g(N)} million shares trading at NOK {g(P0)} and perpetual debt "
             f"worth NOK {g(D0)} million. The debt is risky with an expected return of {pc(rD0)}: the debt holders "
             f"expect {pc(rD0)} of NOK {g(D0)} million each year. The risk-free rate is {pc(rf)}. The firm expects a "
             f"free cash flow of NOK {g(FCF)} million a year in perpetuity, all paid out as interest and dividends at "
             f"the end of each year. Use 4 decimal places.</p>"),
}
pa = {
    "label": "a", "points": 3,
    "body": ("<p>What is the unlevered cost of capital (r<sub>U</sub>) of the firm? What is the equity cost of "
             "capital?</p>"),
    "solution": (
        f"<p><b>Step 1. Firm value.</b> E = {g(N)}M × NOK {g(P0)} = NOK {g(E0)}M and V = {g(E0)} + {g(D0)} = "
        f"<b>NOK {g(V)}M</b>.</p>"
        f"<p><b>Step 2. r<sub>U</sub>.</b> All free cash flow is paid out, so V is a perpetuity of NOK {g(FCF)}M at "
        f"the pre-tax WACC, which equals r<sub>U</sub> when there are no taxes:</p>"
        f"<p>r<sub>U</sub> = FCF / V = {g(FCF)} / {g(V)} = <b>{pc(rU, 4)}</b></p>"
        f"<p><b>Step 3. r<sub>E</sub>.</b> The debt holders expect {pc(rD0)} × {g(D0)} = NOK {g(til_D0)}M, so the "
        f"shareholders expect {g(FCF)} − {g(til_D0)} = NOK {g(FCF - til_D0)}M a year:</p>"
        f"<p>r<sub>E</sub> = {g(FCF - til_D0)} / {g(E0)} = <b>{pc(rE0, 4)}</b></p>"
        f"<p><b>Cross-check with MM II</b> and the risky r<sub>D</sub>: {pc(rU)} + ({g(D0)}/{g(E0)})({pc(rU)} − "
        f"{pc(rD0)}) = {pc(rU)} + {f(D0 / E0)} × {pc(rU - rD0)} = {pc(rE0)}. ✓</p>"),
    "criteria": [
        f"V = {g(E0)} + {g(D0)} = NOK {g(V)}M and r_U = {g(FCF)}/{g(V)} = {pc(rU, 4)} (pre-tax WACC = r_U without taxes).",
        f"r_E = ({g(FCF)} − {g(til_D0)})/{g(E0)} = {pc(rE0, 4)}. The weighted-average route or MM II are equally accepted.",
        f"Uses the risky r_D = {pc(rD0)} for the old debt. MM II with r_f = {pc(rf)} gives {pc(felle_a, 4)} and is the error.",
    ],
}
pb = {
    "label": "b", "points": 5,
    "body": (f"<p>The board announces a refinancing: the firm will sell new shares at the market price for NOK "
             f"{g(EQ)} million and take a new risk-free perpetual bank loan of NOK {g(L)} million. The NOK "
             f"{g(D0)} million repays all the old debt at its market value.</p>"
             f"<p>What happens to the share price upon announcement? How many new shares must be sold? Explain "
             f"briefly why the firm value changes or does not change.</p>"),
    "solution": (
        f"<p><b>Step 1. The firm value.</b> It stays at <b>NOK {g(V)}M</b>. We live in a perfect capital market: "
        f"the refinancing does not change the NOK {g(FCF)}M of free cash flow, there are no taxes and no issue "
        f"costs, the old lenders are paid exactly what their claim is worth and the new investors pay a fair "
        f"price. Only the split of V between debt and equity changes.</p>"
        f"<p><b>Step 2. Two equations.</b> After the refinancing D = NOK {g(D1)}M, so the shares, old and new, are "
        f"worth {g(V)} − {g(D1)} = NOK {g(E1)}M. With P the price and n the new shares (millions):</p>"
        f"<p>P × n = {g(EQ)} (the issue)<br>"
        f"P × ({g(N)} + n) = {g(E1)} (all shares after the refinancing)</p>"
        f"<p>Subtract: {g(N)} × P = {g(E1 - EQ)}, so <b>P = NOK {f(Pn, 2)}</b>, unchanged on announcement. Then "
        f"n = {g(EQ)} / {f(Pn, 2)} = <b>{f(nn)} million new shares</b>. There are {f(N1)} million shares "
        f"afterwards.</p>"),
    "criteria": [
        f"Share price unchanged at NOK {f(Pn, 2)} on announcement.",
        f"n = {g(EQ)}/{f(Pn, 2)} = {f(nn)} million, from the two equations P × n = {g(EQ)} and P × ({g(N)} + n) = {g(E1)}. Selling at a lower 'diluted' price is the error.",
        "Firm value unchanged at NOK 2,400M because we live in a perfect capital market: the free cash flow is the same, there are no taxes and every claim is bought or repaid at a fair price.",
        "Show the calculation. No calculation, no points.",
    ],
}
pc_ = {
    "label": "c", "points": 3,
    "body": (f"<p>What is the equity cost of capital after the refinancing? (If you could not solve (a), use "
             f"r<sub>U</sub> = {pc(rU_res3)}.)</p>"),
    "solution": (
        f"<p><b>Step 1. The new structure.</b> D = NOK {g(D1)}M, E = NOK {g(E1)}M, so D/E = {g(D1)} / {g(E1)} = "
        f"{f(D1 / E1)}. r<sub>U</sub> is still {pc(rU, 4)}. The new loan is risk-free, so r<sub>D</sub> is now "
        f"r<sub>f</sub> = {pc(rf)}: the old {pc(rD0)} belonged to debt that no longer exists.</p>"
        f"<p><b>Step 2. From r<sub>U</sub> to the new r<sub>E</sub>.</b></p>"
        f"<p>r<sub>E</sub> = {pc(rU)} + {f(D1 / E1)} × ({pc(rU)} − {pc(rf)}) = {pc(rU)} + {f(D1 / E1)} × "
        f"{pc(rU - rf)} = <b>{pc(rE1, 4)}</b></p>"
        f"<p><b>Check</b> (an identity after MM II): {f(E1 / V)} × {pc(rE1, 4)} + {f(D1 / V)} × {pc(rf)} = "
        f"{f(rU)} = r<sub>U</sub>. ✓ The independent check comes in (d). With the fallback r<sub>U</sub> = "
        f"{pc(rU_res3)}: {pc(rU_res3)} + {f(D1 / E1)} × ({pc(rU_res3)} − {pc(rf)}) = {pc(rE1_fra_res, 4)}.</p>"),
    "criteria": [
        f"Goes from levered to r_U and back: r_U = {pc(rU, 4)} is unchanged by the refinancing.",
        f"Uses the new D/E = {g(D1)}/{g(E1)} = {f(D1 / E1)} (not D/V = {f(D1 / V)}, which gives {pc(felle_c_dv, 4)}).",
        f"Uses the NEW r_D = r_f = {pc(rf)}. Keeping the old {pc(rD0)} gives {pc(felle_c_gammel, 4)} and is the error this part tests.",
        f"r_E = {pc(rE1, 4)}.",
    ],
}
pd = {
    "label": "d", "points": 4,
    "body": (f"<p>What is the expected dividend per share at the end of Year 1 without the refinancing and with it? "
             f"Use the second figure to find the share price right after the refinancing. (If you could not solve (b) "
             f"or (c), use {g(nn_res)} million new shares and r<sub>E</sub> = {pc(rE1_res3)}.)</p>"),
    "solution": (
        f"<p><b>Step 1. Without the refinancing.</b> ({g(FCF)} − {g(til_D0)}) / {g(N)} = {g(FCF - til_D0)} / "
        f"{g(N)} = <b>NOK {f(dps0)} per share</b>.</p>"
        f"<p><b>Step 2. With the refinancing.</b> Interest is {pc(rf)} × {g(D1)} = NOK {g(til_D1)}M, so the "
        f"shareholders get {g(FCF)} − {g(til_D1)} = NOK {g(FCF - til_D1)}M, shared by {f(N1)}M shares:</p>"
        f"<p>Div<sub>1</sub> = {g(FCF - til_D1)} / {f(N1)} = <b>NOK {f(dps1)} per share</b></p>"
        f"<p><b>Step 3. The share price.</b> The share is a perpetuity of NOK {f(dps1)} at the new r<sub>E</sub>:</p>"
        f"<p>P = {f(dps1)} / {f(rE1, 6)} = <b>NOK {f(Pd, 2)}</b></p>"
        f"<p><b>Check.</b> This is the price from (b), found a different way. Unlike the WACC identity it can fail: "
        f"r<sub>E</sub> = {pc(felle_c_gammel, 4)} (old r<sub>D</sub>) would give NOK {f(P_feil_gammel, 2)} and "
        f"{pc(felle_c_dv, 4)} (D/V weights) NOK {f(P_feil_dv, 2)}. It cannot catch a student who uses the same "
        f"wrong r<sub>D</sub> for both the interest and MM II, but the loan's {pc(rf)} is given.</p>"
        f"<p><b>With the fallback values</b> ({g(nn_res)} million new shares, r<sub>E</sub> = {pc(rE1_res3)}): "
        f"Div<sub>1</sub> = {g(FCF - til_D1)} / {g(N + nn_res)} = NOK {f(dps1_res)} and P = {f(dps1_res)} / "
        f"{g(rE1_res3)} = NOK {f(P_res[0], 2)}. That the price is not NOK {g(P0)} only shows that the fallback values "
        f"are not the true ones.</p>"),
    "criteria": [
        f"Without: ({g(FCF)} − {g(til_D0)})/{g(N)} = NOK {f(dps0)}, with interest at the risky {pc(rD0)}.",
        f"With: interest {pc(rf)} × {g(D1)} = {g(til_D1)}, so ({g(FCF)} − {g(til_D1)})/{f(N1)} = NOK {f(dps1)}. Dividing by the old {g(N)}M shares forgets the new shares.",
        f"P = {f(dps1)}/{pc(rE1, 4)} = NOK {f(Pd, 2)}, the same as before the refinancing.",
        "Bonus: says that this checks the r_E from (c) independently.",
    ],
}
pe = {
    "label": "e", "points": 5,
    "body": ("<p>A board member says that the share issue dilutes the existing shareholders. Is the board member "
             "right? Are the old debt holders, the investors who buy the new shares and the existing shareholders "
             "better or worse off? Explain briefly.</p>"),
    "solution": (
        f"<p><b>The board member is wrong.</b> The expected dividend per share falls from NOK {f(dps0)} to NOK "
        f"{f(dps1)}, but the shares are now safer: with less debt the shareholders carry the business risk over a "
        f"larger base, so r<sub>E</sub> falls from {pc(rE0, 4)} to {pc(rE1, 4)}. The lower dividend at the lower "
        f"discount rate is worth the same NOK {f(P0, 2)}. A smaller dividend per share is not dilution of value.</p>"
        + tab(["Group", "Before", "After", "Better or worse off?"], [
            ["Old debt holders", f"A claim worth NOK {g(D0)}M", f"NOK {g(D0)}M in cash", "Neither: repaid at market value"],
            ["New shareholders", f"NOK {g(EQ)}M in cash", f"{f(nn)}M shares × NOK {f(Pd, 2)} = NOK {g(nn * Pd)}M",
             f"Neither: fair price, they expect to earn r<sub>E</sub> = {pc(rE1, 4)}"],
            ["Existing shareholders", f"{g(N)}M shares × NOK {f(P0, 2)} = NOK {g(E0)}M",
             f"{g(N)}M shares × NOK {f(Pd, 2)} = NOK {g(N * Pd)}M", "Neither"],
        ])
        + f"<p>Nobody gains and nobody loses: there is no wealth transfer. The firm value stays at NOK {g(V)}M "
          f"because we live in a perfect capital market, so the refinancing only re-slices the same NOK {g(FCF)}M a "
          f"year between lenders and shareholders.</p>"),
    "criteria": [
        "Says the board member is wrong and explains why: the dividend per share falls, but r_E falls too because the equity is less risky, so the share price is unchanged.",
        "Old debt holders: neither better nor worse off, because they are repaid at market value.",
        "New shareholders: neither, because they buy at the fair price and get a fair expected return.",
        "Existing shareholders: neither, their shares are still worth NOK 45 each. Credit for saying there is no wealth transfer.",
        "Gives the reason the firm value does not change: perfect capital market (MM I), the free cash flow is the same.",
    ],
}
ex["parts"] = [pa, pb, pc_, pd, pe]
OPPG["mk-mm-rekap-3"] = ex
SVAR["mk-mm-rekap-3:1:a"] = {"type": "tall", "tall": [T("r<sub>U</sub>", 100 * rU, "%"), T("r<sub>E</sub>", 100 * rE0, "%")]}
SVAR["mk-mm-rekap-3:1:b"] = {"type": "blandet", "tall": [T("Share price on announcement", Pn, "NOK per share"),
                                                         T("New shares", nn, "m shares")],
                             "tallPoeng": 3,
                             "tekstLedd": "Explain briefly why the firm value changes or does not change."}
SVAR["mk-mm-rekap-3:1:c"] = {"type": "tall", "tall": [T("New r<sub>E</sub>", 100 * rE1, "%", alt=[round(100 * rE1_fra_res, 10)])],
                             "merknad": f"alt {f(100 * rE1_fra_res)} er svaret med reserveverdien r_U = {pc(rU_res3)}. Fellene {f(100 * felle_c_gammel)} (gammel r_D) og {f(100 * felle_c_dv)} (D/V) avvises."}
SVAR["mk-mm-rekap-3:1:d"] = {"type": "tall", "tall": [T("Div<sub>1</sub> without the refinancing", dps0, "NOK per share"),
                                                      T("Div<sub>1</sub> with the refinancing", dps1, "NOK per share", alt=[round(dps1_res, 10)]),
                                                      T("Share price after the refinancing", Pd, "NOK per share", alt=[round(x, 10) for x in P_res])],
                             "merknad": f"alt er svarene med reserveverdiene {g(nn_res)} millioner nye aksjer og r_E = {pc(rE1_res3)}: utbyttet {f(dps1_res)}, kursen {f(P_res[0], 2)} med begge, {f(P_res[1], 2)} med bare r_E-reserven og {f(P_res[2], 2)} med r_E fra reserve-r_U i (c). {f(P_res[3], 2)} med bare reserveantallet og {f(P_res[4], 2)} med reserveantallet og r_E fra reserve-r_U. Fellene {f(P_feil_gammel, 2)} og {f(P_feil_dv, 2)} avvises."}
SVAR["mk-mm-rekap-3:1:e"] = {"type": "tekst"}


# ======================================================================
# mk-skatt-rekap-1 · Tamarack Freight (forelesning 3-formen: τD, kurshopp, tilbakekjøp)
# ======================================================================
N, P0, EBIT, tau, D, rD = 36.0, 22.5, 108.0, 0.25, 280.0, 0.05
VU = N * P0
rU = EBIT * (1 - tau) / VU
TS = tau * D                                   # permanent gjeld: PV(TS) = τD
assert near(TS, (tau * rD * D) / rD)
VL = VU + TS
P1 = VL / N                                    # kursen hopper ved kunngjøring
n = D / P1                                     # P1·n = D og P1·(N − n) = VL − D
Nrest = N - n
E1 = VL - D
assert near(P1 * Nrest, E1) and near(P1 * n, D)
div0 = EBIT * (1 - tau) / N
til_eier1 = (EBIT - rD * D) * (1 - tau)
div1 = til_eier1 / Nrest
rE1 = div1 / P1
assert near(rE1, til_eier1 / E1)
assert near(rE1, rU + (D / E1) * (1 - tau) * (rU - rD))   # bare som kontroll i skriptet, ikke i løsningen
felle_rE_ark = rU + (D / E1) * (rU - rD)                  # formelarkets MM II forutsetter konstant D/E
felle_n = D / P0                                          # «they divide it by their original price»
assert utenfor(felle_rE_ark, rE1) and utenfor(felle_n, n)
gevinst = P1 - P0
assert near(N * gevinst, TS)                              # de opprinnelige eierne får hele PV(TS)
assert near(n * P1 + Nrest * P1, VL)
# reserveverdier (ikke svaret) og svarene som bygger på dem
P_res, Nrest_res = 24.0, 23.0
assert utenfor(P_res, P1) and utenfor(Nrest_res, Nrest)
n_res = D / P_res
E_res = (N - n_res) * P_res
div1_res = til_eier1 / Nrest_res
rE1_res = div1_res / P_res
rE1_kaskade = til_eier1 / (N - n_res) / P_res            # (d) bygd på reserven i (c): 24.3333 mill. aksjer
felle_rE_res = rU + (D / (Nrest_res * P_res)) * (rU - rD)  # formelarkets MM II på reserveveien
gevinst_res = P_res - P0                                  # (e) bygd på reservekursen
assert utenfor(rE1_kaskade, rE1) and utenfor(rE1_kaskade, felle_rE_ark) and utenfor(rE1_res, felle_rE_res)
assert not utenfor(til_eier1 / (N - n_res), div1)         # utbyttet på kaskadeveien ligger innenfor toleransen
assert utenfor(gevinst_res, gevinst)
for res, sv, felle in ((n_res, n, felle_n), (div1_res, div1, None), (rE1_res, rE1, felle_rE_ark)):
    assert utenfor(res, sv) and (felle is None or utenfor(res, felle))
assert near(P1, 880 / 36) and near(rU, 0.10)

ex = {
    "n": 1, "title": "Capital Structure", "points": 20,
    "topic": "Recapitalisation with taxes", "chapters": [7, 15],
    "merke": "Samme form som rekapitaliseringseksemplet i forelesning 3",
    "body": (f"<p>Tamarack Freight Inc., a US trucking company, is all-equity financed with {g(N)} million shares "
             f"trading at ${f(P0, 2)}. It expects EBIT of ${g(EBIT)} million every year in perpetuity. Capital "
             f"expenditure equals depreciation, working capital is constant and all earnings are paid out as "
             f"dividends at the end of each year. The corporate tax rate is {pc(tau)}. Apart from corporate taxes, "
             f"capital markets are perfect.</p>"
             f"<p>Management announces that it will borrow ${g(D)} million of permanent debt at the risk-free rate "
             f"of {pc(rD)} and use all of it to repurchase shares. Use 4 decimal places.</p>"),
}
pa = {
    "label": "a", "points": 3,
    "body": ("<p>What is the value of the firm before the announcement? What is the present value of the interest "
             "tax shield from the new debt?</p>"),
    "solution": (
        f"<p><b>Step 1. The unlevered firm.</b> With no debt the firm is its equity: V<sup>U</sup> = {g(N)}M × "
        f"${f(P0, 2)} = <b>${g(VU)}M</b>. (Consistent with the earnings: {g(EBIT)} × (1 − {g(tau)}) = "
        f"{g(EBIT * (1 - tau))} a year, so r<sub>U</sub> = {g(EBIT * (1 - tau))} / {g(VU)} = {pc(rU)}.)</p>"
        f"<p><b>Step 2. The tax shield.</b> The debt is permanent, so the firm pays {pc(rD)} × {g(D)} = "
        f"${g(rD * D)}M of interest every year forever and saves {g(tau)} × {g(rD * D)} = ${g(tau * rD * D)}M of "
        f"tax a year. Discounted at the risk-free rate: {g(tau * rD * D)} / {g(rD)} = τD = {g(tau)} × {g(D)} = "
        f"<b>${g(TS)}M</b>.</p>"),
    "criteria": [
        f"V^U = {g(N)} × {f(P0, 2)} = ${g(VU)}M.",
        f"PV(TS) = τD = {g(tau)} × {g(D)} = ${g(TS)}M, because the debt is permanent. Writing out the perpetuity {g(tau * rD * D)}/{g(rD)} is equally good.",
        "Calls it the present value of the interest tax shield, not the annual tax saving.",
    ],
}
pb = {
    "label": "b", "points": 4,
    "body": ("<p>What happens to the share price when the plan is announced? Why does the price move at the "
             "announcement and not when the debt is issued?</p>"),
    "solution": (
        f"<p><b>Step 1. The levered firm.</b> V<sup>L</sup> = V<sup>U</sup> + PV(TS) = {g(VU)} + {g(TS)} = "
        f"${g(VL)}M. Nothing has been bought back yet, so all {g(N)}M shares share it:</p>"
        f"<p>P = {g(VL)} / {g(N)} = <b>${f(P1)} per share</b>, up from ${f(P0, 2)} by {g(TS)} / {g(N)} = "
        f"${f(gevinst)}.</p>"
        f"<p><b>Step 2. Why at the announcement.</b> In an otherwise perfect market the plan is credible and "
        f"everyone sees the tax savings it will bring, so investors price the whole PV(TS) the moment it is "
        f"announced, before any debt exists. If the price waited until the debt was issued, the firm could buy "
        f"back shares at ${f(P0, 2)} that are worth ${f(P1)}. Nobody would sell at that price. The lecturer "
        f"puts it as: the price jumps precisely at the moment of announcement.</p>"),
    "criteria": [
        f"V^L = {g(VU)} + {g(TS)} = ${g(VL)}M over all {g(N)}M shares: P = ${f(P1)}.",
        "States the direction: the price rises at the announcement, by PV(TS)/N.",
        "Reason: the commitment is credible and the market prices the present value of all future tax savings at once. Any argument that a later jump would let the firm buy back shares below their value is accepted.",
        f"Dividing by fewer shares here, or subtracting the {g(D)} before the buyback has happened, is the error.",
    ],
}
pc_ = {
    "label": "c", "points": 4,
    "body": (f"<p>How many shares does the firm repurchase? What are the market values of the debt and the equity "
             f"after the repurchase? (If you could not solve (b), use a share price of ${f(P_res, 2)}.)</p>"),
    "solution": (
        f"<p><b>Step 1. Two equations.</b> The buyback happens at the new price P. With n shares repurchased "
        f"(millions), the cash spent and the equity left must satisfy:</p>"
        f"<p>P × n = {g(D)}<br>P × ({g(N)} − n) = {g(VL)} − {g(D)} = {g(E1)}</p>"
        f"<p>Adding them gives {g(N)} × P = {g(VL)}, so P = ${f(P1)} and n = {g(D)} / {f(P1)} = "
        f"<b>{f(n)} million shares</b>. {f(Nrest)} million shares remain.</p>"
        f"<p><b>Step 2. Market values.</b> D = <b>${g(D)}M</b> and E = V<sup>L</sup> − D = {g(VL)} − {g(D)} = "
        f"<b>${g(E1)}M</b>.</p>"
        f"<p><b>Check.</b> {f(Nrest)} × {f(P1)} = ${g(Nrest * P1)}M. ✓ Dividing {g(D)} by the old ${f(P0, 2)} "
        f"gives {f(felle_n)} million, the mistake the lecturer calls the biggest one.</p>"
        f"<p>With the fallback price of ${f(P_res, 2)}: n = {g(D)} / {f(P_res, 2)} = {f(n_res)} million and "
        f"E = ({g(N)} − {f(n_res)}) × {f(P_res, 2)} = ${g(E_res)}M.</p>"),
    "criteria": [
        f"Repurchases at the NEW price: n = {g(D)}/{f(P1)} = {f(n)} million. The two equations or equivalent direct reasoning are both accepted.",
        f"D = ${g(D)}M and E = {g(VL)} − {g(D)} = ${g(E1)}M ({f(Nrest)}M shares × ${f(P1)}).",
        f"Dividing by the old ${f(P0, 2)} ({f(felle_n)} million) is the classic error.",
    ],
}
pd = {
    "label": "d", "points": 4,
    "body": (f"<p>What is the expected dividend per share before and after the recapitalisation? Use the dividend "
             f"and the share price after the repurchase to find the equity cost of capital. (If you could not solve "
             f"(b) or (c), use a share price of ${f(P_res, 2)} and {g(Nrest_res)} million shares after the "
             f"repurchase.)</p>"),
    "solution": (
        f"<p><b>Step 1. Before.</b> {g(EBIT)} × (1 − {g(tau)}) / {g(N)} = {g(EBIT * (1 - tau))} / {g(N)} = "
        f"<b>${f(div0)} per share</b>.</p>"
        f"<p><b>Step 2. After.</b> Interest is paid before tax: ({g(EBIT)} − {g(rD * D)}) × (1 − {g(tau)}) = "
        f"${g(til_eier1)}M for the shareholders, shared by {f(Nrest)}M shares:</p>"
        f"<p>Div = {g(til_eier1)} / {f(Nrest)} = <b>${f(div1)} per share</b></p>"
        f"<p><b>Step 3. The equity cost of capital.</b> The share is a perpetuity of this dividend:</p>"
        f"<p>r<sub>E</sub> = {f(div1)} / {f(P1)} = <b>{pc(rE1, 4)}</b> (the same as {g(til_eier1)} / {g(E1)}), up "
        f"from r<sub>E</sub> = r<sub>U</sub> = {pc(rU)} before.</p>"
        f"<p>MM II from the formula sheet with D/E = {g(D)}/{g(E1)} would give {pc(felle_rE_ark, 4)}. That formula "
        f"assumes a constant D/E with a tax shield as risky as the firm, which is not the case for permanent debt; "
        f"the question asks for the cash-flow route.</p>"
        f"<p>With the fallback values: Div = {g(til_eier1)} / {g(Nrest_res)} = ${f(div1_res)} and r<sub>E</sub> = "
        f"{f(div1_res)} / {f(P_res, 2)} = {pc(rE1_res, 4)}. With only the fallback price from (c) "
        f"({f(N - n_res)} million shares remain): r<sub>E</sub> = {g(til_eier1)} / {f(N - n_res)} / {f(P_res, 2)} = "
        f"{pc(rE1_kaskade, 4)}.</p>"),
    "criteria": [
        f"Before: ${f(div0)} per share.",
        f"After: interest deducted before tax, ({g(EBIT)} − {g(rD * D)}) × {g(1 - tau)} = {g(til_eier1)}, over the {f(Nrest)}M remaining shares: ${f(div1)}. Dividing by the old {g(N)}M shares is the error.",
        f"r_E = {f(div1)}/{f(P1)} = {pc(rE1, 4)}. Using the formula-sheet MM II ({pc(felle_rE_ark, 4)}) does not answer the question as asked.",
    ],
}
pe = {
    "label": "e", "points": 5,
    "body": ("<p>Who captures the value created by the recapitalisation? Compare a shareholder who sells in the "
             "buyback with one who keeps the shares. Is either of them better or worse off than if the firm had "
             "stayed all-equity? Explain briefly.</p>"),
    "solution": (
        f"<p><b>The original shareholders capture all of it, all of them equally.</b> The value comes from the "
        f"tax shield: the government collects ${g(tau * rD * D)}M less tax every year, worth ${g(TS)}M today. "
        f"That is exactly the rise in firm value. The new lenders pay ${g(D)}M for debt worth ${g(D)}M, so they "
        f"gain nothing.</p>"
        + tab(["Shareholder", "Before the announcement", "After", "Change per share"], [
            ["Sells in the buyback", f"A share worth ${f(P0, 2)}", f"${f(P1)} in cash", f"#+${f(gevinst)}"],
            ["Keeps the share", f"A share worth ${f(P0, 2)}", f"A share worth ${f(P1)}", f"#+${f(gevinst)}"],
        ])
        + f"<p>Both are better off by ${f(gevinst)} per share: {g(N)}M × {f(gevinst)} = ${g(N * gevinst)}M = "
          f"PV(TS). Since the buyback is at the fair new price, a shareholder is indifferent between selling and "
          f"keeping. If one of the two came out ahead, the price would be wrong (the lecturer: then you probably "
          f"calculated something wrong).</p>"
          f"<p>With the fallback price of ${f(P_res, 2)} the change is {f(P_res, 2)} − {f(P0, 2)} = "
          f"${f(gevinst_res, 2)} for both.</p>"),
    "criteria": [
        "The original shareholders capture the whole PV(TS). They capture it at the announcement.",
        f"Seller and keeper gain the same ${f(gevinst)} per share: the seller gets ${f(P1)} in cash, the keeper holds a share worth ${f(P1)}. Both are better off than if the firm had stayed all-equity.",
        "Explains why they are indifferent: the repurchase happens at the fair price after the jump.",
        "Bonus: names the source (lower taxes: the government's claim shrinks) and notes that the new debt holders get a fair deal.",
    ],
}
ex["parts"] = [pa, pb, pc_, pd, pe]
OPPG["mk-skatt-rekap-1"] = ex
SVAR["mk-skatt-rekap-1:1:a"] = {"type": "tall", "tall": [T("V<sup>U</sup>", VU, "$ m"), T("PV(TS)", TS, "$ m")]}
SVAR["mk-skatt-rekap-1:1:b"] = {"type": "blandet", "tall": [T("Share price on announcement", P1, "$ per share")],
                                "tallPoeng": 2,
                                "tekstLedd": "Why does the price move at the announcement and not when the debt is issued?"}
SVAR["mk-skatt-rekap-1:1:c"] = {"type": "tall", "tall": [T("Shares repurchased", n, "m shares", alt=[round(n_res, 10)]),
                                                         T("Debt after", D, "$ m"),
                                                         T("Equity after", E1, "$ m", alt=[round(E_res, 10)])],
                                "merknad": f"alt er svarene med reservekursen ${f(P_res, 2)}: {f(n_res)} millioner aksjer og egenkapital {g(E_res)}. Fellen {f(felle_n)} (gammel kurs) avvises."}
SVAR["mk-skatt-rekap-1:1:d"] = {"type": "tall", "tall": [T("Dividend per share before", div0, "$ per share"),
                                                         T("Dividend per share after", div1, "$ per share", alt=[round(div1_res, 10)]),
                                                         T("r<sub>E</sub> after", 100 * rE1, "%", alt=[round(100 * rE1_res, 10), round(100 * rE1_kaskade, 10)])],
                                "merknad": f"alt er svarene med reserveverdiene (kurs {f(P_res, 2)}, {g(Nrest_res)} millioner aksjer): {f(div1_res)} og {f(100 * rE1_res)} %, og r_E {f(100 * rE1_kaskade)} % med reserven fra (c) ({f(N - n_res)} millioner aksjer; utbyttet {f(til_eier1 / (N - n_res))} ligger innenfor toleransen). Formelarkets MM II gir {f(100 * felle_rE_ark)} % ({f(100 * felle_rE_res)} % på reserveveien) og avvises."}
SVAR["mk-skatt-rekap-1:1:e"] = {"type": "blandet", "tall": [T("Change for a seller, per original share", gevinst, "$ per share", alt=[round(gevinst_res, 10)]),
                                                            T("Change for a keeper, per original share", gevinst, "$ per share", alt=[round(gevinst_res, 10)])],
                                "tallPoeng": 2,
                                "tekstLedd": "Who captures the value? Are the seller and the keeper better or worse off?",
                                "merknad": f"alt {f(gevinst_res, 2)} er svaret med reservekursen ${f(P_res, 2)} fra (c) og (d)."}

# ======================================================================
# mk-skatt-rekap-2 · Lyngdal Grus (lån som betales tilbake: annuitet; EBIT i tre tilstander som PS1 E4)
# ======================================================================
N, tau, rU2 = 20.0, 0.22, 0.09
pr, eb = [0.2, 0.5, 0.3], [70.0, 140.0, 220.0]
EBIT = sum(p * x for p, x in zip(pr, eb))
VU = EBIT * (1 - tau) / rU2
P0 = VU / N
D, rD, T_ = 500.0, 0.045, 8
rente = rD * D
ts = tau * rente
af = (1 - (1 + rD) ** -T_) / rD                 # annuitetsfaktor, første betaling om ett år
PVTS = ts * af
assert near(PVTS, sum(ts / (1 + rD) ** t for t in range(1, T_ + 1)))
VL = VU + PVTS
P1 = VL / N
n = D / P1
Nrest = N - n
assert near(P1 * (N - n), VL - D)
P_perm = (VU + tau * D) / N                     # finansdirektørens tall: permanent gjeld
felle_tauD = tau * D
felle_tidlig = PVTS * (1 + rD)                  # annuitet som starter i dag
felle_n = D / P0
assert utenfor(felle_tauD, PVTS) and utenfor(felle_tidlig, PVTS) and utenfor(felle_n, n)
assert near(tau * D, PVTS + tau * D / (1 + rD) ** T_)   # τD = skjold på renter + τ × PV(pålydende)
# reserveverdier
PVTS_res = 60.0
P1_res = (VU + PVTS_res) / N
n_fra_res = D / P1_res
for res, sv in ((P1_res, P1), (n_fra_res, n)):
    assert utenfor(res, sv)
assert utenfor(n_fra_res, felle_n) and utenfor(P1_res, P_perm)
assert min(eb) > rente                          # skjoldet brukes i alle tilstander: diskonter med r_D
assert near(EBIT, 150) and near(VU, 1300) and near(P0, 65)

ex = {
    "n": 1, "title": "Capital Structure", "points": 20,
    "topic": "Recapitalisation with taxes", "chapters": [1, 7],
    "merke": "Som rekapitaliseringen i forelesning 3, med et lån som betales tilbake og EBIT i tre tilstander (PS1 E4)",
    "body": (f"<p>Lyngdal Grus ASA, a gravel and aggregates producer, is all-equity financed with {g(N)} million "
             f"shares. Its EBIT next year and every year after depends on building activity: NOK {g(eb[0])} million "
             f"(probability {pc(pr[0])}), NOK {g(eb[1])} million ({pc(pr[1])}) or NOK {g(eb[2])} million "
             f"({pc(pr[2])}). Capital expenditure equals depreciation, working capital is constant and all earnings "
             f"are paid out as dividends. The tax rate is {pc(tau)} and the unlevered cost of capital is {pc(rU2)}. "
             f"Apart from corporate taxes, capital markets are perfect.</p>"
             f"<p>The board announces that it will take an {T_}-year bank loan of NOK {g(D)} million at the risk-free "
             f"rate of {pc(rD)} and use all of it to repurchase shares. The loan pays interest at the end of each "
             f"year and is repaid in full after {T_} years. Only interest is tax-deductible. Use 4 decimal "
             f"places.</p>"),
}
pa = {
    "label": "a", "points": 3,
    "body": "<p>What are the expected EBIT, the value of the firm and the share price before the announcement?</p>",
    "solution": (
        f"<p><b>Step 1. Expected EBIT.</b> {g(pr[0])} × {g(eb[0])} + {g(pr[1])} × {g(eb[1])} + {g(pr[2])} × "
        f"{g(eb[2])} = {g(pr[0] * eb[0])} + {g(pr[1] * eb[1])} + {g(pr[2] * eb[2])} = <b>NOK {g(EBIT)}M</b> a year.</p>"
        f"<p><b>Step 2. The unlevered firm.</b> After tax the shareholders expect {g(EBIT)} × (1 − {g(tau)}) = "
        f"{g(EBIT * (1 - tau))} a year forever, discounted at r<sub>U</sub>:</p>"
        f"<p>V<sup>U</sup> = {g(EBIT * (1 - tau))} / {g(rU2)} = <b>NOK {g(VU)}M</b> and P = {g(VU)} / {g(N)} = "
        f"<b>NOK {f(P0, 2)}</b></p>"),
    "criteria": [
        f"E[EBIT] = NOK {g(EBIT)}M, weighting each state by its probability.",
        f"Takes tax off before discounting: V^U = {g(EBIT)} × {g(1 - tau)} / {g(rU2)} = NOK {g(VU)}M. Discounting EBIT before tax, or for one period only, is the error.",
        f"P = {g(VU)}/{g(N)} = NOK {f(P0, 2)}.",
    ],
}
pb = {
    "label": "b", "points": 4,
    "body": "<p>What is the annual interest tax shield and its present value?</p>",
    "solution": (
        f"<p><b>Step 1. The yearly shield.</b> Interest = {pc(rD)} × {g(D)} = NOK {g(rente)}M a year, so the tax "
        f"saved is {g(tau)} × {g(rente)} = <b>NOK {f(ts, 2)}M a year</b> for {T_} years, the first in one year. The "
        f"repayment of the NOK {g(D)}M is not deductible and saves no tax.</p>"
        f"<p><b>Step 2. Present value.</b> The loan is risk-free and EBIT is at least NOK {g(min(eb))}M, more than "
        f"the NOK {g(rente)}M of interest, so the shield is always used and is as safe as the interest itself. It is "
        f"discounted at {pc(rD)} as an annuity:</p>"
        f"<p>PV(TS) = {f(ts, 2)} × (1/{g(rD)}) × (1 − 1/{g(1 + rD)}<sup>{T_}</sup>) = {f(ts, 2)} × {f(af)} = "
        f"<b>NOK {f(PVTS)}M</b></p>"
        f"<p>τD = {g(tau * D)} would be the answer for permanent debt. {f(felle_tidlig)} would be the answer if "
        f"the first saving came today. Neither fits this loan.</p>"),
    "criteria": [
        f"Annual tax shield = τ × interest = {g(tau)} × {g(rente)} = NOK {f(ts, 2)}M.",
        f"PV as an {T_}-year annuity at the risk-free {pc(rD)}: NOK {f(PVTS)}M. The annuity formula (1 + r in the bracket and r outside, as the lecturer stresses) or the sum of the {T_} discounted terms are both accepted.",
        f"No tax shield from repaying the principal. Using τD = {g(tau * D)} ignores that the loan ends.",
        "Show the calculation. No calculation, no points.",
    ],
}
pc_ = {
    "label": "c", "points": 4,
    "body": (f"<p>What happens to the share price upon announcement? How many shares are repurchased? (If you could "
             f"not solve (b), use a present value of the tax shield of NOK {g(PVTS_res)} million.)</p>"),
    "solution": (
        f"<p><b>Step 1. The price.</b> V<sup>L</sup> = {g(VU)} + {f(PVTS)} = NOK {f(VL)}M, priced at once because "
        f"the plan is credible:</p>"
        f"<p>P = {f(VL)} / {g(N)} = <b>NOK {f(P1)}</b>, up by {f(PVTS)} / {g(N)} = NOK {f(P1 - P0)}.</p>"
        f"<p><b>Step 2. The buyback, at the new price.</b> P × n = {g(D)} and P × ({g(N)} − n) = V<sup>L</sup> − D = "
        f"{f(VL - D)}, so n = {g(D)} / {f(P1)} = <b>{f(n)} million shares</b>, leaving {f(Nrest)} million. Dividing "
        f"by the old NOK {f(P0, 2)} would give {f(felle_n)} million.</p>"
        f"<p>With the fallback PV(TS) of NOK {g(PVTS_res)}M: P = ({g(VU)} + {g(PVTS_res)}) / {g(N)} = NOK "
        f"{f(P1_res, 2)} and n = {g(D)} / {f(P1_res, 2)} = {f(n_fra_res)} million.</p>"),
    "criteria": [
        f"P = ({g(VU)} + {f(PVTS)})/{g(N)} = NOK {f(P1)}: the price rises at the announcement.",
        f"n = {g(D)}/{f(P1)} = {f(n)} million, at the new price. The two equations or equivalent direct reasoning are both accepted.",
        f"Using the old price ({f(felle_n)} million) is the classic error.",
    ],
}
pd = {
    "label": "d", "points": 4,
    "body": (f"<p>The CFO says: «The tax shield of a loan is always worth τ × D. So our loan adds {pc(tau)} × "
             f"NOK {g(D)} million = NOK {g(tau * D)} million to the firm value.» Is the CFO right? What would the share "
             f"price on announcement be if the CFO's figure were right? For which kind of loan does τ × D hold? "
             f"Explain briefly.</p>"),
    "solution": (
        f"<p><b>No.</b> τ × D is the value of the tax shield of <b>permanent</b> debt: the firm then saves "
        f"τ × r<sub>D</sub> × D every year forever, worth τ × r<sub>D</sub> × D / r<sub>D</sub> = τD. This loan pays "
        f"interest for only {T_} years, so the shield is the {T_}-year annuity in (b), NOK {f(PVTS)}M, less than a "
        f"third of NOK {g(tau * D)}M. The repayment of the principal saves no tax, so nothing can be added for it.</p>"
        f"<p>If the loan were permanent (rolled over forever at {pc(rD)}), V<sup>L</sup> = {g(VU)} + {g(tau * D)} = "
        f"NOK {g(VU + tau * D)}M and the price on announcement would be {g(VU + tau * D)} / {g(N)} = "
        f"<b>NOK {f(P_perm, 2)}</b>.</p>"),
    "criteria": [
        "Says the CFO is wrong for this loan.",
        f"τD holds for permanent debt (interest saved forever); an {T_}-year loan only saves tax for {T_} years, worth NOK {f(PVTS)}M.",
        f"Share price if τD were right: ({g(VU)} + {g(tau * D)})/{g(N)} = NOK {f(P_perm, 2)}.",
        "Bonus: notes that the repayment of the principal is not tax-deductible.",
    ],
}
pe = {
    "label": "e", "points": 5,
    "body": ("<p>A board member proposes to go much further and borrow so much that almost all of Lyngdal's value is "
             "debt. In the setting of this exercise (only corporate taxes), would that be optimal? Give two reasons why "
             "Lyngdal would not do it in reality. Explain briefly (3 to 4 sentences).</p>"),
    "solution": (
        f"<p><b>In the model, yes.</b> With corporate taxes as the only imperfection, every krone of debt adds a tax "
        f"shield and nothing is lost, so firm value rises with debt and close to 100% debt is optimal. The lecturer "
        f"is clear that this is the answer in an MM world with taxes.</p>"
        f"<p><b>In reality, no.</b> (1) The shield is only worth something while EBIT covers the interest. In the "
        f"weak state Lyngdal earns NOK {g(eb[0])}M, so above about {g(eb[0])} / {g(rD)} = NOK {f(eb[0] / rD, 0)}M of "
        f"debt at {pc(rD)} the interest exceeds EBIT in bad years and part of the shield is lost. (2) The debt would no "
        f"longer be risk-free: in a bad year Lyngdal could not pay. The costs of financial distress (lawyers, "
        f"quarries and machines sold in a fire sale, customers who move to safer suppliers) would eat the tax "
        f"gain. Debt overhang and the temptation to take excessive risks near default are also accepted.</p>"),
    "criteria": [
        "Answers the model question: with only corporate taxes, more debt always adds value, so (close to) 100% debt is optimal.",
        "Two distinct real-world reasons, each with its mechanism: costs of financial distress (direct or indirect), a tax shield that cannot be used when EBIT is lower than the interest, debt overhang, excessive risk-taking, personal taxes on interest.",
        f"Credit for tying a reason to Lyngdal: EBIT can fall to NOK {g(eb[0])}M, so with very high debt the interest is not covered in bad years.",
        "3 to 4 sentences, as asked. Naming a reason without its mechanism earns half its points.",
    ],
}
ex["parts"] = [pa, pb, pc_, pd, pe]
OPPG["mk-skatt-rekap-2"] = ex
SVAR["mk-skatt-rekap-2:1:a"] = {"type": "tall", "tall": [T("E[EBIT]", EBIT, "NOK m"), T("V<sup>U</sup>", VU, "NOK m"),
                                                         T("Share price", P0, "NOK per share")]}
SVAR["mk-skatt-rekap-2:1:b"] = {"type": "tall", "tall": [T("Annual tax shield", ts, "NOK m"), T("PV(TS)", PVTS, "NOK m")],
                                "merknad": f"Fellene {g(tau * D)} (τD) og {f(felle_tidlig)} (første skjold i dag) avvises."}
SVAR["mk-skatt-rekap-2:1:c"] = {"type": "tall", "tall": [T("Share price on announcement", P1, "NOK per share", alt=[round(P1_res, 10)]),
                                                         T("Shares repurchased", n, "m shares", alt=[round(n_fra_res, 10)])],
                                "merknad": f"alt er svarene med reserveverdien PV(TS) = {g(PVTS_res)}: kurs {f(P1_res, 2)} og {f(n_fra_res)} millioner aksjer. Fellen {f(felle_n)} (gammel kurs) avvises."}
SVAR["mk-skatt-rekap-2:1:d"] = {"type": "blandet", "tall": [T("Share price if τ × D held", P_perm, "NOK per share")],
                                "tallPoeng": 1.5, "tekstLedd": "Is the CFO right? For which kind of loan does τ × D hold?"}
SVAR["mk-skatt-rekap-2:1:e"] = {"type": "tekst"}

# ======================================================================
# mk-skatt-rekap-3 · Brandvoort Fitness (det varslede tillegget: konstant rentedekning, V^L = (1 + τk)V^U)
# ======================================================================
N, F1, gr, rU3, tau, k, rD = 25.0, 42.0, 0.02, 0.08, 0.25, 0.35, 0.04
VU = F1 / (rU3 - gr)
P0 = VU / N
rente1 = k * F1
ts1 = tau * rente1
PVTS = ts1 / (rU3 - gr)
VL = (1 + tau * k) * VU
assert near(VL, VU + PVTS)
D0 = rente1 / rD                                 # renten neste år = r_D × gjelden i dag
P1 = VL / N
n = D0 / P1
Nrest = N - n
E1 = VL - D0
assert near(Nrest * P1, E1)
felle_rD = ts1 / (rD - gr)                       # skjoldet diskontert med r_D
felle_uvekst = ts1 / rU3                         # glemt veksten
felle_n = D0 / P0
assert utenfor(felle_rD, PVTS) and utenfor(felle_uvekst, PVTS) and utenfor(felle_n, n)
dv = D0 / VL                                     # D/V er konstant: D og V vokser begge med g
assert near((D0 * (1 + gr)) / (VL * (1 + gr)), dv)
# reserveverdier
VL_res, D_res, P_res3 = 790.0, 300.0, 32.0
P1_res = VL_res / N
n_res = D_res / P_res3
assert utenfor(P1_res, P1) and utenfor(n_res, n) and utenfor(n_res, felle_n) and utenfor(N - n_res, Nrest)
n_kaskade = D0 / P1_res                         # (d) bygd på reservekursen fra (c)
assert utenfor(n_kaskade, n) and utenfor(n_kaskade, felle_n) and utenfor(N - n_kaskade, Nrest)
assert near(VU, 700) and near(P1, 30.45) and near(D0, 367.5)

ex = {
    "n": 1, "title": "Capital Structure", "points": 20,
    "topic": "Recapitalisation with taxes", "chapters": [7, 19],
    "merke": "Som rekapitaliseringen i forelesning 3, med renter som fast andel av kontantstrømmen (forelesning 18, 32:14)",
    "body": (f"<p>Brandvoort Fitness NV runs a chain of gyms. It is all-equity financed with {g(N)} million shares. "
             f"Its free cash flow next year is expected to be €{g(F1)} million and to grow by {pc(gr)} a year "
             f"forever. The unlevered cost of capital is {pc(rU3)}, the corporate tax rate is {pc(tau)} and the "
             f"risk-free rate is {pc(rD)}. Apart from corporate taxes, capital markets are perfect.</p>"
             f"<p>The board announces a new debt policy. Starting today, the firm will borrow at the risk-free rate so "
             f"that each year's interest equals {pc(k)} of that year's free cash flow. It will adjust the debt every "
             f"year to keep it so. The money borrowed today is used at once to repurchase shares. Use 4 decimal "
             f"places.</p>"),
}
pa = {
    "label": "a", "points": 3,
    "body": "<p>What is the value of the firm and the share price before the announcement?</p>",
    "solution": (
        f"<p>A growing perpetuity at r<sub>U</sub>: V<sup>U</sup> = {g(F1)} / ({g(rU3)} − {g(gr)}) = "
        f"<b>€{g(VU)}M</b> and P = {g(VU)} / {g(N)} = <b>€{f(P0, 2)}</b>.</p>"),
    "criteria": [
        f"V^U = {g(F1)}/({pc(rU3)} − {pc(gr)}) = €{g(VU)}M with the growing perpetuity. Forgetting the growth ({g(F1 / rU3)}) is the error.",
        f"P = {g(VU)}/{g(N)} = €{f(P0, 2)}.",
        "Show the calculation. No calculation, no points.",
    ],
}
pb = {
    "label": "b", "points": 5,
    "body": ("<p>What is the tax shield in Year 1? What is the present value of all the tax shields and the value of "
             "the levered firm?</p>"),
    "solution": (
        f"<p><b>Step 1. Year 1.</b> Interest = {g(k)} × {g(F1)} = €{g(rente1)}M, so the tax shield is "
        f"{g(tau)} × {g(rente1)} = <b>€{g(ts1)}M</b>.</p>"
        f"<p><b>Step 2. All the shields.</b> Every year the shield is τk = {g(tau)} × {g(k)} = {pc(tau * k)} of that "
        f"year's free cash flow. It grows with the free cash flow and has its risk, so it is discounted like the "
        f"free cash flow:</p>"
        f"<p>PV(TS) = {g(ts1)} / ({g(rU3)} − {g(gr)}) = <b>€{g(PVTS)}M</b></p>"
        f"<p><b>Step 3. The levered firm.</b> V<sup>L</sup> = {g(VU)} + {g(PVTS)} = <b>€{g(VL)}M</b>. The shortcut "
        f"from the lecture gives the same: V<sup>L</sup> = (1 + τk)V<sup>U</sup> = {g(1 + tau * k)} × {g(VU)} = "
        f"{g(VL)}.</p>"
        f"<p>Discounting the shields at r<sub>D</sub> would give {g(ts1)} / ({g(rD)} − {g(gr)}) = {g(felle_rD)}. "
        f"Forgetting the growth would give {f(felle_uvekst)}.</p>"),
    "criteria": [
        f"TS in Year 1 = {g(tau)} × {g(k)} × {g(F1)} = €{g(ts1)}M.",
        f"PV(TS) = {g(ts1)}/({pc(rU3)} − {pc(gr)}) = €{g(PVTS)}M, or τk V^U = {g(tau * k)} × {g(VU)}. Discounting at r_D ({g(felle_rD)}) is the error.",
        f"V^L = €{g(VL)}M, either as V^U + PV(TS) or with the shortcut (1 + τk)V^U.",
    ],
}
pc_ = {
    "label": "c", "points": 4,
    "body": (f"<p>How much does the firm borrow today? What happens to the share price upon announcement? (If you "
             f"could not solve (b), use a levered firm value of €{g(VL_res)} million.)</p>"),
    "solution": (
        f"<p><b>Step 1. Debt today.</b> Next year's interest must be {pc(k)} of next year's free cash flow, "
        f"€{g(rente1)}M. It is also {pc(rD)} of the debt borrowed today:</p>"
        f"<p>D<sub>0</sub> = {g(rente1)} / {g(rD)} = <b>€{g(D0)}M</b></p>"
        f"<p><b>Step 2. The price.</b> The policy is credible, so the market prices all the future tax shields at "
        f"once: P = {g(VL)} / {g(N)} = <b>€{f(P1, 2)}</b>, up by {g(PVTS)} / {g(N)} = €{f(P1 - P0, 2)}.</p>"
        f"<p>With the fallback V<sup>L</sup> of €{g(VL_res)}M: P = {g(VL_res)} / {g(N)} = €{f(P1_res, 2)}.</p>"),
    "criteria": [
        f"D0 = {g(rente1)}/{pc(rD)} = €{g(D0)}M, because next year's interest is r_D times today's debt.",
        f"P = {g(VL)}/{g(N)} = €{f(P1, 2)}: the price rises at the announcement.",
        "Bonus: the reason, a credible commitment, so the present value of all future tax shields is priced at once.",
    ],
}
pd = {
    "label": "d", "points": 3,
    "body": (f"<p>How many shares are repurchased and how many remain? (If you could not solve (c), use debt of "
             f"€{g(D_res)} million and a share price of €{f(P_res3, 2)}.)</p>"),
    "solution": (
        f"<p>The buyback is at the new price: n = {g(D0)} / {f(P1, 2)} = <b>{f(n)} million shares</b>, leaving "
        f"<b>{f(Nrest)} million</b>.</p>"
        f"<p><b>Check.</b> E = V<sup>L</sup> − D = {g(VL)} − {g(D0)} = €{g(E1)}M and {f(Nrest)} × {f(P1, 2)} = "
        f"€{g(Nrest * P1)}M. ✓ Dividing by the old €{f(P0, 2)} gives {f(felle_n)} million.</p>"
        f"<p>With the fallback values: n = {g(D_res)} / {f(P_res3, 2)} = {f(n_res)} million, leaving "
        f"{f(N - n_res)} million. With the debt from (c) and the price from its fallback: n = {g(D0)} / "
        f"{f(P1_res, 2)} = {f(n_kaskade)} million, leaving {f(N - n_kaskade)} million.</p>"),
    "criteria": [
        f"n = {g(D0)}/{f(P1, 2)} = {f(n)} million, at the new price; {f(Nrest)} million remain. The two equations or equivalent direct reasoning are accepted.",
        f"Using the old price ({f(felle_n)} million) is the classic error.",
        f"Bonus: the check E = {g(VL)} − {g(D0)} = {g(E1)} = {f(Nrest)} × {f(P1, 2)}.",
    ],
}
pe = {
    "label": "e", "points": 5,
    "body": ("<p>At what rate did you discount the tax shields in (b)? Explain why. Who captures the value of the tax "
             "shields from the debt that the firm will only add in later years? Explain briefly.</p>"),
    "solution": (
        f"<p><b>The rate is r<sub>U</sub> = {pc(rU3)}</b> (net of growth: r<sub>U</sub> − g). The firm sets the "
        f"interest as a fixed {pc(k)} of each year's free cash flow, so the tax shield is always {pc(tau * k)} of "
        f"the free cash flow: high when the business does well, low when it does badly. It carries the risk of the "
        f"firm's assets, not the risk of the debt. With permanent, fixed debt the shield would be known in advance "
        f"and discounted at r<sub>D</sub>, which gives τD.</p>"
        f"<p><b>The original shareholders capture all of it.</b> The policy is credible, so the present value of "
        f"every future shield, also those from the debt added later as the free cash flow grows, is in the price "
        f"of €{f(P1, 2)} at the announcement. Shareholders who sell get it in cash and those who keep hold it in "
        f"the share. Investors who buy later pay a price that already includes it, so they gain nothing. (Bonus: "
        f"the debt and the firm value both grow at {pc(gr)}, so D/V stays at {g(D0)} / {g(VL)} = {f(dv)}.)</p>"),
    "criteria": [
        f"Names r_U ({pc(rU3)}, as r_U − g in the perpetuity) and explains it: the interest (and so the tax shield) is a fixed share of the free cash flow, so it has the risk of the assets.",
        "Bonus: contrasts with permanent fixed debt, where the shield is known and is discounted at r_D (τD).",
        "The original shareholders capture the value of all future shields at the announcement, sellers and keepers alike, because the market prices the credible policy at once.",
        "Bonus: later buyers pay a price that already includes the shields and gain nothing.",
    ],
}
ex["parts"] = [pa, pb, pc_, pd, pe]
OPPG["mk-skatt-rekap-3"] = ex
SVAR["mk-skatt-rekap-3:1:a"] = {"type": "tall", "tall": [T("V<sup>U</sup>", VU, "€ m"), T("Share price", P0, "€ per share")]}
SVAR["mk-skatt-rekap-3:1:b"] = {"type": "tall", "tall": [T("Tax shield in Year 1", ts1, "€ m"), T("PV(TS)", PVTS, "€ m"),
                                                         T("V<sup>L</sup>", VL, "€ m")],
                                "merknad": f"Fellene {g(felle_rD)} (r_D) og {f(felle_uvekst)} (uten vekst) avvises."}
SVAR["mk-skatt-rekap-3:1:c"] = {"type": "tall", "tall": [T("Debt today", D0, "€ m"),
                                                         T("Share price on announcement", P1, "€ per share", alt=[round(P1_res, 10)])],
                                "merknad": f"alt {f(P1_res, 2)} er svaret med reserveverdien V^L = {g(VL_res)}."}
SVAR["mk-skatt-rekap-3:1:d"] = {"type": "tall", "tall": [T("Shares repurchased", n, "m shares", alt=[round(n_res, 10), round(n_kaskade, 10)]),
                                                         T("Shares remaining", Nrest, "m shares", alt=[round(N - n_res, 10), round(N - n_kaskade, 10)])],
                                "merknad": f"alt er svarene med reserveverdiene (gjeld {g(D_res)}, kurs {f(P_res3, 2)}): {f(n_res)} og {f(N - n_res)}, og med gjelden {g(D0)} og reservekursen {f(P1_res, 2)} fra (c): {f(n_kaskade)} og {f(N - n_kaskade)}. Fellen {f(felle_n)} (gammel kurs) avvises."}
SVAR["mk-skatt-rekap-3:1:e"] = {"type": "tekst"}

# ======================================================================
# mk-teori-kapital-1 · ulemper ved gjeld, to firmaer (forelesning 4, 4:56 og 29:37)
# ======================================================================
OPPG["mk-teori-kapital-1"] = {
    "n": 1, "title": "Capital Structure", "points": 10,
    "topic": "Downsides of debt", "chapters": [8, 9, 10],
    "merke": "Teorispørsmål som i forelesning 4 (4:56): ulemper ved gjeld",
    "body": ("<p>In a market that is perfect apart from corporate taxes, firm value rises with every unit of debt, so "
             "100% debt is optimal. Real firms borrow far less.</p>"
             "<p>(a) Give three distinct downsides of debt that this model leaves out. Explain each in two to three "
             "sentences. Direct and indirect costs of financial distress count as one downside. (6 points)</p>"
             "<p>(b) Strandvik Eiendom ASA owns office buildings in central Oslo, let on long leases to government "
             "agencies. Nordlys Regnskap AS sells accounting software to small firms on three-year subscriptions; its "
             "value lies in a team of programmers and in customers who need updates and support for years. All else "
             "equal, which firm should borrow more? Use your answer to (a) in two to three sentences. (4 points)</p>"),
    "solution": (
        "<p><b>(a) Model answer, three downsides (2 points each).</b></p>"
        "<p>1. <b>Costs of financial distress.</b> A firm that cannot pay its creditors pays lawyers, advisers and "
        "court fees (direct costs). It also loses value indirectly: assets are sold in a fire sale below their value, "
        "customers and suppliers walk away and management spends its time on creditors instead of the business. "
        "The expected cost rises with leverage because the probability of distress rises.</p>"
        "<p>2. <b>Debt overhang.</b> With heavy debt, a positive-NPV project financed with new equity mainly makes "
        "the existing debt safer, so much of its value is a wealth transfer to the creditors. The shareholders then "
        "reject it and the firm forgoes positive-NPV projects.</p>"
        "<p>3. <b>Excessive risk-taking (risk shifting).</b> Close to default, the shareholders keep the upside of a "
        "gamble while the creditors bear the downside, so a manager acting for the shareholders may take a risky "
        "project even if its NPV is negative. Creditors anticipate this and demand a higher rate.</p>"
        "<p>Also accepted as a third: a higher cost of future financing and less financial flexibility, because a "
        "highly levered firm finds it expensive to raise more money when it needs it; a tax shield the firm cannot "
        "use, because EBIT in a bad year (or other deductions such as depreciation and losses carried forward) leaves "
        "no taxable income to shield; personal taxes on interest, which investors pay and which reduce the net tax "
        "advantage of debt.</p>"
        "<p><b>(b) Strandvik should borrow more.</b> Its buildings are tangible, easy to value and easy to sell close "
        "to their value. Long leases to government tenants give stable cash flows, so both the probability and "
        "the cost of distress are low. Nordlys's value sits in people, code and customer relationships, which melt "
        "away in distress: customers stop signing three-year subscriptions with a firm that may not exist, the "
        "programmers leave and the software fetches little in a fire sale. Its growth is also exposed to debt "
        "overhang, so the trade-off between the tax shield and these costs puts its optimal leverage much "
        "lower.</p>"),
    "criteria": [
        "(a) Three distinct downsides, each explained, 2 points each: costs of financial distress, debt overhang, excessive risk-taking (risk shifting), a higher cost of future capital and lost flexibility, a tax shield that cannot be used, personal taxes on interest. Direct and indirect distress costs count as one downside, as the question says.",
        "(a) Each downside needs its mechanism: the expected cost rising with the probability of default; the wealth transfer to creditors that makes the firm forgo positive-NPV projects; the shareholders keeping the upside while creditors bear the downside.",
        "(a) Naming a downside without explaining it earns at most half its points. Two to three sentences each, as asked.",
        "(b) Chooses Strandvik (1 point) and ties it to (a) (3 points): tangible, saleable assets mean small fire-sale losses; stable rents mean a low probability of distress; Nordlys's intangible assets, customers who need support for years and key employees mean large indirect costs.",
        "(b) Credit for naming the trade-off: the firm borrows until the extra tax shield is worth less than the extra expected costs of distress and agency.",
    ],
}
SVAR["mk-teori-kapital-1:1:"] = {"type": "tekst"}

# ======================================================================
# mk-teori-kapital-2 · fire bruk av fri kontantstrøm, vekstfirma (forelesning 5, 12:17 og 14:43)
# ======================================================================
OPPG["mk-teori-kapital-2"] = {
    "n": 1, "title": "Payout Policy", "points": 10,
    "topic": "Payout policy", "chapters": [15, 16],
    "merke": "Teorispørsmål som i forelesning 5 (12:17): fire måter å bruke fri kontantstrøm",
    "body": ("<p>Solvarde Energi ASA installs rooftop solar systems for homes and farms. Demand is growing fast and "
             "the company has a list of new regional markets that earn well above their cost of capital, but its "
             "bank will not lend more on good terms. This year it expects a free cash flow of NOK 250 million.</p>"
             "<p>List four things the company can do with the free cash flow and rank them for Solvarde, from the "
             "one you would prefer as a shareholder to the one you would like least. Justify your ranking in one or "
             "two sentences per alternative. (8 points, 2 per alternative)</p>"
             "<p>Would your ranking change if management believed the shares were clearly undervalued? One or two "
             "sentences. (2 points)</p>"),
    "solution": (
        "<p><b>Model answer (one defensible ranking for a growth firm).</b></p>"
        "<p>1. <b>Invest in the new markets.</b> Investing is the best use when there are good investment "
        "opportunities. Solvarde has them: projects that earn more than their cost of capital create value for "
        "the shareholders. With the bank closed and a share issue costly, internal cash is the cheapest way to fund "
        "them.</p>"
        "<p>2. <b>Retain the cash.</b> A reserve lets Solvarde fund next year's projects without going to the market "
        "and is a buffer in a bad year. The cost is that idle cash works like negative debt and can tempt managers "
        "into wasteful spending, so it should be earmarked for the pipeline.</p>"
        "<p>3. <b>Repurchase shares.</b> A buyback returns cash without a promise to repeat it, so Solvarde keeps its "
        "flexibility; shareholders who want cash sell and the others defer their capital gains tax.</p>"
        "<p>4. <b>Pay a dividend.</b> Dividends are sticky: once paid, investors expect them every year and a cut is "
        "punished by the market, which is a poor fit for a firm that needs its cash to grow.</p>"
        "<p><b>If the shares are undervalued.</b> Investing still comes first. Among the payouts the buyback gains, "
        "because buying shares below their value benefits the shareholders who stay and signals the "
        "undervaluation; keeping the cash also looks better, since raising equity at too low a price later would be "
        "costly.</p>"),
    "criteria": [
        "Four distinct alternatives: invest, retain the cash, repurchase shares, pay a dividend. A special dividend and a regular dividend count as one.",
        "2 points per alternative: the alternative and a reason that fits Solvarde. Any ranking is accepted if it is justified, but a ranking that puts investing last ignores that the firm has good projects.",
        "Investing earns full points only with the qualification: it is best because there are good investment opportunities (projects that earn more than their cost of capital), not because growth is good in itself. The lecturer gives a separate point for this (lecture 5, 14:43).",
        "Credit for the mechanisms behind the payouts: dividends are sticky and a cut is punished; a buyback is flexible, defers the capital gains tax and signals undervaluation; retained cash is a buffer and cheaper than outside money but invites waste and works like negative debt.",
        "Undervaluation (2 points): investing stays first; the buyback moves ahead of the dividend, or keeping the cash gains. Either, with a reason, is accepted.",
    ],
}
SVAR["mk-teori-kapital-2:1:"] = {"type": "tekst"}

# ======================================================================
# mk-teori-kapital-3 · MM mot virkeligheten: fire fakta (forelesning 3, 11:33)
# ======================================================================
OPPG["mk-teori-kapital-3"] = {
    "n": 1, "title": "Capital Structure", "points": 10,
    "topic": "MM and the real world", "chapters": [6, 7, 13, 16],
    "merke": "Teorispørsmål som i forelesning 3 (11:33): MM mot virkeligheten",
    "body": ("<p>In a perfect capital market neither the mix of debt and equity nor the choice between dividends and "
             "buybacks affects firm value. Each fact below breaks one of the assumptions behind this result. For each "
             "fact, name the assumption it breaks and say which financing or payout choice it favours and why. One to "
             "two sentences per fact. (2.5 points each)</p>"
             "<ol><li>Interest payments are deducted from taxable income; dividends are not.</li>"
             "<li>Banks charge fees of 5 to 7% of the amount raised in a share issue.</li>"
             "<li>Managers know more about the firm's prospects than outside investors.</li>"
             "<li>Shareholders pay tax on a dividend when it is paid but on a capital gain only when they sell the "
             "share.</li></ol>"),
    "solution": (
        "<p><b>Model answer.</b></p>"
        "<p>1. <b>No taxes.</b> Interest is paid before corporate tax, so debt creates an interest tax shield "
        "(V<sup>L</sup> = V<sup>U</sup> + PV(TS)) and is favoured over equity.</p>"
        "<p>2. <b>No transaction (issue) costs.</b> Fees make outside equity expensive, so the firm prefers internal "
        "funds (keeping cash rather than paying it out and raising it again) and debt, which is cheaper to issue.</p>"
        "<p>3. <b>Symmetric information.</b> Investors read a share issue as a sign that managers think the shares "
        "are overvalued and mark the price down, so firms prefer internal funds, then debt, then equity (the pecking "
        "order); by the same logic a buyback signals undervaluation.</p>"
        "<p>4. <b>No personal taxes.</b> A taxable investor can defer the tax on a buyback (sell later or not at all) "
        "but not on a dividend, so a buyback or keeping the cash is favoured over a dividend. In the US and Norway "
        "the two rates are now about equal, so the advantage is the deferral, not a lower rate.</p>"),
    "criteria": [
        "Per fact: 1 point for the assumption and 1.5 points for the choice it favours with the mechanism.",
        "Fact 1: no taxes; favours debt through the interest tax shield.",
        "Fact 2: no transaction or issue costs; favours internal funds (and debt) over a new share issue. 'Perfect markets without frictions' is accepted as the assumption.",
        "Fact 3: symmetric (equal) information; an equity issue signals overvaluation, so the pecking order: internal funds, debt, equity. Mentioning that a buyback signals undervaluation is also accepted.",
        "Fact 4: no personal taxes; favours a buyback (or retention) because the tax is deferred. No mechanism point without the deferral: dividends are not generally taxed at a higher rate today, so the point is that the tax on a capital gain can be deferred.",
        "One to two sentences per fact, as asked. Length is not rewarded.",
    ],
}
SVAR["mk-teori-kapital-3:1:"] = {"type": "tekst"}


# ======================================================================
# signal: emisjon under asymmetrisk informasjon (Myers-Majluf), felles regning
# ======================================================================
def emisjon(H, L, p, I, C, N):
    """To typer (H, L), sannsynlighet p for H, prosjekt I i dag mot sikre C ved t = 1, N aksjer."""
    r = {"V": p * H + (1 - p) * L}
    r["P0"] = r["V"] / N
    r["a"] = I / (r["V"] + C)                    # samlet pris: begge utsteder
    r["sH"] = (1 - r["a"]) * (H + C)
    r["sL"] = (1 - r["a"]) * (L + C)
    r["aL"] = I / (L + C)                        # bare L utsteder
    r["L_beholder"] = (1 - r["aL"]) * (L + C)
    r["H_imiterer"] = (1 - r["aL"]) * (H + C)
    r["P_ann"] = (L + C - I) / N                 # kurs rett etter kunngjøring når emisjonen avslører L
    r["n"] = I / r["P_ann"]
    assert near(r["P_ann"] * (N + r["n"]), L + C)    # P·n = I og P·(N + n) = L + C
    assert r["sH"] < H and r["sL"] > L               # bare L utsteder til samlet pris
    assert utenfor(r["sH"], H) and utenfor(r["sL"], L)   # andelene ligger utenfor toleransen av verdien uten prosjekt
    assert r["L_beholder"] > L and r["H_imiterer"] < H   # troen «bare L utsteder» er rasjonell
    assert near(r["sL"] - L, (C - I) + r["a"] * ((r["V"] + C) - (L + C)))   # NPV + overprising
    assert near(H - r["sH"], r["a"] * ((H + C) - (r["V"] + C)) - (C - I))   # subsidie − NPV
    return r


# ======================================================================
# mk-signal-1 · Hovdenes Marine (SEO-eksemplet i forelesning 7: 140/40, 8 → 10)
# ======================================================================
H, L, p, I, C, N = 330.0, 130.0, 0.5, 30.0, 36.0, 20.0
s1 = emisjon(H, L, p, I, C, N)
a_res = 0.13
assert utenfor(a_res, s1["a"])
sH_res, sL_res = (1 - a_res) * (H + C), (1 - a_res) * (L + C)
assert sH_res < H and sL_res > L                      # samme beslutning med reserveverdien
assert utenfor(sH_res, s1["sH"]) and utenfor(sL_res, s1["sL"])
felle_P = (s1["V"] + C - I) / N                       # kurs uten at markedet lærer typen
assert utenfor(felle_P, s1["P_ann"])
assert near(s1["a"], 30 / 266) and near(s1["P_ann"], 6.8)

ex = {
    "n": 1, "title": "Security Issues", "points": 20,
    "topic": "Equity issues", "chapters": [12, 13],
    "merke": "Samme form som SEO-eksemplet i forelesning 7 (1:29:09)",
    "body": (f"<p>Hovdenes Marine ASA builds aluminium workboats. It is all-equity financed with {g(N)} million "
             f"shares, held by long-term shareholders who keep them until t = 1. At t = 1 its existing assets will be "
             f"worth NOK {g(H)} million if its new hull design is approved or NOK {g(L)} million if it is not. The "
             f"managers already know which; investors think both are equally likely. The manager acts in the "
             f"interest of the existing shareholders. Everyone is risk-neutral and the risk-free rate is 0%. Use 4 "
             f"decimal places.</p>"),
}
pa = {
    "label": "a", "points": 3,
    "body": "<p>What is the market value of Hovdenes's existing assets today? What is the share price?</p>",
    "solution": (
        f"<p>Investors cannot tell the types apart, so they value the firm at the expectation: V = {g(p)} × {g(H)} + "
        f"{g(1 - p)} × {g(L)} = <b>NOK {g(s1['V'])}M</b>. The share price is P = {g(s1['V'])} / {g(N)} = "
        f"<b>NOK {f(s1['P0'], 2)}</b>.</p>"),
    "criteria": [
        f"V = {g(p)} × {g(H)} + {g(1 - p)} × {g(L)} = NOK {g(s1['V'])}M, because investors only know the probabilities.",
        f"P = {g(s1['V'])}/{g(N)} = NOK {f(s1['P0'], 2)}.",
        "No discounting: the risk-free rate is 0% and everyone is risk-neutral.",
    ],
}
pb = {
    "label": "b", "points": 4,
    "body": (f"<p>Hovdenes can invest NOK {g(I)} million today in a new paint shop that will pay NOK {g(C)} million for "
             f"sure at t = 1. It must pay for it by issuing new shares to competitive investors. Suppose investors "
             f"price the issue as if both types issue. What fraction of the firm must the new investors receive?</p>"),
    "solution": (
        f"<p><b>Step 1. The firm after the investment, as investors see it.</b> {g(s1['V'])} + {g(C)} = "
        f"NOK {g(s1['V'] + C)}M at t = 1. The NOK {g(I)}M raised is spent on the paint shop, so the denominator "
        f"includes the project's payoff.</p>"
        f"<p><b>Step 2. The fraction.</b> Competitive investors pay {g(I)} for a stake worth {g(I)}:</p>"
        f"<p>α = {g(I)} / {g(s1['V'] + C)} = <b>{pc(s1['a'], 4)}</b></p>"),
    "criteria": [
        f"α = I / (pooled value after the investment) = {g(I)}/({g(s1['V'])} + {g(C)}) = {pc(s1['a'], 4)}.",
        f"Leaving the project out of the denominator ({g(I)}/{g(s1['V'])} = {pc(I / s1['V'], 4)}) is the classic error.",
        "The new investors break even on average: they pay the fair price given what they know.",
    ],
}
pc_ = {
    "label": "c", "points": 5,
    "body": (f"<p>On the terms in (b), what are the existing shareholders' stakes worth at t = 1 for each type? Which "
             f"type issues and invests? (If you could not solve (b), use a fraction of {pc(a_res)}.)</p>"),
    "solution": (
        f"<p>The existing shareholders keep 1 − α = {fx(1 - s1['a'])} of the firm with the paint shop:</p>"
        + tab(["Type", "Without the issue", "With the issue", "Decision"], [
            ["High value", f"#{g(H)}", f"#{fx(1 - s1['a'])} × {g(H + C)} = {f(s1['sH'])}", "Does not issue"],
            ["Low value", f"#{g(L)}", f"#{fx(1 - s1['a'])} × {g(L + C)} = {f(s1['sL'])}", "Issues"],
        ])
        + f"<p><b>Only the low-value type issues.</b> It gains {f(s1['sL'] - L)}: the NPV of {g(C - I)} plus "
          f"{f(s1['sL'] - L - (C - I))} from selling shares priced as if the firm were worth {g(s1['V'])} when it is "
          f"worth {g(L)}. The high-value type pays that subsidy: its shares are underpriced, so it gives away "
          f"{fx(s1['a'])} × {g(H + C)} = {f(s1['a'] * (H + C))} of value for NOK {g(I)}M of cash. The excess of "
          f"{f(s1['a'] * (H + C) - I)} outweighs the NPV of {g(C - I)} and it loses {f(H - s1['sH'])}.</p>"
          f"<p>With the fallback of {pc(a_res)}: {g(1 - a_res)} × {g(H + C)} = {f(sH_res)} and {g(1 - a_res)} × "
          f"{g(L + C)} = {f(sL_res)}. Same decisions.</p>"),
    "criteria": [
        f"High value: {fx(1 - s1['a'])} × {g(H + C)} = {f(s1['sH'])}, below {g(H)}, so it does not issue.",
        f"Low value: {fx(1 - s1['a'])} × {g(L + C)} = {f(s1['sL'])}, above {g(L)}, so it issues.",
        "Compares each stake with the value without the project, not with the other type.",
        "Mechanism: the low type gains the NPV plus the overpricing of its shares; the high type's shares are underpriced, so the dilution costs more than the NPV.",
    ],
}
pd = {
    "label": "d", "points": 4,
    "body": ("<p>Investors understand your answer to (c). What is the share price right after Hovdenes announces the "
             "issue? How many new shares must it sell?</p>"),
    "solution": (
        f"<p><b>Step 1. What the announcement reveals.</b> Only a low-value firm issues, so the issue tells investors "
        f"that the assets are worth {g(L)}. With the paint shop the firm will be worth {g(L)} + {g(C)} = "
        f"NOK {g(L + C)}M, of which the new investors pay for {g(I)}.</p>"
        f"<p><b>Step 2. Two equations.</b> P × n = {g(I)} and P × ({g(N)} + n) = {g(L + C)}, so {g(N)} × P = "
        f"{g(L + C - I)}:</p>"
        f"<p>P = <b>NOK {f(s1['P_ann'], 2)}</b> and n = {g(I)} / {f(s1['P_ann'], 2)} = <b>{f(s1['n'])} million "
        f"shares</b></p>"
        f"<p>The price falls from NOK {f(s1['P0'], 2)} to NOK {f(s1['P_ann'], 2)} "
        f"({pc(s1['P_ann'] / s1['P0'] - 1, 2)}). The new investors get {g(I)} / {g(L + C)} = {pc(s1['aL'], 4)} of the "
        f"firm.</p>"
        f"<p><b>Check that the belief is rational.</b> On these terms the low type keeps {g(s1['L_beholder'])} > "
        f"{g(L)} and still issues; a high type would keep {f(s1['H_imiterer'])} < {g(H)} and stays out. ✓</p>"),
    "criteria": [
        f"The issue reveals the low type: P = ({g(L)} + {g(C)} − {g(I)})/{g(N)} = NOK {f(s1['P_ann'], 2)}.",
        f"n = {g(I)}/{f(s1['P_ann'], 2)} = {f(s1['n'])} million, from P × n = {g(I)} and P × ({g(N)} + n) = {g(L + C)} or equivalent reasoning.",
        f"Pricing at the pooled value (NOK {f(felle_P, 2)}) ignores what the issue reveals.",
        "Bonus: checks that the belief is rational (the low type still issues, the high type does not imitate).",
    ],
}
pe = {
    "label": "e", "points": 4,
    "body": ("<p>Is the outcome efficient? Compared with a world where investors also knew the type, who gains and who "
             "loses? Explain briefly (3 to 4 sentences).</p>"),
    "solution": (
        f"<p><b>No.</b> The high-value Hovdenes forgoes a positive-NPV project: with full information it could sell "
        f"shares at a fair price and its shareholders would end up with {g(H)} + {g(C - I)} = {g(H + C - I)}; now "
        f"they keep {g(H)}, so they lose the NPV of {g(C - I)}. The low-value firm ends up with {g(s1['L_beholder'])} "
        f"in both worlds, because investors see through the issue. The new investors break even. The fall in the "
        f"share price at the announcement is the market learning the type, not a verdict on the paint shop, which "
        f"has a positive NPV for both types. This is underinvestment caused by asymmetric information: the firm "
        f"forgoes positive-NPV projects.</p>"),
    "criteria": [
        "Says the outcome is inefficient because the high-value type forgoes a positive-NPV project (underinvestment).",
        f"The high type's shareholders lose the NPV ({g(C - I)}) compared with full information; the low type and the new investors are no better or worse off.",
        "Explains the price fall as information revealed by the decision to issue, not as a judgement on the project.",
        "3 to 4 sentences, as asked.",
    ],
}
ex["parts"] = [pa, pb, pc_, pd, pe]
OPPG["mk-signal-1"] = ex
SVAR["mk-signal-1:1:a"] = {"type": "tall", "tall": [T("V", s1["V"], "NOK m"), T("Share price", s1["P0"], "NOK per share")]}
SVAR["mk-signal-1:1:b"] = {"type": "tall", "tall": [T("Fraction to new investors", 100 * s1["a"], "%")],
                           "merknad": f"Fellen {f(100 * I / s1['V'])} % (prosjektet utelatt i nevneren) avvises."}
SVAR["mk-signal-1:1:c"] = {"type": "blandet", "tall": [T("Stake at t = 1, high-value type", s1["sH"], "NOK m", alt=[round(sH_res, 10)]),
                                                       T("Stake at t = 1, low-value type", s1["sL"], "NOK m", alt=[round(sL_res, 10)])],
                           "tallPoeng": 2, "tekstLedd": "Which type issues and invests?",
                           "merknad": f"alt er svarene med reserveverdien {pc(a_res)}: {f(sH_res)} og {f(sL_res)}."}
SVAR["mk-signal-1:1:d"] = {"type": "tall", "tall": [T("Share price after the announcement", s1["P_ann"], "NOK per share"),
                                                    T("New shares", s1["n"], "m shares")],
                           "merknad": f"Fellen {f(felle_P, 2)} (samlet pris) avvises."}
SVAR["mk-signal-1:1:e"] = {"type": "tekst"}

# ======================================================================
# mk-signal-2 · Larkhaven Biosensors (HA1 E3 og PS2 E1 strammet inn: skjeve sannsynligheter, sertifisering)
# ======================================================================
H, L, p, I, C, N = 400.0, 200.0, 0.3, 50.0, 60.0, 25.0
s2 = emisjon(H, L, p, I, C, N)
F_maks = (H + C - I) - H                      # sertifikatet er verdt NPV-en det låser opp
assert near(F_maks, C - I)
# med sertifikat og gebyr F hentet i samme emisjon til riktig kurs: de gamle eierne beholder H + C − I − F
assert near((H + C) - (I + F_maks), H)
L_med_sert = (L + C) - I                      # lavtypen avsløres uansett: beholder L + C − I − F
assert near(L_med_sert, s2["L_beholder"])
felle_F = s2["a"] * (H + C) - (C - I)         # høytypens tap ved samlet pris i (b)
assert utenfor(felle_F, F_maks)
assert near(s2["a"], 0.15625) and near(s2["P_ann"], 8.4)

ex = {
    "n": 1, "title": "Security Issues", "points": 20,
    "topic": "Equity issues", "chapters": [12, 13],
    "merke": "Som HA1 E3 og PS2 E1 i forelesning 10, strammet inn, med sertifisering (forelesning 10, 3:07)",
    "body": (f"<p>Larkhaven Biosensors Inc. makes glucose sensors. It has {g(N)} million shares, no debt and no cash. "
             f"At t = 1 its existing assets will be worth ${g(H)} million (high-value type) or ${g(L)} million "
             f"(low-value type). The managers know the type; investors put a probability of {pc(p)} on the high-value "
             f"type. The shareholders keep their shares until t = 1 and the manager acts in their interest.</p>"
             f"<p>Larkhaven can invest ${g(I)} million today in a production line that pays ${g(C)} million for sure "
             f"at t = 1. It must issue new shares to competitive investors to pay for it. Everyone is risk-neutral and "
             f"the risk-free rate is 0%. Use 4 decimal places.</p>"),
}
pa = {
    "label": "a", "points": 3,
    "body": "<p>What is the market value of Larkhaven's existing assets and the share price today?</p>",
    "solution": (
        f"<p>V = {g(p)} × {g(H)} + {g(1 - p)} × {g(L)} = <b>${g(s2['V'])}M</b> and P = {g(s2['V'])} / {g(N)} = "
        f"<b>${f(s2['P0'], 2)}</b>.</p>"),
    "criteria": [
        f"Uses the given probabilities, not 50/50: V = {g(p)} × {g(H)} + {g(1 - p)} × {g(L)} = ${g(s2['V'])}M.",
        f"P = {g(s2['V'])}/{g(N)} = ${f(s2['P0'], 2)}.",
        f"A 50/50 average (${g((H + L) / 2)}M) is the error.",
    ],
}
pb = {
    "label": "b", "points": 4,
    "body": ("<p>Suppose investors price the issue as if both types issue. What fraction of the firm must the new "
             "investors receive? What are the existing shareholders' stakes worth at t = 1 for each type if Larkhaven "
             "issues? Which type issues?</p>"),
    "solution": (
        f"<p><b>Step 1. The fraction.</b> α = {g(I)} / ({g(s2['V'])} + {g(C)}) = {g(I)} / {g(s2['V'] + C)} = "
        f"<b>{pc(s2['a'], 4)}</b>.</p>"
        f"<p><b>Step 2. The stakes.</b> High value: {fx(1 - s2['a'])} × {g(H + C)} = <b>{f(s2['sH'])}</b> &lt; "
        f"{g(H)}. Low value: {fx(1 - s2['a'])} × {g(L + C)} = <b>{f(s2['sL'])}</b> &gt; {g(L)}.</p>"
        f"<p><b>Only the low-value type issues.</b> The pooled price overvalues it and undervalues the high type, so "
        f"the high type would give away {f(s2['a'] * (H + C))} of value to raise {g(I)} and lose {f(H - s2['sH'])}.</p>"),
    "criteria": [
        f"α = {g(I)}/({g(s2['V'])} + {g(C)}) = {pc(s2['a'], 4)}, with the project in the denominator.",
        f"Stakes: {f(s2['sH'])} for the high type (below {g(H)}) and {f(s2['sL'])} for the low type (above {g(L)}).",
        "Conclusion: only the low-value type issues.",
    ],
}
pc_ = {
    "label": "c", "points": 4,
    "body": ("<p>Now suppose investors believe that only the low-value type issues. What fraction must an issuing firm "
             "give the new investors? What is the share price right after an issue is announced?</p>"),
    "solution": (
        f"<p><b>Step 1. The fraction.</b> An issuer is priced as the low type: α = {g(I)} / ({g(L)} + {g(C)}) = "
        f"<b>{pc(s2['aL'], 4)}</b>.</p>"
        f"<p><b>Step 2. The price.</b> The old shareholders' part is worth {g(L)} + {g(C)} − {g(I)} = {g(L + C - I)}, "
        f"so P = {g(L + C - I)} / {g(N)} = <b>${f(s2['P_ann'], 2)}</b>, down from ${f(s2['P0'], 2)} "
        f"({pc(s2['P_ann'] / s2['P0'] - 1, 2)}). The issue is {g(I)} / {f(s2['P_ann'], 2)} = {f(s2['n'])} million new "
        f"shares.</p>"),
    "criteria": [
        f"α = {g(I)}/({g(L)} + {g(C)}) = {pc(s2['aL'], 4)}.",
        f"P = ({g(L)} + {g(C)} − {g(I)})/{g(N)} = ${f(s2['P_ann'], 2)}: the announcement reveals the low type, so the price falls.",
        "Two equations (P × n = I and P × (N + n) = L + C) or equivalent reasoning are both accepted.",
    ],
}
pd = {
    "label": "d", "points": 5,
    "body": ("<p>An independent laboratory offers to certify Larkhaven's type to the market. The fee is paid today and "
             "raised in the same share issue at the certified (fair) price. What is the highest fee a high-value "
             "Larkhaven would pay? Would a low-value Larkhaven buy the certificate? Explain briefly.</p>"),
    "solution": (
        f"<p><b>High value.</b> With the certificate it is priced at its true value. Raising {g(I)} + F at a fair "
        f"price, its old shareholders keep {g(H)} + {g(C)} − {g(I)} − F = {g(H + C - I)} − F. Without the certificate "
        f"it does not invest (from (b) and (c)) and keeps {g(H)}. It pays up to {g(H + C - I)} − {g(H)} = "
        f"<b>${g(F_maks)}M</b>, the NPV of the project the certificate lets it take.</p>"
        f"<p><b>Low value: no.</b> A certificate would only confirm what an issue already reveals under the belief in "
        f"(c): it would keep {g(L + C - I)} − F instead of {g(L + C - I)}. Since only the high type buys a "
        f"certificate, an issue without one marks the firm as the low type.</p>"),
    "criteria": [
        f"Highest fee = ${g(F_maks)}M: the high type's gain from investing at a fair price ({g(H + C - I)} − F against {g(H)} without the project).",
        "Sets the comparison right: the alternative for the high type is not investing, not issuing at the pooled price.",
        f"The low type does not buy: it gains nothing from being revealed and would pay the fee. Its loss in (b) ({f(felle_F)}) is not the value of the certificate.",
        "Bonus: notes that the existence of the certificate makes an uncertified issue a sign of the low type.",
    ],
}
pe = {
    "label": "e", "points": 4,
    "body": ("<p>Is the belief in (c) rational given what the two types do? Without a certificate, is the outcome "
             "efficient? Explain briefly.</p>"),
    "solution": (
        f"<p><b>Rational: yes.</b> On the terms in (c) the low type keeps {fx(1 - s2['aL'])} × {g(L + C)} = "
        f"{g(s2['L_beholder'])} &gt; {g(L)}, so it issues; a high type that imitated would keep {fx(1 - s2['aL'])} × "
        f"{g(H + C)} = {f(s2['H_imiterer'])} &lt; {g(H)}, so it stays out. Only low types issue, exactly as investors "
        f"believe. (The belief in (b) was not rational, because only the low type issued.)</p>"
        f"<p><b>Efficient: no.</b> The high type forgoes a project with NPV {g(C - I)}: underinvestment, the firm "
        f"forgoes positive-NPV projects. Before the type is known, the expected loss is {g(p)} × {g(C - I)} = "
        f"{g(p * (C - I))} per firm. A certificate that costs less than {g(F_maks)} removes it.</p>"),
    "criteria": [
        f"Checks the belief with numbers: the low type issues ({g(s2['L_beholder'])}, above {g(L)}) and the high type does not imitate ({f(s2['H_imiterer'])}, below {g(H)}), so the belief is consistent with the actions.",
        "Inefficient: the high-value type forgoes a positive-NPV project.",
        f"Bonus: the expected loss {g(p * (C - I))}, or that a certificate cheaper than {g(F_maks)} restores investment.",
    ],
}
ex["parts"] = [pa, pb, pc_, pd, pe]
OPPG["mk-signal-2"] = ex
SVAR["mk-signal-2:1:a"] = {"type": "tall", "tall": [T("V", s2["V"], "$ m"), T("Share price", s2["P0"], "$ per share")]}
SVAR["mk-signal-2:1:b"] = {"type": "blandet", "tall": [T("Fraction to new investors", 100 * s2["a"], "%"),
                                                       T("Stake at t = 1, high-value type", s2["sH"], "$ m"),
                                                       T("Stake at t = 1, low-value type", s2["sL"], "$ m")],
                           "tallPoeng": 3, "tekstLedd": "Which type issues?"}
SVAR["mk-signal-2:1:c"] = {"type": "tall", "tall": [T("Fraction to new investors", 100 * s2["aL"], "%"),
                                                    T("Share price after the announcement", s2["P_ann"], "$ per share")]}
SVAR["mk-signal-2:1:d"] = {"type": "blandet", "tall": [T("Highest fee, high-value type", F_maks, "$ m")],
                           "tallPoeng": 2, "tekstLedd": "Would a low-value Larkhaven buy the certificate? Why?"}
SVAR["mk-signal-2:1:e"] = {"type": "tekst"}

# ======================================================================
# mk-signal-3 · Montclair Vineyards (det varslede tillegget: hakkeorden, lån i stedet for aksjer)
# ======================================================================
H, L, p, I, C, N = 220.0, 100.0, 0.6, 40.0, 46.0, 10.0
s3 = emisjon(H, L, p, I, C, N)
H_lan, L_lan = H + C - I, L + C - I            # risikofritt lån: ingen feilprising, begge investerer
assert H_lan > H and L_lan > L
P_lan = (s3["V"] + C - I) / N                  # kunngjøringen avslører ingenting, legger til NPV
assert near(P_lan, s3["P0"] + (C - I) / N)
assert min(H, L) + C >= I                      # lånet kan alltid betales: det er risikofritt
assert near(s3["P_ann"], 10.6) and near(P_lan, 17.8)

ex = {
    "n": 1, "title": "Security Issues", "points": 20,
    "topic": "Financing a project", "chapters": [12, 13],
    "merke": "Som SEO-eksemplet i forelesning 7, med lån som alternativ (forelesning 4, 1:31:05)",
    "body": (f"<p>Montclair Vineyards SA owns vineyards in the south of France. It has {g(N)} million shares, no debt "
             f"and no cash. At t = 1 its existing assets will be worth €{g(H)} million (high-value type) or "
             f"€{g(L)} million (low-value type), depending on soil tests that only the managers have seen. Investors "
             f"put a probability of {pc(p)} on the high-value type.</p>"
             f"<p>Montclair can invest €{g(I)} million today in a new cellar that pays €{g(C)} million for sure at "
             f"t = 1. Everyone is risk-neutral and the risk-free rate is 0%. The manager acts for the existing "
             f"shareholders, who keep their shares until t = 1. Use 4 decimal places.</p>"),
}
pa = {
    "label": "a", "points": 3,
    "body": "<p>What is the market value of the existing assets and the share price today?</p>",
    "solution": (
        f"<p>V = {g(p)} × {g(H)} + {g(1 - p)} × {g(L)} = <b>€{g(s3['V'])}M</b> and P = {g(s3['V'])} / {g(N)} = "
        f"<b>€{f(s3['P0'], 2)}</b>.</p>"),
    "criteria": [
        f"V = €{g(s3['V'])}M with the given probabilities.",
        f"P = €{f(s3['P0'], 2)}.",
        "Show the calculation. No calculation, no points.",
    ],
}
pb = {
    "label": "b", "points": 5,
    "body": ("<p>Suppose Montclair must finance the cellar with new shares and investors price the issue as if both "
             "types issue. What fraction of the firm must the new investors receive? What are the existing "
             "shareholders' stakes worth at t = 1 for each type? Which type issues?</p>"),
    "solution": (
        f"<p><b>Step 1.</b> α = {g(I)} / ({g(s3['V'])} + {g(C)}) = {g(I)} / {g(s3['V'] + C)} = "
        f"<b>{pc(s3['a'], 4)}</b>.</p>"
        f"<p><b>Step 2.</b> High value: {fx(1 - s3['a'])} × {g(H + C)} = <b>{f(s3['sH'])}</b> &lt; {g(H)}, so it does "
        f"not issue. Low value: {fx(1 - s3['a'])} × {g(L + C)} = <b>{f(s3['sL'])}</b> &gt; {g(L)}, so it issues.</p>"
        f"<p>Only the low type issues. Even with a {pc(p)} chance of the high type, the pooled price undervalues a "
        f"high-value Montclair: it would give away {f(s3['a'] * (H + C))} of value for €{g(I)}M of cash, more than "
        f"the €{g(C)}M the cellar returns.</p>"),
    "criteria": [
        f"α = {g(I)}/({g(s3['V'])} + {g(C)}) = {pc(s3['a'], 4)}.",
        f"Stakes {f(s3['sH'])} (high, below {g(H)}) and {f(s3['sL'])} (low, above {g(L)}).",
        "Only the low type issues; each type compares with its value without the project.",
    ],
}
pc_ = {
    "label": "c", "points": 4,
    "body": ("<p>Investors understand your answer to (b). What is the share price right after an equity issue is "
             "announced? How many new shares must be sold?</p>"),
    "solution": (
        f"<p>The issue reveals the low type, so the firm with the cellar is worth {g(L)} + {g(C)} = €{g(L + C)}M. "
        f"P × n = {g(I)} and P × ({g(N)} + n) = {g(L + C)} give {g(N)} × P = {g(L + C - I)}:</p>"
        f"<p>P = <b>€{f(s3['P_ann'], 2)}</b> and n = {g(I)} / {f(s3['P_ann'], 2)} = <b>{f(s3['n'])} million "
        f"shares</b></p>"
        f"<p>The price falls from €{f(s3['P0'], 2)} ({pc(s3['P_ann'] / s3['P0'] - 1, 2)}).</p>"),
    "criteria": [
        f"P = ({g(L)} + {g(C)} − {g(I)})/{g(N)} = €{f(s3['P_ann'], 2)}.",
        f"n = {g(I)}/{f(s3['P_ann'], 2)} = {f(s3['n'])} million (two equations or equivalent reasoning).",
        f"Pricing at the pooled value (€{f((s3['V'] + C - I) / N, 2)}) ignores what the issue reveals.",
    ],
}
pd = {
    "label": "d", "points": 4,
    "body": (f"<p>Instead, Montclair can borrow the €{g(I)} million from a bank, to be repaid at t = 1 with no interest "
             f"(the loan is risk-free). Which types invest? What happens to the share price when the loan is "
             f"announced?</p>"),
    "solution": (
        f"<p><b>Both types invest.</b> The loan is repaid in full from the cellar's €{g(C)}M whatever the type, so "
        f"its value does not depend on what the managers know and nothing is mispriced. A high-value Montclair keeps "
        f"{g(H)} + {g(C)} − {g(I)} = {g(H_lan)} &gt; {g(H)} and a low-value one {g(L_lan)} &gt; {g(L)}. (A low-value "
        f"firm gains nothing from issuing shares instead: an equity issue would reveal it.)</p>"
        f"<p>Since both types borrow, the announcement reveals nothing about the type and only adds the NPV: "
        f"P = ({g(s3['V'])} + {g(C - I)}) / {g(N)} = <b>€{f(P_lan, 2)}</b>, up from €{f(s3['P0'], 2)}.</p>"),
    "criteria": [
        f"Both types invest: {g(H_lan)} is above {g(H)} and {g(L_lan)} above {g(L)}.",
        "Reason: risk-free debt is worth the same whatever the type, so its price cannot be wrong.",
        f"P = ({g(s3['V'])} + {g(C - I)})/{g(N)} = €{f(P_lan, 2)}: the price rises by the NPV per share.",
    ],
}
pe = {
    "label": "e", "points": 4,
    "body": ("<p>Explain the result in (d) with the pecking order: in which order should Montclair prefer internal "
             "cash, debt and equity? Why? Would your answer change if the loan were risky? Explain briefly (3 to "
             "4 sentences).</p>"),
    "solution": (
        "<p><b>Internal cash first, then debt, then equity.</b> Cash already in the firm reveals nothing and does not "
        "have to be sold to anyone, so no information problem arises. Risk-free debt comes next: its value does not "
        "depend on what the managers know, so it cannot be mispriced and borrowing sends no signal. Equity comes last: "
        "its value depends most on the private information, so issuing it signals that managers think the shares are "
        "overvalued and the price falls. A risky loan would be worth less for the low type than for the high type, so "
        "it would carry part of the same problem, but much less than equity.</p>"),
    "criteria": [
        "The order: internal funds, then debt, then equity (the pecking order).",
        "Mechanism: the more a security's value depends on the managers' private information, the more it can be mispriced and the stronger the negative signal; risk-free debt is not sensitive at all.",
        "Risky debt: partly sensitive to the private information, so somewhat mispriced, but less than equity.",
        "3 to 4 sentences, as asked.",
    ],
}
ex["parts"] = [pa, pb, pc_, pd, pe]
OPPG["mk-signal-3"] = ex
SVAR["mk-signal-3:1:a"] = {"type": "tall", "tall": [T("V", s3["V"], "€ m"), T("Share price", s3["P0"], "€ per share")]}
SVAR["mk-signal-3:1:b"] = {"type": "blandet", "tall": [T("Fraction to new investors", 100 * s3["a"], "%"),
                                                       T("Stake at t = 1, high-value type", s3["sH"], "€ m"),
                                                       T("Stake at t = 1, low-value type", s3["sL"], "€ m")],
                           "tallPoeng": 3, "tekstLedd": "Which type issues?"}
SVAR["mk-signal-3:1:c"] = {"type": "tall", "tall": [T("Share price after the announcement", s3["P_ann"], "€ per share"),
                                                    T("New shares", s3["n"], "m shares")]}
SVAR["mk-signal-3:1:d"] = {"type": "blandet", "tall": [T("Share price when the loan is announced", P_lan, "€ per share")],
                           "tallPoeng": 2, "tekstLedd": "Which types invest? Why?"}
SVAR["mk-signal-3:1:e"] = {"type": "tekst"}


# ======================================================================
# Kontroller: poeng, skriveregler, tall i løsningen
# ======================================================================
def tekster(ex):
    for k in ("title", "body", "solution", "merke"):
        yield ex.get(k, "")
    yield from ex.get("criteria", [])
    for p in ex.get("parts", []):
        for k in ("body", "solution"):
            yield p.get(k, "")
        yield from p.get("criteria", [])


def ren(h):
    h = re.sub(r"<[^>]*>", " ", str(h))
    return h.replace("&minus;", "−").replace("&nbsp;", " ").replace("&lt;", "<").replace("&gt;", ">")


def tall_i(tekst):
    t = re.sub(r"&[a-z]+;", " ", ren(tekst)).replace("−", "-").replace("–", "-")
    ut = []
    for mm in re.finditer(r"-?\d{1,3}(?:[, ]\d{3})+(?:\.\d+)?|-?\d*\.\d+|-?\d+", t):
        s = re.sub(r"[, ](?=\d{3}\b)", "", mm.group(0))
        try:
            n = float(s)
        except ValueError:
            continue
        ut += [n, abs(n)]
    return ut


TYPER = {"mm-rekap": 20, "skatt-rekap": 20, "teori-kapital": 10, "signal": 20}
# ord i feltnavn som røper et svar eller en retning (svar-dataene vises før studenten svarer)
RØPER = re.compile(r"\b(gain|loss|rise|fall|higher|lower|unchanged|increase|decrease|better|worse|profit)\b", re.I)

feil = []
ord_tot = {}
assert sorted(OPPG) == sorted(f"mk-{t}-{i}" for t in TYPER for i in (1, 2, 3))
for sid, ex in OPPG.items():
    typ = sid[3:-2]
    assert ex["n"] == 1 and ex["points"] == TYPER[typ], sid
    for k in ("title", "points", "topic", "chapters", "body", "merke"):
        assert k in ex, (sid, k)
    deler = ex.get("parts", [])
    if TYPER[typ] == 20:
        assert 4 <= len(deler) <= 7, sid
        assert sum(p["points"] for p in deler) == ex["points"], sid
        assert deler[0]["label"] == "a" and deler[0]["points"] == 3, sid          # del a er lett
        assert 3 <= deler[-1]["points"] <= 5, sid                                  # verbal hale
        assert [p["label"] for p in deler] == list("abcdefg"[:len(deler)]), sid
        enheter = [(f"{sid}:1:{p['label']}", p) for p in deler]
    else:
        assert not deler and ex.get("solution") and 3 <= len(ex.get("criteria", [])) <= 7, sid
        poeng_i_tekst = [float(x) for x in re.findall(r"\((\d+(?:\.\d+)?) points", ren(ex["body"]))]
        assert poeng_i_tekst, sid
        enheter = [(f"{sid}:1:", ex)]
    ordtall = len(ren(ex["body"]).split()) + sum(len(ren(p["body"]).split()) for p in deler)
    ord_tot[sid] = ordtall
    for t in tekster(ex):
        rt = ren(t)
        if "—" in rt:
            feil.append(f"{sid} tankestrek: {rt[:80]}")
        mm = re.search(r",\s+and\b", rt)
        if mm:
            feil.append(f"{sid} komma før and: …{rt[max(0, mm.start() - 50):mm.end() + 10]}…")
        mm = re.search(r",\s+og\b", rt)
        if mm:
            feil.append(f"{sid} komma før og: …{rt[max(0, mm.start() - 50):mm.end() + 10]}…")
        if re.search(r"Kurbatov[^.!?]*\b(he|his|him|himself|she|her|hers)\b", rt):
            feil.append(f"{sid} pronomen om Kurbatov")
        if re.search(r"\b(he|his|him|she|her)\b", rt) and "lecturer" in rt:
            feil.append(f"{sid} pronomen nær «the lecturer»? {rt[:80]}")
        if re.search(r"\d-\d|\s-\d", rt):
            feil.append(f"{sid} bindestrek som minus? {rt[:60]}")
    for c in list(ex.get("criteria", [])) + [c for p in deler for c in p["criteria"]]:
        if "<" in c:
            feil.append(f"{sid} markup i criteria: {c[:60]}")
    for k, p in enheter:
        assert 3 <= len(p["criteria"]) <= 7, k
        d = SVAR.get(k)
        if d is None:
            feil.append(f"mangler svar {k}")
            continue
        if d["type"] == "tekst":
            assert "tall" not in d, k
            continue
        assert d["type"] in ("tall", "blandet"), k
        assert 1 <= len(d["tall"]) <= 5, k
        if d["type"] == "blandet":
            assert 0 < d["tallPoeng"] < p["points"], k
        kilde = " ".join([p["solution"], " ".join(p["criteria"])])
        nums = tall_i(kilde)
        for t in d["tall"]:
            if RØPER.search(t["navn"]):
                feil.append(f"{k}: feltnavnet «{t['navn']}» kan røpe svaret")
            if any(abs(a - t["verdi"]) <= 0.01 * abs(t["verdi"]) for a in t.get("alt", [])):
                feil.append(f"{k}: alt for {t['navn']} ligger innenfor toleransen av svaret")
            for i, v in enumerate([t["verdi"]] + t.get("alt", [])):
                tol = max(t.get("abs", 0), t.get("tol", 0.01) * abs(v), 1e-9)
                tall_her = nums if i == 0 else nums + tall_i(d.get("merknad", ""))
                ok = any(abs(n - v) <= tol for n in tall_her)
                if not ok and t["enhet"] == "%":
                    ok = any(abs(n * 100 - v) <= tol or abs(n - v / 100) <= tol / 100 for n in tall_her)
                if not ok:
                    feil.append(f"{k}: {t['navn']} = {v} finnes ikke i løsningen")
            assert abs(t["verdi"]) > 1e-6 or "abs" in t, k
        if any("alt" in t for t in d["tall"]):
            assert d.get("merknad"), k                      # alt må begrunnes
forventet = set()
for s, e in OPPG.items():
    forventet |= {f"{s}:1:{p['label']}" for p in e["parts"]} if e.get("parts") else {f"{s}:1:"}
assert set(SVAR) == forventet

# de tre oppgavene i en type er ulike: valuta (regneoppgaver), firma og svarvektor
for typ, p in TYPER.items():
    ider = [f"mk-{typ}-{i}" for i in (1, 2, 3)]
    if p == 20:
        vektor = [tuple(round(t["verdi"], 4) for k in sorted(SVAR) if k.startswith(s + ":")
                        for t in SVAR[k].get("tall", [])) for s in ider]
        assert len(set(vektor)) == 3, typ
        valuta = [tuple(c in OPPG[s]["body"] for c in ("€", "$", "NOK")) for s in ider]
        assert len(set(valuta)) == 3 and all(sum(v) == 1 for v in valuta), (typ, valuta)
        firma = [re.match(r"<p>([A-Z][\w-]+(?: [A-Z][\w-]+)*)", OPPG[s]["body"]) for s in ider]
        navn = [m.group(1) for m in firma if m]
        assert len(navn) == 3 and len(set(navn)) == 3, (typ, navn)

for x in feil:
    print("FEIL", x)
if feil:
    raise SystemExit("skriver ingenting: rett feilene først")

print("Ord i oppgaveteksten (Kurbatov: rundt 11 per poeng):")
for k, v in ord_tot.items():
    print(f"   {k:20} {v:4}  ({v / OPPG[k]['points']:.1f} per poeng)")
for sid, ex in OPPG.items():
    print(f"{sid}  {ex['title']} ({ex['topic']}): "
          + (" / ".join(f"{p['label']} {p['points']}" for p in ex["parts"]) if ex.get("parts") else f"{ex['points']} p uten deler"))

json.dump(OPPG, open(UT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
json.dump(SVAR, open(UT_SVAR, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("skrev", UT, "og", UT_SVAR)
