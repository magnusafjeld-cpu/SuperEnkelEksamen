# -*- coding: utf-8 -*-
"""Temaene i eksamenstreningen for FIE432.

   Temaene følger kjernepensumdelene, som igjen følger eksamensblokkene, med
   finansiell psykologi skilt ut fra forsikringen. `vekt` er eksamensvekten 1–5
   (samme kilde som examWeights i manifestet) og styrer hvor mange spørsmål et
   tema får når du trekker fra flere temaer samtidig. `mal` er hvor mange
   spørsmål temaet skal ha i banken; tools/sjekk-trening.js melder avvik.
   `kap` er manualkapitlene og `kjerne` kjernepensumdelen, som gjennomgangen
   lenker til.

   id-ene er lagringsnøkler for valgene dine. De må aldri endres.
"""
TEMAER = [
    dict(id="skattesystem", navn="Skattesystemet og effektiv skatt", kort="Effektiv skatt", vekt=4, kap=[1, 2], kjerne="kj1", mal=60,
         beskrivelse="Trinnskatt, gjennomsnitts- og marginalskatt, progressivitet, effektiv skattesats og tidsverdien av et fradrag."),
    dict(id="aksjonar", navn="Aksjonærmodellen: skjerming, utbytte og gevinst", kort="Aksjonærmodellen", vekt=5, kap=[5, 6], kjerne="kj2", mal=80,
         beskrivelse="Oppjustering og eierskatt, skjerming år for år, gevinst ved salg, samlet skatt på utdelt overskudd og fritaksmetoden."),
    dict(id="formue", navn="Formuesskatt: verdsetting og gjeldsfordeling", kort="Formuesskatt", vekt=4, kap=[7], kjerne="kj3", mal=60,
         beskrivelse="Satser og bunnfradrag, verdsettingsrabattene og den forholdsmessige gjeldsfordelingen."),
    dict(id="avkastningsskatt", navn="Formuesskatt som avkastningsskatt", kort="Avkastningsskatt", vekt=4, kap=[8], kjerne="kj4", mal=50,
         beskrivelse="Ekvivalensen t = τ/r, avkastning og verdi under formuesskatt, og utbyttet som skal betale skatten."),
    dict(id="insidens", navn="Hvem betaler skatten: insidens", kort="Insidens", vekt=5, kap=[11], kjerne="kj5", mal=80,
         beskrivelse="Stykkskatt, ∂p/∂t og ∂P/∂t, elastisitetsregelen, grensetilfellene, proveny og dødvektstap."),
    dict(id="noytralitet", navn="Nøytralitet, bedriftens tilpasning og implisitt skatt", kort="Nøytralitet", vekt=3, kap=[9, 10, 12], kjerne="kj6", mal=45,
         beskrivelse="Kapitalkostnaden F′(K), gjeld mot egenkapital, implisitt skatt og skatt og risiko."),
    dict(id="internasjonal", navn="Internasjonal skatt og exit-skatt", kort="Internasjonal skatt", vekt=3, kap=[13, 6], kjerne="kj7", mal=45,
         beskrivelse="Globalskatteplikt, unntak og kredit, ingen skatteavtale, bosted og exit-skatt."),
    dict(id="portefolje", navn="Sparing og porteføljevalg", kort="Portefølje", vekt=5, kap=[14], kjerne="kj8", mal=80,
         beskrivelse="To aktiva og kapitalmarkedslinjen, Merton med humankapital, sparevalg med ln-nytte og tidsverdi."),
    dict(id="pensjon", navn="Pensjon", kort="Pensjon", vekt=4, kap=[15], kjerne="kj9", mal=55,
         beskrivelse="Folketrygdens beholdning og delingstall, innskudd mot ytelse, OTP, IPS og BSU."),
    dict(id="laan", navn="Lån", kort="Lån", vekt=3, kap=[16], kjerne="kj10", mal=45,
         beskrivelse="Annuitet og serielån, renter og rentefradrag, effektiv rente, kredittkostnad og utlånsforskriften."),
    dict(id="forsikring", navn="Forsikring og forventet nytte", kort="Forsikring", vekt=4, kap=[17], kjerne="kj11", mal=60,
         beskrivelse="Forventet nytte, sikkerhetsekvivalent, maksimal premie, kritisk sannsynlighet og delvis dekning."),
    dict(id="psykologi", navn="Finansiell psykologi", kort="Psykologi", vekt=2, kap=[18], kjerne="kj11", mal=25,
         beskrivelse="Tapsaversjon, overkonfidens, hjemmebias, system 1 og 2, og hvordan man omgår dem."),
]
