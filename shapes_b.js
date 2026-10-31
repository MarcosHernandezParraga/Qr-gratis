/* ===== QR Gratis · animales (el QR es el cuerpo, el vientre o el caparazón) ===== */

SHAPES.push(
  /* ---------- ABEJA ---------- */
  { id: 'abeja', name: 'Abeja', cat: 'animales', kw: 'miel insecto volar zumbido colmena', panel: pno(300, 300, 296, 20),
    orig: { a1: '#ffc61a', a2: '#ffe888', a3: '#e39c00', x: '#2b2118', y: '#d6edff', z: '#ff9aa0', ol: '#3b2a10', ink: '#33240c' },
    mono: { y: 'w' },
    back: p => {
      const wing = (cx, cy, rot) => ve(cx, cy, 98, 52, p.y, { rot, w: 5, l: .55, k: .12, ex: 'fill-opacity=".9"' })
        + ROT(rot, cx, cy, L(`M${cx - 74} ${cy} H${cx + 70}`, lt(p.y, .5), 3.5, 'opacity=".9"') + L(`M${cx - 30} ${cy - 24} Q${cx} ${cy - 6} ${cx + 40} ${cy - 8}`, '#fff', 3.5, 'opacity=".8"'));
      const body = 'M118 280 C118 170 200 112 300 112 C400 112 482 170 482 280 V396 C482 490 410 548 300 572 C190 548 118 490 118 396 Z';
      const band = y => `M0 ${y} Q300 ${y + 46} 600 ${y} V${y + 38} Q300 ${y + 84} 0 ${y + 38}Z`;
      const leg = (y, k) => L(`M122 ${y} Q${82 - k} ${y + 4} ${60 - k} ${y + 44}`, p.x, 10);
      return wing(82, 156, 49) + wing(518, 156, -49)
        + leg(290, 0) + MIR(leg(290, 0)) + leg(352, 6) + MIR(leg(352, 6)) + leg(414, 12) + MIR(leg(414, 12))
        + vp(body, p.a1, { t: 'cyl' })
        + clip(body, P(band(322), p.x) + P(band(448), p.x) + P(band(510), p.x) + shine('M150 200 Q165 150 220 128', 10, .45))
        + vp(body, 'none', { t: 'flat' })
        + vp('M290 570 L300 598 L310 570Z', p.x, { w: 4, t: 'flat' })
        + L('M272 56 Q250 22 226 14', p.ol, 6) + L('M328 56 Q350 22 374 14', p.ol, 6) + vc(224, 13, 9, p.x, { w: 0 }) + vc(376, 13, 9, p.x, { w: 0 })
        + ve(300, 92, 76, 62, p.x, { l: .25, k: .3 })
        + [-1, 1].map(sg => ve(300 + sg * 32, 90, 20, 25, '#ffffff', { w: 3.5, t: 'flat' }) + ve(300 + sg * 30, 95, 11.5, 14, p.x, { w: 0, t: 'flat' }) + C(300 + sg * 30 + 4, 88, 4.5, '#fff')
          + E(300 + sg * 62, 114, 14, 9, p.z, 0, 'opacity=".85"')).join('')
        + L('M283 116 Q300 134 317 116', '#fff', 5);
    } },

  /* ---------- MARIQUITA ---------- */
  { id: 'mariquita', name: 'Mariquita', cat: 'animales', kw: 'insecto catarina jardin suerte', panel: pno(300, 338, 296, 20),
    orig: { a1: '#e8302f', a2: '#ff8a7a', a3: '#a81a26', x: '#2a2024', y: '#fff', ol: '#3a1a1e', ink: '#7e1220' },
    mono: { y: 'w' },
    back: p => {
      const cx = 300, cy = 340, r = 244;
      const leg = (x1, y1, x2, y2) => L(`M${x1} ${y1} L${x2} ${y2}`, p.x, 15);
      const spot = (x, y, rr) => vc(x, y, rr, p.x, { w: 0, l: .35, k: .1 }) + C(x - rr * .32, y - rr * .36, rr * .2, '#fff', 'opacity=".55"');
      let s = leg(84, 240, 26, 206) + leg(60, 340, 12, 346) + leg(84, 440, 28, 480) + leg(516, 240, 574, 206) + leg(540, 340, 588, 346) + leg(516, 440, 572, 480)
        + L('M268 38 Q246 20 220 22', p.ol, 7) + L('M332 38 Q354 20 380 22', p.ol, 7) + vc(218, 22, 9, p.x, { w: 0 }) + vc(382, 22, 9, p.x, { w: 0 })
        + ve(300, 84, 98, 58, p.x, { l: .25, k: .2 })
        + [-1, 1].map(sg => ve(300 + sg * 40, 78, 19, 22, '#fff', { w: 3, t: 'flat' }) + ve(300 + sg * 38, 82, 9, 12, p.x, { w: 0, t: 'flat' }) + C(300 + sg * 38 + 3, 76, 3.4, '#fff')).join('')
        + vc(cx, cy, r, p.a1, { cx: .36, cy: .28, l: .42, k: .34 })
        + L(`M${cx} ${cy - r + 4} V${cy + r - 4}`, p.ol, 7)
        + spot(112, 262, 32) + spot(488, 262, 32) + spot(112, 428, 28) + spot(488, 428, 28)
        + spot(212, 538, 27) + spot(388, 538, 27) + spot(208, 162, 26) + spot(392, 162, 26)
        + L(arcD(cx, cy, r - 24, 196, 242), '#ffffff', 12, 'opacity=".5"') + L(arcD(cx, cy, r - 24, 250, 262), '#ffffff', 12, 'opacity=".5"');
      return s;
    } },

  /* ---------- ARAÑA ---------- */
  { id: 'arana', name: 'Araña', cat: 'animales', kw: 'bicho telaraña halloween patas', panel: pno(300, 340, 296, 26),
    orig: { a1: '#6a45a0', a2: '#a98ee0', a3: '#432a72', x: '#ffc94a', y: '#fff', z: '#ff7a8c', ol: '#2d1a4e', ink: '#32205a' },
    mono: { y: 'w' },
    back: p => {
      const leg = pts => { const d = 'M' + pts.join(' L'); return L(d, p.ol, 24) + L(d, p.a1, 15) + L(d, p.a2, 4, 'opacity=".55"'); };
      const left = [
        ['150 232', '70 168', '30 236'], ['146 296', '54 262', '18 334'], ['146 360', '46 360', '20 440'], ['152 418', '74 462', '50 556']
      ];
      let s = L('M300 -4 V70', p.ol, 4) + L('M300 -4 V70', '#ffffff', 1.5, 'opacity=".7"');
      left.forEach(l => { s += leg(l); s += MIR(leg(l)); });
      s += vr(126, 166, 348, 348, 96, p.a1, { t: 'd', l: .35, k: .35 })
        + shine('M146 250 Q142 206 180 186', 10, .5)
        + vc(300, 118, 66, p.a1, { l: .35, k: .3 })
        + [-1, 1].map(sg => ve(300 + sg * 30, 108, 21, 25, '#fff', { w: 3.5, t: 'flat' }) + ve(300 + sg * 28, 112, 11, 14, p.ol, { w: 0, t: 'flat' }) + C(300 + sg * 28 + 4, 105, 4, '#fff')
          + C(300 + sg * 50, 74, 6, p.ol) + C(300 + sg * 12, 70, 5, p.ol)).join('')
        + L('M280 146 Q300 162 320 146', p.ol, 5) + vp('M284 150 L290 170 L296 152Z', '#fff', { w: 3, t: 'flat' }) + vp('M316 150 L310 170 L304 152Z', '#fff', { w: 3, t: 'flat' });
      return s;
    } },

  /* ---------- GATO ---------- */
  { id: 'gato', name: 'Gato', cat: 'animales', kw: 'minino mascota gatito felino', panel: pno(300, 376, 286, 18, 5),
    orig: { a1: '#ef9f45', a2: '#ffd9a0', a3: '#b9651d', x: '#fff4e2', y: '#9bd94f', z: '#f28b9b', u: '#2b1a10', ol: '#5a3016', ink: '#5a2c10' },
    mono: { x: 'w', y: 'a2', z: 'a2', u: 'ol' },
    back: p => {
      const tail = 'M440 500 C574 512 592 392 538 326';
      const ear = sg => {
        const T = s => sg < 0 ? s : MIR(s);
        return T(vp('M160 124 C138 76 140 34 150 12 C194 24 236 46 256 76 Z', p.a1, { t: 'd' }) + vp('M172 104 C158 72 160 50 164 36 C190 46 214 60 228 78Z', p.z, { w: 0, t: 'flat', ex: 'opacity=".9"' }));
      };
      let s = L(tail, p.ol, 48) + L(tail, p.a1, 36) + L(tail, p.a3, 36, 'stroke-linecap="butt" stroke-dasharray="9 28" stroke-dashoffset="6"') + L('M538 326 L540 326', p.a3, 36)
        + shine('M456 506 C560 514 580 420 540 360', 6, .35)
        + ve(300, 412, 224, 190, p.a1, { cx: .4, cy: .3, l: .35, k: .3 });
      [310, 362, 414, 466].forEach((y, i) => {
        const hw = 224 * Math.sqrt(1 - Math.pow((y - 412) / 190, 2)), x0 = Math.round(300 - hw + 18);   /* arranca dentro del cuerpo */
        s += L(`M${x0} ${y} q30 -10 54 ${6 + i}`, p.a3, 10) + L(`M${600 - x0} ${y} q-30 -10 -54 ${6 + i}`, p.a3, 10);
      });
      s += ve(210, 560, 62, 40, p.a1, { t: 'v', l: .35 }) + ve(390, 560, 62, 40, p.a1, { t: 'v', l: .35 })
        + [-16, 0, 16].map(o => L(`M${210 + o} 548 V568`, p.ol, 4.5, 'opacity=".75"') + L(`M${390 + o} 548 V568`, p.ol, 4.5, 'opacity=".75"')).join('')
        + ear(-1) + ear(1)
        + ve(300, 144, 160, 112, p.a1, { cx: .4, cy: .28, l: .35, k: .24 })
        + L('M300 40 V84', p.a3, 10) + L('M262 48 L272 86', p.a3, 9) + L('M338 48 L328 86', p.a3, 9)
        + L('M160 116 L192 128', p.a3, 8) + L('M158 142 L190 148', p.a3, 8) + L('M440 116 L408 128', p.a3, 8) + L('M442 142 L410 148', p.a3, 8)
        + ve(268, 196, 42, 32, p.x, { w: 0, l: .2, k: .1 }) + ve(332, 196, 42, 32, p.x, { w: 0, l: .2, k: .1 }) + ve(300, 226, 34, 22, p.x, { w: 0, l: .2, k: .1 });
      [-1, 1].forEach(sg => {
        const cx = 300 + sg * 62, cy = 146;
        const al = `M${cx - 36} ${cy + 2}C${cx - 20} ${cy - 30} ${cx + 20} ${cy - 30} ${cx + 36} ${cy + 2}C${cx + 20} ${cy + 26} ${cx - 20} ${cy + 26} ${cx - 36} ${cy + 2}Z`;
        s += ve(cx, cy + 2, 52, 34, p.a3, { w: 0, t: 'flat', ex: 'opacity=".28"' })                                  /* cuenca del ojo */
          + clip(al, vp(al, p.y, { t: 'r', cx: .5, cy: .45, w: 0, l: .4, k: .3 }) + ve(cx, cy + 1, 7, 18, p.u, { w: 0, t: 'flat' })
            + C(cx - 6, cy - 7, 4.6, '#fff') + C(cx + 6, cy + 8, 2.2, '#fff', 'opacity=".8"') + P(`M${cx - 40} ${cy - 30} H${cx + 40} V${cy - 6} C${cx + 20} ${cy - 16} ${cx - 20} ${cy - 16} ${cx - 40} ${cy - 6}Z`, '#1d3a08', 'opacity=".22"'))
          + vp(al, 'none', { t: 'flat', w: 5, ol: p.ol })
          + [0, 1, 2].map(i => L(`M${300 + sg * 54} ${202 + i * 6} L${300 + sg * (190 - i * 4)} ${186 + i * 24}`, p.ol, 3, 'opacity=".75"')).join('');
      });
      s += vp('M283 178 Q300 168 317 178 Q312 194 300 200 Q288 194 283 178Z', p.z, { w: 4.5, t: 'flat' }) + C(293, 178, 3.2, '#fff', 'opacity=".7"')
        + L('M300 200 V210 M300 210 Q286 224 268 214 M300 210 Q314 224 332 214', p.ol, 4.5)
        + shine('M172 104 Q204 66 252 54', 8, .5);
      return s;
    } }
);
