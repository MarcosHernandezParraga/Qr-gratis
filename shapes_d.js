/* ===== QR Gratis · comida y bebida (2) ===== */

SHAPES.push(
  /* ---------- CAFÉ PARA LLEVAR ---------- */
  { id: 'cafe-llevar', name: 'Café para llevar', cat: 'comida', kw: 'cafe vaso carton cafeteria desayuno', panel: pn(300, 344, 282, 18),
    orig: { a1: '#c98d55', a2: '#e8b987', a3: '#8f5a2c', x: '#3a2a24', y: '#f3e6d8', z: '#fff7ee', ol: '#4a2c1a', ink: '#4a2c1a' },
    mono: { x: 'a3', y: 'w', z: 'w' },
    back: p => {
      const cup = 'M104 138 H496 L450 566 Q448 584 428 584 H172 Q152 584 150 566Z', sl = 'M110 190 H490 L453 500 H147Z';
      let rib = ''; for (let x = 100; x < 500; x += 13) rib += L(`M${x} 186 L${x - 10} 504`, p.a3, 3, 'opacity=".22"');
      return shadow(300, 590, 200, 9)
        + vp(cup, p.z, { t: 'cyl' })
        + vp(sl, p.a1, { t: 'cyl', l: .35, k: .3 }) + clip(sl, rib)
        + L('M112 202 H488', lt(p.a1, .5), 4, 'opacity=".6"') + L('M146 490 H454', dk(p.a1, .2), 4, 'opacity=".5"')
        + vp('M84 104 Q84 80 108 80 H492 Q516 80 516 104 V130 Q516 144 502 144 H98 Q84 144 84 130Z', p.x, { t: 'v', l: .3 })
        + vp('M132 80 Q142 38 184 36 H416 Q458 38 468 80Z', p.x, { t: 'v', l: .35 })
        + vr(324, 50, 100, 17, 8.5, dk(p.x, .35), { w: 0, t: 'flat' }) + shine('M150 68 Q160 50 200 48', 7, .4) + shine('M104 100 H180', 6, .35)
        + shine('M130 240 L124 430', 9, .5);
    } },

  /* ---------- CERVEZA ---------- */
  { id: 'cerveza', name: 'Cerveza', cat: 'comida', kw: 'jarra pinta bar cañas birra fiesta', panel: pn(246, 380, 290, 18),
    orig: { a1: '#f5b123', a2: '#ffd869', a3: '#c77d0a', x: '#fffaf0', y: '#dff0f7', ol: '#6a3f08', ink: '#6e4106' },
    mono: { x: 'w', y: 'a2' },
    back: p => {
      const glass = rrp(62, 180, 368, 384, 34), hd = 'M426 262 C556 246 566 482 420 480';
      const rd = rnd(5); let bub = '';
      for (let i = 0; i < 40; i++) { const x = 80 + rd() * 336, y = 220 + rd() * 320; if (x > 98 && x < 398 && y > 232 && y < 530) continue; bub += C(x, y, 3 + rd() * 5, '#fff', 'opacity=".6"'); }
      const foam = [[96, 156, 46], [168, 124, 56], [250, 112, 60], [332, 128, 54], [398, 168, 42], [64, 196, 34], [430, 200, 34]];
      return shadow(250, 590, 220, 10)
        + L(hd, p.ol, 62) + L(hd, p.y, 48) + L(hd, p.a1, 26, 'opacity=".95"') + shine('M470 270 C540 270 548 440 466 450', 6, .6)
        + vp(glass, p.a1, { t: 'v', l: .4, k: .25 }) + clip(glass, bub + R(40, 508, 420, 70, p.y, 0, 'opacity=".5"'))
        + vp(glass, 'none', { t: 'flat' }) + shine('M84 240 V470', 11, .55) + shine('M84 490 V500', 11, .55)
        + foam.map(([x, y, r]) => C(x, y, r + 4, p.ol)).join('') + R(58, 150, 376, 66, p.ol, 20)
        + foam.map(([x, y, r]) => vc(x, y, r, p.x, { w: 0, l: 0, k: .1 })).join('') + R(62, 156, 368, 58, p.x, 16)
        + vp('M90 206 Q90 230 106 230 Q122 230 122 206Z', p.x, { w: 5 }) + vp('M372 206 Q374 228 388 228 Q402 228 402 206Z', p.x, { w: 5 })
        + C(150, 138, 14, '#fff', 'opacity=".7"') + C(270, 98, 16, '#fff', 'opacity=".7"');
    } },

  /* ---------- COCTEL ---------- */
  { id: 'coctel', name: 'Cóctel', cat: 'comida', kw: 'mojito bebida copa bar verano fiesta', panel: pn(300, 378, 290, 18),
    orig: { a1: '#8fd96a', a2: '#d3f5b0', a3: '#4aa83c', x: '#f6e9a6', y: '#e63946', z: '#3fa34d', ol: '#1f5a2a', ink: '#1f6b2a' },
    mono: { x: 'a2', y: 'a3', z: 'a3' },
    back: p => {
      const gl = 'M112 172 H488 L462 568 Q460 588 440 588 H160 Q140 588 138 568Z', rd = rnd(2);
      let ice = '';
      [[170, 214, 44, 18], [250, 196, 50, -12], [350, 206, 46, 10], [430, 224, 40, -20], [300, 236, 44, 24]].forEach(([x, y, s, r]) => { ice += ROT(r, x, y, vr(x - s / 2, y - s / 2, s, s, 10, '#ffffff', { w: 4, ol: lt(p.a3, .1), t: 'd', k: .12, ex: 'fill-opacity=".55"' })); });
      const leaf = (x, y, a) => vp(leafD(x, y, ...polar(x, y, 96, a), 26), p.z, { w: 5, t: 'd' }) + L(`M${x} ${y} L${polar(x, y, 80, a).join(' ')}`, lt(p.z, .4), 3.5, 'opacity=".8"');
      const straw = 'M352 240 L430 20';
      return shadow(300, 592, 190, 9)
        + L(straw, p.ol, 36) + L(straw, '#fff', 24) + L(straw, p.y, 24, 'stroke-linecap="butt" stroke-dasharray="20 22"')
        + leaf(300, 190, -108) + leaf(318, 190, -70) + leaf(284, 194, -138) + leaf(340, 198, -40)
        + vp(gl, p.a1, { t: 'v', l: .3, k: .3, ex: 'fill-opacity=".95"' }) + clip(gl, R(100, 160, 400, 34, p.a2, 0, 'opacity=".6"') + ice + dots(Array.from({ length: 26 }, () => [120 + rd() * 360, 230 + rd() * 340, 2 + rd() * 5]), 4, '#fff', 'opacity=".5"') + R(100, 540, 400, 60, p.a3, 0, 'opacity=".3"'))
        + vp(gl, 'none', { t: 'flat' }) + shine('M134 230 L146 520', 10, .6)
        + ve(130, 160, 52, 52, p.x, { w: 6, ol: p.z }) + ve(130, 160, 40, 40, 'none', { t: 'flat', w: 3, ol: lt(p.x, .5) })
        + [0, 60, 120, 180, 240, 300].map(a => L(`M130 160 L${polar(130, 160, 40, a).join(' ')}`, lt(p.x, .55), 3)).join('');
    } },

  /* ---------- BOTELLA DE TEQUILA ---------- */
  { id: 'tequila', name: 'Tequila', cat: 'comida', kw: 'botella licor fiesta mexico copa', panel: pn(300, 418, 290, 16),
    orig: { a1: '#e0953a', a2: '#f6c777', a3: '#a8601a', x: '#d9b382', y: '#d63a3a', z: '#f2c94c', ol: '#4e2a0a', ink: '#6b3a0c' },
    mono: { x: 'a2', y: 'a3', z: 'a2' },
    back: p => {
      const b = 'M254 78 H346 V188 C346 218 484 220 484 272 V566 Q484 590 460 590 H140 Q116 590 116 566 V272 C116 220 254 218 254 188Z';
      return shadow(300, 596, 190, 7, .16)
        + vr(262, 22, 76, 62, 12, p.x, { t: 'cyl' }) + L('M276 36 V70 M300 36 V70 M324 36 V70', dk(p.x, .35), 3, 'opacity=".6"')
        + vp(b, p.a1, { t: 'cyl', l: .38, k: .3 })
        + clip(b, vr(240, 128, 120, 26, 0, p.y, { w: 0, t: 'v' }) + R(240, 134, 120, 5, lt(p.y, .5), 0, 'opacity=".7"') + C(300, 141, 10, p.z))
        + vp(b, 'none', { t: 'flat' })
        + shine('M138 290 V560', 10, .5) + shine('M270 90 V176', 8, .5) + shine('M466 300 V330', 8, .4)
        + L('M254 112 H346', p.ol, 4, 'opacity=".5"');
    } },

  /* ---------- PIZZA ---------- */
  { id: 'pizza', name: 'Pizza', cat: 'comida', kw: 'italiana cena queso pepperoni comida rapida', panel: pn(300, 300, 296, 22),
    orig: { a1: '#e5a255', a2: '#ffd45c', a3: '#b9712a', x: '#cf3b3b', y: '#3f9d47', z: '#e8543c', u: '#2a2a32', ol: '#6a3410', ink: '#8a2c10' },
    mono: { x: 'a3', y: 'a3', z: 'a1', u: 'ol' },
    back: p => {
      const rd = rnd(21); let s = vc(300, 300, 276, p.a1, { l: .4, k: .3 }) + C(300, 300, 246, p.z, STK(dk(p.z, .3), 3)) + vc(300, 300, 236, p.a2, { w: 0, t: 'r', cx: .5, cy: .5, r: .7, l: .3, k: .08 });
      for (let i = 0; i < 40; i++) { const a = rd() * 360, r = 250 + rd() * 20, [x, y] = polar(300, 300, r, a); s += C(x, y, 3 + rd() * 5, dk(p.a1, .22), 'opacity=".5"'); }
      for (let i = 0; i < 50; i++) { const a = rd() * 360, r = 180 + rd() * 54, [x, y] = polar(300, 300, r, a); s += ve(x, y, 14 + rd() * 8, 6, '#fff3b0', { rot: a, w: 0, t: 'flat', ex: 'opacity=".55"' }); }
      for (let i = 0; i < 8; i++) { const [x1, y1] = polar(300, 300, 150, i * 45 + 22.5), [x2, y2] = polar(300, 300, 244, i * 45 + 22.5); s += L(`M${x1} ${y1} L${x2} ${y2}`, dk(p.a2, .3), 3.5, 'opacity=".7"'); }
      const tops = [], inPanel = (x, y, m) => x > 152 - m && x < 448 + m && y > 152 - m && y < 448 + m;
      for (let t = 0; t < 400 && tops.length < 11; t++) {
        const a = rd() * 360, r = 150 + rd() * 90, [x, y] = polar(300, 300, r, a), rr = 30 + rd() * 4;
        if (r + rr > 238 || inPanel(x, y, rr * .6)) continue;
        if (tops.some(q => Math.hypot(q[0] - x, q[1] - y) < q[2] + rr + 4)) continue;
        tops.push([x, y, rr]);
      }
      tops.forEach(([x, y, r], i) => {
        if (i % 3 === 0) s += vc(x, y, r * .78, p.u, { w: 0, t: 'flat' }) + C(x, y, r * .38, p.a2) + C(x - 7, y - 8, 4, '#fff', 'opacity=".5"');
        else if (i % 3 === 1) s += vc(x, y, r, p.x, { w: 4, l: .3 }) + dots([[x - 9, y - 4], [x + 8, y + 7], [x + 4, y - 11]], 4.5, dk(p.x, .28)) + C(x - 11, y - 12, 3.4, '#fff', 'opacity=".6"');
        else s += vp(leafD(x - r * .9, y + r * .5, x + r * .9, y - r * .5, 15), p.y, { w: 4, t: 'd' }) + L(`M${x - r * .8} ${y + r * .45} L${x + r * .6} ${y - r * .35}`, lt(p.y, .45), 2.5);
      });
      return s + L(arcD(300, 300, 262, 200, 250), '#fff', 9, 'opacity=".5"');
    } },

  /* ---------- GALLETA ---------- */
  (() => {
    const R0 = 272, bites = [[-92, 18], [-60, 18], [-28, 18]];
    const pts = [];
    for (let a = 0; a < 360; a += 1) {
      let r = R0, dd = null;
      bites.forEach(([c, hw]) => { const u = (a - 360 - c) / hw, u2 = (a - c) / hw; [u, u2].forEach(v => { if (Math.abs(v) < 1) r = Math.min(r, R0 - 50 * Math.sqrt(1 - v * v)); }); });
      pts.push(polar(300, 300, r, a));
    }
    const d = 'M' + pts.map(q => q.join(' ')).join('L') + 'Z';
    return {
      id: 'galleta', name: 'Galleta', cat: 'comida', kw: 'chocolate dulce cookie merienda postre', panel: pn(300, 300, 292, 20),
      orig: { a1: '#e0a85a', a2: '#f3cf8e', a3: '#b9792f', x: '#5a3420', ol: '#5a3416', ink: '#5a3014' },
      back: p => {
        const rd = rnd(17); let s = vp(d, p.a1, { t: 'r', cx: .4, cy: .3, l: .35, k: .3, w: 7 }), tex = '';
        for (let i = 0; i < 90; i++) { const a = rd() * 360, r = 100 + rd() * 170, [x, y] = polar(300, 300, r, a); tex += C(x, y, 2 + rd() * 3, rd() < .5 ? p.a3 : p.a2, 'opacity=".5"'); }
        const chips = [];
        for (let t = 0; t < 500 && chips.length < 15; t++) {
          const a = rd() * 360, r = 120 + rd() * 140, [x, y] = polar(300, 300, r, a);
          if (r > 244 || (a > 258 && a < 336 && r > 195) || (x > 140 && x < 460 && y > 140 && y < 460)) continue;
          if (chips.some(q => Math.hypot(q[0] - x, q[1] - y) < 50)) continue;
          chips.push([x, y, 24 + rd() * 12, rd() * 180]);
        }
        chips.forEach(([x, y, r, rot]) => { tex += ve(x, y, r, r * .72, p.x, { rot, t: 'd', l: .3, k: .2, w: 3.5 }) + shine(`M${x - r * .5} ${y - r * .2} Q${x - r * .2} ${y - r * .5} ${x + r * .2} ${y - r * .45}`, 4, .5); });
        s += clip(d, tex) + vp(d, 'none', { t: 'flat', w: 7 });
        return s + L(arcD(300, 300, 244, 192, 246), '#fff', 9, 'opacity=".4"');
      }
    };
  })(),

  /* ---------- POLO ---------- */
  { id: 'polo', name: 'Polo de helado', cat: 'comida', kw: 'helado verano palo refresco', panel: pn(300, 262, 290, 18),
    orig: { a1: '#ff6fa5', a2: '#ffd1e3', a3: '#d63d7a', x: '#ffffff', y: '#58b8ff', z: '#e6c28a', ol: '#7a2146', ink: '#8c1f55' },
    mono: { x: 'w', y: 'a3', z: 'a2' },
    back: p => {
      const body = 'M98 190 Q98 38 300 38 Q502 38 502 190 V420 Q502 452 470 452 H130 Q98 452 98 420Z';
      return shadow(300, 592, 120, 8, .14)
        + vp('M262 440 H338 V568 Q338 586 300 586 Q262 586 262 568Z', p.z, { t: 'cyl', l: .3 }) + L('M284 470 V560', dk(p.z, .25), 3, 'opacity=".5"')
        + vp(body, p.a1, { t: 'cyl', l: .4 })
        + clip(body, vp('M60 330 Q130 300 200 330 T340 330 T480 330 T620 330 V470 H60Z', p.x, { w: 0, t: 'flat' }) + vp('M60 392 Q130 362 200 392 T340 392 T480 392 T620 392 V470 H60Z', p.y, { w: 0, t: 'flat' }) + shine('M130 120 Q132 70 190 56', 10, .5))
        + vp(body, 'none', { t: 'flat' }) + shine('M116 200 V390', 9, .5);
    } },

  /* ---------- CUPCAKE ---------- */
  { id: 'cupcake', name: 'Cupcake', cat: 'comida', kw: 'magdalena pastel dulce postre cumpleaños', panel: pn(300, 412, 284, 18),
    orig: { a1: '#6fbaf0', a2: '#cfe9fd', a3: '#3b8bc9', x: '#ff9fc0', y: '#ffd166', z: '#e22d4a', u: '#7be0a8', v: '#b392f0', ol: '#6a2a48', ink: '#1f4f9c' },
    mono: { x: 'a2', y: 'a2', z: 'a3', u: 'a2', v: 'a3' },
    back: p => {
      const liner = 'M82 322 H518 L458 584 H142Z';
      let pl = ''; for (let x = 90; x < 520; x += 24) pl += L(`M${x} 322 L${300 + (x - 300) * .72} 584`, p.a3, 3.5, 'opacity=".4"');
      const tier = (y, w, h, c) => vp(`M${300 - w / 2} ${y + h * .5} Q${300 - w / 2 - 6} ${y} ${300 - w / 2 + 34} ${y} H${300 + w / 2 - 34} Q${300 + w / 2 + 6} ${y} ${300 + w / 2} ${y + h * .5} Q${300 + w / 2} ${y + h} ${300 + w / 2 - 38} ${y + h} H${300 - w / 2 + 38} Q${300 - w / 2} ${y + h} ${300 - w / 2} ${y + h * .5}Z`, c, { t: 'v', l: .35, k: .22 });
      let spr = '';
      [[150, 300, 20], [440, 292, -30], [214, 238, 40], [388, 224, 70], [270, 160, -20], [332, 138, 50], [190, 292, 80], [394, 288, 10]].forEach(([x, y, r], i) => { spr += ROT(r, x, y, R(x - 9, y - 3.4, 18, 7, [p.y, p.u, p.v, '#fff'][i % 4], 3.5, 'stroke="' + p.ol + '" stroke-width="2"')); });
      return shadow(300, 592, 190, 8, .14)
        + vp(liner, p.a1, { t: 'v', l: .3 }) + clip(liner, pl) + vp(liner, 'none', { t: 'flat' }) + R(70, 312, 460, 22, p.a3, 8, STK(p.ol, 6))
        + tier(214, 450, 122, p.x) + tier(142, 350, 96, p.x) + tier(80, 238, 84, p.x)
        + vp('M268 84 Q300 24 332 84Z', p.x, { t: 'v' })
        + vc(300, 40, 30, p.z, { l: .45 }) + shine('M284 28 Q290 16 304 16', 6, .8) + L('M300 12 Q312 -6 330 -4', '#3f7d3a', 6)
        + spr + shine('M96 250 Q130 224 190 222', 8, .5);
    } },

  /* ---------- TARTA ---------- */
  { id: 'tarta', name: 'Tarta de cumpleaños', cat: 'comida', kw: 'pastel fiesta velas celebración cumple', panel: pn(300, 398, 290, 18),
    orig: { a1: '#ff93bd', a2: '#ffd0e2', a3: '#d9588a', x: '#7a4326', y: '#fff1d6', z: '#ff9a1f', u: '#5ec2ff', v: '#ffe066', ol: '#5a2a30', ink: '#5e2f1a' },
    mono: { x: 'a3', y: 'a2', z: 'a1', u: 'a3', v: 'a2' },
    back: p => {
      const body = 'M66 196 V546 Q66 566 90 566 H510 Q534 566 534 546 V196Z', can = (x, c) => vr(x - 14, 100, 28, 110, 6, c, { t: 'cyl', w: 5 }) + L(`M${x - 14} 126 H${x + 14} M${x - 14} 152 H${x + 14} M${x - 14} 178 H${x + 14}`, '#fff', 5, 'opacity=".7"')
        + L(`M${x} 100 V92`, p.ol, 4) + vp(`M${x} 52 C${x + 18} 74 ${x + 16} 94 ${x} 96 C${x - 16} 94 ${x - 18} 74 ${x} 52Z`, p.z, { w: 4, t: 'v' }) + vp(`M${x} 70 C${x + 8} 82 ${x + 7} 92 ${x} 94 C${x - 7} 92 ${x - 8} 82 ${x} 70Z`, p.v, { w: 0, t: 'flat' });
      return ve(300, 580, 290, 28, p.y, { t: 'v', k: .14 })
        + can(200, p.u) + can(300, p.v) + can(400, p.a1)
        + vp(body, p.x, { t: 'cyl', l: .32, k: .3 }) + clip(body, R(40, 230, 520, 22, p.y, 0) + R(40, 520, 520, 22, p.y, 0))
        + vp(body, 'none', { t: 'flat' })
        + ve(300, 196, 234, 46, p.a1, { t: 'v', l: .4 }) + ve(300, 196, 190, 30, p.a2, { w: 0, t: 'v', l: .3, k: .08 })
        + vp('M66 196 Q66 262 94 262 Q122 262 124 214 Q132 286 168 284 Q202 282 204 226 Q214 250 236 250 Q262 250 268 214 Q282 268 316 268 Q344 268 350 224 Q362 252 386 252 Q410 252 414 214 Q426 278 460 276 Q494 274 500 222 Q506 262 534 252 V196Z', p.a1, { t: 'v', l: .35, k: .22 })
        + dots([[100, 236, 5], [258, 228, 5], [426, 236, 5]], 5, p.a2, 'opacity=".9"') + shine('M84 300 V500', 9, .35);
    } },

  /* ---------- CARAMELO ---------- */
  { id: 'caramelo', name: 'Caramelo', cat: 'comida', kw: 'dulce chuche golosina envuelto', panel: pn(300, 300, 290, 20),
    orig: { a1: '#ff5fa2', a2: '#ffd1e6', a3: '#d12f79', x: '#ffffff', y: '#ffe066', ol: '#7a1d4c', ink: '#9c1d55' },
    mono: { x: 'w' },
    back: p => {
      const fan = sg => {
        const T = s => sg < 0 ? s : MIR(s), d = 'M142 204 L108 150 L74 176 L52 118 L26 180 L14 300 L26 420 L52 482 L74 424 L108 450 L142 396Z';
        let st = ''; for (let i = -6; i <= 6; i++) st += L(`M142 300 L${14} ${300 + i * 26}`, i % 2 ? p.x : p.a3, 9, 'opacity=".55" stroke-linecap="butt"');
        return T(vp(d, p.a1, { t: 'h', l: .35 }) + clip(d, st) + vp(d, 'none', { t: 'flat' }));
      };
      const body = rrp(122, 118, 356, 364, 70);
      let st = ''; for (let i = -12; i < 16; i++) st += P(`M${122 + i * 56} 118 l30 0 l-70 364 l-30 0Z`, p.x, 'opacity=".9"');
      return fan(-1) + fan(1) + vp(body, p.a1, { t: 'cyl', l: .35 }) + clip(body, st) + vp(body, 'none', { t: 'flat' })
        + shine('M146 170 Q146 140 190 134', 9, .6);
    } },

  /* ---------- PALOMITAS ---------- */
  { id: 'palomitas', name: 'Palomitas', cat: 'comida', kw: 'cine peliculas maiz snack', panel: pn(300, 412, 290, 16),
    orig: { a1: '#e63946', a2: '#ff8a93', a3: '#a81d2d', x: '#fff3c4', y: '#ffd966', z: '#c98a3a', ol: '#6a1520', ink: '#8a1e2a' },
    mono: { x: 'w', y: 'a2', z: 'a3' },
    back: p => {
      const rd = rnd(33), cup = 'M98 214 H502 L462 572 Q460 590 440 590 H160 Q140 590 138 572Z';
      let pc = '';
      const kern = (x, y, r) => { let s = ''; [[0, 0, r], [-r * .7, r * .3, r * .7], [r * .7, r * .35, r * .72], [0, -r * .75, r * .66]].forEach(([dx, dy, rr]) => { s += vc(x + dx, y + dy, rr, p.x, { w: 3.5, l: .1, k: .16, ol: dk(p.y, .45) }); }); return s + (rd() < .5 ? C(x + r * .2, y + r * .1, r * .2, p.z, 'opacity=".8"') : ''); };
      const items = [];
      for (let t = 0; t < 900 && items.length < 34; t++) {
        const x = 96 + rd() * 408, y = 50 + rd() * 190, r = 44 + rd() * 14;
        if (Math.pow((x - 300) / 232, 2) + Math.pow((y - 215) / 175, 2) > 1) continue;
        items.push([x, y, r]);
      }
      items.sort((a, b) => a[1] - b[1]).forEach(([x, y, r]) => { pc += kern(x, y, r * .62); });
      let st = ''; for (let i = 0; i < 8; i++) st += P(`M${98 + i * 60} 200 h30 l-8 400 h-30Z`, '#fff', 'opacity=".95"');
      return shadow(300, 594, 190, 8, .14) + pc
        + vp(cup, p.a1, { t: 'cyl', l: .38 }) + clip(cup, st) + vp(cup, 'none', { t: 'flat' })
        + vp('M86 214 Q86 192 108 192 H492 Q514 192 514 214 V232 Q514 246 500 246 H100 Q86 246 86 232Z', p.a1, { t: 'v', l: .35 })
        + shine('M120 204 H210', 6, .55);
    } }
);
