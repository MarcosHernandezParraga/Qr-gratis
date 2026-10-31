/* ===== QR Gratis · básicos, comida y bebida ===== */
const none = () => '';

SHAPES.push(
  { id: 'sin-dibujo', name: 'Sin dibujo', cat: 'basicos', plain: true, kw: 'normal clasico simple negro blanco', fixed: { ink: '#000000', paper: '#ffffff' }, panel: { x: 0, y: 0, s: 600, r: 0 }, back: none },
  { id: 'invertido', name: 'Blanco sobre negro', cat: 'basicos', kw: 'invertido oscuro', fixed: { ink: '#ffffff', paper: '#000000' }, panel: { x: 0, y: 0, s: 600, r: 0 }, back: none,
    note: 'Algunos lectores antiguos no leen el blanco sobre negro. Pruébalo con tu móvil antes de imprimir.' },
  { id: 'solo-color', name: 'Solo color', cat: 'basicos', plain: true, kw: 'color liso sin dibujo', orig: { ink: '#1d2a44' }, panel: { x: 0, y: 0, s: 600, r: 0 }, back: none },
  { id: 'marco', name: 'Con marco', cat: 'basicos', kw: 'marco borde redondeado', orig: { a1: '#3f8fe0', a2: '#d4ebff', a3: '#2a62b0', ink: '#1d3f7c' }, panel: pn(300, 300, 504, 22),
    back: p => vr(16, 16, 568, 568, 52, p.a1, { t: 'd' }) + vr(34, 34, 532, 532, 40, p.a2, { t: 'v', w: 0, l: .2, k: .08 })
      + shine('M70 60 Q140 36 230 34', 7, .7) },

  /* ---------- TAZA DE CAFÉ ---------- */
  { id: 'taza', name: 'Taza de café', cat: 'comida', kw: 'cafe te desayuno bar cafeteria', panel: pn(255, 342, 290, 18),
    orig: { a1: '#ef6a5a', a2: '#fbb9ab', a3: '#b9403a', x: '#5b3522', y: '#c58e58', z: '#fff5e6', u: '#c9d6e3', ol: '#5b2b2b', ink: '#4a2c1a' },
    mono: { z: 'w', u: 'a2' },
    back: p => {
      const body = 'M38 160 V432 Q38 520 126 520 H382 Q470 520 470 432 V160 Z';
      const steam = d => L(d, p.u, 13, 'opacity=".9"');
      return shadow(280, 566, 262, 20)
        + ve(270, 546, 262, 44, p.z, { t: 'v', k: .16 }) + ve(270, 541, 196, 26, dk(p.z, .12), { t: 'flat', w: 0 })
        + L('M462 238 C584 212 590 438 456 432', p.ol, 52) + L('M462 238 C584 212 590 438 456 432', p.a1, 38)
        + L('M490 246 C556 240 570 336 532 398', lt(p.a1, .6), 7, 'opacity=".7"')
        + vp(body, p.a1, { t: 'cyl' })
        + clip(body, R(30, 206, 450, 22, p.a2, 0, 'opacity=".55"') + R(30, 470, 450, 26, p.a3, 0, 'opacity=".45"') + dots([[60, 300], [60, 340], [60, 380], [448, 300], [448, 340], [448, 380]], 6, p.a2, 'opacity=".8"'))
        + shade('M38 470 Q38 520 126 520 H382 Q470 520 470 432 V470 Q440 500 376 500 H132 Q60 500 38 470Z', .12)
        + shine('M54 238 V268', 8, .6)
        + ve(254, 160, 216, 40, p.a2, { t: 'v' })
        + ve(254, 164, 192, 28, p.x, { t: 'v', k: .3, w: 4 })
        + E(254, 168, 162, 14, p.y, 0, 'opacity=".55"') + shine('M120 170 Q160 185 210 188', 5, .55)
        + steam('M190 108 C160 84 222 62 190 26') + steam('M256 110 C226 84 288 60 256 22') + steam('M322 108 C292 86 352 64 322 30');
    } },

  /* ---------- PANAL DE MIEL ---------- */
  { id: 'panal', name: 'Panal de miel', cat: 'comida', kw: 'miel abeja colmena hexagono dulce', panel: pn(300, 290, 304, 22),
    orig: { a1: '#f4a824', a2: '#ffd467', a3: '#c97a0c', x: '#fff0b8', ol: '#8c4a0a', ink: '#8a4300' },
    back: p => {
      const r0 = 44, dx = Math.sqrt(3) * r0, dy = 1.5 * r0, rd = rnd(7), cells = [];
      for (let row = -8; row <= 8; row++) for (let col = -8; col <= 8; col++) {
        const x = 300 + col * dx + ((row & 1) ? dx / 2 : 0), y = 290 + row * dy;
        if (Math.pow((x - 300) / 250, 2) + Math.pow((y - 290) / 236, 2) > 1) continue;
        cells.push([x, y, rd()]);
      }
      let s = '';
      cells.forEach(([x, y, k]) => {
        const wax = k < .5 ? p.a2 : lt(p.a2, .3);
        s += vp(hexp(x, y, r0 - 2, 30), wax, { w: 4.5, l: .3, k: .12 });
        if (k > .72) {
          s += vp(hexp(x, y, r0 - 12, 30), p.a1, { w: 3, ol: p.a3 }) + shine(`M${x - 14} ${y - 7} Q${x - 8} ${y - 15} ${x + 3} ${y - 16}`, 4.5, .85);
        } else {
          s += vp(hexp(x, y, r0 - 12, 30), k > .4 ? dk(p.a1, .12) : p.a3, { w: 3, ol: dk(p.a3, .2), t: 'e', l: .1, k: .3 });
        }
      });
      const drip = (x, y1, y2, w) => {
        const d = `M${x - w * .55} ${y1}C${x - w * .5} ${y1 + (y2 - y1) * .5} ${x - w} ${y2 - w * 1.5} ${x - w} ${y2 - w * .5}A${w} ${w} 0 0 0 ${x + w} ${y2 - w * .5}C${x + w} ${y2 - w * 1.5} ${x + w * .5} ${y1 + (y2 - y1) * .5} ${x + w * .55} ${y1}Z`;
        return vp(d, p.a1, { t: 'h', l: .35, k: .22, ol: p.ol, w: 6 }) + L(`M${x - w * .45} ${y2 - w * 1.4} V${y2 - w * .8}`, p.x, 6, 'opacity=".9"');
      };
      return s + drip(176, 462, 566, 26) + drip(310, 500, 548, 19) + drip(436, 440, 584, 28);
    } }
);

/* ---------- RODAJAS DE FRUTA ---------- */
function wedgeD(cx, cy, N, i, rot, r0, r1, g) {
  const b0 = (rot + i * 360 / N) * Math.PI / 180, b1 = (rot + (i + 1) * 360 / N) * Math.PI / 180, h = g / 2, t1 = Math.sqrt(r1 * r1 - h * h);
  const A = t => [cx + Math.cos(b0) * t - Math.sin(b0) * h, cy + Math.sin(b0) * t + Math.cos(b0) * h];
  const B = t => [cx + Math.cos(b1) * t + Math.sin(b1) * h, cy + Math.sin(b1) * t - Math.cos(b1) * h];
  const a0 = A(r0), a1 = A(t1), c1 = B(t1), c0 = B(r0);
  return `M${fx(a0[0])} ${fx(a0[1])}L${fx(a1[0])} ${fx(a1[1])}A${r1} ${r1} 0 0 1 ${fx(c1[0])} ${fx(c1[1])}L${fx(c0[0])} ${fx(c0[1])}Z`;
}

function citrus(id, name, kw, N, orig) {
  return {
    id, name, cat: 'comida', kw, orig, mono: { x: 'w' }, panel: pn(300, 300, 312, 26),
    back: p => {
      const rd = rnd(N * 31 + 5), rot = -90 + 180 / N;
      let s = vc(300, 300, 274, p.a1, { l: .3, k: .3 });
      for (let i = 0; i < 70; i++) { const a = rd() * 360, r = 256 + rd() * 10, [x, y] = polar(300, 300, r, a); s += C(x, y, 1.6 + rd() * 1.8, dk(p.a1, .3), 'opacity=".45"'); }
      s += C(300, 300, 247, p.x, `stroke="${dk(p.x, .25)}" stroke-width="2.5"`);
      for (let i = 0; i < N; i++) {
        const d = wedgeD(300, 300, N, i, rot, 40, 233, 12), mid = (rot + (i + .5) * 360 / N) * Math.PI / 180;
        let tex = '';
        for (let j = 0; j < 6; j++) {
          const off = (j - 2.5) * (360 / N) * Math.PI / 180 * .13, a = mid + off, r1 = 125 + rd() * 25, r2 = 190 + rd() * 36;
          tex += L(`M${fx(300 + Math.cos(a) * r1)} ${fx(300 + Math.sin(a) * r1)} L${fx(300 + Math.cos(a) * r2)} ${fx(300 + Math.sin(a) * r2)}`, lt(p.a2, .6), 4.5, 'opacity=".5"');
        }
        s += vp(d, p.a2, { t: 'r', ol: p.a3, w: 4, l: .32, k: .16 }) + clip(d, tex);
      }
      s += L(arcD(300, 300, 262, 198, 252), '#ffffff', 9, 'opacity=".5"') + L(arcD(300, 300, 262, 258, 272), '#ffffff', 9, 'opacity=".5"');
      return s;
    }
  };
}

SHAPES.push(
  citrus('naranja', 'Naranja', 'fruta rodaja zumo citrico vitamina', 10, { a1: '#f28a1e', a2: '#ffab2e', a3: '#e0750f', x: '#fff1cc', ol: '#8a4a10', ink: '#9a5300' }),
  citrus('limon', 'Limón', 'fruta rodaja citrico limonada amarillo', 9, { a1: '#f1cf1c', a2: '#ffe45a', a3: '#e2b90c', x: '#fff9d4', ol: '#8a6a10', ink: '#8a6600' }),
  citrus('lima', 'Lima', 'fruta rodaja citrico mojito verde', 9, { a1: '#4f9d33', a2: '#a9d85b', a3: '#78b53c', x: '#eef6cf', ol: '#2f5a1c', ink: '#2f6a1a' }),
  citrus('pomelo', 'Pomelo rosa', 'fruta rodaja citrico pomelo toronja', 11, { a1: '#f4a64b', a2: '#ff7d8f', a3: '#e0526a', x: '#fff0dd', ol: '#8a3a2a', ink: '#9c2540' })
);

SHAPES.push(
  /* ---------- KIWI ---------- */
  { id: 'kiwi', name: 'Kiwi', cat: 'comida', kw: 'fruta rodaja verde', panel: pn(300, 300, 312, 26),
    orig: { a1: '#9a6b3c', a2: '#8cc63f', a3: '#5b9a2a', x: '#e9f6b4', y: '#2b2118', ol: '#4e3417', ink: '#3f6f12' },
    mono: { y: 'ol' },
    back: p => {
      const rd = rnd(11);
      let s = '';
      for (let i = 0; i < 170; i++) { const a = rd() * 360, [x1, y1] = polar(300, 300, 270, a), [x2, y2] = polar(300, 300, 279 + rd() * 6, a + (rd() - .5) * 10); s += L(`M${x1} ${y1} L${x2} ${y2}`, p.a1, 2.4); }
      s += vc(300, 300, 274, p.a1, { l: .25, k: .3 }) + C(300, 300, 252, p.x, `stroke="${p.a3}" stroke-width="3"`)
        + vc(300, 300, 244, p.a2, { cx: .5, cy: .5, r: .72, w: 0, l: .45, k: .1 });
      for (let i = 0; i < 72; i++) {
        const a = i * 5 + rd() * 3, r1 = 158 + rd() * 14, r2 = 208 + rd() * 30, [x1, y1] = polar(300, 300, r1, a), [x2, y2] = polar(300, 300, r2, a);
        s += L(`M${x1} ${y1} L${x2} ${y2}`, i % 2 ? lt(p.a2, .55) : p.a3, i % 2 ? 3.4 : 2.6, 'opacity=".55"');
      }
      for (let i = 0; i < 34; i++) {
        const a = i * 360 / 34, [x, y] = polar(300, 300, 180, a);
        s += E(x, y, 5.5, 11.5, p.y, a + 90, 'opacity=".95"');
      }
      for (let i = 0; i < 34; i++) {
        const a = (i + .5) * 360 / 34, [x, y] = polar(300, 300, 214, a);
        s += E(x, y, 5, 10.5, p.y, a + 90, 'opacity=".95"');
      }
      return s + L(arcD(300, 300, 262, 200, 248), '#ffffff', 8, 'opacity=".45"');
    } },

  /* ---------- SANDÍA ---------- */
  { id: 'sandia', name: 'Sandía', cat: 'comida', kw: 'fruta rodaja verano roja pepitas', panel: pn(300, 300, 312, 26),
    orig: { a1: '#f0455a', a2: '#ff8a96', a3: '#c2243b', x: '#2f8a3e', y: '#7ccb5b', z: '#f1f6d2', ol: '#6a2430', ink: '#a01f33' },
    mono: { z: 'w' },
    back: p => {
      const rd = rnd(3);
      let s = vc(300, 300, 274, p.y, { l: .25, k: .25, ol: dk(p.x, .35) });
      for (let i = 0; i < 16; i++) {
        const a = i * 22.5 + 4, [x1, y1] = polar(300, 300, 252, a), [x2, y2] = polar(300, 300, 270, a + 8);
        s += L(`M${x1} ${y1} Q${polar(300, 300, 262, a + 14)[0]} ${polar(300, 300, 262, a + 14)[1]} ${x2} ${y2}`, p.x, 15, 'opacity=".9"');
      }
      s += C(300, 300, 252, p.z, `stroke="${dk(p.z, .3)}" stroke-width="3"`)
        + vc(300, 300, 238, p.a1, { cx: .5, cy: .5, r: .7, w: 0, l: .38, k: .12 });
      for (let i = 0; i < 60; i++) {
        const a = rd() * 360, r1 = 160 + rd() * 20, r2 = 200 + rd() * 34, [x1, y1] = polar(300, 300, r1, a), [x2, y2] = polar(300, 300, r2, a + rd() * 6);
        s += L(`M${x1} ${y1} L${x2} ${y2}`, p.a2, 3, 'opacity=".4"');
      }
      for (let i = 0; i < 20; i++) {
        const a = i * 18 + (i % 2 ? 9 : 0), [x, y] = polar(300, 300, i % 2 ? 202 : 178, a + (rd() - .5) * 4);
        s += E(x, y, 6.5, 12, p.ol, a + 90) + E(x - 1.8, y - 3.5, 1.6, 3.4, '#ffffff', a + 90, 'opacity=".55"');
      }
      return s + L(arcD(300, 300, 262, 200, 245), '#ffffff', 8, 'opacity=".45"');
    } },

  /* ---------- FRESA ---------- */
  (() => {
    const body = [300, 140, 430, 104, 530, 164, 562, 272, 536, 382, 462, 492, 382, 552, 300, 586, 218, 552, 138, 492, 64, 382, 38, 272, 70, 164, 170, 104];
    const poly = pairs(body);
    return {
      id: 'fresa', name: 'Fresa', cat: 'comida', kw: 'fruta fresones roja', panel: pn(300, 322, 300, 22),
      orig: { a1: '#e8344f', a2: '#ff7283', a3: '#a81c3a', x: '#ffdc62', y: '#4aa84c', z: '#2f7d3a', ol: '#6b1a28', ink: '#9b1b30' },
      mono: { z: 'a3' },
      back: p => {
        let s = vp(SM(body), p.a1, { t: 'r', cx: .4, cy: .3, r: .85, l: .3, k: .34 });
        s += shade('M70 164 Q40 270 64 382 Q138 492 218 552 Q100 450 90 330 Q82 230 120 150Z', .1)
          + shine('M92 190 Q66 260 82 336', 11, .45);
        const rd = rnd(9);
        for (let row = 0; row < 17; row++) for (let col = 0; col < 19; col++) {
          const x = 46 + col * 30 + (row % 2 ? 15 : 0) + (rd() - .5) * 5, y = 124 + row * 29 + (rd() - .5) * 4;
          if (!inPoly(poly, x, y) || edgeDist(poly, x, y) < 20) continue;
          if (x > 136 && x < 464 && y > 160 && y < 484) continue;
          const rot = (x - 300) * .2;
          s += E(x + 1.6, y + 2.6, 5.2, 8, dk(p.a1, .4), rot, 'opacity=".6"') + E(x, y, 5, 7.8, p.x, rot, STK(dk(p.x, .45), 1.4));
        }
        const leaf = (a, len, w, col) => { const [x, y] = polar(300, 150, len, a); return vp(leafD(300, 150, x, y, w), col, { w: 5, ol: p.ol, l: .25 }); };
        s += leaf(160, 150, 28, p.z) + leaf(20, 150, 28, p.z) + leaf(196, 176, 30, p.y) + leaf(344, 176, 30, p.y) + leaf(232, 140, 28, p.z) + leaf(308, 140, 28, p.z) + leaf(268, 120, 26, p.y);
        s += vp('M290 120 C288 84 296 58 318 36 L334 48 C320 70 316 92 316 124Z', p.z, { w: 5, t: 'cyl' });
        return s;
      }
    };
  })(),

  /* ---------- PIÑA ---------- */
  { id: 'pina', name: 'Piña', cat: 'comida', kw: 'fruta tropical hawaiana verano', panel: pn(300, 380, 300, 22),
    orig: { a1: '#f7b52a', a2: '#ffd96a', a3: '#c97a10', x: '#4fa83d', y: '#2f7d32', z: '#86d054', ol: '#7a4a10', ink: '#8a5200' },
    back: p => {
      let s = '';
      const leaf = (a, len, w, col) => { const [x, y] = polar(300, 190, len, a); return vp(leafD(300, 190, x, y, w), col, { w: 5, ol: dk(p.y, .3), l: .25 }); };
      s += leaf(215, 190, 30, p.y) + leaf(325, 190, 30, p.y) + leaf(240, 175, 28, p.x) + leaf(300, 175, 28, p.x) + leaf(195, 140, 26, p.z) + leaf(345, 140, 26, p.z) + leaf(268, 190, 30, p.z) + leaf(285, 150, 24, p.x);
      const bd = epath(300, 382, 226, 212);
      s += vp(bd, p.a1, { t: 'r', cx: .38, cy: .3, l: .3, k: .3 });
      let lat = '';
      const S = 56;
      for (let k = -12; k <= 12; k++) {
        lat += L(`M${300 + S * k - 400} ${382 - 400} L${300 + S * k + 400} ${382 + 400}`, p.a3, 5.5, 'opacity=".9"')
          + L(`M${300 + S * k + 400} ${382 - 400} L${300 + S * k - 400} ${382 + 400}`, p.a3, 5.5, 'opacity=".9"');
      }
      for (let k = -8; k <= 8; k++) for (let m = -8; m <= 8; m++) {
        const x = 300 + S / 2 * (k + m + 1), y = 382 + S / 2 * (m - k);
        if (x < 60 || x > 540 || y < 130 || y > 620) continue;
        lat += P(`M${x - 8} ${y - 4} L${x} ${y + 6} L${x + 8} ${y - 4}`, 'none', `stroke="${p.ol}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" opacity=".6"`)
          + L(`M${x - 6} ${y - 11} Q${x} ${y - 16} ${x + 7} ${y - 11}`, lt(p.a2, .5), 3.4, 'opacity=".85"');
      }
      s += clip(bd, lat) + vp(bd, 'none', { t: 'flat', w: 6 }) + shine('M122 330 Q112 400 150 480', 11, .45);
      return s;
    } }
);
