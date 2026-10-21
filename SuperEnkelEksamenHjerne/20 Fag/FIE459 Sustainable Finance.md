---
tags: [fag, fie459, innhold]
oppdatert: 2026-10-21
---

# FIE459 Sustainable Finance

Fag nummer fem. Id `fie459`, aksentfarge `#5b7a19` (mosegrønn, valgt så den
skilles fra FIE402s smaragd), logo «SF». **Fagteksten er på engelsk, appen rundt
er norsk**, som i [[FIE402 Corporate Finance]].

**Bevisst kort.** Magnus ba om at faget skulle være «en god del kortere enn de
andre fagene. Raskt igjennom for å ha en grei forståelse for temaene». Manualen var
20 900 ord, mot 81 500 i [[FIE432 Personlig økonomi]], og studieplanen rundt
15 timer, mot 57. Etter at k10–k13 ble skrevet om fra foilene (21. oktober 2026),
er den rundt 24 000 ord og planen rundt 17 timer.

## Kursfakta

NHH, høsten 2026, foreleser Jiaying Li. Læreboka er Schoenmaker & Schramade
(2019), *Principles of Sustainable Finance* (OUP). Den ligger ikke i kildene.

| | |
|---|---|
| Eksamen, 70 % | 3 timers digital skoleeksamen, **lukket bok**, 16. desember 2026, **flervalg og sant/usant**, på engelsk |
| Gruppeoppgave, 30 % | Fem bærekraftige aksjer i én av fem bransjer, én strategi fra forelesning 8, maks 5 sider, frist 12. november |
| Undervisning | 13 forelesninger i tre deler, seks gjesteforelesninger (ikke tatt opp) |

Foreleserens egne ord styrer stoffet: «The focus of the course is on economic
intuition, not calculation» og «Memorizing definitions is not the best
strategy!». Det finnes **ingen tidligere eksamener**. Derfor ingen
`examWeights`, og syllabusen er brukt aktivt i stedet.

## Hva faget har, og hva det ikke har

| Modul | Innhold |
|---|---|
| Manual | 14 kapitler: k0 kurs og eksamen, k1–k13 én per forelesning. PwC-gjesteforelesningen ligger i k7 |
| Studieplan | 8 moduler i progresjonsmodus, rundt 17 timer, kalibrert med `tools/rekalibrer-plan.py` |
| Quiz | **107 spørsmål: 66 flervalg og 41 sant/usant**, samme format som eksamen. Fasit 16/16/17/17 og 20 sanne/21 usanne |
| Flashcards | 94 skrevne kort i tre kortstokker: begrep, mekanisme, intuisjon |
| Kjernepensum | 8 deler, rundt 7 800 ord og 2 t 30 min med sjekker og minicaser (lagt inn 21. oktober 2026). Minicasene har to flervalg og ett sant/usant, uten minuspoeng |

Ingen dybdetrening, lynlæring, kapitteloppgaver eller eksamenssett. Det holder
faget kort, og quizen har allerede eksamensformatet. Kapitteloppgaver i
flervalgsformat, som i FIE432, er det naturlige neste steget om Magnus vil ha mer
eksamenstrening.

**k10–k13 er skrevet om fra foilene (21. oktober 2026).** Den første versjonen ble
skrevet 24. september fra syllabus og lærebokas tema, før foilene kom, og var merket
foreløpig. Da foilene kom, viste det seg at mye manglet eller var feil vektet
(`docs/fie459-k10-k12-avvik.md`), og k13 handlet om noe annet enn forelesningen:
den dekket karbonskatt og EU-regler, mens forelesningen handlet om koalisjoner,
Ostroms designprinsipper og backcasting. Alle fire ble skrevet på nytt av hver sin
agent fra tekst og bilder i foilene, og kontrollert av uavhengige kontrollører.
Quizen og kortene for k10–k13 ble byttet ut med nye id-er (q10-6 …, fc10-5 …);
de gamle er fjernet.

- **k10** bygger obligasjonsdelen på prising og ratinger, med Flammer (2021), ICMAs
  fire prinsippsett, utstedelsestall og derivater (ING og SBM Offshore).
- **k11** er bygd rundt risk-based mot value-based banking, med GABV-tallene, Pillar 3
  og **DNB-gjesteforelesningen** (13. oktober) som egen seksjon: grønne lån,
  omstillingslån og bærekraftskoblede lån.
- **k12** har forsikringsbalansen (avsetninger mot egenkapital), katastrofemodellen,
  VaR = EL + UL og cat bonds slik foilene definerer dem («skip or defer»).
  **«DNB (2017)» her er De Nederlandsche Bank**, ikke norske DNB.
- **k13** heter nå «Coalitions, governments and transition management».

**Foreleseren fjernet den siste foilen i forelesning 12** («Ongoing Challenges», en
FT-artikkel) i eksporten 21. oktober. Tallet om at under halvparten av naturskadetapene
i Europa var forsikret i 2024 kom derfra og er tatt ut.

**Eksamensinformasjon fra forelesning 13:** eksamen har fokus på «concepts and
frameworks learned in class», og noen eksempelspørsmål deles ut på de to
gjesteforelesningene etter forelesning 13. Står i k0 og kj0. Får Magnus dem, bør de
inn i quizen og brukes til å kalibrere kjernepensumet.

**Gjesteforelesningene fra Folketrygdfondet og Fondsfinans (Melanie Brooks)** ligger i kildemappen, men
er ikke tatt inn i manualen.

## Kjernepensum

Bygd etter skillelinjene eksamen tester, ikke kapitlene: kj0 eksamen, kj1 hva
sustainable finance er (k1), kj2 etikk og eksternaliteter (k2, k3), kj3 shareholder,
stakeholder og eierstyring (k4, k5), kj4 forretningsmodeller, materialitet og
rapportering (k6, k7), kj5 investering og aktivapriser (k8, k9), kj6 obligasjoner,
bank og forsikring (k10–k12) og kj7 koalisjoner, myndigheter og omstilling (k13).
Spesifikasjonen er `docs/fie459-kjerne-spek.md`.

**Uten minuspoeng.** Ingenting i syllabus eller forelesning 1 sier at feil svar
trekker, så manifestet har `wrongFactor: 0`. Viser det seg at eksamen har
minuspoeng, er det nok å fjerne feltet.

**kj6 ble skrevet fra foilene før k10–k12 ble skrevet om**, og ble etterpå lest mot
de nye kapitlene. Foilene til forelesning 10–13 og gjesteforelesningene til DNB,
Folketrygdfondet og Fondsfinans ligger nå også i prosjektets kildemappe, med tekst i
`_tekst/`.

**Spesifikasjonen tok feil to steder, og agentene fulgte manualen:** Pigou, Coase og
karbonlekkasje står ikke i k3 eller forelesning 3, og manualen knytter ikke voice og
exit til Starks.

## Kildene og hvordan de ble brukt

`FIE459 Sustainable Finance files/` er gitignorert (234 MB, opphavsrett). Teksten
er hentet ut til `_tekst/` inne i mappen. pptx er en zip med XML, så det er gjort
med standardbiblioteket, uten `python-pptx`.

Foilene er tynne på tekst (15 700 ord for ni forelesninger), og **de viktigste
rammeverkene finnes bare som bilder**: S&S-tabellen over finance as usual og
SF 1.0–3.0, integrated value-figuren, Starks' spekter, etikkrammeverkene, TCFD,
taksonomien, strategitabellene og metodeegnethetstabellen. De er lest som bilder
og transkribert inn i `docs/fie459-forfatterspek.md` §5, så agentene skrev etter
kilden og ikke etter hukommelsen.

Business Ethics-PDF-en (Crane & Matten, kap. 3–4) er skannet og har ingen tekst.
Den er ikke OCR-et; forelesning 2 dekker stoffet.

## Hvordan faget ble bygget

1. Lest alle kildene selv og skrevet spesifikasjonen (`docs/fie459-forfatterspek.md`).
2. Fasitposisjonene trukket på forhånd fra en fast seed (fallgruve 7c), også for sant/usant.
3. Fem agenter skrev kapitlene med quiz og kort parallelt, som fragmenter i
   `fag/fie459/_fragmenter/`. Manualen bygges med `tools/fie459-bygg-manual.py`.
4. Alle 14 kapitler og alle 95 spørsmål ble lest og kontrollert mot kildene
   etterpå. Påstandene fra Starks og Hart & Zingales er sjekket ordrett i
   artiklene, og alle regnestykker er regnet om.

**Rett manualen i fragmentene**, ikke i `FIE459_Manual.html` (fallgruve 7x).
Quizen og kortene ble flettet inn fra agentutkast som ikke er tatt vare på, så
`fag/fie459/quiz.js` og flashcard-blokken i `data.js` er nå selve kilden.

## Feil i kursets egne foiler

Agentene og kontrollen fant fire, og manualen lærer det riktige:

- **Alfa-fortegnet** (forelesning 8 foil 67 og 9 foil 20): E(Ra) = Rf + β(E(Rm) − Rf) − α
  gir feil retning. Med α < 0 for et overpriset aktivum havner det *over* SML.
  Manualen forklarer alfa med ord.
- **«Return on assets»** (forelesning 6 foil 35) er egentlig omløpshastighet,
  salg/eiendeler = 0,58. Egen fellerute i k6.
- Aksje Bs volatilitet er merket σ(A) (forelesning 8 foil 4 og 7), og TCFD er
  skrevet «TFCD».
- Giglio et al.: foilen (2025) sier 48/24/22/6 %, mens Starks siterer en eldre
  versjon med 45/25/25/7 %. Manualen bruker foilens tall.

En påstand som så oppdiktet ut, stemte: at PwC-foredraget sluttet med en
rettferdig omstilling («A just transition is our common goal»).

## Kontrollverktøyene fikk to utvidelser

- `tools/sjekk-drill.js` godtar **sant/usant**: nøyaktig to alternativer,
  «True» og «False». Fasitbalansen måles for seg (andel sanne), ellers ville
  2-alternativs-svarene skjevfordelt posisjonsmålingen for flervalg.
- `tools/sjekk-manual.py` respekterer `refSections: {}`: faget har uttrykkelig
  ingen formelsamling, og da gjetter ikke kontrollen seg fram til en. Før pekte
  den ut k1 og varslet om formelkort som appen aldri lager.
