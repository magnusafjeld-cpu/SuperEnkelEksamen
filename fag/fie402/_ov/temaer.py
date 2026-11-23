# -*- coding: utf-8 -*-
"""Temaene, delene og eksamensdatoen for «Øv uten stopp» i FIE402.

   Temaene er de samme som i eksamenstreningen (fag/fie402/_trening/temaer.py),
   med samme id-er, så motoren kan slå sammen feilene dine fra begge stedene
   når den velger hva du skal øve på. `vekt` er eksamensvekten 1–5. `del` er
   delen i kurset (EDU_DATA.perDel i sett.js) og styrer fokusknappene.
   `kjerne` er kjernepensumdelen løsningen kan lenke til.

   EKSAMEN er datoen repetisjonen planlegger mot: ingen intervaller går forbi
   den. Etter eksamen gjelder vanlige intervaller.

   id-ene er lagringsnøkler. De må aldri endres.
"""
SPRAK = "en"
EKSAMEN = "2026-12-07"

DELER = [
    {"del": 1, "navn": "Grunnlag og verdsetting med gjeld", "kort": "Del 1"},
    {"del": 2, "navn": "Kapitalstruktur, agentkostnader og informasjon", "kort": "Del 2"},
    {"del": 3, "navn": "Opsjoner, M&A og governance", "kort": "Del 3"},
]

TEMAER = [
    {"id": "tvilling", "navn": "Twin firm and the cost of capital", "kort": "Twin firm", "vekt": 5, "del": 1, "kjerne": "kj1"},
    {"id": "wacc-apv", "navn": "Valuation with leverage: WACC, APV and FTE", "kort": "WACC and APV", "vekt": 5, "del": 1, "kjerne": "kj4"},
    {"id": "mm", "navn": "Modigliani-Miller and recapitalisations", "kort": "MM", "vekt": 5, "del": 2, "kjerne": "kj2"},
    {"id": "skatt", "navn": "Taxes, the tax shield and the trade-off", "kort": "Tax shield", "vekt": 4, "del": 2, "kjerne": "kj3"},
    {"id": "agent", "navn": "Agency costs of debt", "kort": "Agency", "vekt": 4, "del": 2, "kjerne": "kj5"},
    {"id": "info", "navn": "Asymmetric information and issuing securities", "kort": "Information", "vekt": 3, "del": 2, "kjerne": "kj6"},
    {"id": "utbytte", "navn": "Payout policy", "kort": "Payout", "vekt": 3, "del": 2, "kjerne": "kj2"},
    {"id": "opsjoner", "navn": "Options: payoffs, parity and binomial pricing", "kort": "Options", "vekt": 4, "del": 3, "kjerne": "kj7"},
    {"id": "kreditt", "navn": "Debt and equity as options: credit risk", "kort": "Credit risk", "vekt": 4, "del": 3, "kjerne": "kj8"},
    {"id": "realopsjon", "navn": "Real options", "kort": "Real options", "vekt": 5, "del": 3, "kjerne": "kj9"},
    {"id": "ma", "navn": "Mergers and acquisitions", "kort": "M&A", "vekt": 4, "del": 3, "kjerne": "kj10"},
    {"id": "governance", "navn": "Corporate governance and the verbal M&A questions", "kort": "Governance", "vekt": 4, "del": 3, "kjerne": "kj11"},
]
