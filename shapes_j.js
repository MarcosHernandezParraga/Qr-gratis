/* ===== QR Gratis · negocio ===== */
SHAPES.push(
  { id: 'tarjeta', name: 'Tarjeta de visita', cat: 'negocio', kw: 'contacto networking presentacion profesional empresa autonomo', panel: pn(340, 316, 290, 14),
    orig: { a1: '#fffdf6', a2: '#ffffff', a3: '#e8dfc8', x: '#1f6fd1', y: '#ffd166', z: '#c9ced6', ol: '#4a5a78', ink: '#17408a' },
    mono: { x: 'a3', y: 'a2', z: 'a3' },
    back: p => {
      const card = rrp(22, 100, 556, 432, 26);
      return shadow(300, 592, 260, 9, .15)
        + vp(card, p.a1, { t: 'v', k: .1, l: .2, w: 6 }) + clip(card, vp('M0 100 H116 L84 540 H0Z', p.x, { w: 0, t: 'd', l: .3, k: .25 }) + L('M116 100 L84 540', p.y, 8))
        + vp(card, 'none', { t: 'flat', w: 6 })
        + vc(64, 180, 32, p.a2, { w: 5, t: 'r' }) + vp(starD(64, 180, 18, .5), p.y, { w: 0, t: 'd' })
        + L('M42 262 H92 M42 284 H80 M42 306 H88', p.a2, 6, 'opacity=".85"')
        + L('M200 134 H420 M200 152 H340', p.z, 8, 'opacity=".9"') + L('M200 494 H300 M330 494 H470', p.z, 7, 'opacity=".9"') + C(196, 520, 0, '#fff')
        + shine('M146 120 H220', 6, .5);
    } },

  { id: 'cartel', name: 'Cartel de madera', cat: 'negocio', kw: 'letrero anuncio tienda bar restaurante rotulo local', panel: pn(300, 350, 290, 14),
    orig: { a1: '#c98a4b', a2: '#e8b878', a3: '#8a5526', x: '#5a5a66', y: '#c9ced6', z: '#2f9e6a', ol: '#4a2a10', ink: '#3f2410' },
    mono: { x: 'a3', z: 'a2' },
    back: p => {
      const board = rrp(40, 140, 520, 440, 22);
      let planks = ''; for (let i = 1; i < 5; i++) planks += L(`M40 ${140 + i * 88} H560`, p.a3, 4, 'opacity=".55"');
      let grain = ''; for (let i = 0; i < 18; i++) grain += L(`M${60 + (i * 97) % 480} ${150 + ((i * 53) % 410)} h${40 + (i % 4) * 14}`, p.a3, 2.5, 'opacity=".3"');
      const sprig = (x, y) => L(`M${x} ${y} C${x - 6} ${y - 40} ${x + 6} ${y - 80} ${x} ${y - 124}`, dk(p.z, .4), 5)
        + [[-1, 24], [1, 50], [-1, 76], [1, 100]].map(([sg, dy]) => vp(leafD(x, y - dy, x + sg * 34, y - dy - 20, 12), p.z, { w: 3, t: 'v' })).join('') + vp(leafD(x, y - 120, x, y - 150, 10), p.z, { w: 3, t: 'v' });
      const chain = (x1, x2) => L(`M${x1} 144 L${x2} 38`, p.ol, 12) + L(`M${x1} 144 L${x2} 38`, p.y, 6, 'stroke-dasharray="12 8"');
      return shadow(300, 598, 250, 8, .14)
        + chain(110, 160) + chain(490, 440) + L('M110 36 H490', p.x, 12) + vc(110, 36, 12, p.x, { w: 4 }) + vc(490, 36, 12, p.x, { w: 4 })
        + vp(board, p.a1, { t: 'v', l: .35, k: .28 }) + clip(board, planks + grain) + vp(board, 'none', { t: 'flat' })
        + vr(58, 158, 484, 404, 12, 'none', { t: 'flat', w: 4, ol: p.a3 })
        + [[72, 174], [528, 174], [72, 546], [528, 546]].map(([x, y]) => vc(x, y, 8, p.y, { w: 3, t: 'r' })).join('')
        + sprig(100, 530) + MIR(sprig(100, 530))
        + shine('M54 160 H190', 6, .4);
    } },

  { id: 'etiqueta', name: 'Etiqueta de precio', cat: 'negocio', kw: 'oferta rebaja descuento venta comercio producto', panel: pn(300, 372, 290, 14),
    orig: { a1: '#fff3cf', a2: '#fffaf0', a3: '#e7c56a', x: '#e63946', y: '#c9a35a', ol: '#7a5a1a', ink: '#5a3a0a' },
    mono: { x: 'a3', y: 'a3' },
    back: p => {
      const tag = 'M130 64 H470 L560 154 V548 Q560 586 522 586 H78 Q40 586 40 548 V154Z';
      const sale = ROT(14, 500, 180, vp(starD(500, 180, 74, .84).replace(/L/g, 'L'), p.x, { w: 5, t: 'r', l: .3 }) + vc(480, 164, 10, '#fff', { w: 0, t: 'flat' }) + vc(520, 198, 10, '#fff', { w: 0, t: 'flat' }) + L('M524 150 L476 214', '#fff', 8));
      return shadow(300, 598, 230, 7, .13)
        + L('M300 124 C170 -6 430 -6 300 124', p.ol, 7) + L('M300 124 C170 -6 430 -6 300 124', p.y, 3.5)
        + vp(tag, p.a1, { t: 'd', l: .35, k: .18 }) + vc(300, 120, 30, p.y, { w: 0, t: 'flat', ex: 'opacity="0"' })
        + vc(300, 122, 24, '#ffffff', { w: 6, t: 'flat' }) + vc(300, 122, 15, p.a3, { w: 0, t: 'flat' })
        + L('M70 190 H250 M350 190 H400', p.a3, 6, 'opacity="0"') + sale
        + L('M70 560 H230 M370 560 H530', p.a3, 7, 'opacity=".9"') + shine('M60 200 V420', 7, .5);
    } },

  { id: 'bolsa', name: 'Bolsa de la compra', cat: 'negocio', kw: 'tienda compras shopping regalo comercio boutique', panel: pn(300, 386, 290, 12),
    orig: { a1: '#ff8fab', a2: '#ffc2d1', a3: '#d9507a', x: '#fff3f6', y: '#ffd166', ol: '#7a2440', ink: '#7a1f40' },
    mono: { x: 'a2', y: 'a2' },
    back: p => {
      const bag = 'M64 168 H536 L556 580 H44Z';
      let dots = ''; for (let r = 0; r < 12; r++) for (let c = 0; c < 15; c++) dots += C(30 + c * 42 + (r % 2 ? 21 : 0), 190 + r * 36, 7, p.x, 'opacity=".55"');
      const handle = 'M200 178 C190 40 410 40 400 178';
      return shadow(300, 596, 270, 7, .14)
        + L(handle, p.ol, 20) + L(handle, p.y, 10)
        + vp(bag, p.a1, { t: 'cylv', l: .4, k: .26 }) + clip(bag, dots + vp('M0 168 H600 V218 H0Z', p.a3, { w: 0, t: 'v', ex: 'opacity=".5"' }) + R(0, 560, 600, 30, p.a3, 0, 'opacity=".5"')) + vp(bag, 'none', { t: 'flat' })
        + C(214, 196, 9, p.x, STK(p.ol, 4)) + C(386, 196, 9, p.x, STK(p.ol, 4)) + L('M64 218 H536', p.ol, 4, 'opacity=".4"')
        + shine('M80 240 L92 540', 8, .4);
    } },

  { id: 'recibo', name: 'Recibo', cat: 'negocio', kw: 'ticket factura pago compra cuenta cobro', panel: pn(300, 322, 290, 8),
    orig: { a1: '#fffef8', a2: '#ffffff', a3: '#d9d4c0', x: '#6b7280', y: '#e63946', ol: '#6b6a5e', ink: '#232634' },
    mono: { x: 'a3', y: 'a3' },
    back: p => {
      let top = 'M70 24', bot = ''; const n = 18, w = 460 / n;
      for (let i = 0; i < n; i++) top += ` L${70 + w * (i + .5)} 8 L${70 + w * (i + 1)} 24`;
      top += ' V568'; for (let i = n; i > 0; i--) top += ` L${70 + w * (i - .5)} 590 L${70 + w * (i - 1)} 568`; top += 'Z';
      return shadow(300, 598, 220, 6, .1)
        + vp(top, p.a1, { t: 'v', l: .3, k: .12, w: 5 })
        + L('M110 62 H300 M110 92 H210 M390 62 H490 M410 92 H490', p.x, 7, 'opacity=".7"') + L('M110 130 H490', p.x, 3, 'stroke-dasharray="8 8" opacity=".6"')
        + L('M110 498 H490', p.x, 3, 'stroke-dasharray="8 8" opacity=".6"') + L('M110 528 H220 M390 528 H490', p.x, 7, 'opacity=".7"')
        + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(i => R(110 + i * 19, 552, i % 3 ? 7 : 12, 12, p.ol, 0, 'opacity=".8"')).join('');
    } },

  { id: 'tienda', name: 'Tienda', cat: 'negocio', kw: 'comercio escaparate toldo local negocio mercado pequeño comercio', panel: pn(300, 408, 290, 12),
    orig: { a1: '#f4e3c6', a2: '#fff6e2', a3: '#d4b787', x: '#e63946', y: '#fff', z: '#a8dcf2', u: '#8a5a36', ol: '#6a3a22', ink: '#4a2c1a' },
    mono: { x: 'a3', y: 'a2', z: 'a2', u: 'a3' },
    back: p => {
      const front = rrp(40, 130, 520, 460, 10);
      let aw = ''; for (let i = 0; i < 8; i++) aw += P(`M${28 + i * 68} 118 h68 v100 a34 34 0 0 1 -68 0Z`, i % 2 ? p.y : p.x, 'stroke-linejoin="round"');
      const awShape = 'M28 118 H572 V218 H28Z';
      return shadow(300, 598, 270, 8, .15)
        + vr(120, 20, 360, 80, 12, p.u, { t: 'v', w: 7 }) + vr(144, 40, 312, 40, 8, p.a2, { t: 'v', w: 0 }) + vp(starD(112, 60, 20, .5), p.x, { w: 0 }) + vp(starD(488, 60, 20, .5), p.x, { w: 0 })
        + vp(front, p.a1, { t: 'cyl', l: .3, k: .16 }) + vr(54, 244, 492, 330, 10, p.z, { t: 'v', l: .4, k: .12, w: 7 }) + vr(54, 244, 492, 330, 10, 'none', { t: 'flat', w: 6, ol: p.u })
        + clip(awShape, aw) + vp(awShape, 'none', { t: 'flat', w: 0 }) + vr(20, 112, 560, 14, 7, p.u, { t: 'v', w: 5 })
        + vr(30, 548, 540, 40, 10, p.u, { t: 'v', w: 6 }) + shine('M74 270 L150 270 L74 340Z', 0, 0) + shine('M76 276 L140 276', 7, .6) + shine('M76 296 L112 296', 7, .6)
        + [[96, 560], [504, 560]].map(([x, y]) => vc(x, y, 5, p.a2, 'opacity=".7"')).join('');
    } },

  { id: 'paquete', name: 'Paquete', cat: 'negocio', kw: 'envio caja pedido entrega mensajeria logistica ecommerce', panel: pn(300, 392, 290, 12),
    orig: { a1: '#d9a066', a2: '#ecc28f', a3: '#a8742f', x: '#f3e3b8', y: '#e63946', ol: '#5a3a14', ink: '#3a2410' },
    mono: { x: 'a2', y: 'a3' },
    back: p => {
      const front = rrp(40, 214, 520, 372, 10), top = 'M78 128 H522 L560 214 H40Z';
      return shadow(300, 598, 260, 8, .15)
        + vp(front, p.a1, { t: 'cylv', l: .35, k: .2 }) + vp(top, p.a2, { t: 'v', l: .35, k: .12, w: 7 })
        + vp('M268 128 H332 V214 H268Z', p.x, { w: 0, t: 'v', ex: 'opacity="0"' }) + R(268, 128, 64, 86, p.x, 0, 'opacity=".95"') + R(268, 214, 64, 78, p.x, 0, 'opacity=".95"') + L('M268 128 V292 M332 128 V292', p.a3, 3, 'opacity=".6"')
        + vp('M78 128 H522 L560 214 H40Z', 'none', { t: 'flat', w: 7 }) + vr(40, 214, 520, 372, 10, 'none', { t: 'flat', w: 7 })
        + ROT(-8, 100, 520, vp('M70 470 V550 M70 470 L50 494 M70 470 L90 494', 'none', { w: 0 }) + L('M100 540 V490 M100 490 L84 510 M100 490 L116 510', p.ol, 7) + L('M70 540 H130', p.ol, 7))
        + vc(504, 516, 28, p.y, { w: 4, t: 'r' }) + L('M504 534 V500 M504 500 L492 514 M504 500 L516 514', '#fff', 5)
        + shine('M58 236 V330', 7, .4);
    } },

  { id: 'carrito', name: 'Carrito de compra', cat: 'negocio', kw: 'tienda online ecommerce compras supermercado shop comprar', panel: pn(332, 306, 290, 12),
    orig: { a1: '#3a86d1', a2: '#a9d1f7', a3: '#1f5fa3', x: '#c9ced6', y: '#ffd166', ol: '#173d6e', ink: '#17408a' },
    mono: { x: 'a2', y: 'a2' },
    back: p => {
      const basket = 'M104 132 H574 L536 462 H162Z';
      let grid = ''; for (let i = 0; i < 12; i++) grid += L(`M${130 + i * 40} 132 L${160 + i * 32} 462`, p.a2, 4, 'opacity=".9"'); for (let j = 0; j < 7; j++) grid += L(`M90 ${150 + j * 50} H580`, p.a2, 4, 'opacity=".9"');
      const wheel = x => vc(x, 548, 36, p.ol, { t: 'r', w: 5, l: .2 }) + vc(x, 548, 16, p.x, { t: 'r', w: 4 });
      return shadow(330, 598, 250, 6, .13)
        + L('M20 52 H104 L150 462 H520', p.ol, 24) + L('M20 52 H104 L150 462 H520', p.a1, 14) + L('M150 504 H540', p.ol, 20) + L('M150 504 H540', p.a1, 10) + L('M150 462 V504', p.ol, 20) + L('M150 462 V504', p.a1, 10)
        + wheel(206) + wheel(500)
        + vp(basket, p.a1, { t: 'v', l: .3, k: .22, w: 8 }) + clip(basket, grid) + vp(basket, 'none', { t: 'flat', w: 8 })
        + vr(88, 114, 502, 34, 14, p.a3, { t: 'v', w: 7 }) + shine('M120 134 H260', 7, .5);
    } }
);
