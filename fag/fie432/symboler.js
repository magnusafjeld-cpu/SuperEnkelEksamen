/* ============== FIE432 · SYMBOLENE I KJERNEPENSUM ==============
   Hva hvert symbol i formellinjene står for. Motoren (js/bundle-symboler.js)
   viser teksten når du holder over symbolet eller trykker på det.

   Nøkler: grunnform, ^hevet og _senket, som «t_e», «σ_p». En nøkkel uten senket
   skrift dekker alle tidspunktene: «B» forklarer B_t og B_t−1. «E[» og «E(» er
   E foran en parentes, altså forventningen; «U(» er nyttefunksjonen.

   `alle` gjelder i hele kjernepensum. `deler` overstyrer for én del, der samme
   bokstav betyr noe annet: B er bunnfradraget i kj1 og kj3, men
   pensjonsbeholdningen i kj9; L er et lån i kj10 og et tap i kj11.

   `ikke` er ordene som står i formlene (FIE432 skriver mange formler med ord).
   De får ingen forklaring, men står her så tools/sjekk-symboler.js vet at de er
   vurdert. Kontrollen melder alt i en formel som verken er forklart eller her.
   ================================================================ */
window.EDU_DATA = window.EDU_DATA || {};
window.EDU_DATA.symboler = {
  alle: {
    /* Skattesatser */
    "t_e": "eierskatten på utbytte og aksjegevinst: 1,72 × 22 % = 37,84 % [dagens regel].",
    "f": "oppjusteringsfaktoren for utbytte og aksjegevinst: 1,72 [dagens regel].",
    "τ_w": "formuesskattesatsen: 1,0 %, og 1,1 % over innslagspunktet [dagens regel].",

    /* Avkastning og renter */
    "r": "avkastningen eller renten før skatt.",
    "r_etter": "avkastningen etter skatt.",
    "r_f": "risikofri rente.",
    "Σ": "summen over alle leddene.",

    /* Forventning og nytte */
    "E[": "forventet verdi: det sannsynlighetsveide gjennomsnittet.",
    "E(": "forventet verdi: det sannsynlighetsveide gjennomsnittet.",
    "U(": "nyttefunksjonen: hvor godt du har det med en gitt formue.",
    "U": "nyttefunksjonen: hvor godt du har det med en gitt formue.",
  },

  deler: {
    kj1: {
      "T(": "skatten som funksjon av brutto lønn Y.",
      "Y": "brutto lønn.",
      "t": "skattesatsen: den flate satsen i gjennomsnittsskatten, eller 22 % på renter i avkastningen etter skatt.",
      "t̄": "gjennomsnittsskatten: betalt skatt delt på inntekten.",
      "Y_høy": "den høyeste av de to inntektene som sammenlignes.",
      "Y_lav": "den laveste av de to inntektene som sammenlignes.",
      "α": "eierandelen i selskapet.",
      "t_eff": "eierens effektive skattesats, med selskapets skatt og overskudd regnet med.",
      "r_aksje": "avkastningen før skatt på aksjer (utbytte og gevinst).",
      "r_rente": "renten før skatt på et rentebærende papir.",
      "B": "bunnfradraget i inntektsskatten.",
    },
    kj2: {
      "t": "skatten på alminnelig inntekt, 22 % [dagens regel].",
      "S": "skjermingsgrunnlaget: kostprisen pluss ubenyttet skjerming fra året før.",
      "r_s,t": "skjermingsrenten for år t.",
      "D": "utbyttet i år t.",
    },
    kj3: {
      "W": "nettoformuen: formuesverdiene etter rabatt minus fradragsberettiget gjeld.",
      "K": "innslagspunktet for den høyeste satsen, kr 21 500 000 for en enslig [dagens regel].",
      "B": "bunnfradraget i formuesskatten, kr 1 900 000 for en enslig [dagens regel].",
      "G": "samlet gjeld.",
      "BV": "bruttoverdien av et aktivum, markedsverdien før rabatt.",
      "ρ_i": "verdsettingsrabatten for aktivum i: 20 % for aksjer, 75 % for primærbolig under terskelen.",
      "Σ_rabatterte": "summen over aktiva med rabatt som avkorter gjelden: aksjer, aksjefond og næringseiendom.",
    },
    kj4: {
      "t": "avkastningsskatten som gir samme skattebeløp som formuesskatten.",
      "W": "formuesverdien skatten regnes av.",
      "CF": "den årlige kontantstrømmen.",
      "V": "verdien av den evige kontantstrømmen.",
      "D": "bruttoutbyttet eieren må ta ut før skatt.",
    },
    kj5: {
      "P": "konsumentprisen: det kjøperen betaler, med skatten.",
      "p": "produsentprisen: det selgeren sitter igjen med.",
      "t": "stykkskatten per enhet.",
      "D(": "etterspurt mengde ved prisen kjøperen møter.",
      "S(": "tilbudt mengde ved prisen selgeren møter.",
      "D′": "helningen på etterspørselskurven, alltid negativ.",
      "S′": "helningen på tilbudskurven, alltid positiv.",
      "ε_S": "tilbudselastisiteten.",
      "ε_D": "etterspørselselastisiteten.",
      "x_0": "kvantumet før skatten.",
      "x_t": "kvantumet med skatten.",
    },
    kj6: {
      "r": "renten. I implisitt skatt: avkastningen på det skattefavoriserte aktivumet.",
      "R": "avkastningen før skatt på det fullt skattlagte aktivumet.",
      "L": "lånebeløpet.",
      "t_fradrag": "skattesatsen rentefradraget gis til.",
      "t_avkastning": "skattesatsen avkastningen på plasseringen beskattes med.",
      "V": "bedriftens overskudd etter skatt.",
      "F(": "produktfunksjonen: hva kapitalen K gir i produksjon.",
      "F′": "grenseproduktet av kapital: hva den siste kapitalkronen gir.",
      "F′_G": "avkastningskravet til gjeldsfinansiert kapital.",
      "F′_E": "avkastningskravet til egenkapitalfinansiert kapital.",
      "K": "kapitalen bedriften bruker.",
      "rK": "r × K: rentekostnaden på kapitalen.",
      "ArK": "A × r × K: den delen av rentekostnaden som kan trekkes fra i skattegrunnlaget.",
      "At": "A × t: skatteverdien av fradraget for en kapitalkrone.",
      "t": "skattesatsen på overskuddet.",
      "E*": "optimal mengde egenkapitalfinansiert kapital.",
      "G*": "optimal mengde gjeldsfinansiert kapital.",
      "t*": "den implisitte skatten: hvor mye lavere avkastning det skattefavoriserte papiret gir.",
      "E": "forventet resultat før skatt.",
      "E_etter": "forventet resultat etter skatt.",
      "G": "forventet bruttogevinst i de gode utfallene.",
    },
    kj7: {
      "T": "samlet skatt på inntekten.",
      "Y": "inntekten opptjent i kildestaten.",
      "t_kilde": "skattesatsen i kildestaten, der inntekten er opptjent.",
      "t_hjem": "skattesatsen i hjemstaten, der du er bosatt.",
    },
    kj8: {
      "s": "andelen i aktivum 1.",
      "μ_1": "forventet avkastning på aktivum 1.",
      "μ_2": "forventet avkastning på aktivum 2.",
      "μ": "forventet avkastning på aksjemarkedet.",
      "σ_1": "standardavviket til aktivum 1.",
      "σ_2": "standardavviket til aktivum 2.",
      "σ_p": "porteføljens standardavvik.",
      "σ_M": "standardavviket til markedsporteføljen.",
      "σ": "aksjemarkedets standardavvik. I formelen står det kvadrert, som varians.",
      "ρ": "korrelasjonen mellom de to aktivaene.",
      "r_p": "porteføljens avkastning.",
      "r_M": "avkastningen på markedsporteføljen.",
      "w*": "optimal andel av totalformuen i aksjer.",
      "γ": "risikoaversjonen.",
      "F": "finansformuen: det du har plassert i bank, fond og aksjer.",
      "H": "humankapitalen: nåverdien av framtidig arbeidsinntekt.",
      "β_H": "hvor mye humankapitalen svinger med aksjemarkedet: 0 for en sikker jobb, 1 for lønn som følger markedet.",
      "α_F": "andelen av finansformuen i aksjer.",
    },
    kj9: {
      "B": "pensjonsbeholdningen i folketrygden.",
      "g": "lønnsveksten, som er veksten i grunnbeløpet.",
      "G": "grunnbeløpet i folketrygden, kr 136 549 fra 1. mai 2026 [dagens regel].",
      "OTP": "obligatorisk tjenestepensjon fra arbeidsgiveren.",
      "r": "avkastningen på sparingen.",
      "t": "skatten på alminnelig inntekt, 22 %, både på innskudd og uttak.",
    },
    kj10: {
      "A": "terminbeløpet: det du betaler hver termin, renter pluss avdrag.",
      "L": "lånebeløpet.",
      "m": "renten per termin. Månedlig: årsrenten delt på 12.",
      "n": "antall terminer.",
      "k": "antall terminer per år.",
      "r": "den nominelle årsrenten.",
      "r_eff": "den effektive renten: årlig kostnad med gebyrer og rentes rente.",
      "t": "skatten på alminnelig inntekt, 22 %, som rentefradraget gis til.",
      "Σ_t": "summen over alle terminene.",
    },
    kj11: {
      "W": "formuen.",
      "W_i": "formuen i utfall i.",
      "p": "sannsynligheten for skaden.",
      "p_i": "sannsynligheten for utfall i.",
      "p*": "den kritiske sannsynligheten: der forsikringen akkurat lønner seg.",
      "L": "tapet hvis skaden inntreffer.",
      "P": "forsikringspremien.",
      "P_maks": "den høyeste premien du er villig til å betale.",
      "CE": "sikkerhetsekvivalenten: den sikre formuen som er like god som det usikre utfallet.",
      "α": "andelen av tapet forsikringen dekker.",
    },
  },

  ikke: [
    /* Ord i formlene, ikke symboler. */
    "aksjegevinst", "Aksjer", "aktuarisk", "Alternativet", "andel", "andelen", "andre", "annuitetslån", "arbitrasjegevinst",
    "av", "avdrag", "betalt", "boligens", "brutto", "bruttoinntekt", "bunnfradrag", "dekning", "delingstall", "Delvis",
    "dødvektstap", "Effektiv", "egenkapital", "eierens", "Eierens", "eller", "et", "etableringsgebyr", "etter",
    "Exit", "Faller", "finansformuen", "Flat", "for", "formue", "Formuesskatt", "fra", "fradrag", "Fradragsberettiget",
    "full", "Fullstendig", "Fullt", "gebyrer", "gevinst", "gjeld", "grunnlag", "hver", "i", "ikke", "Indifferanse",
    "Ingen", "inne", "inngangsverdi", "innskudd", "inntekt", "inntekter", "Kjøperens", "Kortform", "kostpris", "kredit",
    "kreditfradrag", "krone", "Kritisk", "lån", "lettelse", "likevekten", "likt", "maks", "Maks", "markedsverdi", "med",
    "mellom", "men", "min", "minimum", "minst", "minstefradrag", "Netto", "og", "opp", "opptjening", "Opptjening",
    "Ordinær", "over", "pensjon", "pensjonsgivende", "personfradrag", "premie", "primærbolig", "prosentpoeng", "Proveny",
    "på", "rammes", "rente", "Rentekostnad", "renten", "renter", "restgjeld", "risikopremie", "samlede", "samlet",
    "Samlet", "sannsynlighet", "sats", "selgerens", "selskapets", "Serielån", "skatt", "Skatt", "skatten", "Skattepliktig",
    "skattesats", "skjerming", "Skjermingsfradrag", "skjermingsfradrag", "som", "stresstest", "sum", "så", "termin",
    "termingebyr", "til", "trinn", "trinnskatt", "tapsfradrag", "uavkortet", "ubenyttet", "Ubenyttet", "unntak", "ut",
    "utbytte", "uten", "utgående", "verdi", "år", "årlig", "Årlig", "årsinntekt", "belåningsgrad", "første",
    "salgspris", "lønn", "tåle", "året",
  ],
};
