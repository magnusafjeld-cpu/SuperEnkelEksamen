# -*- coding: utf-8 -*-
"""Eksamenstrening, tema «formue»: formuesskatt, verdsetting og forholdsmessig
   gjeldsfordeling (k7, boligreglene i k4), kjernepensum kj3.

   Regnerutine R4 i eksamens-DNA-en: frm-gjeld1 (gjeldsreduksjonen),
   frm-gjeld2 (nettoformuen) og frm-hele1 (hele kjeden til skatten).
   Satsene er 2026-reglene: bunnfradrag kr 1 900 000 og innslagspunkt
   kr 21 500 000 for enslige, doblet for ektefeller, primærbolig 25 % opp til
   kr 14 000 000 og 70 % over, aksjer og næringseiendom 80 %.
"""
import re
from trening_lib import *  # noqa: F401,F403

TEMA = "formue"
B1, K1 = 1_900_000, 21_500_000          # enslig
B2, K2 = 3_800_000, 43_000_000          # ektefeller under ett
T_BOLIG = 14_000_000                    # primærboligens terskel 2026

NAVN = ["Mira", "Jonas", "Selma", "Aksel", "Ingrid", "Tobias", "Nora", "Elias", "Live", "Henrik",
        "Sigrid", "Eirik", "Hedda", "Sander", "Astrid", "Kasper", "Thea", "Vegard"]


# ---------------------------------------------------------------- lokale hjelpere
def nb(s):
    """Hardt mellomrom i tallgrupper, etter «kr» og foran «%» i håndskrevet tekst."""
    s = re.sub(r"(\d) (?=\d{3}(?!\d))", "\\1" + NBSP, s)
    s = re.sub(r"(\d) (?=\d{3}(?!\d))", "\\1" + NBSP, s)
    s = re.sub(r"\bkr (?=[\d−])", "kr" + NBSP, s)
    s = re.sub(r"(\d) %", "\\1" + NBSP + "%", s)
    return s


def _fiks(alt):
    for a in alt:
        a.tekst = nb(a.tekst)
        if a.felle:
            a.felle = nb(a.felle)
    return alt


def sp(q, alt, kort, full, rekkefolge=None, hjelp=None):
    return sporsmal(nb(q), _fiks(alt), nb(kort), nb(full), rekkefolge, hjelp=nb(hjelp) if hjelp else None)


def st(id_, typ, q, alt, kort, full, rekkefolge=None):
    statisk(id_, tema=TEMA, type=typ, q=nb(q), alternativer=_fiks(alt), kort=nb(kort), full=nb(full),
            rekkefolge=rekkefolge, hjelp=nb(HJELP[id_]))


def fskatt(W, B=B1, K=K1):
    """Formuesskatt 2026: 1,0 % mellom B og K, 1,1 % over K."""
    return 0.01 * max(0, min(W, K) - B) + 0.011 * max(0, W - K)


def fv_bolig(M, T=T_BOLIG):
    return 0.25 * min(M, T) + 0.70 * max(0, M - T)


_RUNDE = {}


def tur(nøkkel, valg):
    """Går syklisk gjennom valgene for en familie, så variantene fordeler seg jevnt.
       Telleren øker bare når en variant faktisk returneres (se ferdig())."""
    return valg[_RUNDE.get(nøkkel, 0) % len(valg)]


def ferdig(nøkkel, sp_):
    _RUNDE[nøkkel] = _RUNDE.get(nøkkel, 0) + 1
    return sp_


def velg(r, riktig, kand, n=3, rel=0.02):
    """Trekker n feller blant kandidatene (verdi, felletekst) og sjekker at alle er ulike."""
    kand = [k for k in kand if not nær(k[0], riktig, rel)]
    unike = []                      # to feller med nesten samme tall: behold den første
    for k in kand:
        if not any(nær(k[0], u[0], rel) for u in unike):
            unike.append(k)
    if len(unike) < n:
        raise Avvis("for få feller")
    valgt = r.sample(unike, n)
    ulike(riktig, *[v for v, _ in valgt], rel=rel)
    return valgt



# ---------------------------------------------------------------------------
# Hjelpen bak «Hjelp»-knappen: fremgangsmåten uten tallene i spørsmålet (spek § 2b)
# ---------------------------------------------------------------------------
HJ_FAM = {'frm-skatt1': '<p><b>Steg 1: finn nettoformuen.</b> Formuesverdier etter rabatt minus fradragsberettiget gjeld. '
               'Står den oppgitt, bruker du den direkte.</p><p><b>Steg 2: trinn 1.</b> 1,0 % av det som ligger '
               'mellom bunnfradraget og innslagspunktet, eller mellom bunnfradraget og nettoformuen om den er '
               'lavest.</p><p><b>Steg 3: trinn 2.</b> 1,1 % av det som ligger over innslagspunktet, hvis noe gjør '
               'det.</p><p><b>Pass på:</b> bruk grensene for en enslig, ikke for ektefeller. Bunnfradraget trekkes '
               'bare fra én gang.</p>',
 'frm-skatt2': '<p><b>Steg 1: legg sammen</b> ektefellenes nettoformuer.</p><p><b>Steg 2: doble grensene.</b> For '
               'ektefeller under ett dobles både bunnfradraget og innslagspunktet for en enslig.</p><p><b>Steg 3: '
               'regn trinnene på samlet formue.</b> 1,0 % mellom det doble bunnfradraget og det doble '
               'innslagspunktet, 1,1 % over.</p><p><b>Pass på:</b> det er lett å doble bunnfradraget og glemme '
               'innslagspunktet. Regn heller ikke med grensene for en enslig på parets samlede formue.</p>',
 'frm-gjeld1': '<p><b>Steg 1: fordelingsnøkkelen.</b> Del hver eiendels bruttoverdi, altså markedsverdien før '
               'rabatt, på summen av bruttoverdiene.</p><p><b>Steg 2: gjelden til de rabatterte eiendelene.</b> Gang '
               'gjelden med andelen til aksjer, aksjefond og næringseiendom.</p><p><b>Steg 3: reduksjonen.</b> 20 % '
               'av gjelden fra steg 2. Samleformelen: gjeld × Σ(bruttoverdi × 20 %), summert bare over eiendelene med 20 % rabatt, delt på sum av '
               'bruttoverdiene.</p><p><b>Pass på:</b> boliggjelden avkortes ikke. Bank og sekundærbolig har ingen '
               'rabatt. Nøkkelen er bruttoverdiene, ikke formuesverdiene.</p>',
 'frm-gjeld2': '<p><b>Steg 1: formuesverdiene.</b> Primærbolig 25 % (70 % over terskelen), aksjer og fond 80 %, bank '
               'og sekundærbolig 100 %. Summer.</p><p><b>Steg 2: fradragsberettiget gjeld.</b> Fordel gjelden etter '
               'bruttoverdi. Avkort med 20 % den delen som havner på aksjer, fond og næringseiendom.</p><p><b>Steg '
               '3: nettoformuen.</b> Formuesverdiene minus fradragsberettiget gjeld.</p><p><b>Pass på:</b> en '
               'negativ boligkolonne skal motregnes, ikke settes til null. Bunnfradraget trekkes ikke fra her.</p>',
 'frm-hele1': '<p><b>Steg 1: formuesverdiene.</b> Primærbolig 25 % opp til terskelen og 70 % over, aksjer, fond og '
              'næringseiendom 80 %, bank og sekundærbolig 100 %.</p><p><b>Steg 2: fradragsberettiget gjeld.</b> '
              'Fordel gjelden etter bruttoverdi og avkort med 20 % delen på eiendeler med 20 % rabatt.</p><p><b>Steg '
              '3: nettoformuen</b> er formuesverdiene minus fradragsberettiget gjeld.</p><p><b>Steg 4: skatten.</b> '
              '1,0 % av det som ligger over bunnfradraget, 1,1 % over innslagspunktet.</p><p><b>Pass på:</b> '
              'boliggjelden avkortes ikke. Skatten regnes aldri av markedsverdiene.</p>'}

HJ_VAR = {'frm-bolig1': {'fv': '<p><b>Steg 1: del boligen ved terskelen.</b> Det nederste sjiktet er verdien opp til '
                      'terskelen, det øverste er resten.</p><p><b>Steg 2: verdsett hvert sjikt.</b> 25 % av det '
                      'nederste, 70 % av det øverste.</p><p><b>Steg 3: legg sammen.</b></p><p><b>Pass på:</b> ikke '
                      'bruk én sats på hele boligen. Bruk terskelen oppgaven gir, ikke den som gjaldt i 2024 og '
                      '2025.</p>',
                'skatt': '<p><b>Steg 1: boligens formuesverdi.</b> 25 % av verdien opp til terskelen og 70 % av det '
                         'som ligger over.</p><p><b>Steg 2: nettoformuen.</b> Legg til bankinnskuddet, som teller '
                         'fullt.</p><p><b>Steg 3: skatten.</b> Trekk fra bunnfradraget og gang med 1,0 %. Bruk 1,1 % '
                         'bare på det som eventuelt ligger over innslagspunktet.</p><p><b>Pass på:</b> skatten '
                         'regnes av formuesverdien, ikke av markedsverdien.</p>',
                'to': '<p><b>Steg 1: primærboligen.</b> 25 % av verdien opp til terskelen og 70 % av det som ligger '
                      'over.</p><p><b>Steg 2: sekundærboligen.</b> Den har ingen rabatt og teller '
                      'fullt.</p><p><b>Steg 3: legg sammen.</b></p><p><b>Pass på:</b> bare boligen du selv bor i, '
                      'har rabatt. Boligene skal ikke slås sammen og behandles som én primærbolig.</p>'},
 'frm-unot1': {'fv': '<p><b>Steg 1: selskapets formuesverdi.</b> Eiendelene minus gjelden i selskapet.</p><p><b>Steg '
                     '2: din andel.</b> Gang med eierandelen.</p><p><b>Steg 3: rabatten.</b> Unoterte aksjer teller '
                     '80 %.</p><p><b>Pass på:</b> emisjonsprisen er en markedspris og brukes ikke. Glem heller ikke '
                     'selskapets gjeld.</p>',
               'skatt': '<p><b>Steg 1: aksjenes formuesverdi.</b> Selskapets eiendeler minus gjeld, ganget med '
                        'eierandelen og med 80 %.</p><p><b>Steg 2: nettoformuen.</b> Legg til '
                        'bankinnskuddet.</p><p><b>Steg 3: skatten.</b> Trekk fra bunnfradraget og gang med 1,0 % '
                        '(1,1 % over innslagspunktet).</p><p><b>Pass på:</b> emisjonsprisen er en markedspris og '
                        'brukes ikke.</p>'}}

HJELP = {'frm-s01': '<p>Tenk på aksjer kjøpt fullt ut for lånte penger. Aksjene teller med rabatt i formuen.</p><p><b>Steg 1:</b> hva ville nettoformuen blitt hvis gjelden ble trukket fra fullt?</p><p><b>Steg 2:</b> svarer det til et reelt tap av formue?</p><p><b>Steg 3:</b> hva må gjøres med gjelden for at gjeld og eiendel måles med samme målestokk? Test hver begrunnelse mot dette regnestykket.</p>',
 'frm-s02': '<p>Regelen: gjeld fordeles på eiendelene etter bruttoverdi. Gjeld på eiendeler med rabatt avkortes. Primærboligen har rabatt, men gjelden dit avkortes ikke. Spør: hva ville skjedd med verdien av boligrabatten for eieren om boliggjelden ble avkortet like mye som rabatten? Hvem tjener på unntaket? Vurder hvert alternativ: er påstanden sann om boligen og om gjeldsfordelingen?</p>',
 'frm-s03': '<p><b>Husk tabellens rekkefølge:</b> bruttoverdi og andel, formuesverdi, gjeld fordelt, avkorting, '
            'netto.</p><p><b>Spør:</b> i hvilken rad brukes rabatten? Er det før eller etter at gjelden er '
            'fordelt?</p><p><b>Stryk</b> kostprisen, som hører til skjermingen og alternativer som fordeler etter '
            'hva lånet ble brukt til.</p>',
 'frm-s04': '<p><b>Vurder hver påstand for seg.</b> Har eiendelen en verdsettingsrabatt som utløser avkorting av '
            'gjelden?</p><p><b>Regelen:</b> aksjer, aksjefond og næringseiendom har 20 % rabatt og avkorting. Bank '
            'og sekundærbolig teller fullt, uten rabatt. Ingen rabatt betyr ingen avkorting.</p><p><b>Velg</b> så '
            'kombinasjonen som passer.</p>',
 'frm-s05': '<p><b>Vurder hver påstand for seg.</b> Har eiendelen rabatt og utløser rabatten avkorting av '
            'gjelden?</p><p><b>Regelen:</b> aksjer og aksjefond har 20 % rabatt med avkorting. Primærboligen har '
            'rabatt, men er et bevisst unntak fra avkortingen.</p><p><b>Velg</b> så kombinasjonen som passer.</p>',
 'frm-s06': '<p>Formuesskatten har en kommunal og en statlig del.</p><p><b>Steg 1:</b> finn den samlede satsen i trinn 1 før og etter endringen.</p><p><b>Steg 2:</b> spør om den kommunale satsen er valgfri for hver kommune eller lik i hele landet.</p><p><b>Steg 3:</b> avgjør om endringen påvirker hva den enkelte betaler, eller bare hvem som mottar pengene.</p>',
 'frm-s07': '<p><b>Start med grensene for en enslig i dag.</b> For ektefeller som skattlegges under ett, dobles både '
            'bunnfradraget og innslagspunktet. Begge regnes på parets samlede nettoformue.</p><p><b>Pass på:</b> to '
            'vanlige feil er å doble bare den ene grensen og å bruke et eldre års grenser.</p>',
 'frm-s08': '<p>Primærboligen verdsettes i to sjikt med ulik prosent.</p><p><b>Steg 1:</b> hvilket sjikt får lavest prosent, det nederste eller det øverste? Tenk på formålet: å skjerme vanlige boliger.</p><p><b>Steg 2:</b> finn terskelen mellom sjiktene etter dagens regel og pass på at du ikke bruker et eldre års regel.</p><p><b>Steg 3:</b> test hvert alternativ på både rekkefølgen av sjiktene og terskelen.</p>',
 'frm-s09': '<p><b>Sammenlign to tall</b> for boligen: hvor mye den teller i formuesskatten og hvor mye gjeld som '
            'henføres dit.</p><p><b>Spør:</b> fordeles gjelden etter bruttoverdi eller formuesverdi? Avkortes '
            'boliggjelden?</p><p><b>Husk</b> hva du gjør med en negativ kolonne når nettoformuen summeres.</p>',
 'frm-s10': '<p>Spør hva verdsettingen tar utgangspunkt i når aksjen ikke har en børskurs.</p><p><b>Steg 1:</b> hvilket tall finnes alltid for et unotert selskap?</p><p><b>Steg 2:</b> hvordan er det tallet målt? Hvordan skiller det seg fra det en kjøper ville betalt for selskapets framtidige inntjening?</p><p><b>Steg 3:</b> sjekk hvilken rabatt som gjelder aksjer generelt og om det finnes fritak for unoterte aksjer.</p>',
 'frm-s11': '<p><b>Steg 1: del fondet</b> i aksjedel og rentedel etter aksjeandelen.</p><p><b>Steg 2: verdsett '
            'delene.</b> Aksjedelen teller 80 %, rentedelen 100 %.</p><p><b>Steg 3: legg sammen.</b></p><p><b>Pass '
            'på:</b> rabatten gjelder bare aksjedelen. Rentedelen er også formue.</p>',
 'frm-s12': '<p>Formuesskatten har egne regler for primærbolig, sekundærbolig og fritidsbolig.</p><p><b>Steg 1:</b> plasser en hytte i riktig kategori. Den er ikke der du bor fast. Den leies vanligvis ikke ut.</p><p><b>Steg 2:</b> hvordan fastsettes formuesverdien i den kategorien? Hvem kan be om å endre den?</p><p><b>Steg 3:</b> sjekk hvert alternativ på både kategori og prosent.</p>',
 'frm-s13': '<p><b>Eiendomsskatt og formuesskatt er to ulike skatter.</b> Still fire spørsmål:</p><p>Hvem skriver '
            'den ut, staten eller kommunen? Er grunnlaget formuesverdien eller en andel av beregnet verdi? Gir gjeld '
            'fradrag? Er maksimalsatsen i prosent eller promille?</p><p><b>Stryk</b> påstandene som svarer feil på '
            'ett av dem.</p>',
 'frm-s14': '<p><b>Bygg formelen selv.</b> Hver eiendel får gjeld lik gjelden ganget med sin andel av '
            'bruttoverdien.</p><p><b>Bare gjelden på eiendeler med avkorting</b> reduseres med rabatten. Summer '
            'reduksjonene og trekk dem fra gjelden.</p><p><b>Sjekk</b> nevneren, brutto eller formuesverdi og hvilke '
            'eiendeler som er med i summen.</p>',
 'frm-s15': '<p><b>Skriv trinnene.</b> Trinn 1 er 1,0 % av formuen mellom bunnfradraget og innslagspunktet. Trinn 2 '
            'er 1,1 % av det som ligger over innslagspunktet.</p><p><b>Sjekk</b> hvor bunnfradraget trekkes fra og '
            'hvor mange ganger.</p>',
 'frm-s16': '<p><b>Del boligen ved terskelen.</b> Det nederste sjiktet er alt opp til terskelen, det øverste er '
            'resten.</p><p><b>Sjekk hver formel:</b> overlapper sjiktene? Er satsene byttet? Brukes den gamle '
            'terskelen?</p>',
 'frm-s17': '<p><b>Sammenlign nettoformuen med bunnfradraget.</b> Skatten er 1,0 % av det som ligger over, aldri av '
            'et negativt beløp.</p><p><b>Spør:</b> framføres et ubrukt bunnfradrag? Brukes noen gang markedsverdiene '
            'i stedet?</p>',
 'frm-s18': '<p>Følg begge sider.</p><p><b>Steg 1:</b> hvor mye teller bankinnskuddet i formuen? Hvor mye faller formuesverdien når du tar ut en krone?</p><p><b>Steg 2:</b> gjelden fordeles etter bruttoverdi. Den delen som havner på aksjene, avkortes. Hvor mye fradrag ga en krone gjeld?</p><p><b>Steg 3:</b> sammenlign de to endringene og avgjør både retningen og størrelsen på endringen i nettoformuen.</p>',
 'frm-s19': '<p>Skattefritaket bygger på at boligen faktisk har vært hjemmet ditt. Spør: hvilket krav stiller loven til hvor lenge du har eid boligen? Hvilket krav stiller den til hvor lenge du har bodd i den? Innenfor hvilken periode? Er boliggevinst ellers skattepliktig? Gir tap da fradrag? Har formuesskatten noe med dette å gjøre?</p>',
 'frm-s20': '<p><b>Langtidsutleie av del av egen bolig:</b> hvor stor del bruker du selv og hvordan måles den '
            'delen?</p><p><b>Skill</b> langtidsutleie fra korttidsutleie under en måned, som har en egen '
            'regel.</p><p><b>Stryk</b> alternativer som gjør all leie skattepliktig.</p>',
 'frm-s21': '<p><b>Hold tre størrelser fra hverandre:</b> formuesverdiene etter rabatt, den fradragsberettigede '
            'gjelden etter fordeling og avkorting og bunnfradraget.</p><p><b>Spør:</b> hvilke av dem inngår i '
            'nettoformuen? Hvilket kommer først når skatten regnes?</p>',
 'frm-s22': '<p><b>Gå gjennom hver påstand med regelen:</b> gjelden fordeles etter bruttoverdi, avkortes bare på '
            'eiendeler med 20 % rabatt og avkortes aldri på primærboligen.</p><p><b>Husk</b> at spørsmålet ber om '
            'den gale påstanden.</p>',
 'frm-s23': '<p><b>Sorter eiendelene:</b> hvilke har 20 % rabatt, hvilke teller fullt og hvilke er boliger med egne '
            'regler?</p><p><b>Gå gjennom listene</b> og stryk hver liste som inneholder én eiendel som ikke hører '
            'til 80 %-gruppen.</p>'}


# ---------------------------------------------------------------------------
# frm-skatt1 · Formuesskatt for en enslig, ett eller to trinn
# ---------------------------------------------------------------------------
@familie("frm-skatt1", tema=TEMA, hjelp=nb(HJ_FAM["frm-skatt1"]), antall=5, tittel="Formuesskatt for en enslig")
def _(r):
    navn = r.choice(NAVN)
    to = tur("frm-skatt1", [True, False, True, False, True])
    W = r.randrange(23_000_000, 60_000_001, 500_000) if to else r.randrange(4_500_000, 20_000_001, 250_000)
    sum_gitt = tur("frm-skatt1", [True, True, False, False, True])
    G = r.randrange(1_000_000, 8_000_001, 500_000)
    FV = W + G
    t1 = 0.01 * (min(W, K1) - B1)
    t2 = 0.011 * max(0, W - K1)
    riktig = t1 + t2

    kand = []
    glemt = 0.01 * min(W, K1) + t2
    kand.append((glemt, f"Bunnfradraget glemt: {tall(min(W, K1))} × 1,0 %"
                 + (f" + {tall(W - K1)} × 1,1 %" if to else "") + f" = {tall(glemt)}. "
                 f"De første kr 1 900 000 av nettoformuen er fritatt."))
    hel = 0.011 * (W - B1)
    kand.append((hel, f"1,1 % brukt på hele grunnlaget over bunnfradraget: ({tall(W)} − 1 900 000) × 1,1 % = "
                      f"{talla(hel)}. Den høye satsen gjelder bare det som ligger over kr 21 500 000."))
    if to:
        ekt2 = fskatt(W, B2, K2)
        kand.append((ekt2, f"Grensene for ektefeller brukt: ({tall(min(W, K2))} − 3 800 000) × 1,0 %"
                           + (f" + {tall(W - K2)} × 1,1 %" if W > K2 else "") + f" = {talla(ekt2)}. {navn} er enslig "
                           f"og har bunnfradrag 1 900 000 og innslagspunkt 21 500 000."))
        ett = 0.01 * (W - B1)
        kand.append((ett, f"Trinn 2 glemt: ({tall(W)} − 1 900 000) × 1,0 % = {tall(ett)}. Det ekstra tiendedels "
                          f"prosentpoenget på de {tall(W - K1)} over innslagspunktet mangler."))
    else:
        ekt = 0.01 * (W - B2)
        kand.append((ekt, f"Bunnfradraget for ektefeller brukt: ({tall(W)} − 3 800 000) × 1,0 % = {tall(ekt)}. "
                          f"{navn} er enslig og har bunnfradrag på kr 1 900 000."))
    if sum_gitt:
        gg = fskatt(FV)
        kand.append((gg, f"Gjelden glemt: skatten regnet av formuesverdiene på {tall(FV)}, som gir {talla(gg)}. "
                         f"Formuesskatten regnes av nettoformuen, etter at gjelden er trukket fra."))
    valgt = velg(r, riktig, kand)

    if sum_gitt:
        start = (f"<p>{navn} er enslig. {gen(navn)} formuesverdier etter verdsettingsrabatt er til sammen {kr(FV)}. "
                 f"Den fradragsberettigede gjelden etter gjeldsfordelingen er {kr(G)}.</p>")
    else:
        start = (f"<p>{navn} er enslig og har en nettoformue på {kr(W)}. Det er formuesverdiene etter "
                 f"verdsettingsrabatt minus fradragsberettiget gjeld.</p>")
    q = (start +
         f"<p>Formuesskatten er 1,0 % av nettoformuen over bunnfradraget på kr 1 900 000 og 1,1 % av den delen "
         f"av nettoformuen som overstiger kr 21 500 000. Ektefeller som skattlegges under ett, har bunnfradrag "
         f"kr 3 800 000 og innslagspunkt kr 43 000 000 [dagens regel, 2026].</p>"
         f"<p>Hva betaler {navn} i formuesskatt?</p>")

    alternativer = [R(kr(riktig), riktig)] + [F(kra(v), f, v) for v, f in valgt]

    netto = f"Nettoformuen er {tall(FV)} − {tall(G)} = {tall(W)}. " if sum_gitt else ""
    if to:
        kort = (f"<p><b>{kr(riktig)}.</b> {netto}Trinn 1: (21 500 000 − 1 900 000) × 1,0 % = 196 000. "
                f"Trinn 2: ({tall(W)} − 21 500 000) × 1,1 % = {tall(t2)}. Sum {tall(riktig)}.</p>")
    else:
        kort = (f"<p><b>{kr(riktig)}.</b> {netto}({tall(W)} − 1 900 000) × 1,0 % = {tall(riktig)}. "
                f"Nettoformuen ligger under kr 21 500 000, så 1,1 % brukes ikke.</p>")

    s1 = (f"<p><b>Steg 1: nettoformuen.</b> {tall(FV)} − {tall(G)} = <b>{kr(W)}</b>. Gjelden trekkes fra før "
          f"bunnfradraget.</p>") if sum_gitt else ""
    if to:
        steg = (f"<p><b>Steg {2 if sum_gitt else 1}: trinn 1.</b> Grunnlaget er den delen som ligger mellom "
                f"bunnfradraget og innslagspunktet: 21 500 000 − 1 900 000 = 19 600 000. Skatt: 19 600 000 × 1,0 % = "
                f"<b>196 000</b>.</p>"
                f"<p><b>Steg {3 if sum_gitt else 2}: trinn 2.</b> Bare det som ligger over innslagspunktet: "
                f"{tall(W)} − 21 500 000 = {tall(W - K1)}. Skatt: {tall(W - K1)} × 1,1 % = <b>{tall(t2)}</b>. "
                f"Bunnfradraget er alt brukt i trinn 1 og trekkes ikke fra en gang til.</p>"
                f"<p><b>Sum:</b> 196 000 + {tall(t2)} = <b>{kr(riktig)}</b>.</p>"
                f"<p><b>Kontroll, den andre veien.</b> 1,0 % av hele grunnlaget over bunnfradraget er "
                f"({tall(W)} − 1 900 000) × 1,0 % = {tall(0.01 * (W - B1))}. Det ekstra tiendedels prosentpoenget "
                f"over innslagspunktet er {tall(W - K1)} × 0,1 % = {talla(0.001 * (W - K1))}. "
                f"{tall(0.01 * (W - B1))} + {talla(0.001 * (W - K1))} = {tall(riktig)} ✓.</p>")
    else:
        steg = (f"<p><b>Steg {2 if sum_gitt else 1}: trinnet.</b> Nettoformuen på {tall(W)} ligger under "
                f"innslagspunktet på 21 500 000. Bare satsen 1,0 % brukes.</p>"
                f"<p><b>Steg {3 if sum_gitt else 2}: bunnfradraget og satsen.</b> ({tall(W)} − 1 900 000) × 1,0 % = "
                f"{tall(W - B1)} × 1,0 % = <b>{kr(riktig)}</b>.</p>"
                f"<p><b>Kontroll, baklengs.</b> {tall(riktig)}/1,0 % = {tall(W - B1)}. Legg til bunnfradraget: {tall(W - B1)} + 1 900 000 = "
                f"{tall(W)}, som er nettoformuen ✓. Gjennomsnittlig sats er {tall(riktig)}/{tall(W)} = "
                f"{pst(riktig / W, 2)}, under 1,0 % fordi de første 1 900 000 er fritatt.</p>")
    full = (
        "<p><b>Hva formuesskatten er.</b> Formuesskatten er en årlig skatt på det du eier minus det du skylder. "
        "Grunnlaget er nettoformuen: formuesverdiene etter verdsettingsrabatt minus fradragsberettiget gjeld. En "
        "enslig har et bunnfradrag på kr 1 900 000 og den delen er skattefri. Det som ligger over, skattlegges "
        "med 1,0 %. Den delen som overstiger innslagspunktet på kr 21 500 000, skattlegges med 1,1 %. Begge "
        "grensene måles på nettoformuen selv.</p>"
        + s1 + steg +
        "<p><b>Husk:</b> 1,0 % av nettoformuen mellom kr 1 900 000 og kr 21 500 000, 1,1 % av det som ligger over. "
        "Ektefeller under ett har begge grensene doblet.</p>"
    )
    return ferdig("frm-skatt1", sp(q, alternativer, kort, full))


# ---------------------------------------------------------------------------
# frm-skatt2 · Ektefeller som skattlegges under ett
# ---------------------------------------------------------------------------
@familie("frm-skatt2", tema=TEMA, hjelp=nb(HJ_FAM["frm-skatt2"]), antall=5, tittel="Formuesskatt for ektefeller under ett")
def _(r):
    n1, n2 = r.sample(NAVN, 2)
    a = r.randrange(4_000_000, 40_000_001, 500_000)
    b = r.randrange(2_000_000, 30_000_001, 500_000)
    W = a + b
    if not 24_000_000 <= W <= 75_000_000:
        raise Avvis("samlet formue utenfor området")
    eksplisitt = r.random() < 0.5
    riktig = fskatt(W, B2, K2)
    over = W > K2

    kand = []
    ens = fskatt(W, B1, K1)
    kand.append((ens, f"Grensene for en enslig brukt på parets samlede nettoformue: bunnfradrag 1 900 000 og "
                      f"innslagspunkt 21 500 000 gir {talla(ens)}. Ektefeller under ett har begge grensene doblet."))
    halv = fskatt(W, B2, K1)
    kand.append((halv, f"Bunnfradraget doblet, men ikke innslagspunktet: (21 500 000 − 3 800 000) × 1,0 % + "
                       f"({tall(W)} − 21 500 000) × 1,1 % = {talla(halv)}. Innslagspunktet dobles også, til 43 000 000."))
    glemt = fskatt(W, 0, K2)
    kand.append((glemt, f"Bunnfradraget glemt: {tall(min(W, K2))} × 1,0 %"
                        + (f" + {tall(W - K2)} × 1,1 %" if over else "") + f" = {talla(glemt)}."))
    if over:
        ett = 0.01 * (W - B2)
        kand.append((ett, f"Trinn 2 glemt: ({tall(W)} − 3 800 000) × 1,0 % = {tall(ett)}. Det som ligger over "
                          f"43 000 000, skal ha 1,1 %."))
    else:
        hel = 0.011 * (W - B2)
        kand.append((hel, f"1,1 % brukt på hele grunnlaget: ({tall(W)} − 3 800 000) × 1,1 % = {talla(hel)}. Paret "
                          f"ligger under innslagspunktet på 43 000 000, så bare 1,0 % brukes."))
    valgt = velg(r, riktig, kand)

    if eksplisitt:
        sats = ("<p>Formuesskatten er 1,0 % av nettoformuen over bunnfradraget og 1,1 % av den delen som overstiger "
                "innslagspunktet. For en enslig er bunnfradraget kr 1 900 000 og innslagspunktet kr 21 500 000. For "
                "ektefeller som skattlegges under ett, er de kr 3 800 000 og kr 43 000 000, regnet på parets samlede "
                "nettoformue [dagens regel, 2026].</p>")
    else:
        sats = ("<p>Formuesskatten er 1,0 % av nettoformuen over bunnfradraget på kr 1 900 000 og 1,1 % av den delen "
                "som overstiger kr 21 500 000. Grensene gjelder en enslig. For ektefeller som skattlegges under ett, "
                "dobles både bunnfradraget og innslagspunktet og de regnes på parets samlede nettoformue "
                "[dagens regel, 2026].</p>")
    q = (f"<p>{n1} og {n2} er gift og skattlegges under ett for formue. {gen(n1)} nettoformue er {kr(a)}. "
         f"{gen(n2)} nettoformue er {kr(b)}.</p>" + sats + "<p>Hva betaler paret samlet i formuesskatt?</p>")

    alternativer = [R(kra(riktig), riktig)] + [F(kra(v), f, v) for v, f in valgt]
    if over:
        regn = (f"(43 000 000 − 3 800 000) × 1,0 % + ({tall(W)} − 43 000 000) × 1,1 % = 392 000 + "
                f"{talla(0.011 * (W - K2))} = {talla(riktig)}")
    else:
        regn = f"({tall(W)} − 3 800 000) × 1,0 % = {talla(riktig)}"
    kort = (f"<p><b>{kra(riktig)}.</b> Samlet nettoformue {tall(a)} + {tall(b)} = {tall(W)}. Doble grenser: "
            f"{regn}.</p>")
    halv_skatt = fskatt(W / 2)
    full = (
        "<p><b>Hva «under ett» betyr.</b> Ektefeller får ikke hver sin formuesskatt regnet hver for seg. Formuene "
        "legges sammen og paret får dobbelt bunnfradrag og dobbelt innslagspunkt: kr 3 800 000 og kr 43 000 000. "
        "Begge grensene måles på den samlede nettoformuen.</p>"
        f"<p><b>Steg 1: samlet nettoformue.</b> {tall(a)} + {tall(b)} = <b>{tall(W)}</b>.</p>"
        + (f"<p><b>Steg 2: trinn 1.</b> (43 000 000 − 3 800 000) × 1,0 % = 39 200 000 × 1,0 % = 392 000.</p>"
           f"<p><b>Steg 3: trinn 2.</b> ({tall(W)} − 43 000 000) × 1,1 % = {talla(0.011 * (W - K2))}. "
           f"Sum: <b>{kra(riktig)}</b>.</p>" if over else
           f"<p><b>Steg 2: trinnet.</b> {tall(W)} ligger under 43 000 000, så bare 1,0 % brukes: "
           f"({tall(W)} − 3 800 000) × 1,0 % = <b>{kra(riktig)}</b>.</p>")
        + f"<p><b>Kontroll.</b> Doble grenser på samlet formue gir det samme som at hver ektefelle eier halvparten og "
          f"regnes som enslig. Halv formue er {tall(W / 2)} og skatten av den med enslig-grensene er "
          f"{talla(halv_skatt)}. Ganget med to: {talla(2 * halv_skatt)} ✓. Regner du i stedet enslig-grensene på hele "
          f"{tall(W)}, får du {talla(ens)}, altså {talla(ens - riktig)} for mye.</p>"
        "<p><b>Husk:</b> ektefeller under ett har bunnfradrag kr 3 800 000 og innslagspunkt kr 43 000 000, regnet "
        "på samlet nettoformue.</p>"
    )
    return sp(q, alternativer, kort, full)


# ---------------------------------------------------------------------------
# frm-bolig1 · Primærboligens to sjikt, sekundærbolig og skatten av boligen
# ---------------------------------------------------------------------------
@familie("frm-bolig1", tema=TEMA, antall=6, tittel="Formuesverdi av bolig")
def _(r):
    navn = r.choice(NAVN)
    spm = tur("frm-bolig1", ["fv", "skatt", "to"])
    regel = ("Primærbolig verdsettes til 25 % av verdien opp til kr 14 000 000 og til 70 % av den delen av verdien "
             "som overstiger kr 14 000 000")
    forklar = (
        "<p><b>Hva formuesverdien av en bolig er.</b> Formuesskatten treffer ikke markedsverdien, men formuesverdien. "
        "For en primærbolig, altså boligen du selv bor i, er rabatten stor: de første kr 14 000 000 av verdien teller "
        "bare 25 %. Den delen av verdien som ligger over, teller 70 %. Boligen deles altså i to sjikt før satsene "
        "brukes. En sekundærbolig har ingen rabatt og teller 100 %.</p>")

    if spm == "fv":
        M = r.randrange(15_000_000, 30_000_001, 500_000)
        riktig = fv_bolig(M)
        if riktig == T_BOLIG:
            raise Avvis("formuesverdien er lik terskelen")
        kand = [
            (0.25 * M, f"25 % brukt på hele boligen: {tall(M)} × 25 % = {tall(0.25 * M)}. Over kr 14 000 000 er "
                       f"satsen 70 %."),
            (0.70 * M, f"70 % brukt på hele boligen: {tall(M)} × 70 % = {tall(0.70 * M)}. 70 % gjelder bare delen "
                       f"over terskelen."),
            (fv_bolig(M, 10_000_000), f"Terskelen på kr 10 000 000 fra 2024 og 2025 brukt: 10 000 000 × 25 % + "
                                      f"{tall(M - 10_000_000)} × 70 % = {tall(fv_bolig(M, 10_000_000))}."),
            (0.70 * T_BOLIG + 0.25 * (M - T_BOLIG),
             f"Sjiktene byttet om: 14 000 000 × 70 % + {tall(M - T_BOLIG)} × 25 % = "
             f"{tall(0.70 * T_BOLIG + 0.25 * (M - T_BOLIG))}. Rabatten er størst i det nederste sjiktet."),
        ]
        valgt = velg(r, riktig, kand)
        q = (f"<p>{navn} eier en primærbolig med beregnet omsetningsverdi {kr(M)}. {regel} "
             f"[dagens regel, 2026].</p><p>Hva er boligens formuesverdi?</p>")
        kort = (f"<p><b>{kr(riktig)}.</b> 14 000 000 × 25 % = 3 500 000, pluss ({tall(M)} − 14 000 000) × 70 % = "
                f"{tall(0.7 * (M - T_BOLIG))}.</p>")
        full = (forklar +
                f"<p><b>Steg 1: del boligen i to.</b> 14 000 000 ligger i det billige sjiktet. {tall(M)} − 14 000 000 = "
                f"{tall(M - T_BOLIG)} ligger i det dyre.</p>"
                f"<p><b>Steg 2: verdsett hvert sjikt.</b> 14 000 000 × 25 % = 3 500 000. {tall(M - T_BOLIG)} × 70 % = "
                f"{tall(0.7 * (M - T_BOLIG))}.</p>"
                f"<p><b>Steg 3: legg sammen.</b> 3 500 000 + {tall(0.7 * (M - T_BOLIG))} = <b>{kr(riktig)}</b>.</p>"
                f"<p><b>Kontroll.</b> Gjennomsnittlig verdsetting er {tall(riktig)}/{tall(M)} = {pst(riktig / M)}, "
                f"mellom 25 % og 70 % slik den må være. Med den gamle terskelen på 10 000 000 ville formuesverdien "
                f"vært {tall(fv_bolig(M, 10_000_000))}. Forskjellen er 4 000 000 × (70 % − 25 %) = 1 800 000 ✓.</p>"
                "<p><b>Husk:</b> 25 % av de første kr 14 000 000, 70 % av resten. Del boligen først, bruk satsene "
                "etterpå.</p>")
        alternativer = [R(kr(riktig), riktig)] + [F(kra(v), f, v) for v, f in valgt]

    elif spm == "skatt":
        M = r.randrange(15_000_000, 24_000_001, 500_000)
        bank = r.randrange(500_000, 4_000_001, 250_000)
        fv = fv_bolig(M)
        W = fv + bank
        riktig = fskatt(W)
        kand = [
            (fskatt(0.25 * M + bank), f"Hele boligen verdsatt til 25 %: ({tall(0.25 * M)} + {tall(bank)} − 1 900 000) "
                                      f"× 1,0 % = {talla(fskatt(0.25 * M + bank))}. Over kr 14 000 000 er satsen 70 %."),
            (fskatt(fv_bolig(M, 10_000_000) + bank),
             f"Terskelen på kr 10 000 000 fra 2024 og 2025 brukt: boligen blir {tall(fv_bolig(M, 10_000_000))} og "
             f"skatten {talla(fskatt(fv_bolig(M, 10_000_000) + bank))}."),
            (0.01 * W, f"Bunnfradraget glemt: {tall(W)} × 1,0 % = {talla(0.01 * W)}."),
            (fskatt(M + bank), f"Boligen tatt med til markedsverdi: ({tall(M)} + {tall(bank)} − 1 900 000) × 1,0 %"
                               + (" pluss 1,1 % over 21 500 000" if M + bank > K1 else "")
                               + f" = {talla(fskatt(M + bank))}."),
        ]
        valgt = velg(r, riktig, kand)
        q = (f"<p>{navn} er enslig og eier en primærbolig med beregnet omsetningsverdi {kr(M)}. I tillegg har "
             f"{navn} {kr(bank)} i bankinnskudd. Det finnes ingen gjeld og ingen annen formue.</p>"
             f"<p>{regel}. Bankinnskudd verdsettes til 100 %. Formuesskatten er 1,0 % av nettoformuen over "
             f"kr 1 900 000 og 1,1 % av den delen som overstiger kr 21 500 000 [dagens regel, 2026].</p>"
             f"<p>Hva betaler {navn} i formuesskatt?</p>")
        kort = (f"<p><b>{kr(riktig)}.</b> Boligen: 3 500 000 + {tall(M - T_BOLIG)} × 70 % = {tall(fv)}. "
                f"({tall(fv)} + {tall(bank)} − 1 900 000) × 1,0 % = {tall(riktig)}.</p>")
        full = (forklar +
                f"<p><b>Steg 1: boligens formuesverdi.</b> 14 000 000 × 25 % = 3 500 000 og "
                f"({tall(M)} − 14 000 000) × 70 % = {tall(0.7 * (M - T_BOLIG))}. Sum {tall(fv)}.</p>"
                f"<p><b>Steg 2: nettoformuen.</b> Bankinnskuddet teller fullt: {tall(fv)} + {tall(bank)} = "
                f"{tall(W)}. Det finnes ingen gjeld.</p>"
                f"<p><b>Steg 3: skatten.</b> {tall(W)} ligger under 21 500 000, så bare 1,0 % brukes: "
                f"({tall(W)} − 1 900 000) × 1,0 % = <b>{kr(riktig)}</b>.</p>"
                f"<p><b>Kontroll.</b> Hadde markedsverdien på {tall(M + bank)} vært grunnlaget, ville skatten vært "
                f"{talla(fskatt(M + bank))}. Rabatten på boligen sparer {navn} for "
                f"{talla(fskatt(M + bank) - riktig)} i året.</p>"
                "<p><b>Husk:</b> boligen deles i to sjikt (25 % og 70 %) før bunnfradraget og satsen brukes på "
                "nettoformuen.</p>")
        alternativer = [R(kr(riktig), riktig)] + [F(kra(v), f, v) for v, f in valgt]

    else:  # primærbolig og sekundærbolig
        M1 = r.randrange(5_000_000, 20_000_001, 500_000)
        M2 = r.randrange(2_000_000, 8_000_001, 250_000)
        riktig = fv_bolig(M1) + M2
        kand = [
            (fv_bolig(M1) + 0.25 * M2, f"Sekundærboligen også verdsatt til 25 %: {tall(fv_bolig(M1))} + "
                                       f"{tall(M2)} × 25 % = {tall(fv_bolig(M1) + 0.25 * M2)}. Bare primærboligen har "
                                       f"rabatt."),
            (fv_bolig(M1 + M2), f"Boligene slått sammen og behandlet som én primærbolig på {tall(M1 + M2)}: "
                                f"{tall(fv_bolig(M1 + M2))}. Rabatten gjelder bare boligen {navn} bor i."),
            (M1 + M2, f"Markedsverdiene lagt sammen: {tall(M1)} + {tall(M2)} = {tall(M1 + M2)}. Primærboligen har "
                      f"rabatt."),
        ]
        if M1 > T_BOLIG:
            kand.append((0.25 * M1 + M2, f"Terskelen glemt, hele primærboligen til 25 %: {tall(0.25 * M1)} + "
                                         f"{tall(M2)} = {tall(0.25 * M1 + M2)}."))
        valgt = velg(r, riktig, kand)
        q = (f"<p>{navn} eier boligen sin, som er primærbolig, med beregnet omsetningsverdi {kr(M1)}. I tillegg eier "
             f"{navn} en leilighet som leies ut hele året (sekundærbolig), med omsetningsverdi {kr(M2)}.</p>"
             f"<p>{regel}. Sekundærbolig verdsettes til 100 % [dagens regel, 2026].</p>"
             f"<p>Hva er samlet formuesverdi av de to boligene?</p>")
        if M1 > T_BOLIG:
            pb = f"3 500 000 + ({tall(M1)} − 14 000 000) × 70 % = {tall(fv_bolig(M1))}"
        else:
            pb = f"{tall(M1)} × 25 % = {tall(fv_bolig(M1))}"
        kort = f"<p><b>{kr(riktig)}.</b> Primærboligen: {pb}. Sekundærboligen teller fullt: {tall(M2)}.</p>"
        full = (forklar +
                f"<p><b>Steg 1: primærboligen.</b> {pb}."
                + (" Hele verdien ligger under terskelen." if M1 <= T_BOLIG else "") + "</p>"
                f"<p><b>Steg 2: sekundærboligen.</b> Ingen rabatt: {tall(M2)}.</p>"
                f"<p><b>Steg 3: sum.</b> {tall(fv_bolig(M1))} + {tall(M2)} = <b>{kr(riktig)}</b>.</p>"
                f"<p><b>Kontroll.</b> Sekundærboligen er {pst(M2 / (M1 + M2))} av markedsverdien, men "
                f"{pst(M2 / riktig)} av formuesverdien. Det er slik det skal være: boligen uten rabatt veier mye "
                f"tyngre i formuesskatten. Sekundærboligen utløser heller ingen gjeldsreduksjon, fordi den ikke har "
                f"rabatt.</p>"
                "<p><b>Husk:</b> bare primærboligen har rabatt. Sekundærbolig og bankinnskudd teller 100 %.</p>")
        alternativer = [R(kr(riktig), riktig)] + [F(kra(v), f, v) for v, f in valgt]
    return ferdig("frm-bolig1", sp(q, alternativer, kort, full, hjelp=HJ_VAR["frm-bolig1"][spm]))


# ---------------------------------------------------------------------------
# Felles oppsett for gjeldsfordelingen (R4)
# ---------------------------------------------------------------------------
def _aktiva(r, maks_bolig=12_000_000, min_bolig=2_000_000):
    P = r.randrange(min_bolig, maks_bolig + 1, 250_000)
    akt = [dict(n="primærbolig", k="Bolig", bv=P, fv=fv_bolig(P), rho=1 - fv_bolig(P) / P, avk=False)]
    aksjenavn = r.choice(["børsnoterte aksjer", "andeler i et rent aksjefond"])
    A = r.randrange(500_000, 5_000_001, 250_000)
    akt.append(dict(n=aksjenavn, k="Aksjer" if aksjenavn.startswith("børs") else "Fond", bv=A, fv=0.8 * A,
                    rho=0.2, avk=True))
    ekstra = r.choice(["ingen", "ingen", "næring", "sekundær"])
    if ekstra == "næring":
        N = r.randrange(1_000_000, 5_000_001, 500_000)
        akt.append(dict(n="næringseiendom", k="Næring", bv=N, fv=0.8 * N, rho=0.2, avk=True))
    elif ekstra == "sekundær":
        S = r.randrange(1_500_000, 6_000_001, 500_000)
        akt.append(dict(n="sekundærbolig", k="Sekundær", bv=S, fv=S, rho=0.0, avk=False))
    bank = r.randrange(100_000, 2_000_001, 100_000)
    akt.append(dict(n="bankinnskudd", k="Bank", bv=bank, fv=bank, rho=0.0, avk=False))
    return akt


def _fordel(akt, G):
    S = sum(a["bv"] for a in akt)
    for a in akt:
        a["andel"] = a["bv"] / S
        a["g"] = G * a["bv"] / S
        a["gf"] = a["g"] * (1 - a["rho"]) if a["avk"] else a["g"]
        a["netto"] = a["fv"] - a["gf"]
    FV = sum(a["fv"] for a in akt)
    GF = sum(a["gf"] for a in akt)
    return S, FV, GF


def _velg_gjeld(r, akt, lo=0.3, hi=0.65):
    S = sum(a["bv"] for a in akt)
    kand = []
    for G in range(int(lo * S // 100_000 + 1) * 100_000, int(hi * S) + 1, 100_000):
        if all(heltall(G * a["bv"] / S) and heltall(G * a["bv"] / S * (1 - a["rho"])) for a in akt):
            kand.append(G)
    if not kand:
        raise Avvis("ingen gjeld gir hele kroner")
    return r.choice(kand)


def _etter_fv(akt, G):
    """Feilen: gjelden fordelt etter formuesverdi. Gir (reduksjon, fradragsberettiget gjeld)."""
    FV = sum(a["fv"] for a in akt)
    red = sum(G * a["fv"] / FV * a["rho"] for a in akt if a["avk"])
    return red, G - red


def _liste(akt):
    return "<ul>" + "".join(f"<li>{a['n']}: {kr(a['bv'])}</li>" for a in akt) + "</ul>"


def _regler(akt):
    rab = [a["n"] for a in akt if a["avk"]]
    full = [a["n"] for a in akt if not a["avk"] and a["n"] != "primærbolig"]
    P = akt[0]["bv"]
    bolig = ("Primærboligen verdsettes til 25 %" if P <= T_BOLIG else
             "Primærboligen verdsettes til 25 % av verdien opp til kr 14 000 000 og 70 % av verdien over")
    return (f"{bolig}, {' og '.join(rab)} til 80 % og {' og '.join(full)} til 100 %. Gjelden fordeles forholdsmessig "
            f"etter eiendelenes bruttoverdi før rabatt. Gjeld henført til eiendeler med 20 % rabatt reduseres med "
            f"20 %. Gjeld henført til primærboligen reduseres ikke [dagens regel, 2026].")


def _tabell(akt):
    hode = "".join(f"<th>{a['k']}</th>" for a in akt) + "<th>Sum</th>"
    rader = [("Bruttoverdi", "bv"), ("Formuesverdi", "fv"), ("Gjeld henført", "g"),
             ("Fradragsberettiget", "gf"), ("Netto", "netto")]
    html = f'<table class="data"><tr><th>Rad</th>{hode}</tr>'
    for navn, k in rader:
        v = [a[k] for a in akt]
        html += f"<tr><td>{navn}</td>" + "".join(f'<td class="n">{tall(x)}</td>' for x in v + [sum(v)]) + "</tr>"
    return html + "</table>"


GJELD_HVA = ("<p><b>Hva gjeldsfordelingen er.</b> Gjelden hører ikke til én bestemt eiendel i formuesskatten. "
             "Den fordeles på alle eiendelene etter deres bruttoverdi, altså markedsverdien før rabatt. Den delen som "
             "havner på en eiendel med verdsettingsrabatt, avkortes med samme rabatt: aksjer, aksjefond og "
             "næringseiendom teller 80 % og gjelden dit gir 80 % fradrag. Ellers ville rabatten virket to ganger. "
             "Primærboligen er unntatt: den teller med full bruttoverdi i fordelingen, men gjelden dit avkortes "
             "ikke.</p>")


# ---------------------------------------------------------------------------
# frm-gjeld1 · Hvor mye reduseres gjelden? (R4, H2024 oppgave 6a)
# ---------------------------------------------------------------------------
@familie("frm-gjeld1", tema=TEMA, hjelp=nb(HJ_FAM["frm-gjeld1"]), antall=6, tittel="Gjeldsreduksjonen ved forholdsmessig fordeling")
def _(r):
    navn = r.choice(NAVN)
    akt = _aktiva(r)
    G = _velg_gjeld(r, akt)
    S, FV, GF = _fordel(akt, G)
    red = G - GF
    bolig = akt[0]
    rab = [a for a in akt if a["avk"]]
    g_rab = sum(a["g"] for a in rab)

    kand = [
        (red + 0.75 * bolig["g"], f"Boliggjelden også avkortet med 75 %: {tall(red)} + {tall(bolig['g'])} × 75 % = "
                                  f"{tall(red + 0.75 * bolig['g'])}. Gjeld henført til primærbolig reduseres ikke."),
        (0.2 * G, f"Hele gjelden avkortet med 20 %: {tall(G)} × 20 % = {tall(0.2 * G)}. Bare delen som er henført "
                  f"til eiendeler med rabatt, avkortes."),
        (_etter_fv(akt, G)[0], f"Gjelden fordelt etter formuesverdi i stedet for bruttoverdi: "
                               f"{tall(G)} × {tall(sum(a['fv'] for a in rab))}/{tall(FV)} × 20 % = "
                               f"{tall(_etter_fv(akt, G)[0])}. Nøkkelen er bruttoverdiene."),
        (g_rab, f"Dette er gjelden som er henført til de rabatterte eiendelene, {tall(g_rab)}. Reduksjonen er 20 % "
                f"av den."),
    ]
    if len(rab) == 2:
        kand.append((rab[0]["g"] * 0.2, f"Bare {rab[0]['n']} regnet som rabattert: {tall(rab[0]['g'])} × 20 % = "
                                        f"{tall(rab[0]['g'] * 0.2)}. Næringseiendom har også 20 % rabatt og utløser "
                                        f"samme avkorting."))
    valgt = velg(r, red, kand)

    q = (f"<p>{navn} har {kr(G)} i gjeld. Eiendelene, til markedsverdi før rabatt, er:</p>{_liste(akt)}"
         f"<p>{_regler(akt)}</p><p>Hvor mye reduseres den fradragsberettigede gjelden med?</p>")
    alternativer = [R(kr(red), red)] + [F(kr(v), f, v) for v, f in valgt]
    bv_rab = sum(a["bv"] for a in rab)
    kort = (f"<p><b>{kr(red)}.</b> Gjelden henført til {' og '.join(a['n'] for a in rab)} er {tall(G)} × "
            f"{tall(bv_rab)}/{tall(S)} = {tall(g_rab)}. Avkortingen er {tall(g_rab)} × 20 % = {tall(red)}.</p>")
    full = (GJELD_HVA +
            f"<p><b>Steg 1: fordelingsnøkkelen.</b> Bruttoformuen er {tall(S)}. "
            + " ".join(f"{a['n'].capitalize()} har andel {tall(a['bv'])}/{tall(S)} = {pst(a['andel'])}." for a in akt)
            + "</p>"
            f"<p><b>Steg 2: fordel gjelden.</b> "
            + ", ".join(f"{a['n']} {tall(a['g'])}" for a in akt) + f". Sum {tall(G)} ✓.</p>"
            f"<p><b>Steg 3: avkort bare det som skal avkortes.</b> "
            + " ".join(f"{a['n'].capitalize()}: {tall(a['g'])} × 20 % = {tall(a['g'] * 0.2)}." for a in rab)
            + f" Boliggjelden står uendret. Samlet reduksjon: <b>{kr(red)}</b>.</p>"
            f"<p><b>Kontroll med samleformelen.</b> {tall(G)} × ("
            + " + ".join(f"{tall(a['bv'])} × 20 %" for a in rab)
            + f")/{tall(S)} = {tall(red)} ✓.</p>"
              f"<p><b>Elimineringen.</b> Reduksjonen er 20 % av gjelden henført til de rabatterte eiendelene. Den "
              f"gjelden er alltid mindre enn hele gjelden. Et alternativ på 20 % × {tall(G)} = {tall(0.2 * G)} eller mer kan "
              f"derfor strykes uten regning.</p>"
            "<p><b>Husk:</b> fordel etter bruttoverdi, avkort med rabatten bare der rabatten utløser avkorting og "
            "aldri på primærboligen.</p>")
    return sp(q, alternativer, kort, full)


# ---------------------------------------------------------------------------
# frm-gjeld2 · Nettoformuen etter gjeldsfordelingen (R4, H2024 6b, H2025 2)
# ---------------------------------------------------------------------------
@familie("frm-gjeld2", tema=TEMA, hjelp=nb(HJ_FAM["frm-gjeld2"]), antall=6, tittel="Nettoformuen etter gjeldsfordeling")
def _(r):
    navn = r.choice(NAVN)
    akt = _aktiva(r)
    G = _velg_gjeld(r, akt)
    S, FV, GF = _fordel(akt, G)
    W = FV - GF
    if W < 200_000:
        raise Avvis("nettoformuen er for liten")
    bolig = akt[0]
    rab = [a for a in akt if a["avk"]]

    uten = FV - G
    bolig_avk = FV - (GF - 0.75 * bolig["g"])
    null = sum(max(0, a["netto"]) for a in akt) if bolig["netto"] < 0 else None
    glemt_rab = FV + sum(a["bv"] * 0.2 for a in rab) - G
    fvfeil = FV - _etter_fv(akt, G)[1]
    kand = [
        (uten, f"Gjelden ikke avkortet: {tall(FV)} − {tall(G)} = {tall(uten)}. Gjelden henført til de rabatterte "
               f"eiendelene skal reduseres med 20 %."),
        (bolig_avk, f"Boliggjelden også avkortet med 75 %: fradragsberettiget gjeld blir {tall(GF - 0.75 * bolig['g'])} "
                    f"og nettoformuen {tall(bolig_avk)}. Gjeld henført til primærbolig reduseres ikke."),
        (glemt_rab, f"Rabatten glemt både på eiendelen og på gjelden: {' og '.join(a['n'] for a in rab)} tatt med til "
                    f"markedsverdi og hele gjelden trukket fra gir {tall(glemt_rab)}."),
        (fvfeil, f"Gjelden fordelt etter formuesverdi i stedet for bruttoverdi gir {tall(fvfeil)}. Nøkkelen er "
                 f"bruttoverdiene."),
    ]
    if null is not None:
        kand.append((null, f"Den negative boligkolonnen ({tall(bolig['netto'])}) satt til null: {tall(null)}. Negative "
                           f"kolonner motregnes mot de positive."))
    valgt = velg(r, W, kand)

    q = (f"<p>{navn} har {kr(G)} i gjeld. Eiendelene, til markedsverdi før rabatt, er:</p>{_liste(akt)}"
         f"<p>{_regler(akt)}</p><p>Hva er {gen(navn)} nettoformue, før bunnfradraget?</p>")
    alternativer = [R(kr(W), W)] + [F(kr(v), f, v) for v, f in valgt]
    kort = (f"<p><b>{kr(W)}.</b> Formuesverdiene er {tall(FV)}. Fradragsberettiget gjeld er "
            f"{tall(G)} − {tall(G - GF)} = {tall(GF)}. {tall(FV)} − {tall(GF)} = {tall(W)}.</p>")
    full = (GJELD_HVA +
            f"<p><b>Steg 1: formuesverdiene.</b> "
            + ", ".join(f"{a['n']} {tall(a['fv'])}" for a in akt) + f". Sum {tall(FV)}.</p>"
            f"<p><b>Steg 2: fordel gjelden etter bruttoverdi</b> ({tall(S)} til sammen) og avkort med 20 % der "
            f"eiendelen har rabatt. Fradragsberettiget gjeld blir {tall(GF)}, en reduksjon på {tall(G - GF)}.</p>"
            f"<p><b>Steg 3: nettoformuen.</b> {tall(FV)} − {tall(GF)} = <b>{kr(W)}</b>.</p>"
            f"{_tabell(akt)}"
            f"<p><b>Kontroll per kolonne.</b> "
            + " + ".join(f"({tall(a['netto'])})" if a["netto"] < 0 else tall(a["netto"]) for a in akt)
            + f" = {tall(W)} ✓. Boligkolonnen er negativ fordi boligen teller "
              f"{'25 %' if bolig['bv'] <= T_BOLIG else 'under 70 %'}, mens gjelden dit står fullt. Det er tilsiktet og "
              f"kolonnen motregnes.</p>"
            "<p><b>Husk:</b> nettoformue = formuesverdier − fradragsberettiget gjeld. Spørsmålet gjelder nettoformuen, "
            "så bunnfradraget og satsen brukes ikke.</p>")
    return sp(q, alternativer, kort, full)


# ---------------------------------------------------------------------------
# frm-hele1 · Fra eiendeler og gjeld til formuesskatten
# ---------------------------------------------------------------------------
@familie("frm-hele1", tema=TEMA, hjelp=nb(HJ_FAM["frm-hele1"]), antall=5, tittel="Formuesskatt fra eiendeler og gjeld")
def _(r):
    navn = r.choice(NAVN)
    stor = tur("frm-hele1", [False, True, False, True, False])
    akt = _aktiva(r, maks_bolig=20_000_000 if stor else 12_000_000, min_bolig=15_000_000 if stor else 4_000_000)
    for a in akt[1:]:
        if a["avk"] or a["n"] == "bankinnskudd":
            a["bv"] *= 2
            a["fv"] *= 2
    G = _velg_gjeld(r, akt, lo=0.2, hi=0.5)
    S, FV, GF = _fordel(akt, G)
    W = FV - GF
    if W < 2_500_000:
        raise Avvis("nettoformuen er under eller nær bunnfradraget")
    riktig = fskatt(W)
    bolig = akt[0]
    uten = FV - G
    bolig_avk = W + 0.75 * bolig["g"] if bolig["bv"] <= T_BOLIG else W + bolig["rho"] * bolig["g"]
    marked = S - G
    kand = [
        (fskatt(uten), f"Gjelden ikke avkortet: nettoformuen blir {tall(FV)} − {tall(G)} = {tall(uten)} og skatten "
                       f"{talla(fskatt(uten))}."),
        (fskatt(bolig_avk), f"Boliggjelden også avkortet med boligrabatten: nettoformuen blir {tall(bolig_avk)} og "
                            f"skatten {talla(fskatt(bolig_avk))}. Gjeld henført til primærbolig reduseres ikke."),
        (0.01 * min(W, K1) + 0.011 * max(0, W - K1), f"Bunnfradraget glemt: {tall(W)} × 1,0 % = "
                                                     f"{talla(0.01 * min(W, K1) + 0.011 * max(0, W - K1))}."),
        (fskatt(marked), f"Markedsverdiene brukt: ({tall(S)} − {tall(G)} − 1 900 000) × 1,0 %"
                         + (" pluss 1,1 % over 21 500 000" if marked > K1 else "")
                         + f" = {talla(fskatt(marked))}. Skatten regnes av formuesverdiene."),
    ]
    valgt = velg(r, riktig, kand)
    q = (f"<p>{navn} er enslig og har {kr(G)} i gjeld. Eiendelene, til markedsverdi før rabatt, er:</p>"
         f"{_liste(akt)}<p>{_regler(akt)} Formuesskatten er 1,0 % av nettoformuen over bunnfradraget på "
         f"kr 1 900 000 og 1,1 % av den delen som overstiger kr 21 500 000.</p>"
         f"<p>Hva betaler {navn} i formuesskatt?</p>")
    alternativer = [R(kra(riktig), riktig)] + [F(kra(v), f, v) for v, f in valgt]
    skattregn = (f"({tall(W)} − 1 900 000) × 1,0 % = {talla(riktig)}" if W <= K1 else
                 f"196 000 + ({tall(W)} − 21 500 000) × 1,1 % = {talla(riktig)}")
    kort = (f"<p><b>{kra(riktig)}.</b> Formuesverdier {tall(FV)}, fradragsberettiget gjeld {tall(GF)}, nettoformue "
            f"{tall(W)}. Skatt: {skattregn}.</p>")
    pb = (f"{tall(bolig['bv'])} × 25 % = {tall(bolig['fv'])}" if bolig["bv"] <= T_BOLIG else
          f"14 000 000 × 25 % + {tall(bolig['bv'] - T_BOLIG)} × 70 % = {tall(bolig['fv'])}")
    full = ("<p><b>Hva som skjer.</b> Formuesskatten regnes i tre ledd: verdsett hver eiendel med sin rabatt, trekk "
            "fra gjelden etter forholdsmessig fordeling og bruk bunnfradraget og satsen på det som blir igjen. Gjelden "
            "fordeles etter bruttoverdi. Den delen som havner på eiendeler med 20 % rabatt, avkortes med 20 %. "
            "Gjelden på primærboligen står uendret.</p>"
            f"<p><b>Steg 1: formuesverdiene.</b> Primærboligen: {pb}. "
            + " ".join(f"{a['n'].capitalize()}: {tall(a['fv'])}." for a in akt[1:]) + f" Sum {tall(FV)}.</p>"
            f"<p><b>Steg 2: fradragsberettiget gjeld.</b> Gjelden fordeles etter bruttoverdiene ({tall(S)} til sammen). "
            + " ".join(f"Til {a['n']}: {tall(a['g'])}, avkortet til {tall(a['gf'])}." for a in akt if a["avk"])
            + f" Samlet fradragsberettiget gjeld: {tall(GF)}.</p>"
            f"<p><b>Steg 3: nettoformuen.</b> {tall(FV)} − {tall(GF)} = {tall(W)}.</p>"
            f"<p><b>Steg 4: skatten.</b> {skattregn}, altså <b>{kra(riktig)}</b>.</p>"
            f"{_tabell(akt)}"
            f"<p><b>Kontroll.</b> Nettokolonnene summerer til {tall(sum(a['netto'] for a in akt))}, som er "
            f"nettoformuen ✓. Samleformelen gir samme gjeld: {tall(G)} × (1 − "
            + " − ".join(f"{tall(a['bv'])} × 20 %/{tall(S)}" for a in akt if a["avk"]) + f") = {tall(GF)} ✓.</p>"
            "<p><b>Husk:</b> verdsett, fordel og avkort gjelden, trekk fra og bruk først da bunnfradraget og "
            "satsen.</p>")
    return ferdig("frm-hele1", sp(q, alternativer, kort, full))


# ---------------------------------------------------------------------------
# frm-unot1 · Unoterte aksjer: selskapets formuesverdi, ikke emisjonsprisen
# ---------------------------------------------------------------------------
@familie("frm-unot1", tema=TEMA, antall=5, tittel="Unoterte aksjer i formuesskatten")
def _(r):
    navn = r.choice(NAVN)
    selskap = r.choice(["Vevn AS", "Fjordlab AS", "Kodeskog AS", "Havbris AS", "Nordlys Analytics AS", "Tindra AS"])
    E = r.randrange(5_000_000, 40_000_001, 1_000_000)
    D = r.randrange(0, int(0.5 * E) + 1, 500_000)
    egen = E - D
    Vm = round(egen * r.choice([2.5, 3, 4, 5, 6, 8]) / 5_000_000) * 5_000_000
    andel = r.choice([0.2, 0.25, 0.4, 0.5, 0.6, 0.75])
    bank = r.randrange(0, 3_000_001, 250_000)
    spm = tur("frm-unot1", ["skatt", "fv", "skatt"])
    fv = andel * egen * 0.8
    if not heltall(fv) or Vm <= egen * 1.5:
        raise Avvis("dårlige tall")
    f_emi = andel * Vm * 0.8
    f_uten = andel * egen
    f_brutto = andel * E * 0.8
    if spm == "fv":
        riktig = fv
        kand = [
            (f_emi, f"Emisjonsprisen brukt: {pst(andel, 0)} × {tall(Vm)} × 80 % = {tall(f_emi)}. Unoterte aksjer "
                    f"verdsettes av selskapets skattemessige formuesverdi, ikke av en markedspris."),
            (f_uten, f"Rabatten glemt: {pst(andel, 0)} × {tall(egen)} = {tall(f_uten)}. Unoterte aksjer får også "
                     f"20 % rabatt."),
            (f_brutto, f"Selskapets gjeld glemt: {pst(andel, 0)} × {tall(E)} × 80 % = {tall(f_brutto)}. Grunnlaget er "
                       f"eiendelene minus gjelden."),
        ]
        if D == 0:
            kand = kand[:2] + [(andel * Vm, f"Emisjonsprisen brukt uten rabatt: {pst(andel, 0)} × {tall(Vm)} = "
                                            f"{tall(andel * Vm)}.")]
        sporsmal_tekst = f"Hva er formuesverdien av {gen(navn)} aksjer i {selskap}?"
    else:
        W = fv + bank
        if W <= B1 + 200_000:
            raise Avvis("under bunnfradraget")
        riktig = fskatt(W)
        kand = [
            (fskatt(f_emi + bank), f"Emisjonsprisen brukt: aksjene blir {tall(f_emi)} og skatten "
                                   f"{talla(fskatt(f_emi + bank))}. Unoterte aksjer verdsettes av selskapets "
                                   f"skattemessige formuesverdi."),
            (fskatt(f_uten + bank), f"Rabatten glemt: aksjene blir {tall(f_uten)} og skatten "
                                    f"{talla(fskatt(f_uten + bank))}."),
            (fskatt(f_brutto + bank), f"Selskapets gjeld glemt: aksjene blir {tall(f_brutto)} og skatten "
                                      f"{talla(fskatt(f_brutto + bank))}."),
            (0.01 * W, f"Bunnfradraget glemt: {tall(W)} × 1,0 % = {talla(0.01 * W)}."),
        ]
        sporsmal_tekst = f"Hva betaler {navn} i formuesskatt?"
    valgt = velg(r, riktig, kand)
    bank_tekst = (f" I tillegg har {navn} {kr(bank)} i bankinnskudd." if bank else "") + f" {navn} har ingen gjeld selv."
    gjeld_s = f"gjeld på {kr(D)}" if D else "ingen gjeld"
    regel = ("Unoterte aksjer verdsettes til 80 % av selskapets skattemessige formuesverdi, altså eiendelene minus "
             "gjelden")
    if spm == "skatt":
        regel += (". Bankinnskudd teller 100 %. Formuesskatten er 1,0 % av nettoformuen over kr 1 900 000 og 1,1 % "
                  "av den delen som overstiger kr 21 500 000")
    q = (f"<p>En emisjon har nettopp priset det unoterte selskapet {selskap} til {kr(Vm)}. Selskapet har eiendeler med "
         f"skattemessig verdi {kr(E)} og {gjeld_s}. {navn} er enslig og eier {pst(andel, 0)} av aksjene."
         + (bank_tekst if spm == "skatt" else "") + "</p>"
         f"<p>{regel} [dagens regel, 2026].</p><p>{sporsmal_tekst}</p>")
    alternativer = [R(kra(riktig), riktig)] + [F(kra(v), f, v) for v, f in valgt]
    egen_regn = (f"{tall(E)} − {tall(D)} = {tall(egen)}" if D else
                 f"{tall(E)}, siden selskapet ikke har gjeld")
    if spm == "fv":
        kort = (f"<p><b>{kra(riktig)}.</b> Selskapets formuesverdi er {egen_regn}. "
                f"{pst(andel, 0)} × {tall(egen)} × 80 % = {tall(fv)}.</p>")
    else:
        kort = (f"<p><b>{kra(riktig)}.</b> Aksjene: {pst(andel, 0)} × {tall(egen)} × 80 % = {tall(fv)}. "
                f"({tall(fv)} + {tall(bank)} − 1 900 000) × 1,0 % = {talla(riktig)}.</p>")
    full = ("<p><b>Hvordan unoterte aksjer verdsettes.</b> Et unotert selskap har ingen børskurs. Formuesskatten "
            "bruker derfor selskapets egen skattemessige formuesverdi: eiendelene minus gjelden, verdsatt etter "
            "skattereglene. Hver aksjonær får sin andel av det tallet og så kommer aksjerabatten på 20 %. En emisjon "
            "eller et salg til en høy pris endrer ikke formuesverdien. Det er grunnen til at unoterte aksjer ofte "
            "kommer inn langt under markedsverdien.</p>"
            f"<p><b>Steg 1: selskapets formuesverdi.</b> {egen_regn}. Emisjonsprisen på "
            f"{tall(Vm)} brukes ikke.</p>"
            f"<p><b>Steg 2: andelen og rabatten.</b> {pst(andel, 0)} × {tall(egen)} = {tall(andel * egen)}. Med rabatten: "
            f"{tall(andel * egen)} × 80 % = <b>{tall(fv)}</b>.</p>"
            + (f"<p><b>Steg 3: skatten.</b> Nettoformuen er {tall(fv)} + {tall(bank)} = {tall(fv + bank)}. "
               f"({tall(fv + bank)} − 1 900 000) × 1,0 % = <b>{kra(riktig)}</b>.</p>" if spm == "skatt" else "")
            + f"<p><b>Kontroll.</b> Formuesverdien er {pst(fv / (andel * Vm))} av det emisjonen priser aksjene til. "
              f"Ligger tallet ditt nær emisjonsprisen, har du brukt markedsverdien.</p>"
            "<p><b>Husk:</b> unotert = andel × (eiendeler − gjeld) × 80 %. Emisjonsprisen er en felle.</p>")
    return ferdig("frm-unot1", sp(q, alternativer, kort, full, hjelp=HJ_VAR["frm-unot1"][spm]))


# ===========================================================================
# STATISKE SPØRSMÅL
# ===========================================================================

st("frm-s01", "begrep",
   q="<p>I formuesskatten fordeles gjelden på eiendelene. Den delen som havner på aksjer, gir bare 80 % fradrag. "
     "Hva er begrunnelsen for at gjelden avkortes?</p>",
   alt=[
       R("Ellers ville aksjerabatten virket to ganger, ned på eiendelen og opp på fradraget"),
       F("Lån til aksjer er mer risikabelt, så staten vil ikke subsidiere det fullt ut",
         "Risiko har ingenting med regelen å gjøre. Avkortingen speiler rabatten på eiendelen."),
       F("Regelen hindrer at nettoformuen blir negativ for skattytere med mye gjeld",
         "Nettoformuen kan godt bli negativ. En belånt primærbolig gir ofte en negativ kolonne og den motregnes."),
       F("Renter på aksjelån gir ikke rentefradrag og formuesskatten følger inntektsskatten",
         "Renter er fradragsberettigede uansett hva lånet brukes til. Avkortingen gjelder gjeldsfradraget i "
         "formuesskatten."),
   ],
   kort="<p><b>Rabatten ville virket to ganger.</b> Aksjer for 1 mill. kjøpt med 1 mill. i lån har formuesverdi "
        "800 000. Med fullt gjeldsfradrag ville nettobidraget blitt −200 000 og senket skatten på annen formue.</p>",
   full="<p><b>Hva regelen gjør.</b> Gjelden fordeles på eiendelene etter bruttoverdi. Den delen som havner på en "
        "eiendel med 20 % rabatt, gir bare 80 % fradrag. Gjeld og eiendel måles med samme målestokk.</p>"
        "<p><b>Steg 1: uten regelen.</b> Ta det enkleste tilfellet: aksjene er din eneste eiendel, kjøpt for 1 000 000 "
        "med 1 000 000 i lån. Aksjene teller 800 000. Trekker du fra hele gjelden, blir nettoformuen "
        "800 000 − 1 000 000 = −200 000. Du har ikke blitt fattigere. Hadde du hatt annen formue, ville dette minuset "
        "senket skatten på den.</p>"
        "<p><b>Steg 2: med regelen.</b> Hele gjelden henføres til aksjene, siden de er eneste eiendel. Den avkortes til "
        "800 000. Nettoformuen blir 800 000 − 800 000 = 0: lånet og aksjene veier hverandre opp.</p>"
        "<p><b>Merk.</b> Null kommer ut bare i dette isolerte tilfellet. Har du også bankinnskudd eller bolig, fordeles "
        "gjelden på alle eiendelene. Aksjekolonnen blir ikke null. Poenget er det samme: rabatten skal senke "
        "verdsettingen av aksjen, ikke skape et fradrag av ingenting.</p>"
        "<p><b>Unntaket.</b> Primærboligen er tatt ut av regelen med vilje, slik at boligrabatten kommer eieren fullt "
        "til gode.</p>"
        "<p><b>Husk:</b> 20 % rabatt på eiendelen betyr 20 % avkorting av gjelden henført dit.</p>")

st("frm-s02", "begrep",
   q="<p>Gjeld som henføres til en primærbolig, avkortes ikke i formuesskatten, selv om boligen bare teller 25 %. "
     "Hva er grunnen?</p>",
   alt=[
       R("Lovgiver ville at boligrabatten skulle komme eieren fullt til gode"),
       F("Primærboligen har ingen verdsettingsrabatt, så det er ingenting å avkorte",
         "Primærboligen har den største rabatten i systemet, 75 % opp til terskelen."),
       F("Boliglån er sikret med pant i boligen og pantsikret gjeld gir alltid fullt fradrag",
         "Pantet spiller ingen rolle. Gjelden fordeles etter bruttoverdi uansett hva den er sikret i."),
       F("Gjelden på boligen føres over på bankinnskuddet, som ikke har rabatt",
         "Ingen gjeld flyttes. Gjelden fordeles på alle eiendelene etter bruttoverdi, også på boligen."),
   ],
   kort="<p><b>Det er tilsiktet.</b> Lovgiver ville at boligrabatten skulle komme eieren fullt til gode. Derfor gir "
        "en belånt primærbolig ofte et negativt bidrag til nettoformuen.</p>",
   full="<p><b>Hva regelen sier.</b> Skatteloven § 4-19 fordeler gjelden etter bruttoverdi og gjeld henført til "
        "eiendeler med rabatt avkortes. Primærboligen er unntatt: den teller med full verdi i fordelingsnøkkelen, men "
        "gjelden dit avkortes ikke.</p>"
        "<p><b>Steg 1: hva det gir.</b> En bolig til 6 000 000 med 3 000 000 i gjeld henført dit teller 1 500 000. "
        "Gjelden står på 3 000 000. Kolonnen blir 1 500 000 − 3 000 000 = −1 500 000.</p>"
        "<p><b>Steg 2: hvorfor.</b> Hadde gjelden vært avkortet med 75 %, ville kolonnen blitt "
        "1 500 000 − 750 000 = 750 000. Boligrabatten ville vært nøytralisert. Lovgiver ville at eie av egen bolig "
        "skulle være gunstig i formuesskatten, så kombinasjonen 25 % verdi og 100 % gjeldsfradrag er valgt med "
        "vilje.</p>"
        "<p><b>Merk.</b> Den negative kolonnen motregnes mot de andre eiendelene. Den senker altså skatten på "
        "aksjer og bankinnskudd. Det er slik regelen skyver kapital mot bolig.</p>"
        "<p><b>Husk:</b> gjeld på primærbolig avkortes aldri. Å avkorte den med 75 % er den dyreste enkeltfeilen i "
        "gjeldsfordelingen.</p>")

st("frm-s03", "fakta",
   q="<p>Når gjelden fordeles forholdsmessig på eiendelene i formuesskatten, hva fordeles den etter?</p>",
   alt=[
       R("Eiendelenes bruttoverdi, før verdsettingsrabatt"),
       F("Eiendelenes formuesverdi, etter verdsettingsrabatt",
         "Den vanligste feilen. Rabatten brukes først på gjelden som er henført, ikke i nøkkelen."),
       F("Hvilken eiendel lånet faktisk har finansiert",
         "Formålet med lånet spiller ingen rolle. Fordelingen er forholdsmessig for all gjeld."),
       F("Eiendelenes kostpris, altså det du betalte for dem",
         "Kostprisen er skjermingsgrunnlaget i aksjonærmodellen. Her er det markedsverdien før rabatt som teller."),
   ],
   kort="<p><b>Bruttoverdien.</b> Markedsverdien før rabatt er fordelingsnøkkelen. Rabatten kommer først inn når "
        "gjelden henført til en rabattert eiendel avkortes.</p>",
   full="<p><b>Hva fordelingen er.</b> Gjelden hører ikke til én eiendel. Den spres på alle eiendelene i forhold til "
        "hvor mye de er verdt før rabatt.</p>"
        "<p><b>Steg 1: et eksempel.</b> Primærbolig 4 800 000, aksjer 1 000 000 og bank 200 000, til sammen "
        "6 000 000. Gjelden er 1 800 000 (H2024 oppgave 6). Aksjene har andel 1 000 000/6 000 000 = 16⅔ % og får "
        "300 000 av gjelden.</p>"
        "<p><b>Steg 2: avkortingen.</b> 300 000 × 20 % = 60 000 i reduksjon. Nettoformuen blir 2 200 000 − 1 740 000 "
        "= 460 000.</p>"
        "<p><b>Steg 3: feilen.</b> Med formuesverdiene som nøkkel (1 200 000, 800 000 og 200 000) får aksjene "
        "800 000/2 200 000 av gjelden og svaret blir 530 909. Tallet stod ikke blant alternativene. Treffer du ingen "
        "rute, har du gjort en metodefeil.</p>"
        "<p><b>Kontroll.</b> Gjelden henført til eiendelene skal summere til hele gjelden: 1 440 000 + 300 000 + "
        "60 000 = 1 800 000 ✓.</p>"
        "<p><b>Husk:</b> nøkkel = bruttoverdi. Rabatt = avkorting etterpå.</p>")

st("frm-s04", "paastand",
   q="<p>Vurder to påstander om forholdsmessig gjeldsreduksjon i formuesskatten [dagens regel].</p>"
     "<p>I: Gjeld som henføres til næringseiendom, reduseres med 20 %.<br>"
     "II: Gjeld som henføres til en sekundærbolig, reduseres med 20 %.</p>",
   alt=[
       R("Bare I er riktig"),
       F("Bare II er riktig", "Sekundærbolig verdsettes til 100 % og utløser ingen reduksjon. Næringseiendom har "
                              "20 % rabatt og utløser den."),
       F("Begge er riktige", "Sekundærbolig har ingen rabatt, så gjelden dit står fullt."),
       F("Ingen er riktige", "Næringseiendom verdsettes til 80 % og gjelden henført dit reduseres med 20 %."),
   ],
   kort="<p><b>Bare I.</b> Næringseiendom har 20 % rabatt og utløser avkorting. Sekundærbolig har ingen rabatt og "
        "utløser ingen avkorting.</p>",
   full="<p><b>Regelen.</b> Gjeld avkortes bare når den henføres til en eiendel med rabatt som utløser avkorting. "
        "Det gjelder aksjer, aksjefond, næringseiendom, driftsmidler og andeler i deltakerfastsatte selskaper, alle "
        "med 20 %. Primærboligen har rabatt, men er unntatt fra avkortingen.</p>"
        "<p><b>Påstand I.</b> Næringseiendom verdsettes til 80 %. Gjelden henført dit gir 80 % fradrag. Riktig.</p>"
        "<p><b>Påstand II.</b> En sekundærbolig verdsettes til 100 %, uten rabatt. Det er ingenting å speile, så "
        "gjelden dit gir fullt fradrag. Gal.</p>"
        "<p><b>Merk.</b> Spør: har eiendelen en rabatt på 20 %? Ja for næringseiendom, nei for sekundærbolig. "
        "Uten rabatt er det ingen avkorting.</p>"
        "<p><b>Hvorfor.</b> Avkortingen skal speile rabatten på eiendelen. Uten rabatt er det ingenting å speile, så gjelden henført til sekundærbolig og bank gir fullt fradrag.</p>"
        "<p><b>Husk:</b> 20 % rabatt gir 20 % avkorting. 0 % rabatt gir ingen. Primærboligen er unntaket med rabatt "
        "uten avkorting.</p>",
   rekkefolge="fast")

st("frm-s05", "paastand",
   q="<p>Vurder to påstander om gjeldsfordelingen i formuesskatten [dagens regel].</p>"
     "<p>I: Gjeld som henføres til primærboligen, reduseres med 75 %.<br>"
     "II: Gjeld som henføres til andeler i et rent aksjefond, reduseres med 20 %.</p>",
   alt=[
       F("Bare I er riktig", "Gjeld henført til primærbolig reduseres ikke. Aksjefond utløser reduksjon på 20 %."),
       R("Bare II er riktig"),
       F("Begge er riktige", "Primærboligen har 75 % rabatt, men gjelden dit avkortes ikke. Det er den dyreste "
                             "enkeltfeilen i gjeldsfordelingen."),
       F("Ingen er riktige", "Aksjeandeler i fond verdsettes til 80 % og gjelden henført dit reduseres med 20 %."),
   ],
   kort="<p><b>Bare II.</b> Aksjefond har 20 % rabatt og utløser avkorting. Primærboligens gjeld avkortes "
        "ikke.</p>",
   full="<p><b>Regelen.</b> Gjelden fordeles etter bruttoverdi. Den delen som henføres til eiendeler med 20 % rabatt, "
        "som aksjer og aksjefond, reduseres med 20 %. Primærboligen er unntatt med vilje: rabatten på boligen skal "
        "komme eieren fullt til gode.</p>"
        "<p><b>Påstand I.</b> Gal. Formuesverdien av primærboligen er 25 %, men gjelden dit trekkes fra fullt.</p>"
        "<p><b>Påstand II.</b> Riktig. Et rent aksjefond teller 80 % og gjelden henført dit gir 80 % fradrag.</p>"
        "<p><b>Kontroll med tall.</b> Bolig 5 000 000 og aksjefond 5 000 000, gjeld 5 000 000 (H2025 oppgave 2). "
        "Hver får 2 500 000 av gjelden. Riktig fradrag: 2 500 000 + 2 500 000 × 80 % = 4 500 000. Nettoformuen blir "
        "5 250 000 − 4 500 000 = 750 000. Avkorter du boliggjelden også, blir fradraget 625 000 + 2 000 000 = "
        "2 625 000 og nettoformuen 2 625 000.</p>"
        "<p><b>Husk:</b> bolig: rabatt uten avkorting. Aksjer og fond: rabatt med avkorting.</p>",
   rekkefolge="fast")

st("frm-s06", "fakta",
   q="<p>Fra 2024 til 2026 er den kommunale andelen av formuesskatten halvert, fra 0,70 % til 0,35 %. Hva betyr "
     "det for skattyterne?</p>",
   alt=[
       F("Samlet sats er satt ned fra 1,0 % til 0,65 % i trinn 1",
         "Den statlige satsen er hevet like mye som den kommunale er satt ned. Samlet sats er fortsatt 1,0 %."),
       R("Ingenting for skatten: staten har hevet sin sats like mye"),
       F("Formuesskatten er blitt en ren statlig skatt fra 2026",
         "Kommunene har fortsatt 0,35 %. Bare fordelingen mellom stat og kommune er endret."),
       F("Skattytere i kommuner med lav sats betaler mindre enn andre",
         "Endringen er en omfordeling av provenyet. Samlet sats er 1,0 % og 1,1 % for alle."),
   ],
   kort="<p><b>Ingen skatteregning endres.</b> Den statlige satsen er hevet fra 0,30 % til 0,65 % i trinn 1, så "
        "samlet sats er fortsatt 1,0 % og 1,1 %.</p>",
   full="<p><b>Hva som er endret.</b> Formuesskatten består av en kommunal og en statlig del. Den kommunale "
        "maksimalsatsen er 0,70 % i 2024, 0,525 % i 2025 og 0,35 % i 2026. Den statlige satsen er hevet like mye: "
        "0,30 %, 0,475 % og 0,65 % i trinn 1.</p>"
        "<p><b>Steg 1: summen.</b> 0,70 + 0,30 = 1,0. 0,525 + 0,475 = 1,0. 0,35 + 0,65 = 1,0. I trinn 2 er "
        "statens sats 0,40 %, 0,575 % og 0,75 %. Summen er 1,1 % hvert år.</p>"
        "<p><b>Steg 2: hva det betyr.</b> En skattyter betaler nøyaktig det samme. Provenyet flyttes fra kommunene "
        "til staten og kommunene kompenseres gjennom inntektssystemet.</p>"
        "<p><b>Kontroll.</b> En enslig med nettoformue 10 000 000 betaler (10 000 000 − 1 900 000) × 1,0 % = 81 000 "
        "både før og etter, regnet med 2026-bunnfradraget. Det som har endret seg fra 2024, er bunnfradraget "
        "(1 700 000 til 1 900 000), ikke satsen.</p>"
        "<p><b>Husk:</b> kommunal andel 0,70 → 0,525 → 0,35. Samlet sats 1,0 % og 1,1 %, uendret.</p>")

st("frm-s07", "fakta",
   q="<p>Hva er bunnfradraget og innslagspunktet for satsen 1,1 % for ektefeller som skattlegges under ett for "
     "formue i 2026?</p>",
   alt=[
       F("kr 1 900 000 og kr 21 500 000, regnet på samlet nettoformue",
         "Dette er grensene for en enslig. Ektefeller under ett har begge doblet."),
       F("kr 3 800 000 og kr 21 500 000, regnet på samlet nettoformue",
         "Bare bunnfradraget doblet. Innslagspunktet dobles også."),
       F("kr 3 400 000 og kr 40 000 000, regnet på samlet nettoformue",
         "Dette er 2024-grensene for ektefeller. I 2026 er de 3 800 000 og 43 000 000."),
       R("kr 3 800 000 og kr 43 000 000, regnet på samlet nettoformue"),
   ],
   kort="<p><b>kr 3 800 000 og kr 43 000 000.</b> Begge grensene for en enslig dobles og regnes på parets samlede "
        "nettoformue.</p>",
   full="<p><b>Regelen.</b> Ektefeller skattlegges under ett for formue. Formuene legges sammen og paret får dobbelt "
        "bunnfradrag og dobbelt innslagspunkt. For 2026 er en enslig sine grenser kr 1 900 000 og kr 21 500 000, så "
        "parets er kr 3 800 000 og kr 43 000 000.</p>"
        "<p><b>Steg 1: et eksempel.</b> Et par med samlet nettoformue 30 000 000 ligger under 43 000 000 og betaler "
        "(30 000 000 − 3 800 000) × 1,0 % = 262 000.</p>"
        "<p><b>Steg 2: feilen.</b> Dobler du bunnfradraget, men glemmer innslagspunktet, legger du på "
        "0,1 % × (30 000 000 − 21 500 000) = 8 500 for mye og får 270 500.</p>"
        "<p><b>Kontroll.</b> Doble grenser på samlet formue gir det samme som to enslige med halvparten hver: "
        "2 × (15 000 000 − 1 900 000) × 1,0 % = 262 000 ✓.</p>"
        "<p><b>Husk:</b> 2026: enslig 1,9 og 21,5 mill., ektefeller 3,8 og 43 mill.</p>")

st("frm-s08", "fakta",
   q="<p>Hvordan verdsettes en primærbolig i formuesskatten for inntektsåret 2026?</p>",
   alt=[
       F("25 % av verdien opp til kr 10 000 000 og 70 % av verdien over",
         "Det var regelen i 2024 og 2025. Terskelen ble hevet til 14 mill. for 2026."),
       F("25 % av hele verdien, uansett hvor dyr boligen er",
         "Det var regelen i de eldste settene (H2016, H2019). Nå har dyre boliger et sjikt med 70 %."),
       R("25 % av verdien opp til kr 14 000 000 og 70 % av verdien over"),
       F("70 % av verdien opp til kr 14 000 000 og 25 % av verdien over",
         "Sjiktene er byttet. Rabatten er størst i det nederste sjiktet."),
   ],
   kort="<p><b>25 % opp til kr 14 000 000, 70 % over.</b> Terskelen ble hevet fra 10 mill. i revidert "
        "nasjonalbudsjett i mai 2026, med virkning for hele inntektsåret.</p>",
   full="<p><b>Regelen.</b> Primærboligen deles i to sjikt. Delen opp til terskelen teller 25 %, delen over teller "
        "70 %. Terskelen er kr 14 000 000 for 2026. Den var kr 10 000 000 i 2024 og 2025.</p>"
        "<p><b>Steg 1: en bolig til 18 000 000.</b> 14 000 000 × 25 % = 3 500 000 og 4 000 000 × 70 % = 2 800 000. "
        "Formuesverdi 6 300 000.</p>"
        "<p><b>Steg 2: samme bolig med den gamle terskelen.</b> 10 000 000 × 25 % = 2 500 000 og 8 000 000 × 70 % = "
        "5 600 000. Formuesverdi 8 100 000.</p>"
        "<p><b>Kontroll.</b> Hevingen flytter 4 000 000 fra 70 %-sjiktet til 25 %-sjiktet: 4 000 000 × 45 % = "
        "1 800 000, som er 8 100 000 − 6 300 000 ✓. Ved 1,0 % er det 18 000 kroner mindre i skatt hvert år.</p>"
        "<p><b>Husk:</b> 14 mill. gjelder 2026. Et eksamenssett fra 2024 eller 2025 bruker 10 mill. Bruk alltid "
        "tallene oppgaven gir.</p>")

st("frm-s09", "begrep",
   q="<p>I en gjeldsfordeling blir kolonnen for primærboligen ofte negativ: formuesverdien er lavere enn gjelden som "
     "henføres dit. Hvorfor?</p>",
   alt=[
       R("Boligen teller 25 %, mens gjelden dit trekkes fra fullt"),
       F("Gjelden fordeles etter formuesverdi, så boligen får for mye gjeld",
         "Gjelden fordeles etter bruttoverdi. Boligen får sin andel av gjelden etter markedsverdien."),
       F("Boligen får både 75 % rabatt på verdien og 75 % avkorting av gjelden",
         "Da ville kolonnen blitt positiv. Gjelden på primærboligen avkortes ikke."),
       F("Det er en regnefeil: kolonnen skal settes til null før du summerer",
         "Negative kolonner er riktige og skal motregnes. Setter du den til null, blir nettoformuen for høy."),
   ],
   kort="<p><b>25 % verdi mot 100 % gjeldsfradrag.</b> Kolonnen blir negativ når gjelden er mer enn 25 % av "
        "eiendelenes bruttoverdi. Den motregnes mot de andre kolonnene.</p>",
   full="<p><b>Hva som skjer.</b> Primærboligen teller bare 25 % av verdien. Gjelden fordeles etter bruttoverdi, så "
        "boligen får sin fulle andel av gjelden og den andelen avkortes ikke.</p>"
        "<p><b>Steg 1: tallene fra H2024 oppgave 6.</b> Boligen er 4 800 000 av 6 000 000, altså 80 %. Gjelden er "
        "1 800 000, så boligen får 1 440 000. Formuesverdien er 1 200 000. Kolonnen: 1 200 000 − 1 440 000 = "
        "−240 000.</p>"
        "<p><b>Steg 2: når blir den negativ?</b> Boligens andel av gjelden er G × P/ΣBV og verdien er 25 % × P. "
        "Kolonnen er negativ når G/ΣBV er over 25 %, altså når gjelden er mer enn en firedel av bruttoformuen.</p>"
        "<p><b>Kontroll.</b> Sum av kolonnene: −240 000 + 560 000 + 140 000 = 460 000, som er nettoformuen. Setter "
        "du boligkolonnen til null, får du 700 000.</p>"
        "<p><b>Husk:</b> en negativ boligkolonne er tilsiktet og motregnes.</p>")

st("frm-s10", "begrep",
   q="<p>Hvorfor er formuesverdien av unoterte aksjer ofte langt lavere enn av børsnoterte aksjer med samme "
     "markedsverdi?</p>",
   alt=[
       F("Unoterte aksjer har 45 % rabatt, mens børsnoterte har 20 %",
         "Begge har 20 % rabatt i dag. 45 % var aksjerabatten i 2021."),
       F("Unoterte aksjer er fritatt for formuesskatt opp til kr 10 000 000",
         "Det finnes ikke noe slikt fritak. De verdsettes bare ut fra et annet grunnlag."),
       F("De verdsettes til kostprisen, som som regel er lavere enn markedsverdien",
         "Kostprisen brukes i skjermingen. Formuesverdien bygger på selskapets eiendeler minus gjeld."),
       R("De verdsettes av selskapets formuesverdi, ikke av markedsprisen"),
   ],
   kort="<p><b>Grunnlaget er selskapets formuesverdi.</b> Eiendelene minus gjelden, verdsatt etter skattereglene, er "
        "ofte langt lavere enn det markedet betaler for framtidig inntjening. Så kommer 20 % rabatt.</p>",
   full="<p><b>To målestokker.</b> En børsnotert aksje verdsettes av børskursen, som priser forventet framtidig "
        "inntjening. En unotert aksje verdsettes av selskapets skattemessige formuesverdi: eiendelene minus "
        "gjelden. Begge får 20 % rabatt.</p>"
        "<p><b>Steg 1: et eksempel.</b> En investor betaler 10 mill. for 10 % av et selskap, som priser hele "
        "selskapet til 100 mill. De 10 millionene er selskapets eneste eiendel. En eier av 45 % har da aksjer til "
        "45 mill. i markedsverdi, men formuesverdi 45 % × 10 000 000 × 80 % = 3 600 000.</p>"
        "<p><b>Steg 2: skatten.</b> (3 600 000 − 1 900 000) × 1,0 % = 17 000 med 2026-satsene, ikke 495 000 som "
        "eieren selv regnet ut fra emisjonsprisen (Anine-regnestykket fra forelesning 1).</p>"
        "<p><b>Merk.</b> SSB anslår at unoterte aksjer i snitt kommer inn til 35–40 % av markedsverdien. For de "
        "aller rikeste er tallet nærmere 10 %.</p>"
        "<p><b>Husk:</b> unotert = (eiendeler − gjeld) × eierandel × 80 %. Det kan gjøre det lønnsomt å ta et "
        "selskap av børs.</p>")

st("frm-s11", "fakta",
   q="<p>Ole eier andeler i et kombinasjonsfond verdt kr 1 000 000. Fondet har 60 % aksjer og 40 % renteplasseringer. "
     "Aksjedelen verdsettes til 80 % og rentedelen til 100 % [dagens regel]. Hva er formuesverdien av andelene?</p>",
   alt=[
       R("kr 880 000"),
       F("kr 800 000", "80 % brukt på hele fondet. Bare aksjedelen har rabatt: rentedelen teller fullt."),
       F("kr 1 000 000", "Ingen rabatt brukt. Aksjedelen på 600 000 teller 80 %."),
       F("kr 480 000", "Bare aksjedelen tatt med: 600 000 × 80 %. Rentedelen på 400 000 er også formue."),
   ],
   kort="<p><b>kr 880 000.</b> 600 000 × 80 % + 400 000 × 100 % = 480 000 + 400 000 = 880 000.</p>",
   full="<p><b>Regelen.</b> Et kombinasjonsfond deles etter aksjeandelen. Aksjedelen får aksjerabatten og teller "
        "80 %. Rentedelen har ingen rabatt og teller 100 % (skatteloven § 4-12 sjette ledd).</p>"
        "<p><b>Steg 1: del fondet.</b> 60 % × 1 000 000 = 600 000 i aksjer og 400 000 i renter.</p>"
        "<p><b>Steg 2: verdsett delene.</b> 600 000 × 80 % = 480 000. 400 000 × 100 % = 400 000.</p>"
        "<p><b>Steg 3: sum.</b> 480 000 + 400 000 = <b>880 000</b>, altså 88 % av andelsverdien.</p>"
        "<p><b>Kontroll.</b> Rabatten er 20 % av aksjedelen: 600 000 × 20 % = 120 000. Da er 1 000 000 − 120 000 = "
        "880 000 ✓. Har Ole gjeld, er det bare disse 120 000 i rabatt som utløser avkorting av gjelden.</p>"
        "<p><b>Husk:</b> kombinasjonsfond: aksjedelen 80 %, rentedelen 100 %.</p>")

st("frm-s12", "fakta",
   q="<p>Hvordan verdsettes en fritidsbolig, for eksempel en hytte, i formuesskatten [dagens regel]?</p>",
   alt=[
       F("Som en primærbolig, til 25 % opp til kr 14 000 000",
         "Primærbolig er boligen du bor i. Fritidsboligen har sin egen regel."),
       R("Til høyst 30 % av dokumentert verdi, etter krav fra eieren"),
       F("Som en sekundærbolig, til 100 % av omsetningsverdien",
         "En fritidsbolig er ikke en sekundærbolig i formuesskatten. Den har en egen, lav verdsetting."),
       F("Til 80 %, som aksjer og næringseiendom",
         "80 % gjelder aksjer, fond og næringseiendom. Fritidsboligen kan kreves satt ned til 30 %."),
   ],
   kort="<p><b>Høyst 30 % av dokumentert verdi.</b> Formuesverdien settes ned etter krav når den overstiger 30 % av "
        "dokumentert omsetningsverdi (skatteloven § 4-10 sjette ledd).</p>",
   full="<p><b>Regelen.</b> Fritidsboliger har ikke primærboligens to sjikt. Formuesverdien fastsettes av "
        "Skatteetaten og den settes ned etter krav fra eieren hvis den overstiger 30 % av dokumentert "
        "omsetningsverdi. Formuesverdiene er videreført nominelt fra 2024.</p>"
        "<p><b>Steg 1: et eksempel.</b> En hytte med dokumentert verdi 4 000 000 kan høyst telle "
        "4 000 000 × 30 % = 1 200 000.</p>"
        "<p><b>Steg 2: sammenlign.</b> Som sekundærbolig ville den telt 4 000 000. Som primærbolig 1 000 000.</p>"
        "<p><b>Gjelden.</b> Fritidsbolig står ikke blant eiendelene som utløser gjeldsreduksjon i skatteloven § 4-19. "
        "Gjeld henført dit avkortes derfor ikke, akkurat som for primærboligen.</p>"
        "<p><b>Merk.</b> Rabatt uten avkorting av gjelden gjelder både primærbolig og fritidsbolig. Rabatt med "
        "avkorting gjelder aksjer, fond og næringseiendom.</p>"
        "<p><b>Husk:</b> fritidsbolig høyst 30 %, sekundærbolig 100 %, primærbolig 25 % og 70 %.</p>")

st("frm-s13", "paastand",
   q="<p>Hvilken påstand om eiendomsskatt på bolig er riktig [dagens regel]?</p>",
   alt=[
       F("Grunnlaget er primærboligens formuesverdi, altså 25 % av verdien",
         "Formuesskattens rabatt gjelder ikke eiendomsskatten. Grunnlaget er 70 % av beregnet verdi."),
       F("Den er statlig og har samme bunnfradrag som formuesskatten",
         "Eiendomsskatten er kommunal og frivillig. Kommunen fastsetter et eventuelt bunnfradrag selv."),
       R("Grunnlaget er 70 % av beregnet verdi, uten fradrag for gjeld"),
       F("Satsen er høyst 1,0 % og den kan økes ett prosentpoeng per år",
         "Satsen er høyst 4 promille for bolig. Første år høyst 1 promille og den kan økes med 1 promille per år."),
   ],
   kort="<p><b>70 % av beregnet verdi, uten gjeldsfradrag.</b> Eiendomsskatten er kommunal og frivillig, med høyst "
        "4 promille for bolig.</p>",
   full="<p><b>To ulike skatter.</b> Formuesskatten er statlig og kommunal etter lov og treffer nettoformuen. "
        "Eiendomsskatten er en frivillig kommunal skatt på eiendommen, uansett gjeld.</p>"
        "<p><b>Steg 1: grunnlaget.</b> Eiendomsskatt = (beregnet omsetningsverdi × 0,7 − eventuelt bunnfradrag) × "
        "promillesats. En bolig til 4 000 000 har grunnlag 2 800 000. Formuesverdien som primærbolig er "
        "1 000 000.</p>"
        "<p><b>Steg 2: skatten.</b> Ved 3 promille og uten bunnfradrag: 2 800 000 × 0,003 = 8 400. Formuesskatten på "
        "samme bolig er null hvis eieren ikke har annen formue, fordi 1 000 000 ligger under bunnfradraget.</p>"
        "<p><b>Kontroll.</b> Grunnlaget for eiendomsskatt er 0,7/0,25 = 2,8 ganger formuesverdien. Blander du dem, "
        "bommer du med nettopp den faktoren.</p>"
        "<p><b>Husk:</b> eiendomsskatt: kommunal, frivillig, 70 %, høyst 4 promille, intet gjeldsfradrag.</p>")

st("frm-s14", "formel",
   q="<p>G er samlet gjeld, BV<sub>i</sub> bruttoverdien av eiendel i før rabatt og ρ<sub>i</sub> rabatten. ΣBV er "
     "summen av bruttoverdiene og ΣFV summen av formuesverdiene. Σ<sub>r</sub> løper over eiendelene som utløser "
     "gjeldsreduksjon (aksjer, aksjefond, næringseiendom). Hvilket uttrykk gir samlet fradragsberettiget gjeld?</p>",
   alt=[
       F("G × [1 − Σ<sub>r</sub>(BV<sub>i</sub> × ρ<sub>i</sub>)/ΣFV]",
         "Nevneren er formuesverdiene. Fordelingsnøkkelen er bruttoverdiene."),
       F("G × [1 − Σ<sub>r</sub>BV<sub>i</sub>/ΣBV]",
         "Rabatten mangler. Da strykes hele gjelden henført til aksjene, ikke 20 % av den."),
       R("G × [1 − Σ<sub>r</sub>(BV<sub>i</sub> × ρ<sub>i</sub>)/ΣBV]"),
       F("G × [1 − Σ(BV<sub>i</sub> × ρ<sub>i</sub>)/ΣBV], primærboligen med",
         "Primærboligens rabatt utløser ingen avkorting. Summen skal bare løpe over aksjer, fond og næringseiendom."),
   ],
   kort="<p><b>G × [1 − Σ<sub>r</sub>(BV<sub>i</sub> × ρ<sub>i</sub>)/ΣBV].</b> Andelen av gjelden som henføres til "
        "rabatterte eiendeler, ganget med rabatten, strykes.</p>",
   full="<p><b>Hva formelen sier.</b> Hver eiendel får gjeld G × BV<sub>i</sub>/ΣBV. For eiendeler som utløser "
        "avkorting, strykes ρ<sub>i</sub> av den gjelden. Summert over alle eiendeler gir det samleformelen.</p>"
        "<p><b>Steg 1: utledningen.</b> Fradragsberettiget gjeld = G − Σ<sub>r</sub>G × (BV<sub>i</sub>/ΣBV) × "
        "ρ<sub>i</sub> = G × [1 − Σ<sub>r</sub>(BV<sub>i</sub> × ρ<sub>i</sub>)/ΣBV].</p>"
        "<p><b>Steg 2: H2024 oppgave 6.</b> G = 1 800 000, aksjer 1 000 000 med ρ = 20 %, ΣBV = 6 000 000. "
        "1 800 000 × (1 − 200 000/6 000 000) = 1 800 000 × 0,9667 = 1 740 000.</p>"
        "<p><b>Kontroll.</b> Regnet per eiendel: aksjene får 300 000, avkortet til 240 000. Bolig og bank får "
        "1 440 000 og 60 000 uavkortet. Sum 1 740 000 ✓.</p>"
        "<p><b>Husk:</b> nevneren er bruttoverdiene og summen i telleren tar bare med eiendeler med avkorting.</p>")

st("frm-s15", "formel",
   q="<p>W er nettoformuen til en enslig, B bunnfradraget og K innslagspunktet for satsen 1,1 %. Hvilket uttrykk gir "
     "formuesskatten for 2026 når W er større enn K?</p>",
   alt=[
       F("1,1 % × (W − B)", "Den høye satsen brukt på hele grunnlaget. 1,1 % gjelder bare det som ligger over K."),
       F("1,0 % × (K − B) + 1,1 % × (W − K − B)",
         "Bunnfradraget trukket fra to ganger. Det brukes bare i trinn 1."),
       R("1,0 % × (K − B) + 1,1 % × (W − K)"),
       F("1,0 % × K + 1,1 % × (W − K) − B",
         "Bunnfradraget trukket fra skatten i stedet for fra grunnlaget."),
   ],
   kort="<p><b>1,0 % × (K − B) + 1,1 % × (W − K).</b> Trinn 1 tar formuen mellom bunnfradraget og innslagspunktet. "
        "Trinn 2 tar det som ligger over.</p>",
   full="<p><b>Hva formelen sier.</b> Formuesskatten har to trinn. Det som ligger under bunnfradraget B, er fritatt. "
        "Mellom B og K er satsen 1,0 %. Over K er satsen 1,1 %. Både B og K måles på nettoformuen.</p>"
        "<p><b>Steg 1: tall.</b> W = 30 000 000, B = 1 900 000, K = 21 500 000. Trinn 1: 19 600 000 × 1,0 % = 196 000. "
        "Trinn 2: 8 500 000 × 1,1 % = 93 500. Sum 289 500.</p>"
        "<p><b>Steg 2: de gale formlene.</b> 1,1 % × 28 100 000 = 309 100. Med bunnfradraget to ganger: "
        "196 000 + 6 600 000 × 1,1 % = 268 600. Med bunnfradraget trukket fra skatten blir tallet negativt.</p>"
        "<p><b>Kontroll.</b> 1,0 % × (W − B) + 0,1 % × (W − K) = 281 000 + 8 500 = 289 500 ✓. Det er samme formel "
        "skrevet om.</p>"
        "<p><b>Husk:</b> bunnfradraget trekkes fra grunnlaget én gang. Den høye satsen gjelder bare over K.</p>")

st("frm-s16", "formel",
   q="<p>M er den beregnede omsetningsverdien av en primærbolig. Hvilket uttrykk gir formuesverdien for 2026 når M er "
     "over kr 14 000 000?</p>",
   alt=[
       R("0,25 × 14 000 000 + 0,70 × (M − 14 000 000)"),
       F("0,25 × M + 0,70 × (M − 14 000 000)",
         "Det nederste sjiktet tar hele M. Bare de første 14 000 000 skal ha 25 %."),
       F("0,25 × 10 000 000 + 0,70 × (M − 10 000 000)",
         "Dette er regelen fra 2024 og 2025. Terskelen er 14 000 000 for 2026."),
       F("0,70 × 14 000 000 + 0,25 × (M − 14 000 000)",
         "Sjiktene er byttet. Rabatten er størst nederst."),
   ],
   kort="<p><b>0,25 × 14 000 000 + 0,70 × (M − 14 000 000).</b> De første 14 millionene teller 25 %, resten "
        "70 %.</p>",
   full="<p><b>Hva formelen sier.</b> Boligen deles i to sjikt. Delen opp til terskelen T verdsettes til 25 %, delen "
        "over til 70 %: 0,25 × min(M, T) + 0,70 × maks(0, M − T). Når M er over T, er min(M, T) = T.</p>"
        "<p><b>Steg 1: en bolig til 20 000 000.</b> 0,25 × 14 000 000 = 3 500 000 og 0,70 × 6 000 000 = 4 200 000. "
        "Formuesverdi 7 700 000.</p>"
        "<p><b>Steg 2: de gale formlene.</b> Overlappende sjikt gir 5 000 000 + 4 200 000 = 9 200 000. Gammel "
        "terskel gir 2 500 000 + 7 000 000 = 9 500 000. Byttede sjikt gir 9 800 000 + 1 500 000 = 11 300 000.</p>"
        "<p><b>Kontroll, fra den gamle terskelen.</b> Hevingen fra 10 til 14 mill. flytter 4 000 000 fra 70 %-sjiktet "
        "til 25 %-sjiktet. 9 500 000 − 4 000 000 × (0,70 − 0,25) = 9 500 000 − 1 800 000 = 7 700 000 ✓.</p>"
        "<p><b>Husk:</b> del boligen først, bruk satsene etterpå.</p>")

st("frm-s17", "tolkning",
   q="<p>Henrik er enslig. Etter verdsetting og gjeldsfordeling er nettoformuen hans kr 1 500 000 for 2026. "
     "Bunnfradraget er kr 1 900 000 og satsen 1,0 %. Hva betyr det?</p>",
   alt=[
       F("Han betaler 1,0 % av kr 1 500 000, altså kr 15 000",
         "Bunnfradraget glemt. Bare det som ligger over 1 900 000, skattlegges."),
       F("Han får et negativt grunnlag på kr 400 000 som framføres til neste år",
         "Ubenyttet bunnfradrag framføres ikke. Det er skjermingen i aksjonærmodellen som framføres."),
       R("Han betaler ingen formuesskatt"),
       F("Han betaler skatt av markedsverdiene i stedet, siden nettoformuen er så lav",
         "Grunnlaget er alltid nettoformuen. Markedsverdiene brukes ikke."),
   ],
   kort="<p><b>Ingen formuesskatt.</b> Nettoformuen er under bunnfradraget på kr 1 900 000, så grunnlaget er null.</p>",
   full="<p><b>Hva bunnfradraget er.</b> De første kr 1 900 000 av nettoformuen er skattefrie for en enslig. Bare det "
        "som ligger over, skattlegges. Det gjør at de fleste ikke betaler formuesskatt i det hele tatt: i 2024 betalte "
        "om lag 15 % av bosatte over 17 år.</p>"
        "<p><b>Steg 1: grunnlaget.</b> maks(0 ; 1 500 000 − 1 900 000) = 0.</p>"
        "<p><b>Steg 2: skatten.</b> 0 × 1,0 % = 0.</p>"
        "<p><b>Merk.</b> Det ubrukte fradraget på 400 000 forsvinner. Det framføres ikke og overføres ikke. Er "
        "Henrik gift og skattlagt under ett, er det parets samlede nettoformue som sammenlignes med "
        "kr 3 800 000.</p>"
        "<p><b>Hva tallet ikke betyr.</b> Nettoformuen kan være lav selv om markedsverdiene er høye, for eksempel med "
        "en dyr, belånt primærbolig. Det er rabattene og gjeldsfordelingen som har gjort jobben.</p>"
        "<p><b>Husk:</b> skatten er 1,0 % × maks(0 ; nettoformue − bunnfradrag).</p>")

st("frm-s18", "begrep",
   q="<p>Du eier børsnoterte aksjer og har bankinnskudd og gjeld. Gjelden er mindre enn bruttoverdien av "
     "eiendelene. Du bruker en del av bankinnskuddet til å nedbetale gjeld. Hva skjer med nettoformuen i "
     "formuesskatten?</p>",
   alt=[
       F("Den er uendret, siden eiendelene og gjelden faller like mye",
         "Det ville stemt uten avkorting. Gjelden du sletter, ga bare delvis fradrag."),
       R("Den faller litt: banken telte fullt, gjelden ga ikke fullt fradrag"),
       F("Den øker, fordi du mister et gjeldsfradrag som var større enn innskuddet",
         "Gjeldsfradraget per krone er under 1, fordi en del av gjelden avkortes. Du mister mindre fradrag enn "
         "formuen faller."),
       F("Den faller med hele beløpet du nedbetaler",
         "Bankinnskuddet faller med hele beløpet, men fradraget faller nesten like mye. Netto er endringen liten."),
   ],
   kort="<p><b>Den faller litt.</b> Bankinnskuddet teller 100 %, mens hver krone gjeld bare ga delvis fradrag fordi "
        "en del er henført til aksjene og avkortet.</p>",
   full="<p><b>Mekanismen.</b> Bankinnskudd har ingen rabatt og teller 100 %. Gjelden fordeles på alle eiendelene og "
        "den delen som havner på aksjene, gir bare 80 % fradrag. En krone gjeld gir derfor mindre enn en krone i "
        "fradrag.</p>"
        "<p><b>Steg 1: før.</b> Aksjer 4 000 000, bank 2 000 000, gjeld 3 000 000. Formuesverdi 3 200 000 + "
        "2 000 000 = 5 200 000. Fradragsberettiget gjeld 3 000 000 × (1 − 800 000/6 000 000) = 2 600 000. Netto "
        "2 600 000.</p>"
        "<p><b>Steg 2: etter å ha nedbetalt 1 000 000.</b> Bank 1 000 000, gjeld 2 000 000. Formuesverdi 4 200 000. "
        "Fradragsberettiget gjeld 2 000 000 × (1 − 800 000/5 000 000) = 1 680 000. Netto 2 520 000.</p>"
        "<p><b>Kontroll.</b> Formuen falt med 1 000 000, fradraget med 920 000. Netto 80 000 lavere ✓.</p>"
        "<p><b>Husk:</b> formuesskatten belønner å eie det rabatterte og gjøre opp det urabatterte.</p>")

st("frm-s19", "fakta",
   q="<p>Når er gevinst ved salg av egen bolig skattefri [dagens regel]?</p>",
   alt=[
       F("Når du har eid den i mer enn fem år, uansett om du har bodd der",
         "Kravet er eid i mer enn ett år og brukt som egen bolig i minst 12 av de siste 24 månedene."),
       F("Aldri: gevinsten skattlegges med 22 %, men tap gir fradrag",
         "Gevinst på egen bolig er skattefri når botidskravet og eiertidskravet er oppfylt."),
       R("Når du har eid den i over ett år og bodd der 12 av de siste 24 månedene"),
       F("Når gevinsten er lavere enn bunnfradraget i formuesskatten",
         "Bunnfradraget gjelder formuesskatten. Gevinstskatten har egne vilkår om eiertid og botid."),
   ],
   kort="<p><b>Eid over ett år og bodd der minst 12 av de siste 24 månedene.</b> Da er gevinsten skattefri og et tap "
        "gir ikke fradrag.</p>",
   full="<p><b>Regelen.</b> Gevinst ved salg av egen bolig er skattefri når du har eid boligen i mer enn ett år og "
        "selv har brukt den som bolig i minst 12 av de siste 24 månedene før salget. Er gevinsten skattefri, er et "
        "eventuelt tap heller ikke fradragsberettiget.</p>"
        "<p><b>Steg 1: et eksempel.</b> Du kjøper en leilighet for 4 000 000, bor der i to år og selger for "
        "4 600 000. Gevinsten på 600 000 er skattefri.</p>"
        "<p><b>Steg 2: hvis du flytter ut.</b> Leier du den ut i to år før du selger, har du ikke bodd der 12 av de "
        "siste 24 månedene. Gevinsten blir skattepliktig med 22 %.</p>"
        "<p><b>Merk.</b> Meglerutgifter er fradragsberettigede bare mot en skattepliktig gevinst. Ved skattefritt "
        "salg er megleren en ren kostnad.</p>"
        "<p><b>Hvorfor det betyr noe her.</b> Skattefri gevinst og lav formuesverdi gjør egen bolig til den mest "
        "skattefavoriserte plasseringen i kurset.</p>"
        "<p><b>Husk:</b> eiertid over ett år, botid 12 av 24 måneder.</p>")

st("frm-s20", "fakta",
   q="<p>Du leier ut en sokkelleilighet i huset du selv bor i, med leieforhold på mer enn 30 dager. Når er "
     "leieinntekten skattefri [dagens regel]?</p>",
   alt=[
       F("Når du selv bruker minst halvparten av boligen, målt etter areal",
         "Halvparten måles etter utleieverdi, ikke kvadratmeter."),
       R("Når du selv bruker minst halvparten, regnet etter utleieverdi"),
       F("Aldri: all leieinntekt er kapitalinntekt og skattlegges med 22 %",
         "Utleie av del av egen bolig er skattefri når du selv bruker mest, målt etter utleieverdi."),
       F("Bare når leien er under kr 10 000 i året, uansett hvor mye du bruker selv",
         "10 000 er grensen for korttidsutleie under 30 dager. Ved langtidsutleie avgjør halvparten-regelen."),
   ],
   kort="<p><b>Når du selv bruker minst halvparten, målt etter utleieverdi.</b> Da er leien skattefri og du får "
        "ingen fradrag for kostnadene.</p>",
   full="<p><b>Regelen.</b> Ved langtidsutleie av del av egen bolig er leieinntekten skattefri når du selv bruker "
        "minst halvparten av boligen, regnet etter utleieverdi. Leier du ut mer enn halvparten, er leien skattefri "
        "bare hvis den samlet er inntil kr 20 000 i året.</p>"
        "<p><b>Steg 1: hvorfor utleieverdi.</b> Det er verdien av bruken loven treffer. En hovedetasje med lys og hage "
        "kan ha høyere utleieverdi enn en like stor kjeller.</p>"
        "<p><b>Steg 2: eksempel.</b> H2021 oppgave 1d: eieren bodde i den delen med høyest utleieverdi. Fasiten var "
        "0 kroner i skattepliktig leieinntekt.</p>"
        "<p><b>Merk.</b> Korttidsutleie (under 30 dager) har en annen regel: de første 10 000 er skattefrie og "
        "85 % av resten skattlegges med 22 %.</p>"
        "<p><b>Husk:</b> langtidsutleie av egen bolig: skattefri når du bruker minst halvparten, etter "
        "utleieverdi.</p>")

st("frm-s21", "fakta",
   q="<p>Hva er nettoformuen som formuesskatten regnes av?</p>",
   alt=[
       F("Markedsverdien av eiendelene minus all gjeld",
         "Formuesskatten bruker formuesverdier etter rabatt, ikke markedsverdier."),
       F("Formuesverdiene etter rabatt minus all gjeld, uten avkorting",
         "Gjeld henført til aksjer, fond og næringseiendom avkortes med rabatten."),
       F("Formuesverdiene etter rabatt minus gjeld og minus bunnfradraget",
         "Bunnfradraget trekkes fra etterpå. Nettoformuen er tallet før bunnfradraget."),
       R("Formuesverdiene etter rabatt minus fradragsberettiget gjeld"),
   ],
   kort="<p><b>Formuesverdier minus fradragsberettiget gjeld.</b> Bunnfradraget og satsen brukes først på "
        "nettoformuen.</p>",
   full="<p><b>Hva nettoformuen er.</b> Nettoformuen er summen av formuesverdiene, altså markedsverdi ganger "
        "(1 − rabatt), minus den gjelden som er fradragsberettiget etter forholdsmessig fordeling.</p>"
        "<p><b>Steg 1: formuesverdiene.</b> Primærbolig 25 % (70 % over 14 mill.), aksjer og fond 80 %, "
        "sekundærbolig og bank 100 %.</p>"
        "<p><b>Steg 2: fradragsberettiget gjeld.</b> Gjelden fordeles etter bruttoverdi. Delen på aksjer, fond og "
        "næringseiendom avkortes med 20 %.</p>"
        "<p><b>Steg 3: nettoformuen.</b> Formuesverdier minus fradragsberettiget gjeld. Først da trekkes "
        "bunnfradraget fra og satsen brukes.</p>"
        "<p><b>Merk.</b> I H2024 oppgave 6 var nettoformuen 460 000, under bunnfradraget. Spørsmålet gjaldt "
        "nettoformuen, så svaret var 460 000, ikke null. Les om oppgaven spør etter nettoformuen eller skatten.</p>"
        "<p><b>Feilene.</b> Markedsverdi minus gjeld overvurderer grunnlaget kraftig. Å trekke fra bunnfradraget for tidlig gir et tall som ikke er nettoformuen.</p>"
        "<p><b>Husk:</b> nettoformue er før bunnfradrag. Skatt er etter.</p>")

st("frm-s22", "paastand",
   q="<p>Hvilken påstand om gjeldsfordelingen i formuesskatten er <b>gal</b> [dagens regel]?</p>",
   alt=[
       F("Gjelden fordeles etter eiendelenes verdi før rabatt", "Denne er riktig: nøkkelen er bruttoverdiene."),
       F("Gjeld henført til primærbolig gir fullt fradrag", "Denne er riktig: gjeld på primærbolig avkortes ikke."),
       R("Gjeld henført til bankinnskudd avkortes med 20 %"),
       F("Gjeld henført til næringseiendom avkortes med 20 %",
         "Denne er riktig: næringseiendom har 20 % rabatt og utløser avkorting."),
   ],
   kort="<p><b>Bankinnskuddet.</b> Det har ingen rabatt, så gjelden henført dit gir fullt fradrag. De tre andre "
        "påstandene er riktige.</p>",
   full="<p><b>Regelen i én setning.</b> Gjelden fordeles etter bruttoverdi og den delen som havner på en eiendel "
        "med 20 % rabatt, avkortes med 20 %. Primærboligen er unntatt fra avkortingen.</p>"
        "<p><b>Steg 1: gå gjennom påstandene.</b> Nøkkelen er bruttoverdien: riktig. Primærboliggjeld gir fullt "
        "fradrag: riktig. Næringseiendom har 20 % rabatt og avkorting: riktig.</p>"
        "<p><b>Steg 2: den gale.</b> Bankinnskudd verdsettes til 100 %. Uten rabatt er det ingenting å speile, så "
        "gjelden henført dit står fullt.</p>"
        "<p><b>Merk.</b> I H2024 oppgave 6 fikk banken 60 000 av gjelden og hele beløpet var "
        "fradragsberettiget. Reduksjonen på 60 000 kom bare fra aksjene: 300 000 × 20 %.</p>"
        "<p><b>Hvorfor bank er «dyr».</b> Bankinnskudd teller fullt og gir ingen avkorting. Derfor brukes de som kontrollpost i oppgavene: bankkolonnen skal bare være innskuddet minus gjelden henført dit.</p>"
        "<p><b>Husk:</b> avkorting følger rabatten. Ingen rabatt, ingen avkorting.</p>")

st("frm-s23", "fakta",
   q="<p>Hvilken liste inneholder bare eiendeler som verdsettes til 80 % i formuesskatten [dagens regel]?</p>",
   alt=[
       F("Børsnoterte aksjer, aksjefond, sekundærbolig og næringseiendom",
         "Sekundærbolig har ingen rabatt og teller 100 %."),
       R("Børsnoterte aksjer, aksjefond, unoterte aksjer og næringseiendom"),
       F("Børsnoterte aksjer og aksjefond, mens unoterte aksjer teller 100 %",
         "Unoterte aksjer får også 20 % rabatt, regnet av selskapets formuesverdi."),
       F("Børsnoterte aksjer, rentefond, obligasjoner og næringseiendom",
         "Rentefond og obligasjoner har ingen rabatt og teller 100 %."),
   ],
   kort="<p><b>Aksjer (noterte og unoterte), aksjefond og næringseiendom.</b> Alle har 20 % rabatt og gjeld henført "
        "dit avkortes med 20 %.</p>",
   full="<p><b>Rabattgruppen på 20 %.</b> Børsnoterte aksjer, aksjeandelen i verdipapirfond, unoterte aksjer, "
        "næringseiendom, varebeholdning, driftsmidler og andeler i deltakerfastsatte selskaper verdsettes til 80 %. "
        "Satsen har vært 80 % siden 2023. I 2021 var den 55 %.</p>"
        "<p><b>Steg 1: de uten rabatt.</b> Sekundærbolig, bankinnskudd, obligasjoner og rentefond teller 100 %.</p>"
        "<p><b>Steg 2: boligene.</b> Primærbolig 25 % opp til 14 mill. og 70 % over. Fritidsbolig høyst 30 % av "
        "dokumentert verdi.</p>"
        "<p><b>Merk.</b> Alle eiendelene i 80 %-gruppen utløser avkorting av gjelden. Ingen av dem i 100 %-gruppen "
        "gjør det. Primærbolig og fritidsbolig har rabatt uten avkorting.</p>"
        "<p><b>Gjelden.</b> Det er 80 %-gruppen som styrer gjeldsreduksjonen: samlet fradrag = G × [1 − Σ(BV × 20 %)/ΣBV], summert over disse eiendelene.</p>"
        "<p><b>Husk:</b> aksjer, fond og næring 80 %. Bank og sekundærbolig 100 %.</p>")
