/* ===== QR Gratis · salud y viajes ===== */
const crossD = (cx, cy, s, t = .6) => { const a = s * t / 2; return `M${cx - a} ${cy - s}H${cx + a}V${cy - a}H${cx + s}V${cy + a}H${cx + a}V${cy + s}H${cx - a}V${cy + a}H${cx - s}V${cy - a}H${cx - a}Z`; };

SHAPES.push(
  /* ================= SALUD ================= */
  { id: 'botiquin', name: 'Botiquín', cat: 'salud', kw: 'primeros auxilios medico emergencia enfermeria maletin', panel: pn(300, 352, 290, 16),
    orig: { a1: '#e63946', a2: '#ff8a93', a3: '#a81d2d', x: '#ffffff', y: '#c9ced6', ol: '#5a1018', ink: '#8a1426' },
    mono: { x: 'w', y: 'a2' },
    back: p => {
      const box = rrp(26, 132, 548, 440, 36), handle = 'M170 150 V96 Q170 54 214 54 H386 Q430 54 430 96 V150';
      const cross = cx => vc(cx, 352, 52, p.a3, { w: 5, t: 'r', l: .25, k: .2 }) + vp(crossD(cx, 352, 34, .6), p.x, { w: 4, t: 'd', l: .1, k: .1 });
      return shadow(300, 592, 260, 8, .14)
        + L(handle, p.ol, 38) + L(handle, p.y, 26) + L(handle, lt(p.y, .6), 6, 'opacity=".8" transform="translate(0 -7)"')
        + vp(box, p.a1, { t: 'v', l: .4, k: .26 }) + clip(box, R(20, 132, 560, 66, p.a2, 0, 'opacity=".55"') + L('M20 198 H580', p.a3, 6) + R(20, 530, 560, 50, p.a3, 0, 'opacity=".55"')) + vp(box, 'none', { t: 'flat' })
        + vr(52, 176, 62, 44, 10, p.y, { t: 'v', w: 5 }) + vr(486, 176, 62, 44, 10, p.y, { t: 'v', w: 5 }) + vr(70, 190, 26, 14, 4, p.ol, { w: 0, t: 'flat', ex: 'opacity=".5"' }) + vr(504, 190, 26, 14, 4, p.ol, { w: 0, t: 'flat', ex: 'opacity=".5"' })
        + cross(90) + cross(510) + shine('M50 214 V470', 8, .35);
    } },

  { id: 'estetoscopio', name: 'Estetoscopio', cat: 'salud', kw: 'medico doctor corazon escuchar enfermera medicina', panel: pn(300, 374, 290, 30),
    orig: { a1: '#2a9d8f', a2: '#8fe0d4', a3: '#16685f', x: '#2f3b4a', y: '#c9ced6', z: '#e8f4f6', ol: '#12302d', ink: '#144a43' },
    mono: { x: 'ol', z: 'w' },
    back: p => {
      const pipeL = 'M126 44 C122 112 220 92 300 112', pipeR = 'M474 44 C478 112 380 92 300 112';
      return shadow(300, 596, 220, 7, .12)
        + L(pipeL, p.ol, 22) + L(pipeR, p.ol, 22) + L(pipeL, p.y, 13) + L(pipeR, p.y, 13) + L('M126 44 C122 112 220 92 300 112', '#fff', 3, 'opacity=".7" transform="translate(-2 -3)"')
        + ve(126, 32, 24, 17, p.x, { t: 'v', w: 5 }) + ve(474, 32, 24, 17, p.x, { t: 'v', w: 5 })
        + L('M300 108 V164', p.ol, 34) + L('M300 108 V164', p.x, 22) + vp('M280 100 H320 L330 128 H270Z', p.y, { w: 5, t: 'cyl' })
        + vc(300, 374, 218, p.y, { t: 'r', cx: .38, cy: .3, l: .5, k: .3, w: 8 }) + vc(300, 374, 206, p.a1, { t: 'd', w: 0, l: .3, k: .25 }) + vc(300, 374, 198, p.z, { w: 5, t: 'r', cx: .42, cy: .35, l: .2, k: .12 })
        + shine('M104 290 Q120 222 176 184', 12, .6) + shine('M96 330 q0 -10 2 -18', 8, .6);
    } },

  { id: 'farmacia', name: 'Cruz verde', cat: 'salud', kw: 'farmacia medicamentos botica verde salud cruz', panel: pn(300, 300, 290, 16),
    orig: { a1: '#22b573', a2: '#7fe3b2', a3: '#0f7a4c', x: '#ffffff', ol: '#0b4a2e', ink: '#0d5c38' },
    mono: { x: 'w' },
    back: p => {
      const cross = 'M165 8 H435 Q455 8 455 28 V145 H572 Q592 145 592 165 V435 Q592 455 572 455 H455 V572 Q455 592 435 592 H165 Q145 592 145 572 V455 H28 Q8 455 8 435 V165 Q8 145 28 145 H145 V28 Q145 8 165 8Z';
      return vp(cross, p.a1, { t: 'd', l: .45, k: .3, w: 8 })
        + vp(cross, 'none', { t: 'flat', w: 3.5, ol: lt(p.a1, .65), ex: 'transform="translate(300 300) scale(.93) translate(-300 -300)" opacity=".9"' })
        + [[300, 34], [300, 566], [34, 300], [566, 300]].map(([x, y]) => C(x, y, 7, lt(p.a1, .75), 'opacity=".9"')).join('')
        + shine('M176 30 H300', 9, .55) + shine('M30 176 V270', 9, .5);
    } },

  { id: 'monitor-ecg', name: 'Latidos', cat: 'salud', kw: 'electrocardiograma corazon cardiologia pulso hospital monitor', panel: pn(300, 292, 290, 14),
    orig: { a1: '#dfe6ee', a2: '#ffffff', a3: '#9aa6b6', x: '#14283d', y: '#35e08a', z: '#ff5d7a', u: '#4aa8ff', ol: '#2a3a4e', ink: '#14283d' },
    mono: { x: 'a3', y: 'a2', z: 'a2', u: 'a2' },
    back: p => {
      let grid = ''; for (let i = 0; i < 16; i++) grid += L(`M${40 + i * 36} 56 V500`, p.y, 1.4, 'opacity=".16"'); for (let j = 0; j < 12; j++) grid += L(`M40 ${56 + j * 40} H560`, p.y, 1.4, 'opacity=".16"');
      const ecg = (y, col) => L(`M50 ${y} H120 L134 ${y - 6} L148 ${y} H178 L194 ${y - 52} L214 ${y + 38} L230 ${y - 22} L242 ${y} H310 L322 ${y - 10} L334 ${y} H382 L398 ${y - 48} L418 ${y + 36} L434 ${y - 20} L446 ${y} H550`, col, 6) + L(`M50 ${y} H120`, '#fff', 1.5, 'opacity=".0"');
      return shadow(300, 596, 230, 7, .13)
        + vp('M230 508 H370 L392 576 H208Z', p.a3, { t: 'v', w: 6 }) + vr(150, 566, 300, 28, 12, p.a3, { t: 'v', w: 6 })
        + vr(14, 22, 572, 492, 36, p.a1, { t: 'v', w: 7, l: .5 })
        + vr(36, 44, 528, 448, 18, p.x, { t: 'd', w: 5, l: .12, k: .1 }) + clip(rrp(36, 44, 528, 448, 18), grid)
        + ecg(104, p.y) + L('M50 462 Q130 440 200 462 T350 462 T550 462', p.u, 5, 'opacity=".9"')
        + vp(heartD(96, 292, 70), p.z, { w: 4, t: 'd', l: .35 }) + vp(heartD(504, 292, 70), p.z, { w: 4, t: 'd', l: .35 }) + shine('M476 270 q4 -8 12 -10', 5, .7)
        + C(300, 500, 5, p.y) + shine('M30 70 V300', 7, .3);
    } },

  { id: 'diente', name: 'Diente', cat: 'salud', kw: 'dentista odontologia sonrisa muela higiene bucal', panel: pn(300, 244, 290, 16),
    orig: { a1: '#fffaf0', a2: '#ffffff', a3: '#e6d8c2', x: '#7ed0f0', y: '#ff8aa0', ol: '#7b8a9a', ink: '#27566f' },
    mono: { x: 'a2' },
    back: p => {
      const tooth = 'M82 150 C82 62 152 28 214 50 C254 64 346 64 386 50 C448 28 518 62 518 150 C518 230 488 270 482 344 C474 442 468 564 418 592 C378 612 350 560 336 472 C328 424 272 424 264 472 C250 560 222 612 182 592 C132 564 126 442 118 344 C112 270 82 230 82 150Z';
      return shadow(300, 598, 200, 6, .1)
        + vp(tooth, p.a1, { t: 'r', cx: .36, cy: .22, l: .5, k: .16, w: 8 })
        + vp('M118 344 C126 442 132 564 182 592 C150 540 150 430 160 380Z', p.a3, { w: 0, t: 'flat', ex: 'opacity=".55"' }) + vp('M482 344 C474 442 468 564 418 592 C450 540 450 430 440 380Z', p.a3, { w: 0, t: 'flat', ex: 'opacity=".55"' })
        + shine('M112 150 Q112 96 160 66', 11, .85) + shine('M104 190 q-2 -10 -2 -16', 8, .85)
        + spark(520, 60, 1.5, p.x) + spark(560, 118, .9, p.x) + spark(60, 40, .8, p.x);
    } },

  { id: 'pastillas', name: 'Bote de pastillas', cat: 'salud', kw: 'medicamento farmacia receta capsulas tratamiento', panel: pn(300, 378, 290, 12),
    orig: { a1: '#f5a524', a2: '#ffd37a', a3: '#c77a0a', x: '#ffffff', y: '#ef4444', ol: '#6a3d00', ink: '#6a3d00' },
    mono: { x: 'w', y: 'a3' },
    back: p => {
      const body = rrp(86, 150, 428, 440, 48), cap = rrp(118, 28, 364, 118, 24);
      let ridge = ''; for (let i = 0; i < 16; i++) ridge += L(`M${134 + i * 22.5} 34 V140`, p.ol, 3, 'opacity=".25"');
      return shadow(300, 596, 230, 8, .14)
        + vp(body, p.a1, { t: 'cyl', l: .5, k: .28 }) + vr(150, 134, 300, 30, 8, p.a3, { t: 'v', w: 6 })
        + vp(cap, p.x, { t: 'cyl', l: .2, k: .22 }) + clip(cap, ridge) + vp(cap, 'none', { t: 'flat' })
        + vr(86, 190, 428, 372, 6, p.x, { t: 'v', k: .1, l: 0, w: 5 })
        + vp(crossD(300, 214, 20, .5), p.a3, { w: 3, t: 'd' }) + L('M126 214 H250 M350 214 H474', p.a3, 6, 'opacity=".7"') + L('M126 540 H260 M126 556 H210 M360 548 H474', p.a3, 6, 'opacity=".6"')
        + shine('M116 180 q-14 40 -14 90', 9, .5);
    } },

  { id: 'gota', name: 'Gota de sangre', cat: 'salud', kw: 'donar sangre donante solidaridad transfusion', panel: pn(300, 408, 290, 22),
    orig: { a1: '#e0243a', a2: '#ff7b8a', a3: '#8f0f20', x: '#ffffff', ol: '#5a0a14', ink: '#7a0f20' },
    mono: { x: 'w' },
    back: p => {
      const drop = 'M300 14 C300 14 62 282 62 404 C62 520 168 592 300 592 C432 592 538 520 538 404 C538 282 300 14 300 14Z';
      return vp(drop, p.a1, { t: 'r', cx: .38, cy: .46, l: .5, k: .34, w: 8 })
        + shine('M98 420 C92 350 126 296 176 240', 14, .7) + shine('M96 462 q2 14 8 26', 9, .6)
        + vp(heartD(300, 92, 54), p.x, { w: 0, t: 'flat', ex: 'opacity=".0"' });
    } },

  /* ================= VIAJES ================= */
  { id: 'maleta', name: 'Maleta', cat: 'viajes', kw: 'vacaciones equipaje viaje aeropuerto vuelo turismo', panel: pn(300, 352, 290, 16),
    orig: { a1: '#2ea6a0', a2: '#8ee0da', a3: '#1b7571', x: '#ffd23f', y: '#c0c7d1', z: '#ff7a8c', u: '#6a8dff', ol: '#0f4744', ink: '#0f4a46' },
    mono: { x: 'a2', z: 'a3', u: 'a2' },
    back: p => {
      const body = rrp(44, 150, 512, 420, 42), handle = 'M208 152 V98 Q208 62 244 62 H356 Q392 62 392 98 V152';
      return shadow(300, 598, 250, 8, .14)
        + L(handle, p.ol, 34) + L(handle, p.y, 22) + vr(176, 60, 248, 14, 7, p.y, { w: 0, t: 'flat', ex: 'opacity="0"' })
        + vr(104, 566, 62, 30, 10, p.ol, { w: 0, t: 'flat' }) + vr(434, 566, 62, 30, 10, p.ol, { w: 0, t: 'flat' }) + C(135, 582, 14, p.y, STK(p.ol, 4)) + C(465, 582, 14, p.y, STK(p.ol, 4))
        + vp(body, p.a1, { t: 'cylv', l: .42, k: .28 })
        + clip(body, vr(84, 130, 46, 460, 0, p.x, { w: 0, t: 'v' }) + vr(470, 130, 46, 460, 0, p.x, { w: 0, t: 'v' }) + L('M44 196 H556', p.a3, 6, 'opacity=".6"')) + vp(body, 'none', { t: 'flat' })
        + [[107, 204], [493, 204], [107, 520], [493, 520]].map(([x, y]) => vr(x - 16, y - 12, 32, 24, 6, p.y, { w: 4, t: 'v' })).join('')
        + ROT(-12, 98, 330, vr(66, 290, 64, 80, 10, p.z, { w: 4, t: 'v' }) + vp(starD(98, 330, 22, .5), '#fff', { w: 0, t: 'flat' }))
        + ROT(10, 504, 400, vc(504, 400, 38, p.u, { w: 4, t: 'r' }) + L('M484 400 H524 M504 380 V420 M490 386 L518 414 M518 386 L490 414', '#fff', 3.5))
        + shine('M60 210 V300', 8, .4);
    } },

  { id: 'globo-aerostatico', name: 'Globo aerostático', cat: 'viajes', kw: 'aventura cielo volar excursion paisaje', panel: pn(300, 214, 290, 22),
    orig: { a1: '#ef476f', a2: '#ffb3c1', a3: '#a52a47', x: '#fff3cf', y: '#ffd166', z: '#c8914f', u: '#3a86d1', ol: '#5a1e30', ink: '#7a1a38' },
    mono: { x: 'a2', y: 'a2', z: 'a3', u: 'a3' },
    back: p => {
      const env = 'M300 12 C470 12 566 120 546 240 C536 310 470 372 402 412 H198 C130 372 64 310 54 240 C34 120 130 12 300 12Z';
      const gore = (s0, s1) => `M300 12 C${300 + s0 * 250} 40 ${300 + s0 * 270} 300 ${300 + s0 * 100} 412 L${300 + s1 * 100} 412 C${300 + s1 * 270} 300 ${300 + s1 * 250} 40 300 12Z`;
      const ss = [-1, -.667, -.333, 0, .333, .667, 1]; let g = '';
      for (let i = 0; i < 6; i++) g += P(gore(ss[i], ss[i + 1]), i % 2 ? p.x : p.a1);
      g += R(0, 330, 600, 34, p.y, 0, 'opacity=".95"'); ss.forEach(s => g += L(`M300 12 C${300 + s * 250} 40 ${300 + s * 270} 300 ${300 + s * 100} 412`, p.ol, 3, 'opacity=".35"'));
      let weave = ''; for (let i = 0; i < 6; i++) weave += L(`M${220 + i * 32} 480 V586`, p.ol, 3, 'opacity=".4"') + L(`M200 ${498 + i * 18} H400`, p.ol, 3, 'opacity=".4"');
      const basket = 'M224 480 H376 L366 574 Q300 590 234 574Z';
      return shadow(300, 598, 120, 5, .12)
        + L('M206 410 L226 480 M394 410 L374 480 M262 412 L250 480 M338 412 L350 480', p.ol, 4)
        + vp(basket, p.z, { t: 'v', w: 6 }) + clip(basket, weave) + vp(basket, 'none', { t: 'flat', w: 6 }) + vr(216, 470, 168, 18, 8, dk(p.z, .2), { t: 'v', w: 5 })
        + ve(300, 444, 14, 26, '#ffa51f', { w: 3, t: 'r', ol: p.ol }) + ve(300, 448, 6, 14, '#fff3a0', { w: 0, t: 'flat' })
        + vp(env, p.a1, { t: 'r', cx: .4, cy: .3, l: .4, k: .3, w: 8 }) + clip(env, g + shine('M118 120 Q150 56 230 34', 12, .55)) + vp(env, 'none', { t: 'flat', w: 8 })
        + vr(180, 404, 240, 16, 6, p.y, { t: 'v', w: 5 });
    } },

  { id: 'pin-mapa', name: 'Pin de ubicación', cat: 'viajes', kw: 'mapa donde estamos direccion localizacion gps lugar', panel: pn(300, 262, 290, 22),
    orig: { a1: '#ef4444', a2: '#ff9a8a', a3: '#a11d2d', x: '#ffffff', ol: '#5a0f18', ink: '#7a1020' },
    mono: { x: 'w' },
    back: p => {
      const pin = 'M300 586 C300 586 50 386 50 262 A250 250 0 0 1 550 262 C550 386 300 586 300 586Z';
      return ve(300, 592, 110, 12, '#27103a', { w: 0, t: 'flat', ex: 'opacity=".16"' }) + ve(300, 592, 56, 6, '#27103a', { w: 0, t: 'flat', ex: 'opacity=".22"' })
        + vp(pin, p.a1, { t: 'r', cx: .38, cy: .3, l: .5, k: .32, w: 8 })
        + vp('M300 586 C300 586 170 470 100 372 C130 460 220 540 300 586Z', p.a3, { w: 0, t: 'flat', ex: 'opacity=".35"' })
        + shine('M92 232 C96 160 142 104 210 74', 13, .65) + shine('M84 272 q0 -12 2 -22', 9, .65);
    } },

  { id: 'brujula', name: 'Brújula', cat: 'viajes', kw: 'orientacion norte aventura excursion mapa explorar', panel: pn(300, 306, 290, 22),
    orig: { a1: '#d4a24c', a2: '#fff4d6', a3: '#8a5e1c', x: '#e63946', y: '#2a2f3d', z: '#f7f2e6', ol: '#4a3210', ink: '#3a2a12' },
    mono: { x: 'a3', y: 'ol', z: 'a2' },
    back: p => {
      let t = ''; for (let i = 0; i < 72; i++) { const [x1, y1] = polar(300, 306, 228, i * 5), [x2, y2] = polar(300, 306, i % 6 ? 242 : 254, i * 5); t += L(`M${x1} ${y1} L${x2} ${y2}`, p.ol, i % 6 ? 2.5 : 5); }
      const needle = ROT(-38, 300, 306, vp('M300 56 L322 306 L300 556 L278 306Z', p.z, { w: 4, t: 'h' }) + vp('M300 56 L322 306 L278 306Z', p.x, { w: 4, t: 'h' }));
      return shadow(300, 598, 200, 6, .12)
        + vr(264, 2, 72, 32, 14, p.a1, { t: 'cyl', w: 7 }) + vc(300, 306, 284, p.a1, { cx: .36, cy: .28, l: .6, k: .3, w: 9 }) + vc(300, 306, 262, p.a3, { w: 5, t: 'r', l: .2, k: .3 })
        + vc(300, 306, 246, p.z, { w: 4, t: 'r', cx: .45, cy: .4, l: .15, k: .1 }) + t
        + vp('M300 92 L315 134 L300 124 L285 134Z', p.x, { w: 3, t: 'flat' }) + [90, 180, 270].map(a => ROT(a, 300, 306, vp('M300 98 L312 132 L300 124 L288 132Z', p.ol, { w: 3, t: 'flat' }))).join('')
        + L('M300 530 V518 M70 306 H82 M518 306 H530', p.ol, 6) + shine('M92 232 Q106 168 160 120', 11, .55);
    } },

  { id: 'velero', name: 'Velero', cat: 'viajes', kw: 'barco mar carabela navegar puerto pirata isla', panel: pn(300, 302, 290, 10),
    orig: { a1: '#8b5a2b', a2: '#fff3d6', a3: '#5e3a14', x: '#e63946', y: '#2a8fd1', z: '#7ecdf2', ol: '#3a210a', ink: '#1b4a78' },
    mono: { x: 'a3', y: 'a3', z: 'a2' },
    back: p => {
      const sail = 'M74 124 Q54 300 78 486 Q300 528 522 486 Q546 300 526 124Z';
      let seams = ''; for (let i = 1; i < 6; i++) seams += L(`M${74 + i * 75} 126 Q${74 + i * 75 + (i - 3) * -3} 300 ${74 + i * 75} 500`, p.a3, 2.5, 'opacity=".4"');
      const hull = 'M20 500 H580 Q570 560 520 584 Q300 604 80 584 Q30 560 20 500Z';
      return vr(288, 20, 24, 500, 6, p.a1, { t: 'cyl', w: 6 }) + vp('M312 28 L408 52 L312 80Z', p.x, { w: 5, t: 'd' }) + L('M70 118 L36 450 M530 118 L564 450', p.ol, 3.5, 'opacity=".8"')
        + vp(sail, p.a2, { t: 'r', cx: .5, cy: .3, l: .15, k: .2, w: 7 }) + clip(sail, seams + R(0, 126, 600, 28, p.x, 0, 'opacity=".95"') + R(0, 452, 600, 60, p.x, 0, 'opacity=".95"') + shine('M92 190 Q80 300 94 430', 10, .5)) + vp(sail, 'none', { t: 'flat', w: 7 })
        + vr(50, 104, 500, 22, 11, p.a1, { t: 'cyl', w: 6 }) + vr(70, 484, 460, 18, 9, p.a1, { t: 'cyl', w: 5 })
        + vp(hull, p.a1, { t: 'cyl', l: .4, k: .3 }) + L('M30 524 H570 M40 548 H560', p.a3, 4, 'opacity=".5"') + [90, 210, 330, 450].map(x => vc(x, 536, 15, p.z, { w: 5, t: 'r' })).join('')
        + P('M0 566 q50 -30 100 0 t100 0 t100 0 t100 0 t100 0 t100 0 V600 H0Z', p.y, 'opacity=".95"') + L('M0 566 q50 -30 100 0 t100 0 t100 0 t100 0 t100 0 t100 0', lt(p.y, .6), 5, 'opacity=".8"');
    } },

  { id: 'cohete', name: 'Cohete', cat: 'viajes', kw: 'espacio ciencia lanzamiento astronauta despegue estrellas', panel: pn(300, 328, 290, 22),
    orig: { a1: '#f4f6fb', a2: '#ffffff', a3: '#b9c3d6', x: '#ef476f', y: '#ffd166', z: '#4cc9f0', u: '#ff7b1a', ol: '#3a4766', ink: '#2a3555' },
    mono: { x: 'a3', y: 'a2', z: 'a2', u: 'a3' },
    back: p => {
      const body = 'M300 10 C420 70 470 180 470 262 V510 H130 V262 C130 180 180 70 300 10Z';
      const fin = vp('M132 360 C80 380 44 450 44 530 C44 556 60 560 76 548 L132 504Z', p.x, { w: 7, t: 'd', l: .3, k: .3 });
      return fin + MIR(fin)
        + vp('M240 508 H360 L384 552 H216Z', p.a3, { t: 'v', w: 7 })
        + vp('M246 552 C240 584 270 594 300 598 C330 594 360 584 354 552Z', p.u, { w: 0, t: 'v' }) + vp('M268 552 C264 576 282 586 300 590 C318 586 336 576 332 552Z', p.y, { w: 0, t: 'v' })
        + vp(body, p.a1, { t: 'cyl', l: .5, k: .26, w: 8 }) + clip(body, vp('M120 10 H480 V150 Q300 126 120 150Z', p.x, { w: 0, t: 'flat', ex: 'opacity="0"' }) + R(120, 484, 360, 40, p.x, 0, 'opacity=".9"')) + vp(body, 'none', { t: 'flat', w: 8 })
        + vc(300, 112, 36, p.a3, { w: 6, t: 'r' }) + vc(300, 112, 26, p.z, { w: 4, t: 'r', cx: .38, cy: .3, l: .5 }) + shine('M286 102 q8 -10 20 -8', 5, .85)
        + spark(540, 80, 1.1, p.y) + spark(70, 160, .8, p.y);
    } },

  { id: 'furgoneta', name: 'Furgoneta', cat: 'viajes', kw: 'caravana camper surf carretera road trip verano playa', panel: pn(242, 322, 290, 18),
    orig: { a1: '#7fd1b9', a2: '#fff1d0', a3: '#3f9e86', x: '#e8a838', y: '#bfe6f5', z: '#2e3440', u: '#ff7a59', ol: '#1f4a40', ink: '#1f4a40' },
    mono: { x: 'a3', y: 'a2', z: 'ol', u: 'a3' },
    back: p => {
      const body = rrp(24, 124, 552, 380, 52), board = ROT(-4, 280, 98, ve(280, 98, 230, 22, p.u, { t: 'v', w: 6 }) + L('M70 98 H490', '#fff', 5, 'opacity=".8"'));
      const wheel = x => vc(x, 508, 66, p.z, { t: 'r', w: 6, l: .15 }) + vc(x, 508, 34, p.a2, { t: 'r', w: 5 }) + C(x, 508, 8, p.z) + ve(x, 478, 46, 14, p.ol, { w: 0, t: 'flat', ex: 'opacity="0"' });
      return shadow(300, 590, 270, 8, .15)
        + board + L('M150 124 V104 M410 124 V104', p.ol, 6)
        + wheel(130) + wheel(470)
        + vp(body, p.a1, { t: 'cyl', l: .4, k: .26 }) + clip(body, R(0, 340, 600, 200, p.a2, 0) + L('M0 340 H600', p.ol, 5, 'opacity=".6"') + R(0, 340, 600, 14, p.x, 0, 'opacity=".9"')) + vp(body, 'none', { t: 'flat' })
        + vp('M412 156 H534 Q556 156 558 180 L566 306 H412Z', p.y, { t: 'v', w: 6, l: .5, k: .1 }) + shine('M430 176 H520', 6, .8)
        + vr(404, 150, 10, 160, 4, p.a3, { w: 0, t: 'v' }) + vc(560, 372, 24, '#fff3a6', { w: 5, t: 'r' }) + vr(520, 444, 64, 26, 10, p.y, { t: 'v', w: 5 })
        + C(560, 332, 6, p.u) + shine('M44 180 V290', 8, .4);
    } }
);
