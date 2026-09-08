# Kilder til NotebookLM

Ferdigbygde tekstfiler for de tre første delene av FIE432-pensum. Filene er ren
tekst — last dem opp i NotebookLM som kilde, én per del.

| Fil | Innhold |
|---|---|
| `del-0-grunnlaget.md` | Innledning + kapittel 1–2 |
| `del-1-aktiva-og-avkastning.md` | Kapittel 3–4 |
| `del-2-aksjonar-og-formuesbeskatning.md` | Kapittel 5–8 |

**Du trenger sjelden disse filene.** Appen har det samme innebygd under
**Verktøy → Kilder**, med kopiknapp for hver del, og der lages teksten av
manualen som er lastet akkurat nå. Filene her er øyeblikksbilder og blir
utdaterte når manualen rettes.

Bygg dem på nytt slik:

```
python3 tools/manual-til-kilde.py FIE432_Manual.html 5-8 notebooklm/ut.md
```

Innledningen med leseveiledningen legges på manuelt; se `git log` for teksten.
