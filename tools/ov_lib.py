# -*- coding: utf-8 -*-
"""Felles verktøy for eksamensoppgavene i «Øv uten stopp» (EDU_DATA.ov).

   Et fag skriver oppgavene som Python-moduler i fag/<fag>/_ov/. tools/bygg-ov.py
   importerer dem, lager variantene og skriver fag/<fag>/ov.js. Spesifikasjonen
   er docs/<fag>-ov-spek.md.

   En OPPGAVE er et lite regneprogram som får en tilfeldighetsgenerator og
   returnerer én eksamensoppgave: en case og deloppgavene (a), (b), (c) …, med
   tall den selv har trukket. Byggeren kaller den `antall` ganger med hver sin
   faste seed. Aritmetikken er riktig per konstruksjon: tallene i casen, fasiten,
   løsningen og fellene kommer fra de samme variablene.

       @oppgave("ov-tvi1", tema="tvilling", tittel="Twin firm to WACC", antall=12)
       def _(r):
           ...
           return ovelse(case=..., deler=[
               tall_del("a", q=..., svar=[T("β<sub>U</sub>", bU)], kort=..., losning=..., poeng=4),
               tall_del("b", q=..., svar=[T("r<sub>E</sub>", rE * 100, "%")], gitt=..., ...),
               tekst_del("c", q=..., kort=..., losning=..., kriterier=[...], poeng=4, gitt=...),
           ])

   Tre slags deloppgaver:
     tall_del     svaret er ett til tre tall. Rettes automatisk mot toleransen.
     tekst_del    svaret er tekst (forklaring, intuisjon, teori). Claude retter
                  mot løsningen og kriteriene, eller du vurderer deg selv.
     blandet_del  tall og en kort tekst («find X and comment»).

   Hver deloppgave kan vises alene, med casen over. Bygger den på tall fra en
   tidligere deloppgave, står de i `gitt` («From (a): β<sub>U</sub> = 1.0250.»).
   I «hel oppgave» vises alle deloppgavene etter hverandre, uten gitt.

   Tallformatet er fagets (SPRAK fra fag/<fag>/_ov/temaer.py): bruk hjelperne
   tall(), pst(), mill(), penger() og prosent_tekst() fra trening_lib.
"""
import trening_lib as _T
from trening_lib import (  # noqa: F401  (hjelperne skribentene bruker)
    NBSP, MINUS, Avvis, rund, tall, kr, gen, heltall, pst, prosent_tekst, mill, penger,
    nær, ulike, annuitetsfaktor, annuitet, internrente, sqrt, ln,
)

# Standardtoleranse for tallsvar i eksamensoppgavene: 0,2 % relativt avvik.
# Litt rausere enn eksamenstreningen (0,1 %), fordi kjedene er lengre og du
# runder mellomtall til fire desimaler, som Kurbatov.
STD_REL = 0.002

OPPGAVER = []


class T:
    """Ett tall studenten skal skrive.

       navn   kort, som i løsningen: «β<sub>U</sub>», «r<sub>wacc</sub>», «V<sup>L</sup>».
       verdi  tallet i enheten ved feltet, regnet med full presisjon (ikke avrundet).
              Med enhet «%» er verdien i prosent: 9.25 for 9,25 %. Da godtas også 0.0925.
       enhet  «%», «$ million», «NOK million», «$ per share», «million shares»,
              «years», eller «» for rene tall (beta, sannsynlighet, forholdstall).
       rel    relativt avvik som godtas. Standard STD_REL (0,2 %).
       abs    absolutt avvik i enheten. Påkrevd når verdien er 0 eller nær 0.
       alt    andre verdier som også godtas (to forsvarlige lesninger). Begrunn i løsningen."""
    def __init__(self, navn, verdi, enhet="", rel=None, abs=None, alt=None):
        self.navn, self.verdi, self.enhet = navn, verdi, enhet
        self.rel, self.abs, self.alt = rel, abs, list(alt or [])


class Felle:
    """Et galt tall du typisk får, og hvilken feil som gir det. verdi i samme enhet
       som tallet (T) den hører til, i er indeksen til det tallet (0 for det første).
       Teksten sier hva som er galt med DETTE tallet, ikke hva som er riktig
       (fallgruve 12): «You used D/V instead of D/E in MM II.»"""
    def __init__(self, verdi, tekst, i=0):
        if not tekst or not str(tekst).strip():
            raise ValueError("Felle trenger en tekst")
        self.verdi, self.tekst, self.i = verdi, tekst, i


def tall_del(l, q, svar, kort, losning, poeng, gitt=None, feller=(), selvstendig=False):
    """En deloppgave med ett til tre tall som svar.
       l         etiketten: «a», «b», …
       q         spørsmålet (HTML, engelsk), slik det står på eksamen
       svar      liste med T(...)
       kort      svaret i fet skrift og det ene regnestykket som avgjør det, under 50 ord
       losning   full løsning steg for steg, med en kontroll og «Remember:» til slutt
       poeng     poeng som på eksamen (2–8)
       gitt      HTML med tallene fra tidligere deloppgaver som trengs når delen vises alene
       feller    liste med Felle(...)
       selvstendig  True når delen ikke trenger noe fra tidligere deler (da trengs ikke gitt)"""
    return dict(type="tall", l=l, q=q, svar=list(svar), kort=kort, losning=losning, poeng=poeng,
                gitt=gitt, feller=list(feller), selvstendig=selvstendig)


def tekst_del(l, q, kort, losning, kriterier, poeng, gitt=None, setninger=None, selvstendig=False):
    """En deloppgave der svaret er tekst. Claude retter mot losning og kriterier.
       kort       modellsvaret slik et toppsvar ville stått på eksamen, 1–4 setninger
       losning    forklaringen bak: mekanismen, hvorfor, og typiske feil
       kriterier  liste med det sensor gir poeng for, hver med poeng i parentes til
                  slutt: «Names debt overhang: the gain goes to the creditors (1 p)».
                  Summen skal være poeng.
       setninger  setningsbudsjett, som Kurbatov: «Answer in at most 3 sentences.»"""
    return dict(type="tekst", l=l, q=q, kort=kort, losning=losning, kriterier=list(kriterier),
                poeng=poeng, gitt=gitt, setninger=setninger, selvstendig=selvstendig)


def blandet_del(l, q, svar, tall_poeng, tekst_ledd, kort, losning, kriterier, poeng,
                gitt=None, feller=(), setninger=None, selvstendig=False):
    """Tall og en kort tekst: «Find the NPV and say whether the manager invests.»
       tall_poeng  poengene for tallene (resten går til teksten)
       tekst_ledd  hva teksten skal svare på, kort, på engelsk: «Will you invest? Why?»
       kriterier   gjelder bare tekstdelen; summen er poeng − tall_poeng"""
    return dict(type="blandet", l=l, q=q, svar=list(svar), tall_poeng=tall_poeng, tekst_ledd=tekst_ledd,
                kort=kort, losning=losning, kriterier=list(kriterier), poeng=poeng, gitt=gitt,
                feller=list(feller), setninger=setninger, selvstendig=selvstendig)


def ovelse(case, deler):
    """Én variant av oppgaven: casen (HTML, alle tallene som trengs) og deloppgavene i rekkefølge."""
    return dict(case=case, deler=list(deler))


def oppgave(id, tema, tittel, antall=12, sjanger=None, kilde=None):
    """Registrerer en oppgave. id: «ov-<prefiks><navn><n>», for eksempel «ov-tvi1».
       tema     temaets id fra temaer.py
       tittel   kort engelsk tittel, vises over oppgaven
       antall   varianter, minst 10 (standard 12)
       sjanger  id-en til sjangerstigen som trener det samme (valgfri lenke)
       kilde    eksamensoppgaven den er bygd etter: «H2025 E4», «V2022 P3» (valgfri)"""
    def dek(fn):
        OPPGAVER.append(dict(id=id, tema=tema, tittel=tittel, antall=antall, sjanger=sjanger,
                             kilde=kilde, fn=fn))
        return fn
    return dek
