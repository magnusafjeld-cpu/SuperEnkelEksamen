# Tekstkilder til NotebookLM

**Du trenger sannsynligvis ikke filene her.** Appen har det samme innebygd under
**Verktøy → NotebookLM**, med en kopiknapp per kapittel, og der lages teksten av
manualen som er lastet akkurat nå. Filene i denne mappa er øyeblikksbilder, og
de blir utdaterte i det manualen rettes.

De ligger igjen fordi de var det første som ble laget, og fordi de er delt opp
per *del* i stedet for per kapittel — noe appen ikke lenger tilbyr:

| Fil | Innhold |
|---|---|
| `del-0-grunnlaget.md` | Avsnitt 0.1 + kapittel 1–2 |
| `del-1-aktiva-og-avkastning.md` | Kapittel 3–4 |
| `del-2-aksjonar-og-formuesbeskatning.md` | Kapittel 5–8 |

Avsnitt 0.1 finnes bare her. Appen holder kapittel 0 utenfor, siden
`coreChapters` for FIE432 er 1–19.

Bygg filene på nytt slik:

```
python3 tools/manual-til-kilde.py FIE432_Manual.html 5-8 notebooklm/ut.md
python3 tools/manual-til-kilde.py FIE432_Manual.html 0.1,1-2 notebooklm/ut.md
```

Innledningen med leseveiledningen legges på manuelt; se `git log` for teksten.
