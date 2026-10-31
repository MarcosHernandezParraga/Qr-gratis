/* ===== QR Gratis · objetos y música (prueba) ===== */

SHAPES.push(
  /* ---------- SOMBRERO DE COPA ---------- */
  { id: 'sombrero', name: 'Sombrero de copa', cat: 'objetos', kw: 'chistera mago elegante gala moda', panel: pno(300, 262, 290, 20),
    orig: { a1: '#33364a', a2: '#6c7192', a3: '#1d1f2e', x: '#e24a4a', y: '#f5c542', ol: '#14151f', ink: '#1d2036' },
    mono: { y: 'a2' },
    back: p => {
      const crown = 'M120 456 V92 Q120 66 150 62 H450 Q480 66 480 92 V456 Q300 506 120 456Z';
      return shadow(300, 590, 270, 12, .14)
        + ve(300, 500, 288, 72, p.a3, { t: 'v', k: .1 })
        + ve(300, 484, 288, 72, p.a1, { t: 'v', l: .3, k: .25 })
        + L('M40 480 Q80 524 200 536', p.a2, 6, 'opacity=".5"')
        + vp(crown, p.a1, { t: 'cyl', l: .38, k: .3 })
        + ve(300, 70, 180, 30, p.a2, { t: 'v', l: .3, k: .2 })
        + ve(300, 74, 150, 20, p.a3, { t: 'v', w: 0, k: .2 })
        + shine('M138 120 V380', 9, .35)
        + vp('M120 408 Q300 460 480 408 V456 Q300 506 120 456Z', p.x, { t: 'v', w: 5 })
        + L('M120 421 Q300 473 480 421', lt(p.x, .45), 3.5, 'opacity=".8"')
        + vr(380, 410, 62, 52, 8, p.y, { t: 'd', w: 5 }) + vr(394, 424, 34, 26, 4, 'none', { t: 'flat', w: 5, ol: dk(p.y, .45) });
    } },

  /* ---------- TELE RETRO ---------- */
  { id: 'tele', name: 'Tele retro', cat: 'objetos', kw: 'television antigua vintage pantalla cine', panel: pn(256, 338, 296, 22),
    orig: { a1: '#c8803e', a2: '#e8ac6a', a3: '#8a5224', x: '#2c2d3a', y: '#d3d8e0', z: '#ff5a4f', u: '#7ecff0', ol: '#4a2a14', ink: '#232634' },
    mono: { y: 'w', u: 'a2' },
    back: p => {
      const cab = rrp(16, 112, 568, 430, 56);
      let grain = '';
      for (let i = 0; i < 12; i++) grain += L(`M0 ${120 + i * 38} C150 ${112 + i * 38} 350 ${132 + i * 38} 600 ${118 + i * 38}`, p.a3, 3, 'opacity=".22"');
      const rod = d => L(d, p.ol, 12) + L(d, p.y, 6);
      const knob = (x, y) => vc(x, y, 34, p.y, { l: .5, k: .3 }) + vc(x, y, 22, dk(p.y, .15), { w: 3 }) + L(`M${x} ${y - 4} V${y - 26}`, p.ol, 6)
        + [0, 60, 120, 180, 240, 300].map(a => { const [x1, y1] = polar(x, y, 38, a), [x2, y2] = polar(x, y, 46, a); return L(`M${x1} ${y1} L${x2} ${y2}`, p.ol, 4); }).join('');
      return shadow(300, 590, 250, 10, .15)
        + rod('M300 116 L176 22') + rod('M300 116 L430 30') + vc(176, 22, 11, p.z, { w: 4 }) + vc(430, 30, 11, p.z, { w: 4 })
        + vp('M96 538 L84 590 H146 L150 538Z', p.a3, { t: 'v' }) + vp('M450 538 L454 590 H516 L504 538Z', p.a3, { t: 'v' })
        + vp('M240 116 Q300 66 360 116Z', p.y, { t: 'v' })
        + vp(cab, p.a1, { t: 'v', l: .32, k: .3 }) + clip(cab, grain)
        + vr(30, 126, 540, 402, 46, 'none', { t: 'flat', w: 3, ol: lt(p.a1, .5), ex: 'opacity=".7"' })
        + vr(74, 156, 364, 368, 62, p.x, { t: 'd', l: .35, k: .2 })
        + shine('M96 214 Q92 182 124 176', 6, .35)
        + vr(456, 150, 112, 372, 28, dk(p.a1, .18), { t: 'v', w: 5 })
        + knob(512, 214) + knob(512, 300)
        + [0, 1, 2, 3, 4].map(i => L(`M478 ${352 + i * 17} H546`, p.ol, 5)).join('')
        + vc(484, 470, 9, p.z, { w: 3 }) + vc(512, 470, 9, p.y, { w: 3 }) + vc(540, 470, 9, p.u, { w: 3 });
    } },

  /* ---------- ROBOT ---------- */
  { id: 'robot', name: 'Robot', cat: 'objetos', kw: 'tecnologia futuro android juguete', panel: pno(300, 382, 290, 20),
    orig: { a1: '#7cbaf0', a2: '#d4ebff', a3: '#3f86c9', x: '#ffb347', y: '#fff', z: '#ee4b4b', ol: '#1f3f6b', ink: '#1f3f6b' },
    mono: { y: 'w' },
    back: p => {
      const arm = sg => { const T = s => sg < 0 ? s : MIR(s); return T(vr(34, 236, 54, 190, 27, p.a2, { t: 'cyl' }) + vc(61, 252, 18, p.a3, { l: .3 }) + vc(61, 462, 32, p.a3, { l: .3 }) + vr(48, 458, 26, 40, 12, p.a2, { t: 'cyl' })); };
      return shadow(300, 592, 190, 9, .16)
        + arm(-1) + arm(1)
        + vr(176, 552, 70, 36, 14, p.a3, { t: 'v' }) + vr(354, 552, 70, 36, 14, p.a3, { t: 'v' })
        + L('M300 70 V30', p.ol, 11) + vc(300, 24, 16, p.z, { l: .5 })
        + vr(160, 98, 28, 54, 11, p.a3, { t: 'cyl' }) + vr(412, 98, 28, 54, 11, p.a3, { t: 'cyl' })
        + vr(184, 62, 232, 134, 36, p.a1, { t: 'v', l: .45 })
        + vr(204, 84, 192, 92, 24, p.a2, { t: 'v', w: 4, l: .3, k: .1 })
        + [-1, 1].map(sg => vc(300 + sg * 46, 120, 24, '#fff', { w: 5, t: 'flat' }) + vc(300 + sg * 44, 124, 12, p.ol, { w: 0, t: 'flat' }) + C(300 + sg * 44 + 4, 117, 4.5, '#fff')).join('')
        + vr(268, 152, 64, 18, 9, p.ol, { w: 0, t: 'flat' }) + [0, 1, 2].map(i => L(`M${284 + i * 16} 154 V168`, '#fff', 3.5)).join('')
        + vr(270, 192, 60, 24, 6, p.a3, { t: 'h' })
        + vr(94, 204, 412, 350, 54, p.a1, { t: 'd', l: .42, k: .3 })
        + shine('M120 270 Q110 232 142 222', 8, .5)
        + [[126, 232], [474, 232], [126, 528], [474, 528]].map(([x, y]) => vc(x, y, 9, p.a2, { w: 3 })).join('')
        + vc(256, 220, 7, p.z, { w: 2.5 }) + vc(300, 220, 7, p.x, { w: 2.5 }) + vc(344, 220, 7, p.y, { w: 2.5 });
    } },

  /* ---------- DIAMANTE ---------- */
  (() => {
    const T = [[140, 52], [220, 52], [300, 52], [380, 52], [460, 52]];
    const Gp = [[28, 232], [128, 232], [214, 232], [300, 232], [386, 232], [472, 232], [572, 232]], tip = [300, 582];
    const crown = [[T[0], Gp[0], Gp[1]], [T[0], Gp[1], T[1]], [T[1], Gp[1], Gp[2]], [T[1], T[2], Gp[2]], [T[2], Gp[2], Gp[3]], [T[2], Gp[3], Gp[4]], [T[2], T[3], Gp[4]], [T[3], Gp[4], Gp[5]], [T[3], T[4], Gp[5]], [T[4], Gp[5], Gp[6]]];
    return {
      id: 'diamante', name: 'Diamante', cat: 'objetos', kw: 'joya gema brillante lujo piedra', panel: pn(300, 236, 290, 18),
      orig: { a1: '#4cc3ea', a2: '#a9e9fb', a3: '#1f8fc2', x: '#dcf7ff', y: '#2a6fb5', ol: '#17507e', ink: '#17507e' },
      back: p => {
        const cols = [p.a1, p.x, p.a2, p.a1, p.y, p.a3, p.a1, p.a2, p.x, p.a1];
        const poly = f => 'M' + f.map(q => q.join(' ')).join('L') + 'Z';
        let s = '';
        crown.forEach((f, i) => { s += vp(poly(f), cols[i], { w: 3, ol: dk(cols[i], .3), t: i % 2 ? 'e' : 'd' }); });
        for (let i = 0; i < 6; i++) { const c = [p.a3, p.a1, p.a2, p.a2, p.a1, p.a3][i]; s += vp(poly([Gp[i], Gp[i + 1], tip]), c, { w: 3, ol: dk(c, .3), t: 'v' }); }
        return s + vp('M140 52 H460 L572 232 L300 582 L28 232Z', 'none', { t: 'flat', w: 8 })
          + spark(78, 130, 1.9) + spark(540, 300, 1.5) + spark(380, 470, 1.8) + spark(220, 460, 1.1);
      }
    };
  })(),

  /* ---------- NOTA MUSICAL ---------- */
  { id: 'nota', name: 'Nota musical', cat: 'musica', kw: 'musica corchea sonido canción', panel: pn(262, 388, 290, 16),
    orig: { a1: '#7a52d1', a2: '#c3aef5', a3: '#52299f', ol: '#2f1766', ink: '#2f1766' },
    back: p => {
      const stem = 'M462 392 V44 H496 V392Z', flag = 'M496 44 C500 130 590 150 582 280 C560 232 528 210 496 206Z';
      return shadow(280, 596, 220, 8, .12)
        + vp(flag, p.a1, { t: 'd' }) + vp(stem, p.a1, { t: 'cyl' })
        + ve(262, 388, 236, 196, p.a1, { rot: -10, cx: .35, cy: .28, l: .45, k: .3 })
        + L(arcD(262, 388, 218, 196, 238), '#fff', 12, 'opacity=".45"')
        + shine('M478 70 V250', 6, .4);
    } },

  /* ---------- PENTAGRAMA ---------- */
  { id: 'pentagrama', name: 'Pentagrama', cat: 'musica', kw: 'musica partitura notas pauta clave', panel: pn(300, 300, 290, 16),
    orig: { a1: '#6a4fd0', a2: '#d8cffa', a3: '#7b63d8', x: '#ff7aa8', ol: '#2b2250', ink: '#2b2250' },
    mono: { x: 'a3' },
    back: p => {
      const note = (x, y, st) => ve(x, y, 21, 15, p.ol, { rot: -22, t: 'e', w: 0, l: .35, k: .1 }) + ve(x - 4, y - 4, 9, 4, '#fff', { rot: -22, t: 'flat', w: 0, ex: 'opacity=".35"' }) + (st ? L(`M${x + 18} ${y - 3} V${y - 100}`, p.ol, 6.5) : '');
      let s = '';
      [232, 266, 300, 334, 368].forEach(y => { s += L(`M12 ${y} H588`, p.a3, 5.5, 'stroke-linecap="butt"'); });
      s += L('M14 232 V368', p.ol, 6, 'stroke-linecap="butt"')
        /* clave de fa */
        + L('M62 268 C116 248 142 288 120 326 C106 352 76 370 38 392', p.ol, 12) + C(62, 268, 14, p.ol) + C(142, 252, 6.5, p.ol) + C(142, 284, 6.5, p.ol)
        /* corcheas unidas */
        + note(476, 334, true) + note(534, 300, true) + P('M494 232 L552 198 V216 L494 250Z', p.ol)
        + vp(starD(430, 232, 0, .5), 'none', { w: 0 })
        + L('M572 232 V368', p.ol, 4, 'stroke-linecap="butt"') + L('M584 232 V368', p.ol, 9, 'stroke-linecap="butt"');
      return s;
    } },

  /* ---------- FANTASMA ---------- */
  { id: 'fantasma', name: 'Fantasma', cat: 'temporada', kw: 'halloween miedo espectro', panel: pn(300, 380, 300, 16),
    orig: { a1: '#ffffff', a2: '#ffb3c7', a3: '#cfc8f5', x: '#1d1d2b', ol: '#5b4f99', ink: '#3d2f7a' },
    mono: { x: 'ol' },
    back: p => {
      const body = 'M80,270 C80,120 175,30 300,30 C425,30 520,120 520,270 V548 q-13.75,36 -27.5,0' + ' t-27.5,0'.repeat(15) + ' V270 Z';
      return ve(66, 352, 38, 25, '#ffffff', { rot: -28, t: 'd', w: 7, k: .1 }) + ve(534, 352, 38, 25, '#ffffff', { rot: 28, t: 'd', w: 7, k: .1 })
        + vp(body, '#ffffff', { t: 'd', w: 8, l: 0, k: .13 })
        + shine('M112 190 Q108 120 160 78', 9, .9)
        + ve(240, 140, 20, 29, p.x, { w: 0, t: 'flat' }) + ve(360, 140, 20, 29, p.x, { w: 0, t: 'flat' }) + C(246, 130, 6.5, '#fff') + C(366, 130, 6.5, '#fff')
        + ve(300, 198, 13, 17, p.x, { w: 0, t: 'flat' }) + E(196, 186, 18, 12, p.a2, 0, 'opacity=".8"') + E(404, 186, 18, 12, p.a2, 0, 'opacity=".8"');
    } }
);
