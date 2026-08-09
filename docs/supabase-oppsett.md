# Supabase: kontoer og synk

Uten dette oppsettet fungerer appen som før — all fremdrift lagres i nettleseren
du sitter ved. Med det får du innlogging og samme fremdrift på telefon og PC.

Fire steg. Regn med ti minutter.

---

## 1. Lag tabellen

Supabase → **SQL Editor** → *New query* → lim inn hele [`supabase.sql`](supabase.sql) → **Run**.

Den lager tabellen `progress` (én rad per bruker per fag) og skrur på Row Level
Security, slik at hver bruker bare når sine egne rader. Skriptet er trygt å kjøre
flere ganger.

## 2. Skru på e-post + passord

Supabase → **Authentication** → **Sign In / Providers** → *Email*:

- **Enable Email provider**: på
- **Confirm email**: **av** — anbefalt her

Om «Confirm email» står på, må hver nye konto bekreftes via en e-post før den kan
brukes, og Supabase sin innebygde e-postsender har en svært lav kvote (noen få
i timen). For en personlig læringsapp med én eller to brukere er det bare i
veien. Vil du ha den på, må du koble til din egen SMTP under *Project Settings →
Auth → SMTP Settings*.

> Glemt-passord sender fortsatt e-post. Det går fint på den innebygde senderen,
> siden det skjer sjelden.

## 3. Sett adressene appen kjører på

Supabase → **Authentication** → **URL Configuration**:

- **Site URL**: `https://magnusafjeld-cpu.github.io/SAM3/`
- **Redirect URLs**, legg til begge:
  - `https://magnusafjeld-cpu.github.io/SAM3/**`
  - `http://127.0.0.1:4178/**`

Uten dette virker ikke lenken i glemt-passord-e-posten — Supabase nekter å sende
brukeren tilbake til en adresse den ikke kjenner.

## 4. Lim nøklene inn i appen

Supabase → **Project Settings** → **API**. Kopier:

| Supabase-felt | Inn i `js/config.js` |
|---|---|
| Project URL | `supabaseUrl` |
| `anon` `public` | `supabaseAnonKey` |

Last siden på nytt. «Konto» i sidepanelet skal nå tilby innlogging.

> **`anon`-nøkkelen skal ligge i repoet.** Den er laget for å stå i frontend-kode
> og gir ingen tilgang alene — det er RLS-reglene fra steg 1 som avgjør hva den
> som holder nøkkelen får se. **`service_role`-nøkkelen må aldri inn her**; den
> omgår RLS fullstendig.

---

## Hvordan synkingen oppfører seg

- **Lokalt først.** Alt du gjør skrives til `localStorage` med én gang, og
  sendes til Supabase 1,5 sekunder senere. Mister du nett, fortsetter appen som
  normalt og tar igjen neste gang den får kontakt.
- **Sammenslåing, ikke overskriving.** Ved innlasting — og når du kommer tilbake
  til fanen — hentes skyversjonen og slås sammen med den lokale før noe skrives
  tilbake. Har du lest kapittel 3 på telefonen og tatt en quiz på PC-en, får du
  begge deler.
- **Ved reell konflikt vinner nyeste.** Har begge enheter en verdi for samme
  felt, brukes den nyeste — per element der elementet har eget tidsstempel
  (flashcards, quizsvar, kapitler), ellers etter hvilken enhet som lagret sist.
  Tellere som bare går oppover (XP, antall forsøk) tar maksverdien.
- **Ett fag om gangen.** Hvert fag har sin egen rad. Fremdrift i ett fag rører
  aldri et annet.

## Feilsøking

| Symptom | Sannsynlig årsak |
|---|---|
| «Tabellen progress finnes ikke ennå» | Steg 1 er ikke kjørt |
| «E-posten er ikke bekreftet ennå» | «Confirm email» står fortsatt på (steg 2) |
| Lenken i glemt-passord-e-posten går til feil sted | Redirect URLs mangler (steg 3) |
| «Synk stoppet» i sidepanelet | Åpne Konto-siden — feilmeldingen står der |
| Fremdriften synker ikke | Er du innlogget? Sidepanelet nederst viser status |
