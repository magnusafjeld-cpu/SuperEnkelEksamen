# -*- coding: utf-8 -*-
"""Temaene i eksamenstreningen for FIE459 Sustainable Finance.

   Ett tema per forelesning, som eksamen («concepts and frameworks learned in
   class»), pluss ett for gjesteforelesningene som ikke er dekket i en
   forelesning: Folketrygdfondet, Fondsfinans og Heidelberg Materials. PwC hører
   til forelesning 7 og DNB til forelesning 11, som i manualen.

   Det finnes ingen tidligere eksamener, så `vekt` (1–5) bygger på syllabusens
   læringsmål og hvor mye forelesningene og kjernepensum vektlegger temaet.
   `mal` er hvor mange spørsmål temaet skal ha. `kap` er manualkapitlet og
   `kjerne` kjernepensumdelen, som gjennomgangen lenker til.

   id-ene er lagringsnøkler for valgene dine. De må aldri endres.

   Oppsettet gjelder hele faget (se tools/bygg-trening.py):
     SPRAK      engelsk, som eksamen
     POENG      ingen minuspoeng: ingenting i kildene sier at feil svar trekker
                (samme valg som wrongFactor: 0 i manifestet)
     REGN_SELV  av: faget har ingen regneoppgaver

   Hurtiginnføringene (INTRO) skrives av skribentene i _intro_<del>.py, én fil
   per skribent, og flettes inn her. Filer som starter med _ lastes ikke som
   spørsmålsmoduler av byggeren.
"""
import glob as _glob
import importlib.util as _ilu
import os as _os

SPRAK = "en"
POENG = {"rett": 1, "feil": 0, "blank": 0}
REGN_SELV = False

TEMAER = [
    dict(id="sf", navn="Sustainable finance and ESG: what it is", kort="SF and ESG", vekt=5, kap=[1], kjerne="kj1", mal=30,
         beskrivelse="CSR, SRI and ESG, value against values, Starks' spectrum and the ladder from finance as usual to SF 3.0."),
    dict(id="etikk", navn="Business ethics", kort="Ethics", vekt=4, kap=[2], kjerne="kj2", mal=30,
         beskrivelse="Ethical theories, ethical decision-making, moral intensity, rationalisations and CSR motives."),
    dict(id="eksternaliteter", navn="Externalities", kort="Externalities", vekt=4, kap=[3], kjerne="kj2", mal=30,
         beskrivelse="Negative and positive externalities, the social optimum, internalisation and its limits."),
    dict(id="stakeholder", navn="Shareholder against stakeholder theory", kort="Stakeholder", vekt=5, kap=[4], kjerne="kj3", mal=30,
         beskrivelse="Friedman, the Business Roundtable, Hart and Zingales, codetermination and the critiques of stakeholderism."),
    dict(id="governance", navn="Governance and behaviour", kort="Governance", vekt=4, kap=[5], kjerne="kj3", mal=30,
         beskrivelse="Agency, boards, ESG-linked pay, investor behaviour and the shareholder and stakeholder models."),
    dict(id="forretningsmodell", navn="Business models and materiality", kort="Business models", vekt=4, kap=[6], kjerne="kj4", mal=30,
         beskrivelse="Integrated value, materiality, the impact criteria and the Oatly case."),
    dict(id="rapportering", navn="Metrics and reporting", kort="Reporting", vekt=5, kap=[7], kjerne="kj4", mal=30,
         beskrivelse="ESG ratings, Integrated Reporting, TCFD, the EU taxonomy, CSRD and SFDR, and the PwC guest lecture."),
    dict(id="investering", navn="Investing for long-term value creation", kort="LTVC investing", vekt=5, kap=[8], kjerne="kj5", mal=30,
         beskrivelse="Investment strategies from exclusion to impact, engagement, active and passive investors."),
    dict(id="esg-priser", navn="ESG integration and asset prices", kort="ESG and prices", vekt=5, kap=[9], kjerne="kj5", mal=30,
         beskrivelse="Risk against mispricing, alpha, the greenium, repricing and the ESG strategies."),
    dict(id="obligasjoner", navn="Non-equity asset classes", kort="Bonds", vekt=4, kap=[10], kjerne="kj6", mal=30,
         beskrivelse="Bond pricing and ratings, green and sustainability-linked bonds, ICMA, Flammer, real estate and derivatives."),
    dict(id="bank", navn="Sustainability in banking", kort="Banking", vekt=4, kap=[11], kjerne="kj6", mal=30,
         beskrivelse="Risk-based against value-based banking, GABV, green and sustainability-linked loans, Pillar 3 and DNB."),
    dict(id="forsikring", navn="Sustainability in insurance", kort="Insurance", vekt=3, kap=[12], kjerne="kj6", mal=30,
         beskrivelse="Pooling, provisions and capital, catastrophe models, VaR, cat bonds, PSI and regulation."),
    dict(id="koalisjoner", navn="Coalitions, governments and transition management", kort="Coalitions", vekt=4, kap=[13], kjerne="kj7", mal=30,
         beskrivelse="Why firms join coalitions, free riding, Ostrom's principles, the role of government and backcasting."),
    dict(id="gjest", navn="Guest lectures: Folketrygdfondet, Fondsfinans and Heidelberg Materials", kort="Guest lectures", vekt=2, kap=[], kjerne=None, mal=24,
         beskrivelse="The pension fund as an owner, an asset manager's view and carbon capture in cement (Brevik)."),
]

INTRO = {}
for _p in sorted(_glob.glob(_os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "_intro_*.py"))):
    _spec = _ilu.spec_from_file_location("fie459_" + _os.path.basename(_p)[:-3], _p)
    _mod = _ilu.module_from_spec(_spec)
    _spec.loader.exec_module(_mod)
    INTRO.update(getattr(_mod, "INTRO", {}))
for _t in TEMAER:
    if _t["id"] in INTRO:
        _t["intro"] = INTRO[_t["id"]]
