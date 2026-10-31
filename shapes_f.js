/* ===== QR Gratis · naturaleza ===== */
const FULL = 'M0 0H600V600H0Z';
const blobOf = (cs, rects) => cs.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('') + (rects || []).map(([x, y, w, h, r]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/>`).join('');

SHAPES.push(
  /* ---------- NUBE ---------- */
  (() => {
    const CL = [[170, 196, 100], [300, 134, 114], [430, 196, 100], [96, 326, 88], [504, 326, 88], [150, 444, 86], [300, 480, 98], [450, 444, 86]], RC = [[118, 300, 364, 236, 44]];
    return {
      id: 'nube', name: 'Nube', cat: 'naturaleza', kw: 'cielo lluvia sol tiempo clima', panel: pn(300, 312, 296, 18),
      orig: { a1: '#eaf5ff', a2: '#ffffff', a3: '#a9cdec', y: '#ffc83d', z: '#ff9d3d', ol: '#4a78a8', ink: '#2c5c93' },
      mono: { y: 'a2', z: 'a1' },
      back: p => vc(520, 84, 50, p.y, { ol: p.z, w: 6 }) + rays(520, 84, 66, 86, 10, p.z, 9)
        + CL.map(([x, y, r]) => C(x, y, r + 6, p.ol)).join('') + R(112, 294, 376, 248, p.ol, 50)
        + CL.slice().sort((a, b) => a[1] - b[1]).map(([x, y, r]) => vc(x, y, r, p.a1, { w: 0, cx: .4, cy: .3, r: .85, l: .7, k: .2 })).join('') + vr(120, 300, 360, 238, 46, p.a1, { w: 0, t: 'v', l: .2, k: .18 })
        + CL.filter(c => c[1] < 250).map(([x, y, r]) => L(arcD(x, y, r - 16, 205, 255), '#fff', 9, 'opacity=".9"')).join('')
    };
  })(),

  /* ---------- SOL ---------- */
  { id: 'sol', name: 'Sol', cat: 'naturaleza', kw: 'verano calor dia luz playa', panel: pn(300, 300, 292, 20),
    orig: { a1: '#ffc61a', a2: '#ffe680', a3: '#f08a00', z: '#ff9d1f', ol: '#9a4a00', ink: '#8a4a00' },
    mono: { z: 'a3' },
    back: p => {
      let s = '';
      for (let i = 0; i < 16; i++) {
        const a = i * 22.5 - 90, long = i % 2 === 0, r1 = 226, r2 = long ? 292 : 262, w = long ? 17 : 13;
        const [x1, y1] = polar(300, 300, r1, a - w * .9), [x2, y2] = polar(300, 300, r1, a + w * .9), [tx, ty] = polar(300, 300, r2, a);
        s += vp(`M${x1} ${y1}L${tx} ${ty}L${x2} ${y2}Z`, long ? p.z : p.a1, { w: 6, t: 'd' });
      }
      return s + vc(300, 300, 232, p.a1, { cx: .38, cy: .3, l: .5, k: .24 }) + L(arcD(300, 300, 214, 196, 250), '#fff', 12, 'opacity=".55"') + C(300, 300, 214, 'none', `stroke="${p.a3}" stroke-width="3" opacity=".35"`);
    } },

  /* ---------- ARCOÍRIS ---------- */
  { id: 'arcoiris', name: 'Arcoíris', cat: 'naturaleza', kw: 'lluvia colores orgullo cielo nubes', panel: pn(300, 404, 290, 18),
    orig: { a1: '#ef476f', a2: '#ffa94d', a3: '#ffd166', x: '#52c97a', y: '#4ea8f5', z: '#ffffff', ol: '#5b6b8c', ink: '#3b4a7a' },
    mono: { z: 'w' },
    back: p => {
      const cols = [p.a1, p.a2, p.a3, p.x, p.y], W = 22, R0 = 268, arch = r => `M${300 - r} 566V330A${r} ${r} 0 0 1 ${300 + r} 330V566`;
      let s = L(arch(R0 - W * 2), p.ol, W * 5 + 12, 'stroke-linecap="butt"');
      cols.forEach((c, i) => { s += L(arch(R0 - i * W), c, W + .5, 'stroke-linecap="butt"'); });
      s += L(arch(R0 - 4 * W - 11), 'none', 0) + shine(arcD(300, 330, R0 + 4, 200, 250), 6, .5);
      const cloud = x => [[x - 52, 556, 40], [x, 534, 52], [x + 56, 556, 40]].map(([a, b, r]) => C(a, b, r + 5, p.ol)).join('') + R(x - 96, 540, 200, 46, p.ol, 23)
        + [[x - 52, 556, 40], [x, 534, 52], [x + 56, 556, 40]].map(([a, b, r]) => vc(a, b, r, '#ffffff', { w: 0, l: 0, k: .1 })).join('') + R(x - 92, 544, 192, 38, '#fff', 19);
      return s + cloud(92) + cloud(508);
    } },

  /* ---------- ÁRBOL ---------- */
  (() => {
    const CN = [[160, 172, 100], [300, 98, 114], [440, 172, 100], [104, 302, 88], [496, 302, 88], [160, 418, 92], [440, 418, 92], [300, 452, 96]], RC = [[118, 270, 364, 220, 44]];
    return {
      id: 'arbol', name: 'Árbol', cat: 'naturaleza', kw: 'bosque verde campo hoja planta manzano', panel: pn(300, 280, 292, 18),
      orig: { a1: '#4caf50', a2: '#9ed96a', a3: '#2e7d32', x: '#8a5a36', y: '#e63946', ol: '#1f4a24', ink: '#1b5a28' },
      mono: { x: 'a3', y: 'a2' },
      back: p => {
        let g = ''; for (let i = 0; i < 20; i++) { const x = 10 + i * 31; g += vp(`M${x} 600 Q${x + 4} 566 ${x + 16} 556 Q${x + 18} 580 ${x + 30} 600Z`, i % 2 ? p.a2 : p.a1, { w: 4, t: 'd' }); }
        const apples = [[104, 196], [500, 236], [124, 392], [476, 396], [212, 40], [404, 34], [60, 300]];
        return G('translate(300 300) scale(.9) translate(-300 -300)', vp('M262 440 H338 L350 570 H250Z', p.x, { t: 'cyl', w: 7 }) + L('M284 470 V560 M318 480 V556', dk(p.x, .3), 4, 'opacity=".5"')
          + CN.map(([x, y, r]) => C(x, y, r + 6, p.ol)).join('') + R(112, 264, 376, 232, p.ol, 50)
          + CN.slice().sort((a, b) => a[1] - b[1]).map(([x, y, r]) => vc(x, y, r, p.a1, { w: 0, cx: .4, cy: .3, r: .85, l: .45, k: .3 })).join('') + vr(120, 274, 360, 224, 46, p.a1, { w: 0, t: 'v', l: .1, k: .3 })
          + [[130, 120], [230, 40], [380, 56], [470, 130], [74, 260], [540, 270], [96, 430], [510, 440]].map(([x, y]) => L(arcD(x, y, 34, 200, 300), p.a2, 8, 'opacity=".55"')).join('')
          + [[210, 150], [400, 100], [76, 340], [526, 340], [250, 520], [380, 510]].map(([x, y]) => L(arcD(x, y, 28, 20, 120), p.a3, 8, 'opacity=".4"')).join('')
          + apples.map(([x, y]) => vc(x, y, 17, p.y, { w: 4, l: .5 }) + C(x - 5, y - 6, 4, '#fff', 'opacity=".75"') + L(`M${x} ${y - 16} v-8`, p.ol, 3)).join(''))
          + g;
      }
    };
  })(),

  /* ---------- CACTUS ---------- */
  { id: 'cactus', name: 'Cactus', cat: 'naturaleza', kw: 'desierto planta maceta mexico', panel: pn(300, 292, 288, 18),
    orig: { a1: '#4fae5d', a2: '#98d98a', a3: '#2e7d3a', x: '#d9784a', y: '#f6a06a', z: '#ff6fa5', ol: '#1f4a2a', ink: '#1f5a2a' },
    mono: { x: 'a3', y: 'a2', z: 'a2' },
    back: p => {
      const body = rrp(124, 60, 352, 470, 150);
      let sp = ''; [[92, 120], [64, 200], [92, 300], [510, 160], [540, 250], [516, 340], [158, 112], [440, 114], [150, 470], [450, 470], [240, 500], [360, 504]].forEach(([x, y]) => { sp += L(`M${x} ${y} l8 -9 M${x} ${y} l-9 -8`, '#fff', 3.5, 'opacity=".9"'); });
      let ribs = ''; [180, 240, 300, 360, 420].forEach(x => { ribs += L(`M${x} 70 V520`, dk(p.a1, .3), 5, 'opacity=".35"'); });
      const arm = (sg) => { const T = s => sg < 0 ? s : MIR(s), d = 'M140 372 H64 V220'; return T(L(d, p.ol, 82) + L(d, p.a1, 70) + L('M44 224 V300', lt(p.a1, .5), 8, 'opacity=".6"') + L('M86 250 V330', dk(p.a1, .25), 6, 'opacity=".35"')); };
      return shadow(300, 596, 200, 8, .13)
        + arm(-1) + MIR(arm(-1)).replace('', '').slice(0, 0)
        + arm(1)
        + vp(body, p.a1, { t: 'cyl', l: .38, k: .3 }) + clip(body, ribs) + vp(body, 'none', { t: 'flat' }) + sp
        + [[300, 44], [262, 52], [338, 52]].map(([x, y], i) => vc(x, y, i ? 20 : 28, p.z, { l: .4 })).join('') + vc(300, 44, 11, '#ffd23f', { w: 0 })
        + vp('M96 500 H504 L476 596 H124Z', p.x, { t: 'cyl', w: 7 }) + vr(80, 480, 440, 40, 12, p.y, { t: 'v', w: 7 })
        + shine('M146 540 L152 580', 6, .5);
    } },

  /* ---------- MARGARITA ---------- */
  (() => {
    const petal = (a, r1, r2, w, col, p, t) => { const [x1, y1] = polar(300, 300, r1, a), [x2, y2] = polar(300, 300, r2, a); return vp(leafD(x1, y1, x2, y2, w), col, { w: 5, t: t || 'd', l: .2, k: .12 }); };
    return {
      id: 'margarita', name: 'Margarita', cat: 'naturaleza', kw: 'flor primavera jardin petalos', panel: pn(300, 300, 290, 20),
      orig: { a1: '#ffffff', a2: '#e9effc', a3: '#aab6dc', x: '#ffc93c', y: '#e59a00', ol: '#6a5a8a', ink: '#7a4e00' },
      mono: { a1: 'w', x: 'a2', y: 'a1' },
      back: p => {
        let s = ''; const N = 16;
        for (let i = 0; i < N; i++) s += petal(i * 360 / N + 180 / N, 120, 290, 26, p.a2, p);
        for (let i = 0; i < N; i++) s += petal(i * 360 / N, 120, 284, 27, '#ffffff', p, 'v') + L(`M${polar(300, 300, 190, i * 360 / N).join(' ')} L${polar(300, 300, 250, i * 360 / N).join(' ')}`, p.a3, 3.5, 'opacity=".5"');
        s += vc(300, 300, 190, p.x, { cx: .4, cy: .3, l: .5, k: .2, ol: p.y });
        for (let i = 0; i < 60; i++) { const a = i * 137.5, r = 12 * Math.sqrt(i + 1) * 2.1, [x, y] = polar(300, 300, r, a); if (r < 178) s += C(x, y, 4.2, p.y, 'opacity=".55"'); }
        return s;
      }
    };
  })(),

  /* ---------- GIRASOL ---------- */
  (() => {
    const petal = (a, r1, r2, w, col, ol) => { const [x1, y1] = polar(300, 300, r1, a), [x2, y2] = polar(300, 300, r2, a); return vp(leafD(x1, y1, x2, y2, w), col, { w: 5, ol, t: 'd', l: .25, k: .18 }); };
    return {
      id: 'girasol', name: 'Girasol', cat: 'naturaleza', kw: 'flor verano campo semillas amarillo', panel: pn(300, 300, 288, 18),
      orig: { a1: '#ffc61a', a2: '#ffe27a', a3: '#e69a00', x: '#6b3f1d', y: '#b07235', ol: '#7a4a00', ink: '#4a2a0c' },
      mono: { x: 'a3', y: 'a1' },
      back: p => {
        let s = ''; const N = 22;
        for (let i = 0; i < N; i++) s += petal(i * 360 / N + 180 / N, 150, 292, 28, p.a3, p.ol);
        for (let i = 0; i < N; i++) s += petal(i * 360 / N, 150, 284, 29, p.a1, p.ol);
        s += vc(300, 300, 228, p.x, { cx: .42, cy: .35, l: .3, k: .3, ol: dk(p.x, .4) });
        for (let i = 0; i < 260; i++) { const a = i * 137.5, r = 13.2 * Math.sqrt(i + 1); if (r < 218) { const [x, y] = polar(300, 300, r, a); s += C(x, y, 4.6, i % 3 ? p.y : dk(p.x, .3), 'opacity=".75"'); } }
        return s + L(arcD(300, 300, 210, 196, 244), '#fff', 9, 'opacity=".25"');
      }
    };
  })(),

  /* ---------- SETA ---------- */
  { id: 'seta', name: 'Seta', cat: 'naturaleza', kw: 'hongo bosque otoño cuento champiñon', panel: pn(300, 424, 290, 18),
    orig: { a1: '#e63946', a2: '#ff8a93', a3: '#a81d2d', x: '#f6e8cf', y: '#ffffff', z: '#f0d6a6', ol: '#6a1520', ink: '#7a1520' },
    mono: { x: 'w', z: 'a2', y: 'w' },
    back: p => {
      const stem = 'M150 296 H450 C446 380 470 480 500 570 Q502 590 480 590 H120 Q98 590 100 570 C130 480 154 380 150 296Z', cap = 'M22 312 C22 130 150 28 300 28 C450 28 578 130 578 312 Q300 344 22 312Z';
      let grass = ''; for (let i = 0; i < 18; i++) { const x = 10 + i * 33; grass += vp(`M${x} 600 Q${x + 4} 572 ${x + 14} 562 Q${x + 16} 584 ${x + 30} 600Z`, i % 2 ? '#7ccf5a' : '#4a9d3a', { w: 4, ol: '#1f4a14', t: 'd' }); }
      return shadow(300, 596, 270, 8, .12)
        + vp(stem, p.x, { t: 'cyl', l: .3, k: .26 }) + L('M170 330 Q180 450 130 560', dk(p.x, .25), 5, 'opacity=".35"')
        + vp('M60 300 Q300 372 540 300 L540 322 Q300 394 60 322Z', p.z, { t: 'v', w: 5 }) + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => L(`M${100 + i * 36} ${318 + Math.sin((i / 11) * Math.PI) * 38} v18`, dk(p.z, .3), 3, 'opacity=".5"')).join('')
        + vp(cap, p.a1, { t: 'r', cx: .38, cy: .28, r: .9, l: .4, k: .3, w: 8 })
        + clip(cap, [[118, 176, 40], [250, 100, 30], [420, 98, 42], [508, 214, 34], [80, 270, 26], [356, 188, 24], [530, 290, 22], [190, 262, 18]].map(([x, y, r]) => vc(x, y, r, p.y, { w: 0, l: 0, k: .1 }) + C(x - r * .25, y - r * .3, r * .22, '#fff', 'opacity=".6"')).join('') + shine('M70 230 Q90 130 190 78', 12, .35))
        + vp(cap, 'none', { t: 'flat', w: 8 }) + grass;
    } },

  /* ---------- PLANETA ---------- */
  { id: 'planeta', name: 'Planeta', cat: 'naturaleza', kw: 'espacio saturno cosmos universo astronomia', panel: pn(300, 300, 290, 18),
    orig: { a1: '#8f7be6', a2: '#c9bdfa', a3: '#5a44b8', x: '#ffd98a', y: '#f0b95a', z: '#ffffff', ol: '#2e2470', ink: '#34277a' },
    mono: { x: 'a2', y: 'a1' },
    back: p => {
      const ring = (rx, ry, w, c) => `<ellipse cx="300" cy="320" rx="${rx}" ry="${ry}" fill="none" stroke="${c}" stroke-width="${w}" transform="rotate(-22 300 320)"/>`;
      const planet = cpath(300, 300, 226);
      const band = (y, h, c) => R(60, y, 480, h, c, 0, 'opacity=".5"');
      return ring(286, 84, 36, p.ol) + ring(286, 84, 24, p.x) + ring(282, 80, 7, p.y)
        + vp(planet, p.a1, { t: 'r', cx: .36, cy: .28, l: .5, k: .3, w: 8 })
        + clip(planet, band(110, 30, p.a2) + band(176, 20, p.a3) + band(410, 34, p.a3) + band(470, 24, p.a2) + shine('M110 220 Q130 130 220 90', 12, .4))
        + vp(planet, 'none', { t: 'flat', w: 8 })
        + clipS('<rect x="0" y="330" width="600" height="270"/>', ring(286, 84, 36, p.ol) + ring(286, 84, 24, p.x) + ring(282, 80, 7, p.y));
    } }
);
