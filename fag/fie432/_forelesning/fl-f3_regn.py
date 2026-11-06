"""Regneskript for settet «F3 Investeringscaser» (fl-f3). Kjør fra prosjektroten:
python3 -I fag/fie432/_forelesning/fl-f3_regn.py
"""
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from felles import *

S = Sett("fl-f3")
t = 0.22

# ---------------------------------------------------------------- Oppgave 1: Sofie og boliglånet
innt, studie, pris, ek_s, rente = 720_000, 380_000, 4_200_000, 650_000, 0.052
maks_innt = 5 * innt - studie
maks_bel = 0.9 * pris
behov = pris - ek_s
laan = min(maks_innt, maks_bel, behov)
assert laan == maks_innt
assert min(5 * innt, maks_bel, behov) == behov
stress = rente + 0.03
r_mnd = laan * stress / 12
r_etter = r_mnd * (1 - t)
f_studie = min(5 * innt, maks_bel, behov) * stress / 12 * (1 - t)
f_5pp = laan * (rente + 0.05) / 12 * (1 - t)
f_ingen = laan * rente / 12 * (1 - t)
a1 = S.ledd("", "<p>Hva blir de månedlige rentene etter skatt i bankens stresstest på det største lånet Sofie kan få innenfor forskriften? Avrund til nærmeste krone.</p>",
    riktig=(f"Kr {kr(r_etter)}", [kr(r_etter)]),
    gale=[(f"Kr {kr(f_studie)}", [kr(f_studie)]),
          (f"Kr {kr(f_5pp)}", [kr(f_5pp)]),
          (f"Kr {kr(f_ingen)}", [kr(f_ingen)])],
    solution=sol(
        "Samlet gjeld kan ikke overstige fem ganger brutto årsinntekt, så studielånet går til fratrekk. Lånet må også holde seg under 90 % belåningsgrad. Stresstesten legger 3 prosentpoeng på renten. Rentene gir fradrag med 22 %.",
        [f"Gjeldsgrensen: 5 × {kr(innt)} − {kr(studie)} = {kr(maks_innt)}. Belåningsgraden tillater {kr(maks_bel)} og lånebehovet er {kr(behov)}. Den laveste grensen binder: {kr(laan)}.",
         f"Stresstestrenten: {pst(rente, 1)} + 3 prosentpoeng = {pst(stress, 1)}. Renter per måned: {kr(laan)} × {pst(stress, 1)} / 12 = {kr(r_mnd, 2)}.",
         f"Etter skatt: {kr(r_mnd, 2)} × 0,78 = <b>kr {kr(r_etter)}</b>."],
        [(f"Kr {kr(f_studie)}", f"studielånet glemt: grensen for samlet gjeld blir da {kr(5 * innt)}. Da binder lånebehovet ({kr(behov)}) i stedet."),
         (f"Kr {kr(f_5pp)}", "stresstest med 5 prosentpoeng, slik eldre eksamener brukte. F3 2026 sier 3 prosentpoeng."),
         (f"Kr {kr(f_ingen)}", "dagens rente uten stresstest.")],
        kontroll=f"Før skatt koster stresstestrenten {kr(r_mnd)} i måneden; staten dekker 22 % av det, {kr(r_mnd * t)}.",
        kilde="F3 lb 5 og lb 6"),
    dekker=["f3-laan-gearing-01", "f3-laan-gearing-02"])
S.oppgave("Sofie og boliglånet", "Lån", [4, 16],
    f"<p>Sofie har en brutto årsinntekt på kr {kr(innt)} og et studielån på kr {kr(studie)}. Hun vil kjøpe en leilighet til kr {kr(pris)} og har kr {kr(ek_s)} i egenkapital. Lånerenten er {pst(rente, 1)}. Bruk utlånsforskriften slik F3 gjengir den for 2026: gjeld høyst fem ganger brutto årsinntekt, belåningsgrad høyst 90 % og en renteøkning på 3 prosentpoeng i stresstesten. Alminnelig skattesats er 22 %.</p>",
    [a1])

# ---------------------------------------------------------------- Oppgave 2: brekkstangformelen
RA, RG, GE = 0.015, 0.040, 4
RE = RA + (RA - RG) * GE
f_snudd = RA + (RG - RA) * GE
f_bare = (RA - RG) * GE
f_andel = RA + (RA - RG) * GE / (GE + 1)
a2 = S.ledd("", f"<p>En investor kjøper en utleieleilighet med egenkapital og lån. Leiligheten gir en totalavkastning på {pst(RA, 1)} i året. Lånet koster {pst(RG, 1)} i året etter skatt. Gjeldsgraden (gjeld/egenkapital) er {GE}. Hva blir avkastningen på egenkapitalen?</p>",
    riktig=(pst(RE, 1), [pst(RE, 1)]),
    gale=[(pst(f_bare, 1), [pst(f_bare, 1)]),
          (pst(f_snudd, 1), [pst(f_snudd, 1)]),
          (pst(f_andel, 1), [pst(f_andel, 1)])],
    solution=sol(
        "Brekkstangformelen: R<sub>E</sub> = R<sub>A</sub> + (R<sub>A</sub> − R<sub>G</sub>) × G/E. Når totalavkastningen er lavere enn lånekostnaden, forsterker gjelden tapet for eieren.",
        [f"R<sub>A</sub> − R<sub>G</sub> = {kr(100 * RA, 1)} − {kr(100 * RG, 1)} = {kr(100 * (RA - RG), 1)} prosentpoeng.",
         f"Ganger med gjeldsgraden: {kr(100 * (RA - RG), 1)} × {GE} = {kr(100 * (RA - RG) * GE, 1)} prosentpoeng.",
         f"R<sub>E</sub> = {kr(100 * RA, 1)} + ({kr(100 * (RA - RG) * GE, 1)}) = <b>{pst(RE, 1)}</b>."],
        [(pst(f_bare, 1), "bare gearingleddet: totalavkastningen R<sub>A</sub> er ikke lagt til."),
         (pst(f_snudd, 1), "fortegnet snudd, som om gearing alltid øker avkastningen. Den forsterker begge veier."),
         (pst(f_andel, 1), "gjeldsandelen G/(G + E) = 0,8 brukt i stedet for gjeldsgraden G/E = 4.")],
        kontroll=f"Uten lån ville investoren fått {pst(RA, 1)}. Med lån taper hun {pst(-RE, 1)} av egenkapitalen fordi hver krone lån koster mer enn den tjener.",
        kilde="F3 lb 7, lb 32 og lb 33"),
    dekker=["f3-laan-gearing-03", "f3-laan-gearing-05"])
S.oppgave("Investoren og brekkstangen", "Lån", [4], "", [a2])

# ---------------------------------------------------------------- Oppgave 3: Mats leier ut første etasje
leie_m, verdi_egen, kost_m = 13_000, 15_500, 21_000
leie_aar = 12 * leie_m
f_netto = (leie_aar - kost_m) * t
f_brutto = leie_aar * t
a3 = S.ledd("a", "<p>Hva blir skatten på leieinntekten i året?</p>",
    riktig=(f"Kr 0. Utgiftene på kr {kr(kost_m)} gir ikke fradrag.", ["0", kr(kost_m)]),
    gale=[(f"Kr 0. Utgiftene på kr {kr(kost_m)} trekkes fra annen inntekt.", ["0", kr(kost_m)]),
          (f"Kr {kr(f_netto)}: leien skattlegges etter fradrag for utgiftene.", [kr(f_netto)]),
          (f"Kr {kr(f_brutto)}: etasjene er like store, så leien er skattepliktig.", [kr(f_brutto)])],
    solution=sol(
        "Leien er skattefri når eieren selv bruker minst halvparten av boligen, målt etter utleieverdi og ikke areal. Da er leien skattefri uansett beløp. Den trenger ikke rapporteres, men utgifter knyttet til utleien gir heller ikke fradrag.",
        [f"Utleieverdien av egen etasje er kr {kr(verdi_egen)} og av utleid etasje kr {kr(leie_m)} i måneden.",
         "Egen del er mer verdt i utleiemarkedet enn den utleide delen, så Mats bruker mer enn halvparten selv.",
         f"Skatten er <b>kr 0</b>. Utgiftene på kr {kr(kost_m)} gir ikke fradrag."],
        [(f"Kr 0 med fradrag", "skattefri leie og fradrag for utgifter samtidig går ikke. Skattefri utleie gir ingen fradrag."),
         (f"Kr {kr(f_netto)}", f"22 % av ({kr(leie_aar)} − {kr(kost_m)}), som for en sekundærbolig."),
         (f"Kr {kr(f_brutto)}", "areal brukt i stedet for utleieverdi. Like store etasjer avgjør ikke; det gjør utleieverdien.")],
        kilde="F3 lb 15 og notatet «Skatt ved utleie av egen bolig»"),
    dekker=["f3-utleie-01", "f3-utleie-02", "f3-utleie-03"])
a3b = S.ledd("b", "<p>Mats vurderer andre måter å bruke boligen på. Hvilken påstand er riktig?</p>",
    riktig="Har han eid boligen minst ett år og bodd der 12 av de siste 24 månedene, er gevinsten ved salg skattefri, også om botiden var avbrutt.",
    gale=["Leier han ut for mer enn 20 000 kr i året mens han er bortreist, skattlegges bare den delen av leien som overstiger 20 000 kr.",
          "Leier han ut egen etasje på korttidsutleie mens han er på reise, er 85 % av hele leien skattepliktig fordi det ikke gis noe bunnbeløp.",
          "Bygger han om til tre familieleiligheter og bor i den største selv, er leien fortsatt skattefri fordi han bruker minst halvparten selv."],
    solution=begrep(
        "Salg av egen bolig er skattefritt når eiertiden er minst ett år (regnet til budet aksepteres) og botiden minst 12 av de siste 24 månedene. Botiden kan være usammenhengende.",
        "Påstanden om eiertid og botid er riktig.",
        [("20 000 kr", "overstiger leien 20 000 kr, blir hele leien skattepliktig, ikke bare beløpet over grensen."),
         ("Korttidsutleie", "av egen bolig er de første 10 000 kr skattefrie og 85 % av resten skattepliktig. 85 % av hele leien glemmer det skattefrie beløpet."),
         ("Tre familieleiligheter", "er en flermannsbolig. Der er leien alltid skattepliktig, selv om eieren bruker halvparten selv.")],
        strategi="Påstandene med «bare», «hele» og «fortsatt skattefri» er de klassiske snuddeversjonene av reglene i notatet.",
        kilde="F3 lb 19 og notatet «Skatt ved utleie av egen bolig»"),
    dekker=["f3-utleie-06", "f3-utleie-08", "f3-utleie-09", "f3-utleie-10"])
S.oppgave("Mats og eneboligen", "Investeringscaser", [4],
    f"<p>Mats eier en enebolig med to like store etasjer. Han bor selv i andre etasje, som har en utleieverdi på kr {kr(verdi_egen)} i måneden. Første etasje leier han ut til en student på ettårskontrakt for kr {kr(leie_m)} i måneden. Utgiftene han kan knytte til den utleide etasjen, er kr {kr(kost_m)} i året. Alminnelig skattesats er 22 %.</p>",
    [a3, a3b])

# ---------------------------------------------------------------- Oppgave 4: Jonas og leiligheten
P0, leie_h = 4_800_000, 13_000 * 12
felles, kommunal, eskatt, fors, bredb = 26_400, 11_200, 7_000, 3_800, 549 * 12
kost = felles + kommunal + eskatt + fors + bredb
P3 = P0 * 1.17
d = 0.03
AF = sum(1 / (1 + d) ** i for i in (1, 2, 3))
D3 = (1 + d) ** 3

# 4a skatten med vedlikehold og påkostning
maling, parkett = 18_000, 60_000
skatt_a = (leie_h - kost - maling) * t
f_pak = (leie_h - kost - maling - parkett) * t
f_vedl = (leie_h - kost) * t
f_br = leie_h * t
a4a = S.ledd("a", f"<p>Jonas leier ut hele leiligheten. Ett av årene maler han stua for kr {kr(maling)} og bytter laminatgulvet med eikeparkett for kr {kr(parkett)}. Hva blir skatten på leieinntekten det året? Avrund til nærmeste krone.</p>",
    riktig=(f"Kr {kr(skatt_a)}", [kr(skatt_a)]),
    gale=[(f"Kr {kr(f_pak)}", [kr(f_pak)]),
          (f"Kr {kr(f_br)}", [kr(f_br)]),
          (f"Kr {kr(f_vedl)}", [kr(f_vedl)])],
    solution=sol(
        "Utleie av sekundærbolig skattlegges med 22 % av leien minus fradragsberettigede kostnader. Vedlikehold som holder standarden (maling) gir fradrag. Påkostning som hever standarden (eikeparkett) gir ikke fradrag ved utleien, men ved salg.",
        [f"Faste kostnader: {kr(felles)} + {kr(kommunal)} + {kr(eskatt)} + {kr(fors)} + {kr(bredb)} (549 × 12) = {kr(kost)}.",
         f"Fradrag i året: {kr(kost)} + {kr(maling)} = {kr(kost + maling)}. Netto: {kr(leie_h)} − {kr(kost + maling)} = {kr(leie_h - kost - maling)}.",
         f"Skatt: {kr(leie_h - kost - maling)} × 22 % = <b>kr {kr(skatt_a)}</b>."],
        [(f"Kr {kr(f_pak)}", "parketten er trukket fra. Den er en påkostning og gir ikke fradrag ved utleien."),
         (f"Kr {kr(f_br)}", "22 % av brutto leie, uten noen kostnadsfradrag."),
         (f"Kr {kr(f_vedl)}", "malingen er ikke trukket fra. Den er vedlikehold og gir fradrag.")],
        kilde="F3 lb 16, lb 17 og lb 21; notatet «Skatt ved utleie av egen bolig»"),
    dekker=["f3-utleie-04", "f3-utleie-05"])

# 4b hele, EK-finansiert
N = (leie_h - kost) * (1 - t)
gev = P3 - P0
gskatt = gev * t
NV_h = -P0 + N * AF + (P3 - gskatt) / D3
r_h = NV_h / P0
f_utengs = (-P0 + N * AF + P3 / D3) / P0
f_skattfri = (-P0 + (leie_h - kost) * AF + (P3 - gskatt) / D3) / P0
f_udisk = (-P0 + N * AF + P3 / D3 - gskatt) / P0
a4b = S.ledd("b", "<p>Jonas leier ut hele leiligheten og finansierer kjøpet med egenkapital. Se bort fra maling og parkett. Hva blir EK-rentabiliteten (nåverdi delt på egenkapital) over de tre årene?</p>",
    riktig=(pst(r_h), [pst(r_h)]),
    gale=[(pst(f_utengs), [pst(f_utengs)]),
          (pst(f_skattfri), [pst(f_skattfri)]),
          (pst(f_udisk), [pst(f_udisk)])],
    solution=sol(
        "Sekundærbolig: leien skattlegges med 22 % etter kostnader. Gevinsten ved salg skattlegges med 22 %. Alle strømmer diskonteres med 3 %.",
        [f"Netto leie etter skatt: ({kr(leie_h)} − {kr(kost)}) × 0,78 = {kr(N, 2)}. Annuitetsfaktor 3 % i tre år: {kr(AF, 4)}. Nåverdi: {kr(N * AF)}.",
         f"Salg: gevinst {kr(P3)} − {kr(P0)} = {kr(gev)}, skatt {kr(gskatt)}. Nåverdi ({kr(P3)} − {kr(gskatt)}) / {kr(D3, 6)} = {kr((P3 - gskatt) / D3)}.",
         f"NV = −{kr(P0)} + {kr(N * AF)} + {kr((P3 - gskatt) / D3)} = {kr(NV_h)}; {kr(NV_h)} / {kr(P0)} = <b>{pst(r_h)}</b>."],
        [(pst(f_utengs), "gevinstskatten er glemt. Sekundærbolig gir skatt på salgsgevinsten."),
         (pst(f_skattfri), "leien er ikke skattlagt, som om det var skattefri utleie av egen bolig."),
         (pst(f_udisk), "gevinstskatten er trukket fra udiskontert, selv om den betales i år 3.")],
        kontroll="Forelesningens case (6,1 mill., 18 % prisstigning) ga 8,3 % med samme oppsett.",
        kilde="F3 lb 18, lb 20, lb 21 og lb 22"),
    dekker=["f3-eiendomscase-02", "f3-utleie-07"])

# 4c ett rom, gearing
EK, L, rl = 800_000, 4_000_000, 0.045
leie_r = leie_h / 2
renter_e = L * rl * (1 - t)
strom = leie_r - renter_e
NV_g = -EK + strom * AF + (P3 - L) / D3
r_g = NV_g / EK
f_gs = (NV_g - gskatt / D3) / EK
strom_f = leie_r - L * rl
f_rf = (-EK + strom_f * AF + (P3 - L) / D3) / EK
AFl = sum(1 / (1 + rl) ** i for i in (1, 2, 3))
Dl = (1 + rl) ** 3
f_dl = (-EK + strom * AFl + (P3 - L) / Dl) / EK
a4c = S.ledd("c", f"<p>Jonas bor i stedet selv i leiligheten alle tre årene og leier ut det ene soverommet for halve leien. Han finansierer kjøpet med kr {kr(EK)} i egenkapital og et avdragsfritt lån på kr {kr(L)} til {pst(rl, 1)} rente, som innfris ved salget. Hva blir EK-rentabiliteten?</p>",
    riktig=(pst(r_g), [pst(r_g)]),
    gale=[(pst(f_gs), [pst(f_gs)]),
          (pst(f_rf), [pst(f_rf)]),
          (pst(f_dl), [pst(f_dl)])],
    solution=sol(
        "Bor Jonas selv og leier ut ett rom, er leien skattefri (han bruker mer enn halvparten) og salget skattefritt (eiertid og botid er oppfylt). Rentene gir fradrag med 22 %. Lånet betales tilbake i år 3. Diskonteringsrenten er fortsatt 3 %.",
        [f"Årlig strøm: leie {kr(leie_r)} − renter etter skatt {kr(L)} × {pst(rl, 1)} × 0,78 = {kr(leie_r)} − {kr(renter_e)} = {kr(strom)}.",
         f"NV = −{kr(EK)} + ({kr(strom)}) × {kr(AF, 4)} + ({kr(P3)} − {kr(L)}) / {kr(D3, 6)} = −{kr(EK)} − {kr(-strom * AF)} + {kr((P3 - L) / D3)} = {kr(NV_g)}.",
         f"EK-rentabilitet: {kr(NV_g)} / {kr(EK)} = <b>{pst(r_g)}</b>."],
        [(pst(f_gs), "gevinsten er skattlagt som for en sekundærbolig. Primærboligen selges skattefritt."),
         (pst(f_rf), "rentene er trukket fra uten skattefradrag."),
         (pst(f_dl), "diskontert med lånerenten 4,5 % i stedet for 3 %.")],
        kontroll=f"Brekkstangen: leiligheten stiger 17 % på tre år og leien er skattefri, mens lånet koster bare {pst(rl * (1 - t))} i året etter skatt. Derfor er gearet avkastning langt over EK-finansiert.",
        kilde="F3 lb 18, lb 19, lb 24, lb 27 og lb 28"),
    dekker=["f3-eiendomscase-03", "f3-eiendomscase-04"])

# 4d break-even salgspris
S_be = L + D3 * (EK - strom * AF)
f_be_ustrom = L + D3 * EK
f_be_rf = L + D3 * (EK - strom_f * AF)
f_be_dl = L + Dl * (EK - strom * AFl)
a4d = S.ledd("d", "<p>Med gearingen i c): hvilken salgspris etter tre år gir nåverdi lik null? Avrund til nærmeste krone.</p>",
    riktig=(f"Kr {kr(S_be)}", [kr(S_be)]),
    gale=[(f"Kr {kr(f_be_ustrom)}", [kr(f_be_ustrom)]),
          (f"Kr {kr(f_be_rf)}", [kr(f_be_rf)]),
          (f"Kr {kr(f_be_dl)}", [kr(f_be_dl)])],
    solution=sol(
        "Sett NV = 0 og løs for salgsprisen S: 0 = −EK + strøm × annuitetsfaktor + (S − lån)/1,03³. Da er S = lån + 1,03³ × (EK − strøm × annuitetsfaktor).",
        [f"Nåverdien av de negative strømmene: {kr(-strom)} × {kr(AF, 4)} = {kr(-strom * AF)}.",
         f"Det som må dekkes i nåverdi: {kr(EK)} + {kr(-strom * AF)} = {kr(EK - strom * AF)}. Fram til år 3: × {kr(D3, 6)} = {kr(D3 * (EK - strom * AF))}.",
         f"S = {kr(L)} + {kr(D3 * (EK - strom * AF))} = <b>kr {kr(S_be)}</b>, en prisstigning på {pst(S_be / P0 - 1, 1)}."],
        [(f"Kr {kr(f_be_ustrom)}", "de negative årlige strømmene (leie minus renter) er glemt."),
         (f"Kr {kr(f_be_rf)}", "rentene er regnet uten skattefradrag."),
         (f"Kr {kr(f_be_dl)}", "diskontert med lånerenten 4,5 % i stedet for 3 %.")],
        kontroll=f"Setter vi S = {kr(S_be)} inn i c), blir NV = −{kr(EK)} − {kr(-strom * AF)} + {kr((S_be - L) / D3)} = 0.",
        kilde="F3 lb 34 og lb 35"),
    dekker=["f3-eiendomscase-05"])

# 4e diskonteringsrenten (påstand)
a4e = S.ledd("e", "<p>Hvilken påstand om forutsetningene i forelesningens eiendomscase er riktig?</p>",
    riktig="Renten var eiendomsfondenes 4,35 % etter skatt, om lag 3 %. For skattefrie strømmer burde renten før skatt vært brukt. Da faller avkastningen.",
    gale=["Forelesningen brukte 3 %, avkastningen i noterte eiendomsfond siste år. Fordi strømmene ved ett rom er skattefrie, burde en enda lavere rente vært brukt.",
          "Tar man med at den som leier ut hele leiligheten må bo et annet sted, blir det å leie ut hele mer lønnsomt enn å leie ut ett rom.",
          "Figuren med boligpriser mot NIBOR viser at renteøkninger ikke påvirker boligprisene, så salgsprisen kan holdes fast selv om renten stiger."],
    solution=begrep(
        "Diskonteringsrenten var uvektet avkastning i eiendomsfond siste ti år, 4,35 %, ganget med 0,78 ≈ 3 %. Appendikset retter feilen: skattefrie strømmer skal diskonteres med renten før skatt (om lag 4,4 %). Da faller avkastningen for ett rom, EK-finansiert, fra 12 % til om lag 7,6 %.",
        "Påstanden om 4,35 % etter skatt og renten før skatt er riktig.",
        [("Noterte eiendomsfond siste år", "falt om lag 16–17 %. Renten bygger på tiårssnittet i eiendomsfond. Riktig rente for skattefrie strømmer er høyere, ikke lavere."),
         ("Alternativkostnaden", "trekker motsatt vei: med 87 000 i boutgift faller avkastningen for hele leiligheten til om lag 4,3 %."),
         ("NIBOR-figuren", "antyder lav sammenheng, men forelesningen spør «Tror vi på det?» og peker på nedside i boligprisene når renten stiger.")],
        kilde="F3 lb 11, lb 12, lb 14, lb 35 og lb 61–66"),
    dekker=["f3-eiendomscase-06", "f3-eiendomscase-01", "f3-eiendomscase-07", "f3-eiendomscase-10"])
S.oppgave("Jonas og leiligheten på Møhlenpris", "Investeringscaser", [4],
    f"<p>Jonas kjøper en leilighet med to like store soverom for kr {kr(P0)} inkludert omkostninger. Hele leiligheten kan leies ut for kr 13 000 i måneden. Årlige kostnader: fellesutgifter kr {kr(felles)}, kommunale avgifter kr {kr(kommunal)}, eiendomsskatt kr {kr(eskatt)}, forsikring kr {kr(fors)} og bredbånd kr 549 i måneden. Leietaker betaler strøm. Jonas regner med å selge etter tre år for kr {kr(P3)} (17 % prisstigning). Diskonteringsrenten er 3 % etter skatt, alminnelig skattesats er 22 % og alle strømmer kommer ved slutten av året. Se bort fra formuesskatt.</p>",
    [a4a, a4b, a4c, a4d, a4e])

# ---------------------------------------------------------------- Oppgave 5: strategiene (påstand)
a5 = S.ledd("", "<p>Hvilken påstand om forelesningens eiendomscase er riktig?</p>",
    riktig="Gearing ga langt høyere EK-avkastning fordi leiligheten ga mer enn lånekostnaden etter skatt på 2,73 %.",
    gale=["Dokumentavgiften på 2,5 % av kjøpesummen trekkes fra i gevinsten når en sekundærbolig selges med skattepliktig gevinst.",
          "Gearing med utleie av hele leiligheten ga høyere avkastning på egenkapitalen enn gearing med ett rom, fordi leien er dobbelt så høy.",
          "Senkes alminnelig skattesats fra 22 % til 20 %, taper alle låntakere på det, fordi rentefradraget blir mindre verdt."],
    solution=begrep(
        "Leiligheten steg 18 % på tre år og leien for ett rom var skattefri, mens lånet kostet 3,5 % × 0,78 = 2,73 % etter skatt. Brekkstangen ga om lag 70 % mot 12 % uten lån.",
        "Påstanden om avkastning over lånekostnaden er riktig.",
        [("Dokumentavgiften", "gir ikke fradrag. Meglerutgiftene gir fradrag mot salgsgevinsten; forelesningen lar de to utligne hverandre."),
         ("Hele leiligheten gearet", "ga om lag 50 % i regnearket, mot om lag 70 % for ett rom. Skattereglene, ikke leienivået, avgjør."),
         ("Lavere skattesats", "senker også skatten på lønnen. Hvilken effekt som dominerer, avhenger av gjeldens størrelse og renten.")],
        kilde="F3 lb 6, lb 23, lb 27, lb 31 og regnearket «Investeringscase gjeld»"),
    dekker=["f3-laan-gearing-04", "f3-utleie-11", "f3-eiendomscase-08", "f3-laan-gearing-06"])
S.oppgave("Konklusjonene fra eiendomscaset", "Investeringscaser", [4], "", [a5])

# ---------------------------------------------------------------- Oppgave 6: crowdlending og gråmarkedet
K, rr, p = 400_000, 0.18, 0.90
R = K * rr
E_med = (p * R * (1 - t) - (1 - p) * K * (1 - t)) / K
E_uten = (p * R * (1 - t) - (1 - p) * K) / K
E_ms = (p * R - (1 - p) * K * (1 - t)) / K
E_us = (p * R - (1 - p) * K) / K


def par(a, b):
    return (f"Crowdlending {pst(a)} · gråmarkedslånet {pst(b)}", [pst(a), pst(b)])


a6a = S.ledd("a", "<p>Hva er forventet avkastning etter skatt på de to lånene?</p>",
    riktig=par(E_med, E_uten),
    gale=[par(E_uten, E_med), par(E_med, E_med), par(E_ms, E_us)],
    solution=sol(
        "Renteinntekten skattlegges med 22 % i begge tilfeller. Tap på crowdlending gir fradrag, så tapet etter skatt er K(1 − t). Tap på private lån i gråmarkedet gir ikke fradrag, så hele K tapes. E(r) = (pR(1 − t) − (1 − p) × tap)/K.",
        [f"Forventet rente etter skatt: 0,9 × {kr(R)} × 0,78 = {kr(p * R * (1 - t))}.",
         f"Crowdlending: forventet tap 0,1 × {kr(K)} × 0,78 = {kr((1 - p) * K * (1 - t))}; ({kr(p * R * (1 - t))} − {kr((1 - p) * K * (1 - t))}) / {kr(K)} = {pst(E_med)}.",
         f"Gråmarkedet: forventet tap 0,1 × {kr(K)} = {kr((1 - p) * K)}; ({kr(p * R * (1 - t))} − {kr((1 - p) * K)}) / {kr(K)} = {pst(E_uten)}. Svaret er <b>{pst(E_med)} og {pst(E_uten)}</b>."],
        [("Tallene byttet om", "fradragsreglene er snudd: det er crowdlending som gir tapsfradrag."),
         (f"Begge {pst(E_med)}", "tapsfradrag også i gråmarkedet. Tap på lån fra private kan ikke trekkes fra, mens gevinst skattlegges."),
         (f"{pst(E_ms)} og {pst(E_us)}", "skatten på renteinntekten er glemt.")],
        kontroll=f"Forskjellen er (1 − p) × t = 0,1 × 0,22 = 2,2 prosentpoeng, statens andel av det forventede tapet.",
        kilde="F3 lb 37, lb 45 og lb 49–51"),
    dekker=["f3-crowd-graa-01", "f3-crowd-graa-03", "f3-crowd-graa-04", "f3-crowd-graa-05"])

p2 = 0.70
R_be = (1 - p2) / (p2 * (1 - t))
f_uts = (1 - p2) / p2
f_1p = 1 - p2
f_up = (1 - p2) / (1 - t)
a6b = S.ledd("b", f"<p>Ingrid får tilbud om et nytt lån i gråmarkedet, med {pst(p2, 0)} sannsynlighet for at låntakeren betaler. Hvilken rente gir null forventet avkastning etter skatt?</p>",
    riktig=(pst(R_be), [pst(R_be)]),
    gale=[(pst(f_uts), [pst(f_uts)]),
          (pst(f_1p), [pst(f_1p)]),
          (pst(f_up), [pst(f_up)])],
    solution=sol(
        "Uten tapsfradrag er forventet avkastning null når pR(1 − t) = (1 − p)K, altså R/K = (1 − p)/(p(1 − t)).",
        [f"Teller: 1 − {kr(p2, 2)} = {kr(1 - p2, 2)}.",
         f"Nevner: {kr(p2, 2)} × 0,78 = {kr(p2 * (1 - t), 3)}.",
         f"Renten: {kr(1 - p2, 2)} / {kr(p2 * (1 - t), 3)} = <b>{pst(R_be)}</b>."],
        [(pst(f_uts), "skatten på renten er glemt i nevneren. Det er også break-even med fullt tapsfradrag, der skatten faller bort på begge sider."),
         (pst(f_1p), "bare tapssannsynligheten. Renten må dekke tapet i de 30 % av tilfellene og bare mottas i 70 %."),
         (pst(f_up), "sannsynligheten for suksess er glemt i nevneren.")],
        kontroll=f"Med R = {pst(R_be)}: 0,7 × {kr(R_be, 4)} × 0,78 = {kr(p2 * R_be * (1 - t), 2)} = 0,30. Forventet avkastning er null.",
        kilde="F3 lb 52"),
    dekker=["f3-crowd-graa-06"])

a6c = S.ledd("c", "<p>Hvilken påstand om folkefinansiering og gråmarkedslån er riktig?</p>",
    riktig="Plattformen lever av gebyrer og bærer ikke tapet av hovedstolen, så den har svake insentiver til riktig risikovurdering.",
    gale=["Plattformen bærer en del av tapet når et lån misligholdes, så den har sterke insentiver til å vurdere låntakernes risiko riktig.",
          "Belønningsbasert folkefinansiering via Spleis eller Kickstarter gir fradrag for tapet hvis prosjektet mislykkes, som crowdlending.",
          "En avtalt rente på 46 % i gråmarkedet betyr høy forventet avkastning, fordi renten er langt over det man får i et indeksfond."],
    solution=begrep(
        "Plattformen lever av gebyrer fra låntaker og långiver. Den taper ikke hovedstolen og långiveren kjenner ikke låntakernes kreditthistorikk. Lysbildene viser økende mislighold og konsentrasjon av lån.",
        "Påstanden om svake insentiver er riktig.",
        [("Sterke insentiver", "er det motsatte av poenget: plattformen bærer ikke tapet."),
         ("Belønningsbasert", "gir ikke fradrag for tap. Det gjør slike investeringer svært dyre."),
         ("46 % rente", "sier lite om forventet avkastning når tapssannsynligheten er høy og tap ikke gir fradrag. Friele lånte til 46 %; långiveren tapte.")],
        kilde="F3 lb 39, lb 42, lb 47 og lb 48"),
    dekker=["f3-crowd-graa-02", "f3-crowd-graa-07", "f3-crowd-graa-08"])
S.oppgave("Ingrid låner ut penger", "Investeringscaser", [4],
    f"<p>Ingrid har kr {kr(K)} og vurderer to ettårige lån med samme vilkår: et lån via crowdlending-plattformen Kameo og et privat lån i gråmarkedet. Begge har {pst(rr, 0)} rente. Sannsynligheten for at låntakeren betaler renter og hovedstol er {pst(p, 0)}; ellers tapes hele beløpet. Ingrid er risikonøytral og skattesatsen på renteinntekter er 22 %.</p>",
    [a6a, a6b, a6c])

# ---------------------------------------------------------------- Oppgave 7: aksjer, ASK og obligasjoner
a7a = S.ledd("a", "<p>Hvilken påstand stemmer med forelesningen?</p>",
    riktig="Teorien anbefaler indeksfond, men Forbrukerrådet fant at aktive norske aksjefond slo referanseindeksen med 0,86 % i året over 20 år.",
    gale=["Aktive fond har lavere risiko enn indeksfond, fordi indeksen domineres av noen få store aksjer som NVIDIA og aktive fond sprer seg mer.",
          "Var man ute av Oslo Børs de 20 beste dagene siden 2010, ga det omtrent samme årlige avkastning som å være investert hele tiden.",
          "Listen over hvorfor vi investerer feil, nevner tapsaversjon og mental bokføring som de viktigste grunnene til for lite spredning."],
    solution=begrep(
        "Merton (1969) og Tobin (1958) tilsier passiv investering i markedsporteføljen. Forbrukerrådet fant at aktive globale fond ga om lag 1,1 prosentpoeng lavere årlig avkastning enn indeksfond, men at aktive norske fond slo indeksen.",
        "Påstanden om indeksfond og norske aktive fond er riktig.",
        [("Lavere risiko i aktive fond", "er det forvalterne antyder. Forelesningen sier at aktive fond har større risiko (færre aksjer) og høyere honorar."),
         ("De 20 beste dagene", "ga 9,6 % mot 3,8 % i året. Å gå inn og ut av markedet er dyrt."),
         ("Tapsaversjon", "står ikke på listen. Den nevner overdreven tiltro, manglende forståelse av diversifisering, influensere, pågående meglere og preferanser for gambling.")],
        kilde="F3 lb 54–57"),
    dekker=["f3-aksjer-obl-01", "f3-aksjer-obl-02", "f3-aksjer-obl-04", "f3-aksjer-obl-05"])
a7b = S.ledd("b", "<p>Hvilken påstand om alternativene til enkeltaksjer er riktig?</p>",
    riktig="På aksjesparekonto kan du ta ut det du har satt inn uten skatt. Ubenyttet skjerming fremføres på kontonivå og ikke per aksje.",
    gale=["High yield-obligasjoner med 10–20 % rente ga om lag den avkastningen i snitt; en NHH-masteroppgave fant om lag 12 % i året for 2005–2011.",
          "Når obligasjonene i et selskap som DOF Subsea konverteres til aksjer, beholder obligasjonseierne kravet på hovedstolen ved siden av aksjene.",
          "Eiendomsfond er et trygt alternativ: både noterte og unoterte eiendomsfond har gitt positiv avkastning hvert år de siste fem årene."],
    solution=begrep(
        "ASK: kjøp og salg inne på kontoen er skattefritt, skatten kommer først når gevinsten tas ut (skattekreditt), innskutt beløp tas ut skattefritt og ubenyttet skjerming akkumuleres på kontonivå.",
        "Påstanden om ASK er riktig.",
        [("High yield", "har høy kupongrente fordi risikoen er høy. Masteroppgaven fant bare 0,51 % annualisert avkastning. Renten skattlegges med 22 %."),
         ("Konvertering", "betyr at obligasjonseierne mister hovedstol og renteinntekter. De kan bare håpe på kursstigning og utbytte."),
         ("Eiendomsfond", "noterte fond falt om lag 16–17 % siste år og har negativ avkastning per år over fem år.")],
        kilde="F3 lb 11, lb 58, lb 59 og lb 60"),
    dekker=["f3-aksjer-obl-03", "f3-aksjer-obl-06", "f3-aksjer-obl-07", "f3-eiendomscase-09"])
S.oppgave("Aksjer, aksjesparekonto og obligasjoner", "Indeksfond og aktiv forvaltning", [4, 14], "<p>Forelesningen avslutter med investeringer i aksjer, aksjefond og obligasjoner.</p>", [a7a, a7b])

S.skriv(label="F3 Investeringscaser",
        note="Lån og gearing, skatt ved utleie og salg av bolig, eiendomscaset med nåverdi og sensitivitet, crowdlending og gråmarkedslån, aksjer, ASK og high yield-obligasjoner.",
        facts=[f"{S.n} flervalg · fire alternativer · 3 poeng for rett, −1 for feil",
               "Satser og regler står i oppgaveteksten, slik de blir oppgitt på eksamen.",
               "Sammen med de andre settene i fanen dekker settet hvert punkt i sjekklisten.",
               "Laget fra forelesningsnotatene 2026. Kurset har ikke kontrollert løsningene."],
        practiceNote="Skriv opp kontantstrømmene år for år før du regner nåverdi: leie etter skatt, renter etter skatt, salgsinntekt, gevinstskatt og tilbakebetaling av lån. Nesten alle gale alternativer i eiendomscaset er én av disse glemt.")
