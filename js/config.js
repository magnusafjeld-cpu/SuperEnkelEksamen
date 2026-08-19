/* ===================== SUPABASE-KONFIG =====================
   Hentes i Supabase: Project Settings → API.
     supabaseUrl      = "Project URL"        (https://xxxx.supabase.co)
     supabaseAnonKey  = "anon" / "public"    (den lange nøkkelen — IKKE service_role)

   Anon-nøkkelen er laget for å ligge åpent i frontend-kode. Den gir ikke tilgang
   til noe i seg selv: Row Level Security i docs/supabase.sql er det som avgjør
   at hver bruker bare kommer til sine egne rader. Legg aldri inn service_role-
   nøkkelen her — den omgår RLS.

   Står feltene tomme kjører appen som før, med all fremdrift kun lokalt i
   nettleseren. Kontoer og synk slås på i det disse fylles ut.
   ============================================================ */
window.EDU_CONFIG = {
  supabaseUrl: "https://xjmjoolrbgfqrcovznru.supabase.co",
  supabaseAnonKey: "sb_publishable_nkIlyly95NTdvh1bWy6jIg_JLly4pWt",
};
