/* ===== QR Gratis · flores alrededor del código ===== */
(() => {
  const bz = (P, t) => { const u = 1 - t; return [0, 1].map(k => u * u * u * P[0][k] + 3 * u * u * t * P[1][k] + 3 * u * t * t * P[2][k] + t * t * t * P[3][k]); };
  const pathOf = P => `M${P[0][0]} ${P[0][1]}C${P[1][0]} ${P[1][1]} ${P[2][0]} ${P[2][1]} ${P[3][0]} ${P[3][1]}`;

  SHAPES.push({
    id: 'flores', name: 'Flores', cat: 'naturaleza', kw: 'ramo flores marco floral jardin primavera boda regalo margaritas amapola',
    panel: pno(300, 300, 276, 22),
    orig: { a1: '#ff7fa8', a2: '#ffc2d6', a3: '#d94f80', x: '#4fae52', y: '#ffd23f', z: '#5aa9f0', u: '#ee4a3f', ol: '#5a2a3e', ink: '#6a2244' },
    mono: { x: 'a3', y: 'a2', z: 'a1', u: 'a3' },
    back: p => {
      const stem = P => L(pathOf(P), p.ol, 13) + L(pathOf(P), p.x, 8) + L(pathOf(P), lt(p.x, .5), 2, 'opacity=".55" transform="translate(-1.5 -1)"');
      const leaf = (P, t, dx, dy, w) => { const [x, y] = bz(P, t); return vp(leafD(x, y, x + dx, y + dy, w), p.x, { w: 3.5, t: 'v', l: .35, k: .2 }) + L(`M${x.toFixed(1)} ${y.toFixed(1)} L${(x + dx * .78).toFixed(1)} ${(y + dy * .78).toFixed(1)}`, dk(p.x, .35), 2, 'opacity=".55"'); };
      /* pétalos alrededor de un centro: la punta llega a R */
      const pet = (cx, cy, R, n, wK, fill, rot0, o = {}) => { let s = ''; for (let i = 0; i < n; i++) { const a = rot0 + i * 360 / n, [px, py] = polar(cx, cy, R * .5, a); s += ve(px, py, R * .5, R * wK, fill, Object.assign({ rot: a, t: 'e', w: 4, l: .4, k: .16 }, o)); } return s; };
      const stamens = (cx, cy, r, n, col, rot0 = 0) => { let s = ''; for (let i = 0; i < n; i++) { const a = rot0 + i * 360 / n, [x, y] = polar(cx, cy, r, a); s += L(`M${cx} ${cy} L${x} ${y}`, col, 3) + C(x, y, 4, col); } return s; };

      /* --- las cuatro flores grandes (cada esquina, una distinta) --- */
      const cherry = (cx, cy, R) => pet(cx, cy, R, 5, .38, p.a1, -90) + vc(cx, cy, R * .2, p.y, { w: 3.5, t: 'r' }) + stamens(cx, cy, R * .34, 7, p.a3, 10);
      const daisy = (cx, cy, R) => pet(cx, cy, R, 16, .13, '#ffffff', 0, { w: 3.5, l: .1, k: .18 }) + vc(cx, cy, R * .3, p.y, { w: 4, t: 'r', l: .35, k: .2 }) + dots([[cx - 7, cy - 6, 3], [cx + 8, cy - 3, 3], [cx - 2, cy + 9, 3], [cx + 3, cy - 12, 2.6]], 3, dk(p.y, .4));
      const corn = (cx, cy, R) => pet(cx, cy, R, 8, .3, p.z, -90) + pet(cx, cy, R * .62, 8, .26, lt(p.z, .35), -67, { w: 3 }) + vc(cx, cy, R * .17, p.a3, { w: 3, t: 'r' });
      const poppy = (cx, cy, R) => pet(cx, cy, R, 4, .58, p.u, -45, { w: 4.5 }) + pet(cx, cy, R * .55, 4, .5, lt(p.u, .3), 0, { w: 0 }) + vc(cx, cy, R * .19, p.ol, { w: 0, t: 'r' }) + stamens(cx, cy, R * .3, 10, p.ol, 5);

      const corner = (sx, sy, flower) => {
        const P = [[214, 214], [176, 198], [128, 168], [98, 114]];
        return G(`translate(300 300) scale(${sx} ${sy}) translate(-300 -300)`,
          stem(P) + leaf(P, .32, -44, 38, 17) + leaf(P, .46, 40, -34, 16) + leaf(P, .72, -40, 4, 14) + flower(88, 88, 66));
      };

      /* --- tres flores pequeñas en cada lado, sobre tallos en abanico --- */
      const small = (cx, cy, r, c1, c2) => pet(cx, cy, r, 5, .42, c1, -90, { w: 3.5 }) + vc(cx, cy, r * .28, c2, { w: 3, t: 'r' });
      const side = cols => {
        const A = [[176, 288], [136, 276], [100, 256], [66, 236]], B = [[176, 300], [134, 300], [92, 300], [54, 300]], C3 = [[176, 312], [136, 324], [100, 344], [66, 364]];
        return stem(A) + stem(B) + stem(C3)
          + leaf(A, .45, -6, -40, 12) + leaf(C3, .45, -6, 40, 12) + leaf(B, .4, -2, -34, 11) + leaf(B, .6, -2, 34, 11)
          + small(A[3][0] - 2, A[3][1] - 2, 27, cols[0], p.y) + small(B[3][0] - 2, B[3][1], 29, cols[1], p.a3) + small(C3[3][0] - 2, C3[3][1] + 2, 27, cols[2], p.y);
      };
      const rot = a => s => G(`rotate(${a} 300 300)`, s);
      return corner(1, 1, cherry) + corner(-1, 1, daisy) + corner(1, -1, corn) + corner(-1, -1, poppy)
        + side([p.a2, '#ffffff', p.z]) + rot(90)(side(['#ffffff', p.a2, p.y])) + rot(180)(side([p.z, '#ffffff', p.a2])) + rot(270)(side(['#ffffff', p.z, p.a2]));
    }
  });
})();
