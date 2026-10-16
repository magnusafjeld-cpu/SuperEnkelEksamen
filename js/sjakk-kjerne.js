/* ===================== SJAKK · REGLENE =====================
   Ren sjakklogikk uten DOM: stilling, lovlige trekk, trekk i algebraisk
   notasjon (SAN) begge veier og FEN. Brukes av trenermodulen
   (js/bundle-sjakk.js) og av kontrollen tools/sjekk-sjakk.js, så variantene i
   et repertoar sjekkes med nøyaktig de samme reglene som appen spiller med.

   Brettet er en liste med 64 felt: a1 = 0, h1 = 7, a8 = 56. Brikkene er
   bokstaver som i FEN: store for hvit (PNBRQK), små for svart.

   Testet med perft (antall stillinger etter n trekk) fra startstillingen og fra
   «Kiwipete», som dekker rokade, en passant og forvandling. Se
   tools/sjekk-sjakk.js --perft.
   ========================================================== */
(function (rot) {
  const START = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
  const FILER = "abcdefgh";
  const felt = (navn) => FILER.indexOf(navn[0]) + 8 * (Number(navn[1]) - 1);
  const navn = (i) => FILER[i & 7] + ((i >> 3) + 1);
  const farge = (p) => (!p ? null : p === p.toUpperCase() ? "w" : "b");
  const motsatt = (f) => (f === "w" ? "b" : "w");

  const SPRINGER = [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]];
  const KONGE = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
  const DIAG = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
  const RETT = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  /* ---------- FEN ---------- */
  function fraFEN(fen) {
    const [plass, tur, rokade, ep, halv, hel] = String(fen || START).trim().split(/\s+/);
    const b = new Array(64).fill(null);
    const rader = plass.split("/");
    if (rader.length !== 8) throw new Error("Ugyldig FEN: " + fen);
    rader.forEach((rad, r) => {
      let f = 0;
      for (const c of rad) {
        if (/\d/.test(c)) f += Number(c);
        else { b[(7 - r) * 8 + f] = c; f++; }
      }
    });
    return { b, tur: tur || "w", rokade: rokade && rokade !== "-" ? rokade : "",
      ep: ep && ep !== "-" ? felt(ep) : -1, halv: Number(halv) || 0, hel: Number(hel) || 1 };
  }
  /* kort: uten trekktellerne, som nøkkel for «samme stilling». */
  function tilFEN(p, kort) {
    const rader = [];
    for (let r = 7; r >= 0; r--) {
      let s = "", tom = 0;
      for (let f = 0; f < 8; f++) {
        const x = p.b[r * 8 + f];
        if (!x) tom++; else { if (tom) { s += tom; tom = 0; } s += x; }
      }
      rader.push(s + (tom || ""));
    }
    /* En passant-feltet tas bare med når slaget faktisk er mulig, ellers ville
       samme stilling fått to nøkler. */
    const ep = p.ep >= 0 && trekk(p).some((m) => m.flagg === "e") ? navn(p.ep) : "-";
    const deler = [rader.join("/"), p.tur, p.rokade || "-", ep];
    return kort ? deler.join(" ") : deler.concat(p.halv, p.hel).join(" ");
  }

  /* ---------- angrep ---------- */
  function angrepet(p, sq, av) {
    const f0 = sq & 7, r0 = sq >> 3;
    const på = (f, r) => (f >= 0 && f < 8 && r >= 0 && r < 8 ? p.b[r * 8 + f] : undefined);
    const er = (x, typ) => x && farge(x) === av && x.toUpperCase() === typ;
    const bondeR = av === "w" ? -1 : 1;
    if (er(på(f0 - 1, r0 + bondeR), "P") || er(på(f0 + 1, r0 + bondeR), "P")) return true;
    for (const [df, dr] of SPRINGER) if (er(på(f0 + df, r0 + dr), "N")) return true;
    for (const [df, dr] of KONGE) if (er(på(f0 + df, r0 + dr), "K")) return true;
    for (const [retn, typer] of [[DIAG, ["B", "Q"]], [RETT, ["R", "Q"]]]) {
      for (const [df, dr] of retn) {
        let f = f0 + df, r = r0 + dr;
        while (f >= 0 && f < 8 && r >= 0 && r < 8) {
          const x = p.b[r * 8 + f];
          if (x) { if (farge(x) === av && typer.includes(x.toUpperCase())) return true; break; }
          f += df; r += dr;
        }
      }
    }
    return false;
  }
  const kongen = (p, f) => p.b.indexOf(f === "w" ? "K" : "k");
  const iSjakk = (p, f) => angrepet(p, kongen(p, f || p.tur), motsatt(f || p.tur));

  /* ---------- trekk ---------- */
  function pseudo(p) {
    const ut = [], meg = p.tur;
    const leggTil = (fra, til, flagg) => {
      const brikke = p.b[fra];
      const slag = flagg === "e" ? (meg === "w" ? "p" : "P") : p.b[til];
      if (brikke.toUpperCase() === "P" && (til >> 3 === 7 || til >> 3 === 0)) {
        for (const q of ["Q", "R", "B", "N"]) ut.push({ fra, til, brikke, slag, forfr: q, flagg });
      } else ut.push({ fra, til, brikke, slag, forfr: null, flagg });
    };
    for (let i = 0; i < 64; i++) {
      const x = p.b[i];
      if (!x || farge(x) !== meg) continue;
      const typ = x.toUpperCase(), f0 = i & 7, r0 = i >> 3;
      if (typ === "P") {
        const d = meg === "w" ? 1 : -1, startR = meg === "w" ? 1 : 6;
        const en = i + 8 * d;
        if (en >= 0 && en < 64 && !p.b[en]) {
          leggTil(i, en, null);
          const to = i + 16 * d;
          if (r0 === startR && !p.b[to]) leggTil(i, to, "d");
        }
        for (const df of [-1, 1]) {
          const f = f0 + df, r = r0 + d;
          if (f < 0 || f > 7 || r < 0 || r > 7) continue;
          const t = r * 8 + f;
          if (p.b[t] && farge(p.b[t]) !== meg) leggTil(i, t, null);
          else if (t === p.ep) leggTil(i, t, "e");
        }
      } else if (typ === "N" || typ === "K") {
        for (const [df, dr] of typ === "N" ? SPRINGER : KONGE) {
          const f = f0 + df, r = r0 + dr;
          if (f < 0 || f > 7 || r < 0 || r > 7) continue;
          const t = r * 8 + f;
          if (!p.b[t] || farge(p.b[t]) !== meg) leggTil(i, t, null);
        }
        if (typ === "K") {
          const motst = motsatt(meg), base = meg === "w" ? 0 : 56;
          const kan = (c) => p.rokade.includes(meg === "w" ? c : c.toLowerCase());
          if (i === base + 4 && !angrepet(p, i, motst)) {
            if (kan("K") && !p.b[base + 5] && !p.b[base + 6] && p.b[base + 7] === (meg === "w" ? "R" : "r")
              && !angrepet(p, base + 5, motst) && !angrepet(p, base + 6, motst)) leggTil(i, base + 6, "k");
            if (kan("Q") && !p.b[base + 3] && !p.b[base + 2] && !p.b[base + 1] && p.b[base] === (meg === "w" ? "R" : "r")
              && !angrepet(p, base + 3, motst) && !angrepet(p, base + 2, motst)) leggTil(i, base + 2, "q");
          }
        }
      } else {
        const retn = typ === "B" ? DIAG : typ === "R" ? RETT : DIAG.concat(RETT);
        for (const [df, dr] of retn) {
          let f = f0 + df, r = r0 + dr;
          while (f >= 0 && f < 8 && r >= 0 && r < 8) {
            const t = r * 8 + f;
            if (!p.b[t]) leggTil(i, t, null);
            else { if (farge(p.b[t]) !== meg) leggTil(i, t, null); break; }
            f += df; r += dr;
          }
        }
      }
    }
    return ut;
  }

  function gjør(p, m) {
    const b = p.b.slice();
    const meg = p.tur;
    b[m.til] = m.forfr ? (meg === "w" ? m.forfr : m.forfr.toLowerCase()) : b[m.fra];
    b[m.fra] = null;
    if (m.flagg === "e") b[m.til + (meg === "w" ? -8 : 8)] = null;
    if (m.flagg === "k") { b[m.til - 1] = b[m.til + 1]; b[m.til + 1] = null; }
    if (m.flagg === "q") { b[m.til + 1] = b[m.til - 2]; b[m.til - 2] = null; }
    let rokade = p.rokade;
    const fjern = (c) => { rokade = rokade.replace(c, ""); };
    if (m.brikke === "K") { fjern("K"); fjern("Q"); }
    if (m.brikke === "k") { fjern("k"); fjern("q"); }
    for (const [sq, c] of [[0, "Q"], [7, "K"], [56, "q"], [63, "k"]]) if (m.fra === sq || m.til === sq) fjern(c);
    const bonde = m.brikke.toUpperCase() === "P";
    return { b, tur: motsatt(meg), rokade,
      ep: m.flagg === "d" ? (m.fra + m.til) / 2 : -1,
      halv: bonde || m.slag ? 0 : p.halv + 1,
      hel: meg === "b" ? p.hel + 1 : p.hel };
  }

  /* Lovlige trekk: de som ikke lar egen konge stå i sjakk. */
  function trekk(p) { return pseudo(p).filter((m) => !iSjakk(gjør(p, m), p.tur)); }

  /* ---------- SAN ---------- */
  function tilSAN(p, m, lovlige) {
    let s;
    if (m.flagg === "k") s = "O-O";
    else if (m.flagg === "q") s = "O-O-O";
    else {
      const typ = m.brikke.toUpperCase();
      const slag = m.slag ? "x" : "";
      if (typ === "P") s = (slag ? FILER[m.fra & 7] + "x" : "") + navn(m.til) + (m.forfr ? "=" + m.forfr : "");
      else {
        const andre = (lovlige || trekk(p)).filter((x) => x.brikke === m.brikke && x.til === m.til && x.fra !== m.fra);
        let dis = "";
        if (andre.length) {
          const sammeFil = andre.some((x) => (x.fra & 7) === (m.fra & 7));
          const sammeRad = andre.some((x) => (x.fra >> 3) === (m.fra >> 3));
          dis = !sammeFil ? FILER[m.fra & 7] : !sammeRad ? String((m.fra >> 3) + 1) : navn(m.fra);
        }
        s = typ + dis + slag + navn(m.til);
      }
    }
    const etter = gjør(p, m);
    if (iSjakk(etter, etter.tur)) s += trekk(etter).length ? "+" : "#";
    return s;
  }
  const rensSAN = (s) => String(s).trim().replace(/[+#!?]+$/, "").replace(/0/g, "O").replace(/e\.p\.$/, "");
  function fraSAN(p, san) {
    const mål = rensSAN(san);
    const lovlige = trekk(p);
    for (const m of lovlige) {
      const s = rensSAN(tilSAN(p, m, lovlige));
      if (s === mål || s.replace("=", "") === mål) return m;
    }
    return null;
  }

  /* «1.d4 d5 2.c4 e6» → ["d4", "d5", "c4", "e6"]. Tåler «1...e5», «1.e4 e5».  */
  function trekkListe(tekst) {
    return String(tekst || "").replace(/\{[^}]*\}/g, " ").split(/\s+/)
      .map((t) => t.replace(/^\d+\.(\.\.)?/, "")).filter((t) => t && !/^\d+\.+$/.test(t) && !/^(1-0|0-1|1\/2-1\/2|\*)$/.test(t));
  }

  /* Spiller en trekkrekke fra startstillingen (eller fen). Kaster ved første
     ulovlige trekk, med hvilket trekk det var. */
  function spill(tekst, fen) {
    let p = fraFEN(fen || START);
    const steg = [];
    trekkListe(tekst).forEach((san, i) => {
      const m = fraSAN(p, san);
      if (!m) {
        const nr = Math.floor(i / 2) + 1;
        throw new Error(`ulovlig trekk ${nr}${i % 2 ? "..." : "."}${san} i stillingen ${tilFEN(p)}`);
      }
      const ren = tilSAN(p, m);
      const før = p;
      p = gjør(p, m);
      steg.push({ san: ren, m, før, etter: p, nr: før.hel, tur: før.tur });
    });
    return { steg, slutt: p };
  }
  /* «4.Bg5» eller «7...c6»: slik et trekk vises og kommenteres. */
  const merke = (s) => s.nr + (s.tur === "w" ? "." : "...") + s.san;

  function perft(p, n) {
    if (n === 0) return 1;
    let sum = 0;
    for (const m of trekk(p)) sum += n === 1 ? 1 : perft(gjør(p, m), n - 1);
    return sum;
  }

  const API = { START, fraFEN, tilFEN, trekk, gjør, tilSAN, fraSAN, trekkListe, spill, merke, iSjakk,
    felt, navn, farge, perft };
  if (typeof module !== "undefined" && module.exports) module.exports = API;
  else rot.SJAKK = API;
})(typeof window !== "undefined" ? window : globalThis);
