/* SAHNE 1 — KERMES (0–10 s)  Üç karar
   The whole film's drawing lives in LI.world(t); each scene only sets the camera. */
(function (LI) {
  'use strict';
  const { seg, lerp, inOut } = LI.E;
  const KD = LI.KD, F = () => LI.Film, A = LI.Ang, Ink = LI.Ink;
  const END = (t) => 1 - seg(t, 90.4, 91.4);

  function win(t, a, b, fi = 0.4, fo = 0.4) { return seg(t, a, a + fi) * (1 - seg(t, b - fo, b)); }
  function exprs(ctx, t, P, list, sz) {
    const f = F();
    list.forEach(([a, b, items, hot]) => {
      const al = win(t, a, b); if (al <= 0) return;
      f.expr(ctx, typeof items === 'string' ? [items] : items, P.x, P.y, sz ?? P.s, { alpha: al, w: P.w, halo: true, color: hot ? A.amber : undefined });
    });
  }
  const at = (P, k, y) => ({ x: P.x, y: y ?? P.y[k], s: P.s, w: P.w });
  const amber = (a) => `rgba(${LI.AMBER_RGB},${a})`;
  const fr = (n, d, h) => F().fr(n, d, h);
  const neg = (s) => s.replace('-', '−');
  const label = (v) => (v < 0 ? neg(String(v)) : String(v));

  function tally(ctx, env, t, rows) {
    const T = KD.L(env).TL;
    rows.forEach(([t0, t1, txt, hot], i) => { const al = win(t, t0, t1) * END(t); if (al > 0) F().T(ctx, txt, T.x, T.y[i], { size: T.s, alpha: al, halo: true, color: hot ? A.amber : undefined }); });
  }

  function dashL(ctx, p, q, a, seed, color, w = 2.5) {
    if (a <= 0) return; const n = Math.max(6, Math.round(Math.hypot(q[0] - p[0], q[1] - p[1]) / 14));
    for (let j = 0; j < n; j += 2) Ink.path(ctx, [[lerp(p[0], q[0], j / n), lerp(p[1], q[1], j / n)], [lerp(p[0], q[0], (j + 1) / n), lerp(p[1], q[1], (j + 1) / n)]], { w, alpha: a, seed: seed + j, taper: [0, 0], color });
  }
  function seg2(ctx, p, q, a, k, seed, color, w = 3.5) { if (a > 0 && k > 0) Ink.path(ctx, [p, [lerp(p[0], q[0], k), lerp(p[1], q[1], k)]], { w, alpha: a, seed, taper: [0, 0], color }); }
  function dot(ctx, p, a, color) { if (a <= 0) return; ctx.beginPath(); ctx.arc(p[0], p[1], 6, 0, 7); ctx.fillStyle = color ? `rgba(${color},${a})` : `rgba(${LI.INK_RGB},${a})`; ctx.fill(); }
  function txt(ctx, env, p, s, a, hot, sz = 0.8) { if (a > 0) F().T(ctx, s, p[0], p[1], { size: KD.L(env).G.s * sz, alpha: a, halo: true, color: hot ? A.amber : undefined }); }
  function arcAt(ctx, C, r, u0, u1, a, seed, color) {
    if (a <= 0) return; const P = []; for (let j = 0; j <= 16; j++) { const u = lerp(u0, u1, j / 16); P.push([C[0] + r * Math.cos(u), C[1] + r * Math.sin(u)]); }
    Ink.path(ctx, P, { w: 2.5, alpha: a, seed, taper: [0, 0], color });
  }
  const lerpP = (p, q, k) => [lerp(p[0], q[0], k), lerp(p[1], q[1], k)];
  const INK = LI.INK_RGB, AM = LI.AMBER_RGB;
  function T(ctx, env, s, x, y, a, o = {}) { if (a > 0) F().T(ctx, s, x, y, Object.assign({ size: KD.L(env).G.s * 0.55, alpha: a, halo: true }, o)); }
  function box(ctx, x, y, w, h, a, seed, color, fill) { if (a <= 0) return; if (fill) { ctx.fillStyle = fill; ctx.fillRect(x - w / 2, y - h / 2, w, h); } Ink.path(ctx, [[x - w / 2, y - h / 2], [x + w / 2, y - h / 2], [x + w / 2, y + h / 2], [x - w / 2, y + h / 2], [x - w / 2, y - h / 2]], { w: 2.5, alpha: a, seed, taper: [0, 0], color }); }
  function die(ctx, x, y, s, n, a, seed, color) {
    if (a <= 0) return; box(ctx, x, y, s, s, a, seed, color, `rgba(${LI.PAPER_RGB},${a})`);
    const P = { 1: [[0, 0]], 2: [[-1, -1], [1, 1]], 3: [[-1, -1], [0, 0], [1, 1]], 4: [[-1, -1], [1, -1], [-1, 1], [1, 1]], 5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], 6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]] }[n];
    P.forEach(([i, j]) => { ctx.beginPath(); ctx.arc(x + i * s * 0.26, y + j * s * 0.26, s * 0.08, 0, 7); ctx.fillStyle = `rgba(${color || INK},${a})`; ctx.fill(); });
  }
  function tack(ctx, x, y, up, a, seed) {
    if (a <= 0) return; ctx.beginPath(); if (up) { ctx.ellipse(x, y, 22, 7, 0, 0, 7); } else { ctx.ellipse(x - 8, y, 7, 20, 0.5, 0, 7); } ctx.fillStyle = `rgba(${AM},${a * 0.8})`; ctx.fill();
    Ink.path(ctx, up ? [[x, y - 2], [x, y - 36]] : [[x - 4, y + 4], [x + 30, y + 16]], { w: 3, alpha: a, seed, taper: [0, 0.8] });
  }
  /* S2: sums of two dice */
  function sums(ctx, env, t, a) {
    if (a <= 0) return; const R = KD.L(env).FG, cw = Math.min((R.x1 - R.x0 - 80) / 7, (R.y0 - R.y1 - 40) / 7), x0 = (R.x0 + R.x1) / 2 - cw * 3.5, y0 = R.y1 + 20;
    for (let i = 1; i <= 6; i++) { die(ctx, x0 + (i + 0.5) * cw, y0 + cw * 0.5, cw * 0.62, i, a * seg(t, 11.4, 11.8), 4910 + i); die(ctx, x0 + 0.5 * cw, y0 + (i + 0.5) * cw, cw * 0.62, i, a * seg(t, 11.8, 12.2), 4920 + i, AM); }
    for (let i = 1; i <= 6; i++) for (let j = 1; j <= 6; j++) {
      const k = a * seg(t, 12.6 + ((i - 1) * 6 + j) * 0.06, 12.9 + ((i - 1) * 6 + j) * 0.06), s = i + j, hot = s === 7 && t > 16.0, x = x0 + (j + 0.5) * cw, y = y0 + (i + 0.5) * cw;
      if (hot) { ctx.beginPath(); ctx.arc(x, y, cw * 0.36, 0, 7); ctx.fillStyle = `rgba(${AM},${0.35 * a})`; ctx.fill(); }
      T(ctx, env, String(s), x, y, k, { color: hot ? A.amber : undefined });
    }
  }
  /* S3: thumbtack experiment */
  function tacks(ctx, env, t, a) {
    if (a <= 0) return; const R = KD.L(env).FG, cx = (R.x0 + R.x1) / 2, top = R.y1 + 50, s = KD.L(env).G.s;
    tack(ctx, cx - 130, top + 10, true, a * seg(t, 29.0, 29.4), 4950); T(ctx, env, 'ucu yukarı', cx - 130, top + 44, a * seg(t, 29.2, 29.6));
    tack(ctx, cx + 110, top + 10, false, a * seg(t, 29.4, 29.8), 4951); T(ctx, env, 'yan yatık', cx + 130, top + 44, a * seg(t, 29.6, 30.0));
    const n = t < 39.6 ? Math.floor(lerp(0, 50, seg(t, 32.0, 36.0))) : Math.floor(lerp(50, 200, seg(t, 39.6, 42.6)));
    const up = Math.round(n * (t < 39.6 ? 0.6 : lerp(0.6, 0.62, seg(t, 39.6, 42.6)))), dn = n - up, bx = R.x0 + 120, bw = R.x1 - R.x0 - 220, sc = bw / (t < 39.6 ? 50 : 200);
    [[up, 'yukarı', AM, 0], [dn, 'yan', INK, 1]].forEach(([v, lab, col, i]) => { const y = top + 110 + i * 70, al = a * seg(t, 31.6, 32.0); if (al <= 0) return; T(ctx, env, lab, R.x0 + 60, y, al, { color: i ? undefined : A.amber }); ctx.fillStyle = `rgba(${col},${0.35 * al})`; ctx.fillRect(bx, y - 18, v * sc, 36); Ink.path(ctx, [[bx, y - 18], [bx + v * sc, y - 18], [bx + v * sc, y + 18], [bx, y + 18]], { w: 2.5, alpha: al, seed: 4960 + i, taper: [0, 0], color: col }); T(ctx, env, String(v), bx + v * sc + 30, y, al); });
    T(ctx, env, `${n} atış`, cx, top + 250, a * seg(t, 32.0, 32.4), { size: s * 0.7 });
  }
  /* S4: opinions about the final */
  function opinions(ctx, env, t, a) {
    if (a <= 0) return; const R = KD.L(env).FG, cx = (R.x0 + R.x1) / 2, w = R.x1 - R.x0, s = KD.L(env).G.s;
    ['Bu sezon 10 maçta 8 galibiyet', 'Rakip de çok güçlü', 'En iyi oyuncumuz sakat'].forEach((txt_, i) => { const k = a * seg(t, 47.4 + i * 1.2, 47.8 + i * 1.2); box(ctx, cx, R.y1 + 30 + i * 56, w * 0.85, 46, k, 4970 + i, undefined, `rgba(${LI.PAPER_RGB},${k})`); T(ctx, env, txt_, cx, R.y1 + 30 + i * 56, k, { size: s * 0.58 }); });
    [['Ayşe', '%70'], ['Can', '%50'], ['Ece', '%60']].forEach(([n, p], i) => { const k = a * seg(t, 52.4 + i * 0.8, 52.8 + i * 0.8), x = cx + (i - 1) * w * 0.3, y = R.y0 - 50; if (k <= 0) return; ctx.beginPath(); ctx.arc(x, y - 36, 18, 0, 7); ctx.fillStyle = `rgba(${INK},${0.5 * k})`; ctx.fill(); Ink.path(ctx, [[x - 26, y + 10], [x - 20, y - 12], [x + 20, y - 12], [x + 26, y + 10]], { w: 3, alpha: k, seed: 4980 + i, taper: [0, 0] }); T(ctx, env, n, x, y + 32, k); T(ctx, env, p, x + 48, y - 60, k, { color: A.amber, size: s * 0.7 }); });
  }
  /* S5: the decision table */
  function decisions(ctx, env, t, a) {
    if (a <= 0) return; const R = KD.L(env).FG, w = R.x1 - R.x0, cx = (R.x0 + R.x1) / 2, xs = [R.x0 + w * 0.17, R.x0 + w * 0.5, R.x0 + w * 0.83], s = KD.L(env).G.s;
    ['Zar oyunu', 'Raptiye', 'Final maçı'].forEach((n, i) => T(ctx, env, n, xs[i], R.y1 + 30, a * seg(t, 65.0, 65.4), { size: s * 0.7 }));
    [['teorik', 'deneysel', 'öznel'], ['6/36 = 1/6', '≈ 0,62', '≈ %60'], ['≈ 10 ödül', 'Kural değişmeli', 'Az sayıda atkı']].forEach((row, r) => row.forEach((v, i) => { const k = a * seg(t, 66.0 + r * 2.2 + i * 0.5, 66.4 + r * 2.2 + i * 0.5); T(ctx, env, v, xs[i], R.y1 + 100 + r * 80, k, { color: r === 0 || r === 2 ? A.amber : undefined, size: s * (r === 2 ? 0.56 : 0.72) }); }));
    [0.33, 0.67].forEach((f, i) => Ink.path(ctx, [[R.x0 + w * f, R.y1 + 6], [R.x0 + w * f, R.y1 + 300]], { w: 2, alpha: a * 0.5, seed: 4990 + i, taper: [0, 0] }));
    Ink.path(ctx, [[R.x0 + 10, R.y1 + 58], [R.x1 - 10, R.y1 + 58]], { w: 2, alpha: a * 0.5, seed: 4995, taper: [0, 0] });
  }

  function context(ctx, env, t) {
    exprs(ctx, t, KD.L(env).CX, [
      [4.4, 10.2, 'Sınıfımız kermeste stant açıyor'],
      [10.6, 27.8, 'Karar 1: Zar oyununda kaç ödül hazırlanmalı?'],
      [28.4, 45.8, 'Karar 2: Raptiye oyunu adil mi?'],
      [46.4, 63.8, 'Karar 3: Final maçı için atkı satılsın mı?'],
      [64.4, 79.8, 'Her karar için uygun yaklaşım'],
    ]);
  }

  function figure(ctx, env, t) {
    const a = END(t), R = KD.L(env).FG;
    const s1 = a * win(t, 5.0, 10.4); if (s1 > 0) { const cx = (R.x0 + R.x1) / 2, cy = (R.y0 + R.y1) / 2; box(ctx, cx, cy + 30, 360, 150, s1 * seg(t, 5.2, 6.0), 4900, undefined, `rgba(${AM},${0.15 * s1})`); Ink.path(ctx, [[cx - 200, cy - 45], [cx, cy - 110], [cx + 200, cy - 45], [cx - 200, cy - 45]], { w: 3, alpha: s1 * seg(t, 5.8, 6.6), seed: 4901, taper: [0, 0], color: AM }); T(ctx, env, 'KERMES', cx, cy - 70, s1 * seg(t, 6.4, 6.8), { size: KD.L(env).G.s * 0.7 }); die(ctx, cx - 80, cy + 30, 50, 5, s1 * seg(t, 7.0, 7.4), 4902); tack(ctx, cx + 10, cy + 40, true, s1 * seg(t, 7.4, 7.8), 4903); T(ctx, env, 'atkı', cx + 100, cy + 30, s1 * seg(t, 7.8, 8.2), { color: A.amber }); }
    sums(ctx, env, t, a * win(t, 11.0, 27.8));
    tacks(ctx, env, t, a * win(t, 28.8, 45.8));
    opinions(ctx, env, t, a * win(t, 46.8, 63.8));
    decisions(ctx, env, t, a * win(t, 64.8, 79.8));
    tally(ctx, env, t, [[12.4, 27.8, '36 çıktı, hepsi eşit olasılıklı'], [16.2, 27.8, 'Toplam 7: 6 çıktı'], [18.4, 27.8, 'P(7) = 6/36 = 1/6: teorik'], [21.4, 27.8, '60 oyuncudan ≈ 10 kazanır', true]]);
    tally(ctx, env, t, [[30.2, 45.8, 'İki durum eşit olasılıklı değil'], [32.4, 45.8, '50 atış: 30 yukarı → 0,6'], [39.8, 45.8, '200 atış: 124 yukarı → 0,62'], [43.0, 45.8, 'Deneysel: oyun adil değil', true]]);
    tally(ctx, env, t, [[47.6, 63.8, 'Eşit çıktı yok, deney yapılamaz'], [51.0, 63.8, 'Bilgiye dayalı tahmin: öznel'], [55.4, 63.8, 'Tahminler kişiden kişiye değişir'], [57.8, 63.8, 'Ortak tahmin ≈ %60', true]]);
    tally(ctx, env, t, [[65.4, 79.8, 'Eşit çıktılar varsa: teorik'], [67.4, 79.8, 'Deney tekrarlanabiliyorsa: deneysel'], [69.4, 79.8, 'İkisi de yoksa: öznel'], [72.0, 79.8, 'Seçim kararı değiştirir', true]]);
  }

  function words(ctx, env, t) {
    const W = KD.L(env).W;
    exprs(ctx, t, at(W, 0), [[5.6, 10.2, 'Üç karar, üç farklı olasılık yaklaşımı'],
      [11.4, 27.8, 'Amaç: yeterli ama fazla olmayan ödül'],
      [29.4, 45.8, 'Raptiyenin iki yüzü eşit değil'],
      [47.4, 63.8, 'Bilgi topluyoruz: sezon, rakip, sakatlık'],
      [65.4, 79.8, 'Seçimimizi kararlarımıza yansıtalım']]);
    exprs(ctx, t, at(W, 1), [[18.6, 27.8, 'Çıktılar eşit olasılıklı: sayarak bulabiliriz'],
      [34.6, 45.8, 'Sayamıyoruz, deneyerek buluyoruz'],
      [55.6, 63.8, 'Ayşe, Can ve Ece farklı düşünüyor'],
      [72.0, 79.8, 'Raptiye oyununun kuralını adil olacak biçimde değiştirelim']]);
    exprs(ctx, t, at(W, 2), [[23.4, 27.8, 'Teorik yaklaşım uygun', true], [40.6, 45.8, 'Atış arttıkça sonuç kararlı hale geliyor', true],
      [59.8, 63.8, 'Öznel olasılık: sorgula ve gerekçelendir', true], [75.8, 79.8, 'Uygun yaklaşım, doğru karar', true]]);
  }

  function summary(ctx, env, t) {
    if (t < 80.4) return;
    const S = KD.L(env).SUM, f = F(), a = END(t);
    [['Eşit olasılıklı çıktılar: teorik', 80.6], ['Tekrarlanabilir deney: deneysel', 81.6], ['İkisi de yoksa: bilgiye dayalı öznel', 82.6], ['Uygun yaklaşım, doğru karar!', 83.6, true]].forEach(([s, t0, hot], i) => {
      const al = seg(t, t0, t0 + 0.4) * a; if (al <= 0) return;
      f.expr(ctx, [s], S.x, S.y[i], S.s * (i === 3 ? 1.1 : 1), { alpha: al, w: S.w, halo: true, color: hot ? A.amber : undefined });
    });
  }

  LI.fireworks = function (ctx, env, t) {
    const k = seg(t, 84.4, 86.4);
    if (k <= 0 || t >= 91) return;
    const n = F().nokta(t, env), C = [n.x, n.y - 170];
    [30, 60, 90, 120, 150].forEach((d, i) => {
      const r = 150 + 30 * Math.sin(t * 2 + i);
      A.arc(ctx, C, r, d - 12, d + 12, { p: seg(k, i * 0.12, i * 0.12 + 0.4), alpha: 0.8 * (1 - seg(t, 90.2, 91)), w: 6, seed: 80 + i });
    });
  };

  LI.world = function (ctx, env, t) { context(ctx, env, t); figure(ctx, env, t); words(ctx, env, t); summary(ctx, env, t); };

  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [4.8, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 1, start: 0, end: 10, name: 'The fair', nameTr: 'Kermes', concept: 'Three decisions', conceptTr: 'Üç karar', render });
})(window.LI = window.LI || {});
