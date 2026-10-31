/* ===== QR Gratis · animales (2) ===== */
const eyeD = (x, y, r, p, dx = 0, dy = 0) => vc(x, y, r, '#ffffff', { w: 4, t: 'flat' }) + C(x + dx, y + dy + r * .1, r * .56, p.ol) + C(x + dx + r * .2, y + dy - r * .22, r * .2, '#fff');

SHAPES.push(
  /* ---------- MARIPOSA ---------- */
  { id: 'mariposa', name: 'Mariposa', cat: 'animales', kw: 'insecto alas primavera jardin', panel: pno(300, 322, 280, 20),
    orig: { a1: '#f7922b', a2: '#ffc76a', a3: '#d46a10', x: '#2a1d17', y: '#ffffff', ol: '#2a1d17', ink: '#4a2308' },
    mono: { x: 'ol', y: 'w' },
    back: p => {
      const up = 'M282 266 C236 120 124 30 40 76 C-4 108 20 222 96 292 C150 342 232 334 282 334Z', lo = 'M282 334 C200 334 70 364 66 452 C62 542 176 582 238 510 C264 480 282 424 282 334Z';
      const wing = () => vp(up, p.a1, { t: 'e', w: 8, l: .35 }) + vp(lo, p.a1, { t: 'd', w: 8, l: .3 })
        + clip(up, L('M286 300 L58 98 M286 300 L44 160 M286 300 L96 262', p.x, 5, 'opacity=".85"') + vp(up, 'none', { t: 'flat', w: 28, ol: p.x }) + shine('M120 80 Q170 100 230 180', 9, .35))
        + clip(lo, L('M286 380 L88 440 M286 380 L140 524 M286 380 L224 536', p.x, 5, 'opacity=".85"') + vp(lo, 'none', { t: 'flat', w: 28, ol: p.x }))
        + dots([[64, 100], [46, 132], [42, 170], [56, 208], [84, 246], [82, 470], [98, 506], [132, 534], [174, 540], [210, 526]], 6.5, p.y);
      return wing() + MIR(wing())
        + vr(268, 100, 64, 470, 30, p.x, { t: 'cyl', w: 5 }) + vc(300, 98, 32, p.x, { l: .3 })
        + L('M288 74 Q270 28 240 18', p.ol, 6) + L('M312 74 Q330 28 360 18', p.ol, 6) + vc(238, 16, 8, p.ol, { w: 0, t: 'flat' }) + vc(362, 16, 8, p.ol, { w: 0, t: 'flat' })
        + C(288, 94, 6, '#fff') + C(312, 94, 6, '#fff');
    } },

  /* ---------- CARACOL ---------- */
  (() => {
    let spiral = '';
    for (let a = 0; a <= 360 * 5.4; a += 8) { const r = 16 + a / 360 * 42, [x, y] = polar(318, 262, r, a); spiral += (a ? 'L' : 'M') + x + ' ' + y; }
    return {
      id: 'caracol', name: 'Caracol', cat: 'animales', kw: 'lento jardin concha babosa', panel: pno(318, 262, 290, 20),
      orig: { a1: '#e8a04f', a2: '#f7d79a', a3: '#a45f20', x: '#f4dc92', y: '#fff6d8', ol: '#6a3a14', ink: '#6e3a0c' },
      mono: { x: 'a2', y: 'w' },
      back: p => {
        const neck = 'M28 520 C14 430 30 350 62 304 C96 268 142 290 144 336 C146 392 160 440 200 482Z';
        return shadow(300, 590, 270, 9, .12)
          + vr(24, 482, 562, 92, 46, p.x, { t: 'v', l: .3 }) + vp(neck, p.x, { t: 'd', l: .3 })
          + vc(318, 262, 240, p.a1, { cx: .38, cy: .3, l: .42, k: .34 })
          + clip(cpath(318, 262, 232), L(spiral, p.a3, 9, 'opacity=".9"') + L(spiral, lt(p.a1, .5), 3, 'opacity=".5" transform="translate(3 -3)"'))
          + L(arcD(318, 262, 214, 196, 248), '#fff', 12, 'opacity=".5"')
          + L('M64 316 Q36 262 30 236', p.ol, 7) + L('M104 304 Q108 252 96 222', p.ol, 7) + vc(30, 232, 15, '#fff', { w: 4, t: 'flat' }) + vc(96, 218, 15, '#fff', { w: 4, t: 'flat' })
          + C(28, 236, 7, p.ol) + C(98, 222, 7, p.ol) + L('M64 366 Q84 384 108 366', p.ol, 5) + E(112, 342, 14, 9, '#ff9aa0', 0, 'opacity=".7"')
          + shine('M44 500 H110', 8, .5);
      }
    };
  })(),

  /* ---------- CANGREJO ---------- */
  { id: 'cangrejo', name: 'Cangrejo', cat: 'animales', kw: 'playa mar crustaceo pinzas verano', panel: pno(300, 336, 290, 20),
    orig: { a1: '#ef5a3a', a2: '#ff9b7a', a3: '#b73019', ol: '#6a1a0e', ink: '#8a2010' },
    back: p => {
      const leg = pts => { const d = 'M' + pts.join(' L'); return L(d, p.ol, 26) + L(d, p.a1, 16); };
      const claw = () => L('M118 262 L74 176', p.ol, 40) + L('M118 262 L74 176', p.a1, 28)
        + vp('M72 190 C16 160 6 76 50 42 C78 72 96 112 102 156Z', p.a1, { t: 'd', w: 7, l: .35 }) + vp('M84 196 C124 166 156 112 134 62 C106 80 92 122 78 164Z', p.a1, { t: 'd', w: 7, l: .3 })
        + shine('M40 80 Q36 120 62 150', 6, .5);
      const side = () => leg(['120 340', '34 330', '14 402']) + leg(['126 400', '42 424', '32 498']) + leg(['146 456', '76 504', '70 570']) + claw();
      return side() + MIR(side())
        + L('M258 156 V104', p.ol, 12) + L('M342 156 V104', p.ol, 12) + eyeD(258, 90, 24, p, 3, 2) + eyeD(342, 90, 24, p, -3, 2)
        + ve(300, 340, 258, 208, p.a1, { cx: .4, cy: .3, l: .4, k: .3 })
        + dots([[70, 300, 8], [60, 360, 7], [78, 424, 8], [530, 300, 8], [540, 360, 7], [522, 424, 8], [150, 170, 7], [450, 170, 7]], 7, p.a2, 'opacity=".85"')
        + shine('M92 270 Q104 200 170 160', 10, .45);
    } },

  /* ---------- PULPO ---------- */
  { id: 'pulpo', name: 'Pulpo', cat: 'animales', kw: 'mar oceano tentaculos marisco', panel: pno(300, 282, 290, 20),
    orig: { a1: '#e86aa8', a2: '#ffc3e0', a3: '#b83a7c', ol: '#6a1f4a', ink: '#8a1f5a' },
    back: p => {
      const tent = d => L(d, p.ol, 56) + L(d, p.a1, 42) + L(d, p.a2, 13, 'stroke-dasharray="0 26" opacity=".95"');
      const side = () => tent('M170 460 C136 520 70 520 52 562 C42 594 92 598 100 568 C106 548 82 546 78 560') + tent('M230 500 C214 560 170 566 150 592');
      return shadow(300, 594, 250, 8, .12)
        + G('translate(0 -34)', side() + MIR(side()) + tent('M300 500 C300 548 330 560 340 592') + tent('M300 500 C290 548 262 560 258 594'))
        + vc(300, 282, 262, p.a1, { cx: .4, cy: .28, l: .4, k: .3 })
        + dots([[210, 78, 12], [262, 58, 9], [356, 66, 11], [400, 98, 8]], 10, p.a3, 'opacity=".5"')
        + [-1, 1].map(sg => eyeD(300 + sg * 192, 290, 34, p, -sg * 3, 3) + E(300 + sg * 172, 346, 22, 13, '#ff7aa0', 0, 'opacity=".7"') + L(`M${300 + sg * 160} 244 Q${300 + sg * 190} 226 ${300 + sg * 222} 240`, p.ol, 7)).join('')
        + shine('M100 200 Q112 120 190 74', 11, .45);
    } },

  /* ---------- MEDUSA ---------- */
  { id: 'medusa', name: 'Medusa', cat: 'animales', kw: 'mar oceano marina agua', panel: pno(300, 286, 290, 20),
    orig: { a1: '#ff8fc8', a2: '#ffd6ec', a3: '#d3509a', x: '#9be3ff', ol: '#8a2a6a', ink: '#8a1f6a' },
    mono: { x: 'a2' },
    back: p => {
      const bell = 'M54 300 C54 118 170 40 300 40 C430 40 546 118 546 300 C520 330 490 316 464 334 C432 318 410 336 380 328 C352 342 324 322 300 336 C276 322 248 342 220 328 C190 336 168 318 136 334 C110 316 80 330 54 300Z';
      const tn = (x, d) => L(d, p.ol, 18) + L(d, p.x, 10);
      return G('translate(0 -16)', [[190, 'M190 400 C160 450 220 480 188 530 S210 580 196 596'], [262, 'M262 420 C236 470 290 500 262 560'], [338, 'M338 420 C364 470 310 500 338 560'], [410, 'M410 400 C440 450 380 480 412 530 S390 580 404 596']].map(([x, d]) => tn(x, d)).join('')
        + vp('M230 380 C220 450 250 480 236 540 M300 400 C300 470 320 500 300 580 M370 380 C380 450 350 480 364 540', 'none', { t: 'flat', w: 22, ol: p.ol, ex: 'stroke-linecap="round"' })
        + L('M230 380 C220 450 250 480 236 540 M300 400 C300 470 320 500 300 580 M370 380 C380 450 350 480 364 540', p.a2, 14))
        + vp(bell, p.a1, { t: 'r', cx: .45, cy: .25, r: .9, l: .55, k: .25, w: 7, ex: 'fill-opacity=".95"' })
        + dots([[120, 140, 14], [190, 90, 11], [420, 96, 12], [486, 160, 13], [100, 230, 10], [506, 236, 10]], 10, p.a2, 'opacity=".8"')
        + shine('M96 220 Q100 140 170 96', 11, .6) + E(300, 330, 230, 12, p.a3, 0, 'opacity=".25"');
    } },

  /* ---------- TORTUGA ---------- */
  { id: 'tortuga', name: 'Tortuga', cat: 'animales', kw: 'mar caparazon reptil lenta', panel: pno(300, 326, 290, 20),
    orig: { a1: '#5cae5a', a2: '#a6dc8c', a3: '#2f7a3a', x: '#9ad66c', ol: '#1f4f26', ink: '#1f5a28' },
    back: p => {
      const fl = (x, y, rot) => ve(x, y, 78, 38, p.x, { rot, t: 'd', l: .3, w: 7 });
      const shell = epath(300, 326, 224, 238);
      let ring = '';
      for (let i = 0; i < 18; i++) { const a = i * 20, [x1, y1] = polar(300, 326, 1, a); const c = Math.cos(a * Math.PI / 180), s = Math.sin(a * Math.PI / 180); ring += L(`M${fx(300 + c * 190)} ${fx(326 + s * 205)} L${fx(300 + c * 232)} ${fx(326 + s * 246)}`, p.ol, 5); }
      return shadow(300, 594, 210, 8, .12)
        + fl(96, 196, -35) + fl(504, 196, 35) + fl(100, 470, 35) + fl(500, 470, -35)
        + vp('M270 560 L300 598 L330 560Z', p.x, { w: 6 })
        + vc(300, 74, 60, p.x, { l: .35 }) + eyeD(274, 66, 14, p, 2, 1) + eyeD(326, 66, 14, p, -2, 1) + L('M280 98 Q300 114 320 98', p.ol, 5) + E(252, 92, 10, 6, '#ff8a80', 0, 'opacity=".7"') + E(348, 92, 10, 6, '#ff8a80', 0, 'opacity=".7"')
        + vp(shell, p.a1, { t: 'r', cx: .4, cy: .3, l: .38, k: .3, w: 8 })
        + clip(shell, ring + L('M60 90 L190 200 M540 90 L410 200 M60 560 L190 450 M540 560 L410 450', p.ol, 6) + E(300, 326, 190, 205, 'none', 0, `stroke="${p.ol}" stroke-width="5"`) + shine('M110 250 Q124 160 200 110', 11, .45))
        + vp(shell, 'none', { t: 'flat', w: 8 });
    } },

  /* ---------- PINGÜINO ---------- */
  { id: 'pinguino', name: 'Pingüino', cat: 'animales', kw: 'polo frio hielo ave antartida', panel: pn(300, 388, 290, 18),
    orig: { a1: '#2b3a55', a2: '#5a6c8e', a3: '#1a2336', x: '#ffa53a', y: '#ffffff', z: '#ff9aa8', ol: '#101827', ink: '#1d2a44' },
    mono: { y: 'w', x: 'a2' },
    back: p => {
      const fin = sg => { const T = s => sg < 0 ? s : MIR(s); return T(vp('M92 280 C20 330 30 450 70 500 C110 440 116 360 112 300Z', p.a1, { t: 'd', w: 7 })); };
      return shadow(300, 594, 230, 9, .14)
        + fin(-1) + fin(1)
        + ve(222, 584, 62, 24, p.x, { w: 6, t: 'v' }) + ve(378, 584, 62, 24, p.x, { w: 6, t: 'v' })
        + ve(300, 392, 238, 206, p.a1, { cx: .4, cy: .28, l: .3, k: .3 })
        + vc(300, 142, 118, p.a1, { cx: .4, cy: .3, l: .3, k: .3 })
        + ve(300, 396, 204, 196, '#ffffff', { t: 'r', k: .1, l: 0, w: 0 })
        + vp('M300 60 C380 60 400 160 300 196 C200 160 220 60 300 60Z', '#fff', { w: 0, t: 'flat' })
        + vp('M300 66 C262 66 190 120 232 176 C262 200 290 186 300 176 C310 186 338 200 368 176 C410 120 338 66 300 66Z', '#ffffff', { w: 0, t: 'flat' })
        + eyeD(256, 122, 20, p, 2, 2) + eyeD(344, 122, 20, p, -2, 2)
        + vp('M268 150 Q300 134 332 150 Q316 190 300 196 Q284 190 268 150Z', p.x, { w: 5, t: 'v' }) + L('M278 158 H322', dk(p.x, .35), 3.5)
        + E(228, 164, 15, 9, p.z, 0, 'opacity=".8"') + E(372, 164, 15, 9, p.z, 0, 'opacity=".8"')
        + shine('M200 100 Q204 62 244 46', 8, .35);
    } },

  /* ---------- BÚHO ---------- */
  { id: 'buho', name: 'Búho', cat: 'animales', kw: 'ave noche sabio estudio lechuza', panel: pno(300, 392, 290, 20),
    orig: { a1: '#8a5a36', a2: '#f3d9a4', a3: '#5a3820', x: '#f2a93b', y: '#fff4d6', ol: '#3e2410', ink: '#4a2c16' },
    mono: { y: 'w' },
    back: p => {
      const wing = sg => { const T = s => sg < 0 ? s : MIR(s); return T(vp('M82 290 C20 360 36 480 92 540 C132 480 136 380 120 300Z', p.a3, { t: 'd', w: 7, l: .3 })); };
      let sc = ''; for (let r = 0; r < 11; r++) for (let c = -1; c < 9; c++) { const x = 118 + c * 44 + (r % 2 ? 22 : 0), y = 318 + r * 26; sc += L(`M${x - 20} ${y} Q${x} ${y + 20} ${x + 20} ${y}`, p.a3, 4, 'opacity=".45"'); }
      const belly = clip(epath(300, 426, 176, 156), ve(300, 426, 176, 156, p.a2, { t: 'v', w: 0, l: .25, k: .12 }) + sc) + ve(300, 426, 176, 156, 'none', { t: 'flat', w: 4, ol: lt(p.a3, .3) });
      return shadow(300, 596, 220, 8, .14)
        + wing(-1) + wing(1)
        + ve(240, 586, 44, 16, p.x, { w: 5, t: 'v' }) + ve(360, 586, 44, 16, p.x, { w: 5, t: 'v' })
        + ve(300, 392, 232, 202, p.a1, { cx: .4, cy: .28, l: .35, k: .3 }) + belly
        + vp('M92 150 L58 30 L190 78Z', p.a1, { t: 'd' }) + vp('M508 150 L542 30 L410 78Z', p.a1, { t: 'd' })
        + ve(300, 176, 236, 140, p.a1, { cx: .4, cy: .3, l: .35, k: .28 })
        + vc(222, 160, 78, p.y, { w: 5, t: 'flat' }) + vc(378, 160, 78, p.y, { w: 5, t: 'flat' })
        + vc(222, 160, 52, '#fff', { w: 5, t: 'flat' }) + vc(378, 160, 52, '#fff', { w: 5, t: 'flat' })
        + vc(226, 164, 32, p.x, { w: 0 }) + vc(374, 164, 32, p.x, { w: 0 }) + C(228, 166, 16, p.ol) + C(372, 166, 16, p.ol) + C(236, 156, 6, '#fff') + C(382, 156, 6, '#fff')
        + vp('M278 198 Q300 180 322 198 Q310 240 300 250 Q290 240 278 198Z', p.x, { w: 5, t: 'v' })
        + shine('M130 120 Q160 70 220 56', 9, .4);
    } },

  /* ---------- OSITO ---------- */
  { id: 'osito', name: 'Osito', cat: 'animales', kw: 'peluche oso bebe ternura teddy', panel: pno(300, 392, 290, 20),
    orig: { a1: '#b9783f', a2: '#e8c394', a3: '#7a4a22', u: '#3a2416', ol: '#4a2a12', ink: '#5a3216' },
    mono: { u: 'ol' },
    back: p => {
      const arm = sg => { const T = s => sg < 0 ? s : MIR(s); return T(vp('M120 270 C60 300 60 380 104 410 C140 400 160 330 150 280Z', p.a1, { t: 'd', w: 7 }) + ve(124, 404, 40, 36, p.a1, { t: 'r', w: 7 }) + C(126, 408, 12, p.a2)); };
      return shadow(300, 596, 220, 8, .14)
        + ve(204, 560, 62, 38, p.a1, { w: 7 }) + ve(396, 560, 62, 38, p.a1, { w: 7 }) + ve(204, 566, 28, 20, p.a2, { w: 0, t: 'flat' }) + ve(396, 566, 28, 20, p.a2, { w: 0, t: 'flat' })
        + ve(300, 390, 226, 204, p.a1, { cx: .4, cy: .28, l: .35, k: .3 })
        + arm(-1) + arm(1)
        + vc(176, 70, 52, p.a1, { w: 7 }) + vc(176, 70, 28, p.a2, { w: 0, t: 'flat' }) + vc(424, 70, 52, p.a1, { w: 7 }) + vc(424, 70, 28, p.a2, { w: 0, t: 'flat' })
        + ve(300, 148, 134, 118, p.a1, { cx: .4, cy: .28, l: .38, k: .28 })
        + ve(300, 184, 62, 46, p.a2, { w: 5, t: 'r', l: .3, k: .1 }) + vp('M280 166 Q300 154 320 166 Q312 184 300 188 Q288 184 280 166Z', p.u, { w: 3 }) + C(292, 166, 3.4, '#fff', 'opacity=".7"')
        + L('M300 188 V200 M300 200 Q286 214 270 204 M300 200 Q314 214 330 204', p.ol, 4.5)
        + eyeD(246, 124, 14, p, 1, 1) + eyeD(354, 124, 14, p, -1, 1) + E(214, 164, 16, 10, '#ff8a80', 0, 'opacity=".55"') + E(386, 164, 16, 10, '#ff8a80', 0, 'opacity=".55"')
        + shine('M190 100 Q214 62 262 54', 8, .4);
    } },

  /* ---------- CONEJO ---------- */
  { id: 'conejo', name: 'Conejo', cat: 'animales', kw: 'pascua orejas mascota liebre', panel: pno(300, 380, 290, 20),
    orig: { a1: '#f2ece4', a2: '#ffb8c6', a3: '#cbbfb2', x: '#7ccf5a', y: '#4a9d3a', ol: '#5a4636', ink: '#4a3a2c' },
    mono: { x: 'a2', y: 'a3' },
    back: p => {
      const ear = sg => { const T = s => sg < 0 ? s : MIR(s); return T(vp('M238 128 C206 80 196 20 226 8 C262 -2 282 70 276 130Z', p.a1, { t: 'd', w: 6 }) + vp('M244 116 C224 80 220 36 232 22 C254 20 268 70 264 116Z', p.a2, { w: 0, t: 'flat' })); };
      let grass = ''; for (let i = 0; i < 18; i++) { const x = 20 + i * 33; grass += vp(`M${x} 600 Q${x + 4} 560 ${x + 16 + (i % 3) * 4} ${540 - (i % 4) * 8} Q${x + 22} 570 ${x + 34} 600Z`, i % 2 ? p.x : p.y, { w: 4, ol: dk(p.y, .45), t: 'd' }); }
      return ear(-1) + ear(1)
        + ve(300, 172, 118, 96, p.a1, { cx: .4, cy: .28, l: .25, k: .14 })
        + vc(206, 208, 36, p.a1, { w: 6, t: 'flat' }) + vc(394, 208, 36, p.a1, { w: 6, t: 'flat' })
        + eyeD(258, 166, 17, p, 1, 2) + eyeD(342, 166, 17, p, -1, 2) + E(220, 204, 16, 10, '#ff9ab0', 0, 'opacity=".6"') + E(380, 204, 16, 10, '#ff9ab0', 0, 'opacity=".6"')
        + vp('M286 192 Q300 184 314 192 Q308 206 300 208 Q292 206 286 192Z', p.a2, { w: 4 }) + L('M300 208 V218 M300 218 Q288 230 274 222 M300 218 Q312 230 326 222', p.ol, 4)
        + [0, 1].map(i => L(`M${240 - i * 4} ${214 + i * 8} L${170 - i * 4} ${208 + i * 14}`, p.ol, 3, 'opacity=".6"') + L(`M${360 + i * 4} ${214 + i * 8} L${430 + i * 4} ${208 + i * 14}`, p.ol, 3, 'opacity=".6"')).join('')
        + grass;
    },
    front: p => ve(214, 214, 40, 26, p.a1, { t: 'r', w: 6 }) + ve(386, 214, 40, 26, p.a1, { t: 'r', w: 6 }) + [-8, 6].map(o => L(`M${214 + o} 210 v12`, p.a3, 3) + L(`M${386 + o} 210 v12`, p.a3, 3)).join('') } ,

  /* ---------- RANA ---------- */
  { id: 'rana', name: 'Rana', cat: 'animales', kw: 'charca anfibio verde sapo', panel: pno(300, 388, 290, 20),
    orig: { a1: '#6cc04a', a2: '#c4ec9c', a3: '#3f8f2c', x: '#e9f7c9', y: '#ff9aa8', ol: '#1f4a14', ink: '#235c17' },
    mono: { x: 'w', y: 'a2' },
    back: p => {
      const leg = sg => { const T = s => sg < 0 ? s : MIR(s); return T(ve(110, 520, 92, 62, p.a1, { rot: 20, w: 7, l: .3 }) + ve(60, 576, 50, 20, p.a1, { w: 6, t: 'v' }) + L('M38 580 v-12 M60 584 v-14 M82 580 v-12', p.ol, 4) + vp('M84 300 C30 340 30 420 60 470 C100 430 130 370 126 320Z', p.a1, { w: 7, t: 'd' })); };
      return shadow(300, 596, 230, 8, .13)
        + leg(-1) + leg(1)
        + ve(300, 390, 222, 200, p.a1, { cx: .4, cy: .28, l: .35, k: .3 })
        + ve(300, 392, 160, 160, p.x, { w: 0, t: 'r', l: 0, k: .08 })
        + vc(190, 106, 62, p.a1, { w: 7 }) + vc(410, 106, 62, p.a1, { w: 7 })
        + ve(300, 196, 226, 118, p.a1, { cx: .4, cy: .28, l: .35, k: .3 })
        + eyeD(190, 100, 40, p, 2, 3) + eyeD(410, 100, 40, p, -2, 3)
        + L('M130 220 Q300 290 470 220', p.ol, 7) + E(138, 232, 20, 12, p.y, 0, 'opacity=".7"') + E(462, 232, 20, 12, p.y, 0, 'opacity=".7"')
        + dots([[300, 130, 8], [270, 150, 6], [330, 150, 6]], 7, p.a3, 'opacity=".5"') + C(292, 168, 5, p.ol) + C(308, 168, 5, p.ol)
        + shine('M120 190 Q150 150 200 140', 8, .35);
    } },

  /* ---------- POLLITO ---------- */
  { id: 'pollito', name: 'Pollito', cat: 'animales', kw: 'pascua huevo bebe ave granja', panel: pno(300, 424, 290, 20),
    orig: { a1: '#ffd84a', a2: '#fff0a0', a3: '#e8a800', x: '#ff9a2e', y: '#fffaf0', z: '#ff9aa8', ol: '#6a4a10', ink: '#5e4208' },
    mono: { x: 'a3', y: 'w' },
    back: p => {
      const shell = 'M60 300 L60 440 C60 550 160 590 300 590 C440 590 540 550 540 440 L540 300 L492 340 L446 292 L398 340 L350 290 L300 340 L252 290 L202 340 L154 292 L106 340Z';
      return shadow(300, 596, 230, 8, .13)
        + vp('M96 330 C40 300 26 220 70 190 C100 210 124 260 130 310Z', p.a1, { t: 'd', w: 7 }) + vp('M504 330 C560 300 574 220 530 190 C500 210 476 260 470 310Z', p.a1, { t: 'd', w: 7 })
        + vp('M280 30 Q270 -2 252 -4 Q272 14 284 36Z M300 28 Q306 -6 290 -12 Q290 12 306 34Z M322 32 Q338 6 330 -2 Q312 12 314 38Z', p.a1, { w: 5 })
        + vc(300, 168, 140, p.a1, { cx: .4, cy: .3, l: .4, k: .26 })
        + eyeD(246, 150, 16, p, 1, 2) + eyeD(354, 150, 16, p, -1, 2) + E(206, 196, 18, 11, p.z, 0, 'opacity=".65"') + E(394, 196, 18, 11, p.z, 0, 'opacity=".65"')
        + vp('M270 176 Q300 160 330 176 Q316 214 300 220 Q284 214 270 176Z', p.x, { w: 5, t: 'v' }) + L('M280 186 H320', dk(p.x, .35), 3.5)
        + shine('M190 100 Q214 56 268 44', 9, .45)
        + vp(shell, p.y, { t: 'd', k: .12, w: 7, l: 0 }) + L('M100 470 Q130 540 220 560', p.a3, 6, 'opacity=".35"');
    } },

  /* ---------- PEZ ---------- */
  { id: 'pez', name: 'Pez', cat: 'animales', kw: 'mar pecera acuario pescado dorado', panel: pno(250, 300, 290, 20),
    orig: { a1: '#ff8a3d', a2: '#ffc58a', a3: '#d4561a', x: '#ffd0a0', ol: '#7a2a0a', ink: '#8a3208' },
    mono: { x: 'a2' },
    back: p => {
      const tail = 'M440 300 C500 230 560 150 590 130 C580 220 580 380 590 470 C560 450 500 370 440 300Z', body = epath(250, 300, 244, 222);
      let sc = ''; for (let r = 0; r < 7; r++) for (let c = 0; c < 8; c++) { const x = 40 + c * 56 + (r % 2 ? 28 : 0), y = 100 + r * 50; sc += `<path d="M${x - 28} ${y} A28 28 0 0 0 ${x + 28} ${y}" fill="none" stroke="${p.a3}" stroke-width="3.5" opacity=".5"/>`; }
      return shadow(300, 596, 220, 8, .1)
        + vp(tail, p.a1, { t: 'h', w: 7, k: .2 }) + clip(tail, L('M446 300 L590 150 M446 300 L590 220 M446 300 L590 300 M446 300 L590 380 M446 300 L590 450', p.a3, 4, 'opacity=".5"'))
        + vp('M150 120 C190 40 330 30 380 110 C320 90 230 90 150 120Z', p.a3, { t: 'v', w: 7 }) + vp('M180 470 C220 560 330 560 360 470 C310 490 240 490 180 470Z', p.a3, { t: 'v', w: 7 })
        + vp(body, p.a1, { t: 'r', cx: .38, cy: .28, l: .4, k: .3 }) + clip(body, sc) + vp(body, 'none', { t: 'flat' })
        + vp('M300 120 C340 160 340 440 300 482 C380 440 392 160 300 120Z', p.a3, { t: 'flat', w: 0, ex: 'opacity=".3"' })
        + eyeD(64, 244, 24, p, -3, 2) + vp('M16 322 Q36 336 60 326', 'none', { t: 'flat', w: 5 }) + E(80, 330, 18, 11, '#ff7a7a', 0, 'opacity=".55"')
        + shine('M70 190 Q100 124 170 96', 10, .45);
    } }
);
