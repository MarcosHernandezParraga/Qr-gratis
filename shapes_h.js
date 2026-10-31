/* ===== QR Gratis · objetos, música y estudios ===== */
const bodyPts = (pts) => { const r = pts.map(([x, y]) => [x, y]), l = r.slice(1, -1).reverse().map(([x, y]) => [600 - x, y]); return r.concat(l.map(q => q)).map(q => q.join(',')).join(',').split(',').map(Number); };

SHAPES.push(
  /* ---------- SOBRE ---------- */
  { id: 'sobre', name: 'Sobre', cat: 'objetos', kw: 'carta correo mensaje email correspondencia', panel: pn(300, 330, 290, 18),
    orig: { a1: '#fff4dc', a2: '#ffffff', a3: '#e8d3a8', x: '#e63946', y: '#3a86d1', ol: '#5a3a2a', ink: '#8a1426' },
    mono: { x: 'a1', y: 'a3' },
    back: p => {
      const env = rrp(28, 120, 544, 420, 18);
      return shadow(300, 590, 250, 9, .13)
        + vp(env, p.a1, { t: 'v', l: .4, k: .12 })
        + clip(env, (() => { let s = ''; for (let i = -10; i < 24; i++) s += P(`M${i * 50} 100 l26 0 l-70 460 l-26 0Z`, i % 2 ? p.x : p.y, 'opacity=".95"'); return s; })() + vr(52, 144, 496, 372, 8, p.a1, { w: 0, t: 'v', l: .4, k: .1 }))
        + vp(env, 'none', { t: 'flat' })
        + L('M52 152 L300 340 L548 152 M52 512 L240 340 M548 512 L360 340', p.a3, 6) + L('M52 152 L300 340 L548 152', p.ol, 3.5, 'opacity=".5"')
        + R(466, 142, 76, 92, '#fff', 6, STK(p.ol, 5)) + R(476, 152, 56, 72, lt(p.y, .55), 3, STK(p.y, 3)) + vc(504, 184, 16, '#ffc83d', { w: 3 }) + L('M486 214 q18 -22 36 0', p.y, 4)
        + shine('M60 130 H200', 6, .6);
    } },

  /* ---------- BOTA DE AGUA ---------- */
  { id: 'bota', name: 'Bota de agua', cat: 'objetos', kw: 'lluvia calzado charcos otoño', panel: pn(228, 244, 290, 18),
    orig: { a1: '#ffd23f', a2: '#fff0a0', a3: '#e0a800', x: '#3b3b4a', y: '#ff8a2a', ol: '#6a4a00', ink: '#6a4a00' },
    mono: { x: 'a3', y: 'a2' },
    back: p => {
      const boot = 'M50 70 Q50 54 68 54 H388 Q406 54 406 70 V384 C406 414 440 432 500 442 C562 452 588 480 586 514 Q584 542 556 542 H62 Q44 542 44 526Z';
      let dots = ''; for (let r = 0; r < 12; r++) for (let c = 0; c < 14; c++) { const x = 40 + c * 42 + (r % 2 ? 21 : 0), y = 80 + r * 40; if (x > 70 && x < 390 && y > 80 && y < 400) continue; dots += C(x, y, 7, p.a2, 'opacity=".9"'); }
      return shadow(310, 594, 270, 8, .13)
        + L('M110 64 C108 20 190 20 188 64', p.ol, 20) + L('M110 64 C108 20 190 20 188 64', p.a3, 10)
        + vp(boot, p.a1, { t: 'cyl', l: .45, k: .26 }) + clip(boot, dots + R(30, 54, 400, 34, p.a3, 0, 'opacity=".7"') + R(30, 54, 400, 8, lt(p.a3, .5), 0, 'opacity=".7"')) + vp(boot, 'none', { t: 'flat' })
        + vp('M40 508 H590 V526 Q590 560 560 560 H70 Q40 560 40 526Z', p.x, { t: 'v', w: 7, l: .3 }) + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(i => L(`M${64 + i * 40} 528 v16`, lt(p.x, .35), 5, 'opacity=".7"')).join('')
        + shine('M428 420 C470 440 520 446 560 470', 8, .55) + shine('M62 150 V380', 9, .5);
    } },

  /* ---------- CASA ---------- */
  { id: 'casa', name: 'Casa', cat: 'objetos', kw: 'hogar inmobiliaria vivienda familia alquiler', panel: pn(300, 424, 290, 16),
    orig: { a1: '#ffe8c2', a2: '#fff6e2', a3: '#e8c88a', x: '#d9534f', y: '#a83a37', z: '#7eb6e8', ol: '#6a3a2a', ink: '#7a2e2a' },
    mono: { z: 'a2' },
    back: p => {
      let tiles = ''; for (let r = 0; r < 7; r++) for (let c = -2; c < 9; c++) tiles += `<path d="M${c * 70 + (r % 2 ? 35 : 0)} ${90 + r * 24} a35 35 0 0 0 70 0" fill="none" stroke="${p.y}" stroke-width="4" opacity=".55"/>`;
      const roof = 'M300 40 L580 262 H20Z', wall = rrp(56, 258, 488, 316, 8);
      let sid = ''; for (let y = 270; y < 580; y += 26) sid += L(`M50 ${y} H550`, p.a3, 4, 'opacity=".5"');
      return shadow(300, 596, 270, 8, .13)
        + vr(420, 100, 70, 130, 4, p.y, { t: 'cyl', w: 7 }) + vr(408, 88, 94, 22, 4, p.x, { t: 'v', w: 6 })
        + vp(wall, p.a1, { t: 'cyl', l: .3, k: .14 }) + clip(wall, sid) + vp(wall, 'none', { t: 'flat' })
        + vp(roof, p.x, { t: 'd', l: .35, k: .3, w: 8 }) + clip(roof, tiles) + vp(roof, 'none', { t: 'flat', w: 8 })
        + vr(10, 248, 580, 26, 8, p.y, { t: 'v', w: 6 })
        + vc(300, 176, 44, p.a2, { w: 7, t: 'flat' }) + vc(300, 176, 30, p.z, { w: 4 }) + L('M300 146 V206 M270 176 H330', p.ol, 4) + shine('M282 160 q8 -8 20 -8', 5, .8);
    } },

  /* ---------- POLAROID ---------- */
  { id: 'foto', name: 'Foto instantánea', cat: 'objetos', kw: 'foto camara recuerdo instantanea album fotografia', panel: pn(300, 286, 296, 14),
    orig: { a1: '#8ed1fc', a2: '#fffdf7', a3: '#4caf50', x: '#ffd23f', y: '#ffb3c7', ol: '#5a5a6a', ink: '#1d4f91' },
    mono: { x: 'a2', y: 'a2' },
    back: p => {
      const photo = rrp(120, 110, 360, 360, 8);
      return shadow(300, 592, 230, 9, .16)
        + vr(60, 40, 480, 530, 12, p.a2, { t: 'v', k: .1, l: 0, w: 5 })
        + vp(photo, p.a1, { t: 'v', l: .3, k: .1, w: 4 })
        + clip(photo, vp('M100 420 C180 360 260 410 340 380 S460 380 500 360 V480 H100Z', p.a3, { t: 'v', w: 4 }) + vp('M100 450 C200 410 300 460 400 430 S470 440 500 430 V480 H100Z', dk(p.a3, .2), { t: 'v', w: 4 }) + vc(430, 160, 36, p.x, { w: 0, t: 'r' }) + rays(430, 160, 46, 62, 10, p.x, 6))
        + vp(photo, 'none', { t: 'flat', w: 4 })
        + vp(heartD(300, 520, 54), p.y, { t: 'd', w: 5 }) + L('M120 524 q20 -16 40 0 t40 0', p.ol, 4, 'opacity=".5"') + L('M380 524 q20 -16 40 0 t40 0', p.ol, 4, 'opacity=".5"')
        + R(236, 14, 128, 40, '#ffe9a0', 4, 'opacity=".85" stroke="#d9b84a" stroke-width="2"');
    } },

  /* ---------- BOMBILLA ---------- */
  { id: 'bombilla', name: 'Bombilla', cat: 'objetos', kw: 'idea luz energia ingenio solucion', panel: pn(300, 252, 290, 18),
    orig: { a1: '#ffe066', a2: '#fff6b0', a3: '#f5b800', x: '#b8c0cc', y: '#8a93a3', ol: '#8a5a00', ink: '#7a5200' },
    mono: { x: 'a2', y: 'a3' },
    back: p => {
      let s = ''; for (let i = 0; i < 17; i++) { const a = 195 + i * 9.4, [x1, y1] = polar(300, 252, 260, a), [x2, y2] = polar(300, 252, i % 2 ? 282 : 296, a); s += L(`M${x1} ${y1} L${x2} ${y2}`, p.a3, 8); }
      const glass = 'M300 18 C430 18 520 110 520 240 C520 330 470 380 430 420 L410 470 H190 L170 420 C130 380 80 330 80 240 C80 110 170 18 300 18Z';
      return s
        + vp('M200 470 H400 V520 H200Z', p.x, { t: 'cyl', w: 7 }) + [0, 1, 2].map(i => vr(206 - i * 0, 506 + i * 26, 188 - i * 0, 26, 12, p.x, { t: 'cyl', w: 6 })).join('') + vp('M254 580 H346 Q340 600 300 600 Q260 600 254 580Z', p.y, { w: 6, t: 'v' })
        + vp(glass, p.a1, { t: 'r', cx: .38, cy: .3, r: .85, l: .6, k: .22, w: 8 }) + shine('M110 220 Q114 120 190 62', 14, .6)
        + L('M240 470 V420 M360 470 V420', p.y, 5);
    } },

  /* ---------- LUPA ---------- */
  { id: 'lupa', name: 'Lupa', cat: 'objetos', kw: 'buscar encontrar detective investigar zoom', panel: pn(258, 258, 290, 16),
    orig: { a1: '#3a86d1', a2: '#dff3ff', a3: '#1f5fa3', x: '#8a5a36', y: '#c08a5a', ol: '#173d6e', ink: '#1f4f9c' },
    mono: { x: 'a3', y: 'a2' },
    back: p => `<g transform="rotate(-45 450 450)">` + vr(414, 470, 72, 168, 30, p.x, { t: 'cyl', w: 8 }) + [0, 1, 2, 3].map(i => L(`M414 ${500 + i * 28} H486`, dk(p.x, .35), 4, 'opacity=".6"')).join('') + vr(430, 436, 40, 50, 6, p.a3, { t: 'cyl', w: 7 }) + '</g>'
      + vc(258, 258, 244, p.a1, { t: 'd', l: .4, k: .3, w: 8 }) + vc(258, 258, 214, p.a2, { w: 6, t: 'r', cx: .4, cy: .3, l: .3, k: .08 })
      + shine('M80 200 Q110 120 180 80', 12, .8) + shine('M60 260 Q62 240 70 224', 8, .8) },

  /* ---------- DESPERTADOR ---------- */
  { id: 'despertador', name: 'Despertador', cat: 'objetos', kw: 'reloj hora mañana alarma tiempo', panel: pn(300, 334, 290, 18),
    orig: { a1: '#e63946', a2: '#ff8a93', a3: '#a81d2d', x: '#c9ced6', y: '#8a93a3', z: '#fff3d6', ol: '#6a1520', ink: '#8a1426' },
    mono: { x: 'a2', y: 'a3', z: 'w' },
    back: p => {
      let t = ''; for (let i = 0; i < 12; i++) { const [x1, y1] = polar(300, 334, 190, i * 30), [x2, y2] = polar(300, 334, i % 3 ? 212 : 220, i * 30); t += L(`M${x1} ${y1} L${x2} ${y2}`, p.ol, i % 3 ? 5 : 9); }
      return shadow(300, 598, 220, 8, .14)
        + vp('M150 520 L110 580 H170 L214 540Z', p.y, { w: 7, t: 'v' }) + vp('M450 520 L490 580 H430 L386 540Z', p.y, { w: 7, t: 'v' })
        + vp('M96 130 C96 40 220 20 252 100Z', p.x, { t: 'd', w: 7 }) + vp('M504 130 C504 40 380 20 348 100Z', p.x, { t: 'd', w: 7 })
        + L('M300 70 V120', p.ol, 14) + vr(262, 56, 76, 22, 8, p.y, { t: 'h', w: 6 })
        + vc(300, 334, 268, p.a1, { cx: .38, cy: .28, l: .4, k: .3, w: 8 }) + vc(300, 334, 232, p.z, { w: 6, t: 'r', cx: .45, cy: .4, l: .2, k: .1 }) + t
        + shine('M92 300 Q96 190 190 112', 12, .45);
    } },

  /* ---------- PORTÁTIL ---------- */
  { id: 'portatil', name: 'Portátil', cat: 'objetos', kw: 'ordenador computadora trabajo tecnologia', panel: pn(300, 244, 290, 14),
    orig: { a1: '#c8ced8', a2: '#eef1f6', a3: '#8a93a3', x: '#2c2d3a', y: '#7ecff0', ol: '#2c2d3a', ink: '#232634' },
    mono: { x: 'a3' },
    back: p => shadow(300, 590, 280, 9, .15)
      + vr(54, 46, 492, 408, 26, p.a1, { t: 'v', w: 7 }) + vr(76, 68, 448, 364, 12, p.x, { t: 'd', w: 0, l: .3, k: .15 }) + C(300, 56, 4.5, p.y)
      + vp('M10 462 H590 L558 534 Q552 548 534 548 H66 Q48 548 42 534Z', p.a1, { t: 'v', w: 7, l: .5 }) + vp('M236 462 H364 Q360 480 340 480 H260 Q240 480 236 462Z', p.a3, { w: 5, t: 'v' })
      + vr(38, 520, 524, 18, 8, p.a3, { w: 0, t: 'flat', ex: 'opacity=".5"' }) + shine('M24 468 H200', 6, .6) },

  /* ---------- VIOLÍN ---------- */
  (() => {
    const half = [[300, 156], [376, 154], [438, 186], [460, 244], [446, 298], [410, 330], [398, 364], [414, 398], [458, 432], [488, 490], [474, 552], [406, 584], [300, 590]];
    const body = SM(bodyPts(half));
    return {
      id: 'violin', name: 'Violín', cat: 'musica', kw: 'orquesta clasica cuerda arco instrumento', panel: pno(300, 398, 290, 14),
      orig: { a1: '#c0673a', a2: '#e59a5a', a3: '#8a3f1c', x: '#2a1d17', y: '#e8e0d0', z: '#d4af37', ol: '#4a2410', ink: '#4a2410' },
      mono: { x: 'ol', y: 'w', z: 'a2' },
      back: p => {
        const peg = (sg, y) => {      /* clavija: eje que atraviesa la caja + cabeza fuera, todo unido */
          const x0 = 300 + sg * 12, x1 = 300 + sg * 34;
          return L(`M${x0} ${y} H${x1}`, p.ol, 11) + L(`M${x0} ${y} H${x1}`, p.a2, 5) + vr(sg < 0 ? x1 - 14 : x1 - 2, y - 12, 16, 24, 7, p.x, { t: 'h', w: 4 });
        };
        const str = [[290, 287], [297, 296], [303, 304], [310, 313]].map(([x0, x1]) => L(`M${x0} 98 L${x1} 262`, p.y, 1.9)).join('');
        return vp('M283 100 H317 L322 190 H278Z', p.a3, { t: 'cyl', w: 5 })                                   /* cuello bajo el diapasón */
          + vp('M281 32 H319 L322 94 H278Z', p.a3, { t: 'cyl', w: 6, l: .35 })                              /* caja de clavijas */
          + peg(-1, 46) + peg(-1, 76) + peg(1, 46) + peg(1, 76)
          + vc(300, 20, 21, p.a2, { t: 'r', w: 6 }) + L('M300 20 m-3 0 a3 3 0 1 1 3 3 a8 8 0 1 1 -8 -8 a13 13 0 1 1 13 13', p.ol, 3.2, 'opacity=".85"')   /* voluta */
          + vp(body, p.a1, { t: 'r', cx: .4, cy: .3, l: .5, k: .32, w: 8 }) + vp(body, 'none', { t: 'flat', w: 3, ol: p.a3, ex: 'transform="translate(300 380) scale(.95) translate(-300 -380)"' })
          + vp('M262 552 H338 L326 594 H274Z', p.x, { w: 5, t: 'v' })                                          /* cordal */
          + vp('M287 96 H313 L322 262 H278Z', p.x, { t: 'cyl', w: 5, l: .3 }) + vr(285, 92, 30, 7, 3, p.y, { t: 'v', w: 3 }) + str      /* diapasón sobre el cuerpo, con cejilla y cuerdas */
          + G('rotate(-18 300 400)', L('M-30 372 H640', p.ol, 9) + L('M-30 372 H640', p.a2, 4) + L('M-24 380 H560', '#fffdf4', 5, 'opacity=".95"') + vp('M-34 358 H30 V388 H-34Z', p.x, { w: 5, t: 'v' }))
          + shine('M120 270 Q100 250 120 230', 8, .45) + shine('M126 520 Q118 556 152 584', 9, .5);
      }
    };
  })(),

  /* ---------- GUITARRA ---------- */
  (() => {
    const half = [[300, 170], [394, 172], [448, 210], [464, 266], [444, 318], [414, 346], [408, 384], [432, 418], [478, 450], [504, 510], [492, 562], [422, 588], [300, 592]];
    const body = SM(bodyPts(half));
    return {
      id: 'guitarra', name: 'Guitarra', cat: 'musica', kw: 'acustica flamenco rock instrumento cuerdas', panel: pno(300, 396, 290, 14),
      orig: { a1: '#d98a3a', a2: '#f2c277', a3: '#9a5a1a', x: '#3a2414', y: '#e8e0d0', z: '#c9ced6', ol: '#4a2a0a', ink: '#4a2a0a' },
      mono: { x: 'ol', y: 'w', z: 'a2' },
      back: p => {
        const hw = y => 18 + (y - 75) * .0229;                          /* medio ancho del mástil */
        const fy = n => 75 + 350 * (1 - Math.pow(2, -n / 12));          /* posición real de cada traste */
        let frets = '', marks = '';
        for (let n = 1; n <= 12; n++) { const y = fy(n), w = hw(y); frets += L(`M${300 - w} ${y.toFixed(1)} H${300 + w}`, p.z, 2.6, 'stroke-linecap="butt"'); }
        [3, 5, 7, 9].forEach(n => { marks += C(300, ((fy(n) + fy(n - 1)) / 2).toFixed(1), 3.6, p.y, 'opacity=".9"'); });
        marks += C(290, ((fy(12) + fy(11)) / 2).toFixed(1), 3.6, p.y, 'opacity=".9"') + C(310, ((fy(12) + fy(11)) / 2).toFixed(1), 3.6, p.y, 'opacity=".9"');
        let strings = ''; for (let i = 0; i < 6; i++) strings += L(`M${(300 + (i - 2.5) * 5.4).toFixed(1)} 76 L${(300 + (i - 2.5) * 6.6).toFixed(1)} 252`, i < 3 ? p.y : p.z, i < 3 ? 2.2 : 1.5);
        const tuner = (sg, y) => L(`M${300 + sg * 34} ${y} H${300 + sg * 52}`, p.z, 6) + ve(300 + sg * 59, y, 9, 7, p.z, { w: 4, t: 'r' });
        return vp('M270 74 L266 18 Q266 8 278 8 H322 Q334 8 334 18 L330 74Z', p.x, { t: 'cyl', w: 6 })                  /* paleta */
          + tuner(-1, 24) + tuner(-1, 42) + tuner(-1, 60) + tuner(1, 24) + tuner(1, 42) + tuner(1, 60)
          + vp('M278 74 H322 L326 190 H274Z', p.a3, { t: 'cyl', w: 5, l: .3 })                                         /* mástil */
          + vp(body, p.a1, { t: 'r', cx: .4, cy: .3, l: .5, k: .32, w: 8 }) + vp(body, 'none', { t: 'flat', w: 4, ol: p.x, ex: 'transform="translate(300 390) scale(.96) translate(-300 -390)"' })
          + vp(body, 'none', { t: 'flat', w: 2, ol: p.a2, ex: 'transform="translate(300 390) scale(.92) translate(-300 -390)" opacity=".8"' })
          + vr(230, 556, 140, 24, 8, p.x, { t: 'v', w: 5 }) + [0, 1, 2, 3, 4, 5].map(i => C(250 + i * 20, 568, 3, p.z)).join('')      /* puente */
          + vp(`M${300 - hw(75)} 76 H${300 + hw(75)} L${300 + hw(252)} 252 H${300 - hw(252)}Z`, p.x, { t: 'cyl', w: 5, l: .25 }) + frets + marks
          + vr(281, 72, 38, 6, 2, p.y, { t: 'v', w: 3 }) + strings
          + shine('M118 300 Q108 262 134 232', 9, .5) + shine('M130 520 Q124 560 158 586', 9, .45);
      }
    };
  })(),

  /* ---------- TAMBOR ---------- */
  { id: 'tambor', name: 'Tambor', cat: 'musica', kw: 'bateria percusion ritmo banda baquetas', panel: pn(300, 396, 290, 16),
    orig: { a1: '#e63946', a2: '#ff8a93', a3: '#a81d2d', x: '#c9ced6', y: '#fff8ea', z: '#e8c28a', ol: '#5a1018', ink: '#7a1520' },
    mono: { x: 'a2', y: 'w', z: 'a2' },
    back: p => {
      const shell = rrp(48, 170, 504, 392, 18);
      let cord = ''; for (let i = 0; i < 9; i++) { const x = 60 + i * 60; cord += L(`M${x} 214 L${x + 30} 520 L${x + 60} 214`, p.x, 6, 'opacity=".9"'); }
      const stick = (x1, y1, x2, y2) => L(`M${x1} ${y1} L${x2} ${y2}`, p.ol, 26) + L(`M${x1} ${y1} L${x2} ${y2}`, p.z, 16) + vc(x2, y2, 18, p.z, { w: 6 });
      return shadow(300, 594, 250, 8, .14)
        + vp(shell, p.a1, { t: 'cyl', l: .4, k: .3 }) + clip(shell, cord) + vp(shell, 'none', { t: 'flat' })
        + vr(40, 196, 520, 28, 8, p.x, { t: 'v', w: 6 }) + vr(40, 522, 520, 28, 8, p.x, { t: 'v', w: 6 })
        + [[70, 210], [170, 210], [430, 210], [530, 210], [70, 536], [170, 536], [430, 536], [530, 536]].map(([x, y]) => C(x, y, 7, p.a3, STK(p.ol, 3))).join('')
        + ve(300, 170, 252, 50, p.y, { t: 'v', k: .14, w: 7 }) + ve(300, 172, 226, 36, 'none', { t: 'flat', w: 3, ol: p.a2, ex: 'opacity=".7"' })
        + stick(90, 60, 360, 150) + stick(510, 60, 240, 150) + shine('M80 250 V500', 8, .4);
    } },

  /* ---------- AURICULARES ---------- */
  { id: 'auriculares', name: 'Auriculares', cat: 'musica', kw: 'musica podcast sonido escuchar cascos', panel: pn(300, 330, 290, 18),
    orig: { a1: '#6a5acd', a2: '#b9b0f5', a3: '#3f2fa8', x: '#2b2250', y: '#ffd166', ol: '#2b2250', ink: '#2b2250' },
    mono: { x: 'ol', y: 'a2' },
    back: p => {
      const band = 'M82 300 C82 40 518 40 518 300';
      const cup = () => vr(16, 230, 140, 250, 52, p.a1, { t: 'cyl', l: .4, w: 8 }) + vr(30, 250, 72, 210, 34, p.a3, { t: 'cyl', w: 0, ex: 'opacity=".5"' }) + vr(110, 258, 48, 194, 22, p.x, { t: 'h', w: 6 })
        + [0, 1, 2, 3, 4].map(i => C(66, 290 + i * 34, 7, p.a2, 'opacity=".8"')).join('');
      return shadow(300, 596, 240, 7, .12)
        + L(band, p.ol, 62) + L(band, p.a1, 46) + L(band, p.a2, 12, 'opacity=".7"') + vr(250, 88, 100, 34, 17, p.y, { t: 'v', w: 5 })
        + cup() + MIR(cup());
    } },

  /* ---------- VINILO ---------- */
  { id: 'vinilo', name: 'Disco de vinilo', cat: 'musica', kw: 'musica disco retro dj lp', panel: pn(300, 300, 290, 16),
    orig: { a1: '#2a2a38', a2: '#4a4a5e', a3: '#14141c', x: '#ff7aa8', y: '#ffd166', z: '#ffffff', ol: '#14141c', ink: '#3a1a30' },
    mono: { a1: 'ol', x: 'a1', y: 'a2' },
    back: p => {
      let g = ''; for (let r = 222; r < 290; r += 7) g += C(300, 300, r, 'none', `stroke="${p.a2}" stroke-width="1.6" opacity="${r % 14 ? .5 : .8}"`);
      return vc(300, 300, 292, p.a1, { t: 'r', cx: .5, cy: .5, l: .2, k: .3, w: 8 }) + g
        + L(arcD(300, 300, 260, 200, 245), '#fff', 16, 'opacity=".35"') + L(arcD(300, 300, 260, 20, 65), '#fff', 16, 'opacity=".35"')
        + vc(300, 300, 214, p.x, { w: 5, t: 'r', cx: .5, cy: .5, l: .25, k: .15 }) + C(300, 300, 198, 'none', `stroke="${p.y}" stroke-width="4" stroke-dasharray="3 9" stroke-linecap="round"`);
    } },

  /* ---------- CASETE ---------- */
  { id: 'casete', name: 'Casete', cat: 'musica', kw: 'retro cinta musica años 80 mixtape', panel: pn(300, 288, 290, 14),
    orig: { a1: '#3a86d1', a2: '#bcdcf9', a3: '#1f5fa3', x: '#ff6b6b', y: '#ffd166', z: '#06d6a0', ol: '#173d6e', ink: '#1b3a6b' },
    mono: { x: 'a2', y: 'a3', z: 'a2' },
    back: p => {
      const body = rrp(24, 100, 552, 420, 28);
      return shadow(300, 592, 250, 8, .14)
        + vp(body, p.a1, { t: 'v', l: .4, k: .28 })
        + [[p.x, 168], [p.y, 194], [p.z, 220]].map(([c, y]) => R(24, y, 552, 20, c, 0)).join('').replace(/^/, '')
        + vp(body, 'none', { t: 'flat' })
        + vp('M120 440 H480 L510 520 H90Z', p.a3, { t: 'v', w: 6 }) + [[190, 478], [410, 478]].map(([x, y]) => vc(x, y, 30, p.a2, { w: 6, t: 'flat' }) + C(x, y, 15, p.a3, STK(p.ol, 3)) + [0, 60, 120, 180, 240, 300].map(a => L(`M${x} ${y} L${polar(x, y, 15, a).join(' ')}`, p.a2, 3)).join('')).join('')
        + [[48, 124], [552, 124], [48, 496], [552, 496]].map(([x, y]) => C(x, y, 9, p.a2, STK(p.ol, 3)) + L(`M${x - 5} ${y} h10`, p.ol, 2.5)).join('')
        + shine('M44 150 H120', 6, .5);
    } },

  /* ---------- LIBRO ---------- */
  { id: 'libro', name: 'Libro', cat: 'estudios', kw: 'leer lectura biblioteca estudiar novela', panel: pn(318, 292, 290, 14),
    orig: { a1: '#2a9d8f', a2: '#7ed0c6', a3: '#16685f', x: '#f4c542', y: '#fff6e0', ol: '#0d3f3a', ink: '#144a43' },
    mono: { x: 'a2', y: 'w' },
    back: p => {
      const cover = rrp(60, 30, 480, 540, 14);
      return shadow(300, 594, 250, 8, .14)
        + vr(62, 44, 494, 528, 12, p.y, { t: 'h', k: .14, w: 5 }) + [0, 1, 2, 3, 4, 5].map(i => L(`M${552 - i * 0} ${60 + i * 80} h6`, p.a3, 2)).join('')
        + vp(cover, p.a1, { t: 'd', l: .4, k: .28, w: 8 }) + vr(60, 30, 56, 540, 14, p.a3, { t: 'cyl', w: 8 })
        + L('M88 70 V530', p.x, 4, 'opacity=".9"') + vr(140, 52, 376, 496, 8, 'none', { t: 'flat', w: 4, ol: p.x }) 
        + vp(starD(328, 98, 32, .5), p.x, { w: 4, t: 'd' }) + L('M200 500 H436 M236 530 H400', p.x, 6)
        + vp('M470 566 V620 L490 596 L510 620 V566Z', p.x, { w: 5, t: 'v' }) + shine('M130 60 V300', 8, .35);
    } },

  /* ---------- DIPLOMA ---------- */
  { id: 'diploma', name: 'Diploma', cat: 'estudios', kw: 'graduacion titulo universidad pergamino logro', panel: pn(300, 262, 290, 14),
    orig: { a1: '#fff1cf', a2: '#fffaf0', a3: '#e2c488', x: '#e63946', y: '#b32a36', ol: '#6a4a2a', ink: '#5a3a1a' },
    mono: { x: 'a1', y: 'a3' },
    back: p => {
      const roll = x => vr(x - 36, 60, 72, 420, 36, p.a1, { t: 'cyl', k: .2, w: 7 }) + ve(x, 62, 36, 18, p.a3, { w: 6, t: 'v' }) + ve(x, 478, 36, 18, p.a3, { w: 6, t: 'v' }) + L(`M${x} 62 m-18 0 a18 9 0 1 1 18 9`, p.ol, 3, 'opacity=".6"');
      return shadow(300, 594, 250, 8, .13)
        + vr(70, 70, 460, 400, 8, p.a1, { t: 'v', k: .1, w: 6 }) + roll(66) + roll(534)
        + L('M110 96 H490 M110 440 H490', p.a3, 5, 'opacity=".8"')
        + vp('M270 470 L240 590 L282 566 L300 596 L318 566 L360 590 L330 470Z', p.x, { w: 6, t: 'h' }) + vc(300, 480, 52, p.x, { w: 7, l: .45 }) + vc(300, 480, 36, 'none', { t: 'flat', w: 3, ol: lt(p.x, .5) }) + vp(starD(300, 480, 22, .5), lt(p.x, .55), { w: 0 });
    } },

  /* ---------- CUADERNO ---------- */
  { id: 'cuaderno', name: 'Cuaderno', cat: 'estudios', kw: 'apuntes escuela espiral notas clase', panel: pn(336, 300, 290, 14),
    orig: { a1: '#fffdf4', a2: '#cfe3ff', a3: '#9fc2f2', x: '#ff6b6b', y: '#c9ced6', ol: '#4a5a78', ink: '#1d3a78' },
    mono: { a2: 'a2', a3: 'a2', x: 'a1' },
    back: p => {
      let ln = ''; for (let y = 90; y < 580; y += 36) ln += L(`M80 ${y} H570`, p.a3, 3.5);
      let sp = ''; for (let i = 0; i < 13; i++) sp += C(88, 70 + i * 40, 10, p.ol, 'opacity=".5"') + vp(`M30 ${58 + i * 40} q40 -4 80 8 q-6 10 -14 12 q-36 -10 -66 -8Z`, p.y, { w: 4, t: 'v' });
      return shadow(300, 596, 250, 8, .12)
        + vr(70, 30, 500, 550, 16, p.a1, { t: 'v', k: .08, w: 6 }) + ln + L('M146 36 V574', p.x, 4, 'opacity=".8"') + sp;
    } },

  /* ---------- PIZARRA ---------- */
  { id: 'pizarra', name: 'Pizarra', cat: 'estudios', kw: 'clase colegio profesor tiza aula', panel: pn(300, 290, 290, 14),
    orig: { a1: '#2f5d50', a2: '#e8f3ee', a3: '#1d3a32', x: '#b9783f', y: '#8a5226', z: '#ffffff', ol: '#4a2c14', ink: '#1d3a32' },
    mono: { x: 'a3', y: 'a3', a1: 'a1' },
    back: p => {
      const chalk = (d, w = 4) => L(d, '#ffffff', w, 'opacity=".75"');
      return shadow(300, 594, 270, 8, .13)
        + vr(14, 30, 572, 490, 18, p.x, { t: 'v', w: 8 }) + vr(40, 54, 520, 442, 8, p.a1, { t: 'd', l: .2, k: .3, w: 6 })
        + chalk('M64 90 l22 22 l22 -22 M64 150 q20 -20 40 0 t40 0') + vp(starD(488, 94, 20, .46), 'none', { t: 'flat', w: 3.5, ol: '#fff', ex: 'opacity=".75"' }) + chalk('M486 160 q20 -30 50 0 t30 -10') + chalk('M70 440 h70 M70 462 h46') + chalk('M470 430 l30 30 m0 -30 l-30 30', 5)
        + chalk('M270 470 q40 30 80 0', 4) + vp(heartD(530, 430, 36), 'none', { t: 'flat', w: 3.5, ol: '#fff', ex: 'opacity=".7"' })
        + vr(14, 512, 572, 44, 10, p.y, { t: 'v', w: 7 }) + vr(100, 500, 70, 18, 4, '#fff', { t: 'v', w: 4 }) + vr(430, 496, 80, 22, 4, p.a3, { t: 'v', w: 4 })
        + R(220, 36, 62, 22, '#ffe9a0', 3, 'opacity=".9"') + R(322, 36, 62, 22, '#ffe9a0', 3, 'opacity=".9"');
    } },

  /* ---------- POST-IT ---------- */
  { id: 'postit', name: 'Nota adhesiva', cat: 'estudios', kw: 'recordatorio nota apunte tarea oficina papelito', panel: pn(300, 322, 300, 8),
    orig: { a1: '#ffe566', a2: '#fff3a6', a3: '#e8c82a', x: '#e63946', y: '#c9ced6', ol: '#9a7a00', ink: '#6a4a00' },
    mono: { x: 'a3', y: 'a2' },
    back: p => {
      const note = 'M50 50 H550 V500 Q550 540 520 550 L470 570 Q440 580 430 560 L420 548 H50Z', curl = 'M550 500 Q550 540 520 550 L470 572 Q436 584 428 556 L418 546 Q500 548 550 500Z';
      return shadow(300, 590, 250, 9, .15) + vp(note, p.a1, { t: 'v', l: .4, k: .12, w: 6 })
        + L('M80 108 H300 M80 138 H220', p.a3, 7, 'opacity=".55"') + L('M360 108 H520', p.a3, 7, 'opacity=".55"')
        + vp(curl, p.a3, { t: 'd', w: 5, l: .2 }) + vc(300, 56, 22, p.x, { w: 6, l: .5 }) + C(293, 49, 6, '#fff', 'opacity=".7"')
        + L('M80 520 q30 -20 60 0 t60 0', p.a3, 6, 'opacity=".55"');
    } }
);
