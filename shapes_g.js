/* ===== QR Gratis · temporadas y fiestas ===== */
const balloonD = (cx, cy, rx, ry) => `M${cx} ${cy + ry}C${cx - rx * .35} ${cy + ry * .82} ${cx - rx} ${cy + ry * .45} ${cx - rx} ${cy - ry * .1}C${cx - rx} ${cy - ry * .7} ${cx - rx * .55} ${cy - ry} ${cx} ${cy - ry}C${cx + rx * .55} ${cy - ry} ${cx + rx} ${cy - ry * .7} ${cx + rx} ${cy - ry * .1}C${cx + rx} ${cy + ry * .45} ${cx + rx * .35} ${cy + ry * .82} ${cx} ${cy + ry}Z`;
const tierD = (ax, ay, by, half, n) => {
  let d = `M${ax} ${ay}L${ax + half} ${by}`; const w = half * 2 / n;
  for (let i = 0; i < n; i++) d += `Q${fx(ax + half - (i + .5) * w)} ${by + 22} ${fx(ax + half - (i + 1) * w)} ${by}`;
  return d + 'Z';
};

SHAPES.push(
  /* ---------- CALABAZA ---------- */
  { id: 'calabaza', name: 'Calabaza', cat: 'temporada', kw: 'halloween otoño octubre', panel: pn(300, 356, 290, 18),
    orig: { a1: '#f28c28', a2: '#ffb35a', a3: '#c4600c', x: '#5f8f3e', y: '#3f6f28', ol: '#6a3000', ink: '#8a3a00' },
    mono: { x: 'a3', y: 'a2' },
    back: p => {
      const lobes = [[128, 358, 104, 188], [472, 358, 104, 188], [198, 358, 112, 212], [402, 358, 112, 212], [300, 358, 110, 224]];
      return shadow(300, 590, 250, 9, .13)
        + vp('M270 150 C262 100 278 58 308 34 L348 58 C328 82 326 114 334 150Z', p.x, { t: 'cyl', w: 7 })
        + L('M338 74 C396 64 428 104 402 128 C386 142 366 124 382 110', p.y, 7)
        + lobes.map(([x, y, rx, ry]) => ve(x, y, rx, ry, p.a1, { t: 'r', cx: .5, cy: .35, r: .8, l: .5, k: .28, w: 7 })).join('')
        + lobes.map(([x, y, rx, ry]) => L(`M${x} ${y - ry + 14} Q${x - rx * .5} ${y} ${x} ${y + ry - 14}`, p.a3, 5, 'opacity=".35"')).join('')
        + shine('M120 250 Q132 190 190 170', 11, .5);
    } },

  /* ---------- MURCIÉLAGO ---------- */
  { id: 'murcielago', name: 'Murciélago', cat: 'temporada', kw: 'halloween noche vampiro', panel: pno(300, 346, 290, 20),
    orig: { a1: '#5b4a85', a2: '#9a86c9', a3: '#2f2352', y: '#ffd93d', z: '#ff8aa8', ol: '#1d1238', ink: '#2e1f57' },
    mono: { y: 'w', z: 'a2' },
    back: p => {
      const wing = () => vp('M206 262 L14 100 Q44 196 22 262 Q60 250 80 292 Q102 266 130 316 Q152 290 178 336 Q198 306 210 346Z', p.a1, { t: 'e', w: 7, l: .3 })
        + L('M206 262 L14 100 M206 262 L22 262 M206 262 L80 292 M206 262 L130 316 M206 262 L178 336', p.a3, 5, 'opacity=".8"');
      return wing() + MIR(wing())
        + vp('M258 570 l-14 26 l26 -12 l12 14 l6 -26Z', p.a2, { w: 5 }) + vp('M342 570 l14 26 l-26 -12 l-12 14 l-6 -26Z', p.a2, { w: 5 })
        + ve(300, 346, 176, 220, p.a1, { cx: .4, cy: .3, l: .35, k: .3 })
        + vp('M226 110 L206 6 L282 70Z', p.a1, { w: 7 }) + vp('M374 110 L394 6 L318 70Z', p.a1, { w: 7 }) + vp('M232 98 L220 34 L268 70Z', p.z, { w: 0, t: 'flat' }) + vp('M368 98 L380 34 L332 70Z', p.z, { w: 0, t: 'flat' })
        + ve(300, 132, 86, 74, p.a1, { cx: .4, cy: .3, l: .35, k: .25 })
        + eyeD(268, 126, 19, p, 2, 2) + eyeD(332, 126, 19, p, -2, 2) + vc(268, 128, 8, p.y, { w: 0 }) + vc(332, 128, 8, p.y, { w: 0 })
        + vp('M286 150 Q300 158 314 150 Q308 166 300 168 Q292 166 286 150Z', p.a3, { w: 3, t: 'flat' })
        + vp('M280 168 Q300 182 320 168', 'none', { w: 5, t: 'flat' }) + vp('M284 170 L290 190 L296 174Z', '#fff', { w: 3, t: 'flat' }) + vp('M316 170 L310 190 L304 174Z', '#fff', { w: 3, t: 'flat' });
    } },

  /* ---------- HUEVO DE PASCUA ---------- */
  (() => {
    const egg = 'M300 22 C430 22 530 190 530 340 C530 480 440 580 300 580 C160 580 70 480 70 340 C70 190 170 22 300 22Z';
    return {
      id: 'huevo', name: 'Huevo de Pascua', cat: 'temporada', kw: 'pascua primavera conejo chocolate', panel: pn(300, 332, 290, 18),
      orig: { a1: '#ff9ec7', a2: '#ffd1e6', a3: '#e0699f', x: '#ffe066', y: '#7ecbff', z: '#8de0a8', ol: '#7a2f5a', ink: '#8a1f6a' },
      mono: { x: 'a2', y: 'a3', z: 'a2' },
      back: p => {
        let d = '';
        const wave = (y, c, w, amp) => { let q = `M0 ${y}`; for (let x = 0; x < 620; x += 40) q += `Q${x + 10} ${y - amp} ${x + 20} ${y}T${x + 40} ${y}`; return L(q, c, w, 'stroke-linecap="butt"'); };
        d += wave(104, p.x, 26, 16) + wave(104, p.y, 8, 16) + wave(146, p.z, 12, 12) + wave(510, p.x, 26, 16) + wave(510, p.y, 8, 16) + wave(552, p.z, 12, 12);
        for (let r = 0; r < 12; r++) for (let c = 0; c < 8; c++) { const x = 30 + c * 74 + (r % 2 ? 37 : 0), y = 190 + r * 34; if (x > 140 && x < 460 && y > 170 && y < 500) continue; if (y > 190 && y < 480) d += C(x, y, 7, r % 3 ? '#fff' : p.x, 'opacity=".9"'); }
        return vp(egg, p.a1, { t: 'cyl', l: .4, k: .28, w: 7 }) + clip(egg, d + shine('M110 300 Q112 170 190 80', 12, .5)) + vp(egg, 'none', { t: 'flat', w: 7 });
      }
    };
  })(),

  /* ---------- ÁRBOL DE NAVIDAD ---------- */
  { id: 'arbol-navidad', name: 'Árbol de Navidad', cat: 'temporada', kw: 'navidad pino invierno diciembre', panel: pn(300, 402, 290, 18),
    orig: { a1: '#2f9e57', a2: '#69c982', a3: '#1b6a3a', x: '#e63946', y: '#ffd23f', z: '#4ea8f5', u: '#ff8fc8', v: '#8a5a36', ol: '#12452a', ink: '#14502c' },
    back: p => {
      const bauble = (x, y, c) => vc(x, y, 19, c, { w: 4, l: .5 }) + C(x - 6, y - 7, 4, '#fff', 'opacity=".8"') + R(x - 5, y - 26, 10, 9, p.y, 2, STK(p.ol, 2));
      return vr(262, 560, 76, 40, 6, p.v, { t: 'cyl', w: 6 })
        + vp(tierD(300, 200, 570, 288, 9), p.a1, { t: 'v', l: .3, k: .26, w: 7 })
        + vp(tierD(300, 88, 404, 290, 9), p.a1, { t: 'v', l: .3, k: .26, w: 7 })
        + vp(tierD(300, 46, 254, 152, 6), p.a1, { t: 'v', l: .3, k: .26, w: 7 })
        + L('M40 410 Q96 462 150 430', p.y, 7) + L('M560 410 Q504 462 450 430', p.y, 7) + L('M250 110 Q300 150 350 110', p.y, 7) + L('M30 548 Q96 580 150 560', p.y, 7) + L('M570 548 Q504 580 450 560', p.y, 7)
        + bauble(70, 372, p.x) + bauble(534, 380, p.z) + bauble(92, 500, p.u) + bauble(508, 504, p.x) + bauble(256, 200, p.z) + bauble(346, 196, p.x) + bauble(300, 120, p.u)
        + vp(starD(300, 36, 44, .5), p.y, { w: 6, t: 'r' });
    } },

  /* ---------- BOLA DE NAVIDAD ---------- */
  (() => {
    const ball = cpath(300, 340, 268);
    return {
      id: 'bola-navidad', name: 'Bola de Navidad', cat: 'temporada', kw: 'navidad adorno arbol decoracion', panel: pn(300, 344, 290, 18),
      orig: { a1: '#d62839', a2: '#ff7a85', a3: '#8f1426', x: '#f4c542', y: '#ffffff', ol: '#5a0d1a', ink: '#7a1020' },
      mono: { y: 'w' },
      back: p => {
        let d = '';
        for (let i = 0; i < 10; i++) d += L(`M${i * 70 - 20} 130 q35 -26 70 0`, p.y, 7, 'opacity=".9"') + L(`M${i * 70 - 20} 560 q35 26 70 0`, p.y, 7, 'opacity=".9"');
        for (let i = 0; i < 18; i++) { d += C(30 + i * 34, 176, 5, p.x) + C(30 + i * 34, 520, 5, p.x); }
        [[70, 300], [60, 380], [534, 300], [542, 380]].forEach(([x, y]) => { d += spark(x, y, 1.2, p.x); });
        return vr(250, 40, 100, 62, 12, p.x, { t: 'cyl', w: 6 }) + L('M300 44 V18', p.ol, 12) + C(300, 30, 20, 'none', `stroke="${p.ol}" stroke-width="12"`) + C(300, 30, 20, 'none', `stroke="${p.x}" stroke-width="6"`)
          + L('M262 62 H338 M262 80 H338', dk(p.x, .35), 3, 'opacity=".6"')
          + vp(ball, p.a1, { t: 'r', cx: .36, cy: .3, l: .5, k: .32, w: 8 }) + clip(ball, d + shine('M92 270 Q96 170 190 110', 16, .5))
          + vp(ball, 'none', { t: 'flat', w: 8 });
      }
    };
  })(),

  /* ---------- MUÑECO DE NIEVE ---------- */
  { id: 'muneco-nieve', name: 'Muñeco de nieve', cat: 'temporada', kw: 'navidad invierno frio nieve bufanda', panel: pn(300, 408, 290, 18),
    orig: { a1: '#ffffff', a2: '#e6f1ff', a3: '#9ec4ea', x: '#e63946', y: '#3a86d1', z: '#ff8a2a', u: '#6b4a2a', ol: '#2c4a6e', ink: '#24476e' },
    mono: { a1: 'w', u: 'a3' },
    back: p => {
      const stick = d => L(d, p.ol, 16) + L(d, p.u, 8);
      return shadow(300, 598, 250, 9, .12)
        + stick('M64 350 L16 290 M40 318 L12 316') + stick('M536 350 L584 290 M560 318 L588 316')
        + ve(300, 398, 256, 196, '#ffffff', { t: 'r', cx: .4, cy: .3, k: .13, l: 0, w: 7 })
        + vc(300, 122, 104, '#ffffff', { cx: .4, cy: .3, k: .12, l: 0, w: 7 })
        + vp('M196 84 C196 6 404 6 404 84Z', p.y, { t: 'v', w: 7 }) + vr(190, 78, 220, 30, 14, p.a3, { t: 'v', w: 6 }) + vc(300, 18, 24, p.x, { w: 6 })
        + vc(268, 118, 9, p.ol, { w: 0, t: 'flat' }) + vc(332, 118, 9, p.ol, { w: 0, t: 'flat' }) + vp('M288 132 L312 132 L300 182Z', p.z, { w: 5, t: 'd' })
        + [[262, 160], [276, 172], [300, 176], [324, 172], [338, 160]].map(([x, y]) => C(x, y, 5, p.ol)).join('') + E(228, 150, 16, 10, '#ff9aa8', 0, 'opacity=".6"') + E(372, 150, 16, 10, '#ff9aa8', 0, 'opacity=".6"')
        + vp('M206 196 Q300 242 394 196 L404 236 Q300 282 196 236Z', p.x, { t: 'v', w: 7 }) + vp('M384 226 L440 346 L396 358 L360 250Z', p.x, { t: 'v', w: 7 })
        + shine('M130 330 Q124 280 160 250', 9, .7);
    } },

  /* ---------- CORAZÓN ---------- */
  { id: 'corazon', name: 'Corazón', cat: 'temporada', kw: 'san valentin amor te quiero romantico', panel: pn(300, 286, 290, 18),
    orig: { a1: '#e8335a', a2: '#ff8aa0', a3: '#a8183a', ol: '#6a0f26', ink: '#8a1230' },
    back: p => vp(heartD(300, 294, 596), p.a1, { t: 'r', cx: .34, cy: .28, r: .85, l: .5, k: .34, w: 8 })
      + shine('M70 190 Q62 120 130 84', 15, .55) + spark(118, 200, 1.4) + spark(520, 120, 1) },

  /* ---------- CORONA DE NAVIDAD ---------- */
  { id: 'corona-navidad', name: 'Corona de Navidad', cat: 'temporada', kw: 'navidad puerta adviento invierno', panel: pn(300, 296, 290, 20),
    orig: { a1: '#2f9e57', a2: '#69c982', a3: '#1b6a3a', x: '#e63946', y: '#ffd23f', ol: '#12452a', ink: '#14502c' },
    back: p => {
      const rd = rnd(41); let s = vc(300, 296, 286, p.a3, { l: .15, k: .3, w: 7 });
      [[262, 44], [226, 36], [186, 30], [150, 26]].forEach(([r, n], k) => { for (let i = 0; i < n; i++) { const a = i * 360 / n + k * 9 + rd() * 6, [x1, y1] = polar(300, 296, r, a), [x2, y2] = polar(300, 296, r - 30, a + 24); s += vp(leafD(x1, y1, x2, y2, 11), [p.a1, p.a2, p.a3][Math.floor(rd() * 3)], { w: 3.5, t: 'd' }); } });
      [30, 108, 200, 290].forEach(a => { const [x, y] = polar(300, 296, 238, a); s += vc(x - 12, y + 8, 14, p.x, { w: 4 }) + vc(x + 12, y + 6, 14, p.x, { w: 4 }) + vc(x, y - 12, 14, p.x, { w: 4 }) + C(x - 4, y - 18, 4, '#fff', 'opacity=".7"'); });
      return s + G('translate(0 -14)', vp('M298 548 C230 500 160 520 190 576 C210 600 270 570 298 548Z', p.x, { w: 6 }) + vp('M302 548 C370 500 440 520 410 576 C390 600 330 570 302 548Z', p.x, { w: 6 })
        + vp('M290 560 L248 598 L282 598 L306 574Z', p.x, { w: 5 }) + vp('M310 560 L352 598 L318 598 L294 574Z', p.x, { w: 5 }) + vc(300, 556, 20, p.x, { w: 6, l: .5 }));
    } },

  /* ---------- REGALO ---------- */
  { id: 'regalo', name: 'Regalo', cat: 'fiestas', kw: 'cumpleaños navidad lazo sorpresa paquete', panel: pn(300, 424, 290, 18),
    orig: { a1: '#ff6fa5', a2: '#ffb3d0', a3: '#d93d7f', x: '#ffe066', y: '#e8b800', ol: '#7a1f4a', ink: '#8a1f55' },
    mono: { x: 'a2', y: 'a3' },
    back: p => {
      const body = rrp(58, 236, 484, 344, 16);
      let dd = ''; for (let r = 0; r < 12; r++) for (let c = 0; c < 8; c++) { const x = 30 + c * 76 + (r % 2 ? 38 : 0), y = 270 + r * 32; if (x > 140 && x < 460 && y > 260 && y < 570) continue; dd += C(x, y, 8, '#fff', 'opacity=".45"'); }
      const loop = () => vp('M296 166 C240 60 140 70 168 138 C184 178 262 178 296 166Z', p.x, { t: 'd', w: 7, l: .3 }) + L('M284 156 C240 100 190 100 190 126', p.y, 6, 'opacity=".7"');
      return shadow(300, 594, 250, 9, .13)
        + vp(body, p.a1, { t: 'cyl', l: .35 }) + clip(body, dd + vr(264, 230, 72, 360, 0, p.x, { t: 'cyl', w: 0 })) + vp(body, 'none', { t: 'flat' })
        + vr(36, 166, 528, 96, 16, p.a3, { t: 'v', l: .3, w: 7 }) + vr(264, 166, 72, 96, 0, p.x, { t: 'cyl', w: 6 })
        + loop() + MIR(loop()) + vp('M292 174 L246 240 L280 244 L306 190Z', p.x, { w: 6 }) + vp('M308 174 L354 240 L320 244 L294 190Z', p.x, { w: 6 })
        + vr(274, 134, 52, 46, 14, p.x, { t: 'd', w: 7 });
    } },

  /* ---------- GLOBOS ---------- */
  { id: 'globos', name: 'Globos', cat: 'fiestas', kw: 'fiesta cumpleaños celebracion helio', panel: pn(290, 274, 290, 18),
    orig: { a1: '#e63946', a2: '#ff8a93', a3: '#a81d2d', y: '#ffd23f', z: '#4ea8f5', ol: '#5a1a22', ink: '#8a1426' },
    mono: { y: 'a2', z: 'a3' },
    back: p => {
      const bal = (cx, cy, rx, ry, c) => vp(balloonD(cx, cy, rx, ry), c, { t: 'r', cx: .34, cy: .28, r: .85, l: .55, k: .3, w: 7 }) + vp(`M${cx - 10} ${cy + ry + 14} L${cx} ${cy + ry} L${cx + 10} ${cy + ry + 14}Z`, c, { w: 5, t: 'flat' })
        + L(arcD(cx, cy, rx - 22, 205, 248), '#fff', 11, 'opacity=".6"');
      return L('M92 312 C104 430 250 480 292 546', p.ol, 4) + L('M508 308 C504 432 340 480 292 546', p.ol, 4) + L('M292 520 C284 560 300 576 296 598', p.ol, 4)
        + bal(88, 200, 84, 98, p.y) + bal(508, 196, 90, 104, p.z) + bal(290, 274, 236, 252, p.a1);
    } },

  /* ---------- CORONA DE REY ---------- */
  { id: 'corona', name: 'Corona', cat: 'fiestas', kw: 'rey reina premio campeon realeza', panel: pn(300, 372, 290, 18),
    orig: { a1: '#f6b93b', a2: '#ffe08a', a3: '#c98a10', x: '#e63946', y: '#4ea8f5', z: '#3fbf7a', ol: '#7a4a00', ink: '#6a3d00' },
    mono: { x: 'a3', y: 'a2', z: 'a3' },
    back: p => {
      const body = 'M46 560 L46 84 L172 176 L300 44 L428 176 L554 84 L554 560Z';
      return shadow(300, 596, 250, 8, .13)
        + vp(body, p.a1, { t: 'cyl', l: .45, k: .3, w: 8 }) + shine('M64 150 V500', 10, .4)
        + vr(30, 500, 540, 78, 16, p.a3, { t: 'v', w: 8, l: .3 })
        + [[46, 84], [300, 44], [554, 84]].map(([x, y]) => vc(x, y - 10, 24, p.a2, { w: 6, l: .5 })).join('')
        + [[100, 538, p.x], [200, 538, p.y], [300, 538, p.z], [400, 538, p.y], [500, 538, p.x]].map(([x, y, c]) => vp(`M${x} ${y - 24} L${x + 24} ${y} L${x} ${y + 24} L${x - 24} ${y}Z`, c, { w: 5, l: .5 }) + C(x - 6, y - 7, 4, '#fff', 'opacity=".8"')).join('')
        + [[96, 300], [504, 300], [96, 420], [504, 420]].map(([x, y]) => C(x, y, 11, p.a2, STK(p.ol, 4))).join('');
    } },

  /* ---------- BOLA DE DISCOTECA ---------- */
  (() => {
    const R0 = 258, cx = 300, cy = 332, rd = rnd(8), tiles = [];
    for (let th = -84; th < 84; th += 12) for (let ph = -84; ph < 84; ph += 12) {
      const P = (t, f) => { const T = t * Math.PI / 180, F = f * Math.PI / 180; return [cx + R0 * Math.cos(T) * Math.sin(F), cy + R0 * Math.sin(T)]; };
      const g = 1.6, q = [P(th + g, ph + g), P(th + g, ph + 12 - g), P(th + 12 - g, ph + 12 - g), P(th + 12 - g, ph + g)];
      tiles.push([q, (1 - (th + ph + 168) / 336) * .6 + rd() * .5]);
    }
    return {
      id: 'disco', name: 'Bola de discoteca', cat: 'fiestas', kw: 'baile fiesta noche musica espejos', panel: pn(300, 334, 290, 18),
      orig: { a1: '#8fa3c7', a2: '#e2ecff', a3: '#3f5280', x: '#ffd0ec', y: '#bff0ff', ol: '#233152', ink: '#233152' },
      back: p => {
        let s = vc(cx, cy, R0 + 4, p.a3, { l: .1, k: .3, w: 7 });
        tiles.forEach(([q, k]) => { const c = k > .75 ? p.a2 : k > .5 ? p.y : k > .3 ? p.a1 : k > .15 ? p.x : p.a3; s += `<polygon points="${q.map(a => fx(a[0]) + ',' + fx(a[1])).join(' ')}" fill="${mixC(c, k > .5 ? '#ffffff' : '#27103a', .12)}" stroke="${p.ol}" stroke-width="1.2" opacity=".96"/>`; });
        return vr(268, 52, 64, 36, 6, p.a3, { t: 'cyl', w: 6 }) + C(300, 38, 18, 'none', `stroke="${p.ol}" stroke-width="10"`) + C(300, 38, 18, 'none', `stroke="${p.a2}" stroke-width="4"`)
          + s + vc(cx, cy, R0, 'none', { t: 'flat', w: 7 }) + spark(122, 186, 1.8) + spark(512, 240, 1.4) + spark(460, 520, 1.6) + spark(150, 500, 1.1);
      }
    };
  })(),

  /* ---------- TROFEO ---------- */
  { id: 'trofeo', name: 'Trofeo', cat: 'fiestas', kw: 'copa campeon premio ganador deporte', panel: pn(300, 238, 290, 18),
    orig: { a1: '#f6b93b', a2: '#ffe08a', a3: '#c98a10', x: '#6b3f1d', y: '#a5672b', ol: '#6a3d00', ink: '#6a3d00' },
    mono: { x: 'a3', y: 'a1' },
    back: p => {
      const bowl = 'M70 50 H530 C530 220 500 360 440 408 Q420 424 396 426 H204 Q180 424 160 408 C100 360 70 220 70 50Z';
      const handle = () => L('M84 100 C0 100 -4 300 126 332', p.ol, 42) + L('M84 100 C0 100 -4 300 126 332', p.a1, 28) + L('M60 120 C20 150 28 260 90 300', lt(p.a1, .55), 6, 'opacity=".7"');
      return shadow(300, 598, 220, 8, .14)
        + handle() + MIR(handle())
        + vp('M256 420 H344 V486 H256Z', p.a3, { t: 'cyl', w: 7 }) + vp('M180 482 H420 L456 548 H144Z', p.a1, { t: 'cyl', w: 7 })
        + vr(120, 540, 360, 54, 10, p.x, { t: 'cyl', w: 7 }) + vr(230, 556, 140, 24, 6, p.a2, { w: 4 })
        + vp(bowl, p.a1, { t: 'cyl', l: .5, k: .3, w: 8 }) + shine('M96 110 C100 230 124 320 170 372', 12, .45)
        + vp(starD(300, 484, 0, .5), p.a2, { w: 0 });
    } }
);
