#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Regner tallene i den korte stigen d3-overvaking (113 · Monitoring the CEO: who and with what).

Stigen er verbal; tallene står i intuisjonen (steg 1), styretellingen (steg 2) og
gratispassasjer-eksempelet med kontroll (steg 3).

    python3 fag/fie402/_sjangre/regn/d3-overvaking.py
"""
from math import isclose


def vis(navn, verdi, des=4):
    print(f"  {navn:<58} {verdi:.{des}f}")


def steg(tittel):
    print("\n" + tittel)


steg("d3-overvaking-1 · intuisjon: 0.5% av et gode på 10")
vis("CEO-ens kostnad av et gode som koster firmaet 10", 0.005 * 10, 2)

steg("d3-overvaking-2 · styret i eksempelet og i oppgaven")
eks = {"innsidere": 2, "grå": 1, "uavhengige": 6}
vis("eksempel: sum", sum(eks.values()), 0)
assert sum(eks.values()) == 9
oppg = {"innsidere": 2, "grå": 1, "uavhengige": 12}
vis("oppgave: sum", sum(oppg.values()), 0)
assert sum(oppg.values()) == 15

steg("d3-overvaking-3 · gratispassasjer: kampanje som gir 400 og koster 10")
dV, C = 400, 10
for a in (0.05, 0.005, 0.02):
    vis(f"gevinst for {a:.1%}", a * dV, 2)
vis("break-even-andel (%)", C / dV * 100, 2)
assert 0.05 * dV > C and 0.005 * dV < C and 0.02 * dV < C
print("\nAlle kontroller gikk opp.")
