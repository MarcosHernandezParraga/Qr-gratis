/* ===== QR Gratis · núcleo: paletas, utilidades de dibujo y generador de SVG ===== */

/* Colores del QR. «Original» deja que cada dibujo use sus propios colores naturales. */
const PALETTES = [
  { id: 'original', name: 'Original', orig: true, ink: '#24304a', a1: '#e4572e', a2: '#f6b26b', a3: '#9c3a1a' },
  { id: 'cielo', name: 'Cielo', ink: '#1b4f9c', a1: '#3a86d1', a2: '#9ccbf2', a3: '#1f5fa3' },
  { id: 'menta', name: 'Menta', ink: '#0d6b4d', a1: '#2fa77a', a2: '#9fe0c2', a3: '#1b7556' },
  { id: 'coral', name: 'Coral', ink: '#b3263f', a1: '#ee6a5b', a2: '#f8b3a8', a3: '#c43f52' },
  { id: 'rosa',  name: 'Rosa',  ink: '#b0125f', a1: '#ec5c9b', a2: '#f9b4d1', a3: '#c2255c' },
  { id: 'uva',   name: 'Uva',   ink: '#52299f', a1: '#7a52d1', a2: '#c3aef5', a3: '#523399' },
  { id: 'sol',   name: 'Sol',   ink: '#8a4b00', a1: '#f2a516', a2: '#ffd77a', a3: '#c97a0a' },
  { id: 'cafe',  name: 'Café',  ink: '#4a2c17', a1: '#b8794a', a2: '#e6bf93', a3: '#6f4528' },
  { id: 'tinta', name: 'Tinta', ink: '#111111', a1: '#2b2b2b', a2: '#a8a8a8', a3: '#555555' }
].map(p => Object.assign({ paper: '#ffffff' }, p));

/* ---------- color ---------- */
const hx = c => { c = c.replace('#', ''); if (c.length === 3) c = c.split('').map(x => x + x).join(''); return [0, 2, 4].map(i => parseInt(c.substr(i, 2), 16)); };
const toHex = a => '#' + a.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
const mixC = (a, b, t) => { const A = hx(a), B = hx(b); return toHex(A.map((v, i) => v + (B[i] - v) * t)); };
const lt = (c, t) => mixC(c, '#fffdf4', t == null ? .35 : t);
const dk = (c, t) => mixC(c, '#27103a', t == null ? .3 : t);

/* Colores que usa cada dibujo (casillas):
   a1 principal · a2 claro · a3 oscuro · x y z u v acentos · ol contorno · ink QR · w blanco */
const DEF_ORIG = { ol: '#4a2c2a', w: '#ffffff' };
function resolvePal(shape, pal) {
  let p;
  if (pal.orig) {
    const o = Object.assign({}, DEF_ORIG, shape.orig || {});
    p = Object.assign({}, pal, o);
    if (!o.a1) p.a1 = pal.a1;
    p.a2 = o.a2 || lt(p.a1, .45);
    p.a3 = o.a3 || dk(p.a1, .35);
    ['x', 'y', 'z', 'u', 'v'].forEach(k => { if (!p[k] || p[k] === undefined) p[k] = p.a1; });
    p.ink = o.ink || dk(p.a1, .55);
  } else {
    p = Object.assign({ x: pal.a3, y: pal.a2, z: pal.a1, u: pal.a3, v: pal.a2, ol: pal.ink, w: '#ffffff' }, pal);
    const mp = shape.mono;
    if (mp) for (const k in mp) p[k] = p[mp[k]] || mp[k];
  }
  if (shape.fixed) p = Object.assign({}, p, shape.fixed);
  return p;
}

/* ---------- utilidades de dibujo (devuelven trozos de SVG) ---------- */
let CUR = { ol: '#333' };           /* paleta activa mientras se dibuja */
const fx = v => Math.round(v * 100) / 100;
const _uid = { n: 0 };
const uid = () => 'q' + (++_uid.n);

const R = (x, y, w, h, fill, r = 0, ex = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" ${ex}/>`;
const C = (cx, cy, r, fill, ex = '') => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" ${ex}/>`;
const E = (cx, cy, rx, ry, fill, rot = 0, ex = '') => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}"${rot ? ` transform="rotate(${rot} ${cx} ${cy})"` : ''} ${ex}/>`;
const P = (d, fill, ex = '') => `<path d="${d}" fill="${fill}" ${ex}/>`;
const L = (d, col, w, ex = '') => `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}"${ex.includes('stroke-linecap') ? '' : ' stroke-linecap="round"'} stroke-linejoin="round" ${ex}/>`;
const STK = (col, w) => `stroke="${col}" stroke-width="${w}" stroke-linejoin="round"`;
const G = (t, s) => `<g transform="${t}">${s}</g>`;
const ROT = (a, cx, cy, s) => G(`rotate(${a} ${cx} ${cy})`, s);
const MIR = (s, cx = 300) => G(`translate(${2 * cx} 0) scale(-1 1)`, s);
const PG = (pts, fill, ex = '') => `<polygon points="${pts}" fill="${fill}" ${ex}/>`;
const T = (x, y, s, size, fill, ex = '') => `<text x="${x}" y="${y}" font-family="Arial,Helvetica,sans-serif" font-weight="800" font-size="${size}" fill="${fill}" text-anchor="middle" ${ex}>${s}</text>`;

/* Pinta una forma con volumen: relleno con degradado suave + contorno.
   o.t: d (diagonal) v h cyl (cilindro) r (esfera) flat · o.w grosor del contorno (0 = sin) · o.ol color */
function paint(c, o) {
  o = o || {};
  const w = o.w == null ? 6 : o.w, ol = o.ol || CUR.ol;
  let t = o.t || 'd', def = '', fill = c;
  if (t !== 'flat' && c.charAt(0) === '#') {
    const id = uid(), l = lt(c, o.l == null ? .4 : o.l), d = dk(c, o.k == null ? .26 : o.k);
    const st = a => a.map(([off, col]) => `<stop offset="${off}" stop-color="${col}"/>`).join('');
    if (t === 'r') {
      def = `<radialGradient id="${id}" cx="${o.cx || .36}" cy="${o.cy || .3}" r="${o.r || .8}">${st([[0, l], [.5, c], [1, d]])}</radialGradient>`;
    } else {
      const dir = { d: [0, 0, 1, 1], e: [1, 0, 0, 1], v: [0, 0, 0, 1], h: [0, 0, 1, 0], cyl: [0, 0, 1, 0], cylv: [0, 0, 0, 1] }[t] || [0, 0, 1, 1];
      const stops = (t === 'cyl' || t === 'cylv') ? [[0, d], [.3, l], [.55, c], [1, d]] : [[0, l], [.5, c], [1, d]];
      def = `<linearGradient id="${id}" x1="${dir[0]}" y1="${dir[1]}" x2="${dir[2]}" y2="${dir[3]}">${st(stops)}</linearGradient>`;
    }
    fill = `url(#${id})`;
  }
  const attr = `fill="${fill}"` + (w ? ` stroke="${ol}" stroke-width="${w}" stroke-linejoin="round"${(o.ex || '').includes('stroke-linecap') ? '' : ' stroke-linecap="round"'}` : '') + (o.ex ? ' ' + o.ex : '');
  return { def, attr };
}
const vp = (d, c, o) => { const g = paint(c, o); return g.def + `<path d="${d}" ${g.attr}/>`; };
const vc = (cx, cy, r, c, o) => { const g = paint(c, Object.assign({ t: 'r' }, o)); return g.def + `<circle cx="${cx}" cy="${cy}" r="${r}" ${g.attr}/>`; };
const ve = (cx, cy, rx, ry, c, o) => {
  o = Object.assign({ t: 'r' }, o);
  const g = paint(c, o);
  return g.def + `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"${o.rot ? ` transform="rotate(${o.rot} ${cx} ${cy})"` : ''} ${g.attr}/>`;
};
const vr = (x, y, w, h, r, c, o) => { const g = paint(c, o); return g.def + `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" ${g.attr}/>`; };

/* trazados */
const rrp = (x, y, w, h, r) => `M${x + r} ${y}H${x + w - r}Q${x + w} ${y} ${x + w} ${y + r}V${y + h - r}Q${x + w} ${y + h} ${x + w - r} ${y + h}H${x + r}Q${x} ${y + h} ${x} ${y + h - r}V${y + r}Q${x} ${y} ${x + r} ${y}Z`;
const cpath = (cx, cy, r) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0Z`;
const epath = (cx, cy, rx, ry) => `M${cx - rx} ${cy}a${rx} ${ry} 0 1 0 ${2 * rx} 0a${rx} ${ry} 0 1 0 ${-2 * rx} 0Z`;
/* curva suave que pasa por los puntos (lista plana x,y,x,y…) */
function SM(flat, closed = true, k = 1) {
  const pts = []; for (let i = 0; i < flat.length; i += 2) pts.push([flat[i], flat[i + 1]]);
  const n = pts.length, get = i => closed ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
  let d = `M${fx(pts[0][0])} ${fx(pts[0][1])}`;
  const last = closed ? n : n - 1;
  for (let i = 0; i < last; i++) {
    const p0 = get(i - 1), p1 = get(i), p2 = get(i + 1), p3 = get(i + 2);
    d += `C${fx(p1[0] + (p2[0] - p0[0]) / 6 * k)} ${fx(p1[1] + (p2[1] - p0[1]) / 6 * k)} ${fx(p2[0] - (p3[0] - p1[0]) / 6 * k)} ${fx(p2[1] - (p3[1] - p1[1]) / 6 * k)} ${fx(p2[0])} ${fx(p2[1])}`;
  }
  return d + (closed ? 'Z' : '');
}
const polar = (cx, cy, r, deg) => [fx(cx + Math.cos(deg * Math.PI / 180) * r), fx(cy + Math.sin(deg * Math.PI / 180) * r)];
const radial = (cx, cy, r, degs, fn) => degs.map(a => { const [x, y] = polar(cx, cy, r, a); return fn(x, y, a); }).join('');
const EVERY = (n, from, to) => Array.from({ length: n }, (_, i) => from + (to - from) * i / n);
const rnd = seed => { let s = seed >>> 0 || 1; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; };
const clipS = (shapes, inner) => { const id = uid(); return `<clipPath id="${id}">${shapes}</clipPath><g clip-path="url(#${id})">${inner}</g>`; };
const clip = (d, inner) => { const id = uid(); return `<clipPath id="${id}"><path d="${d}"/></clipPath><g clip-path="url(#${id})">${inner}</g>`; };

/* detalles que dan vida */
const shadow = (cx, cy, rx, ry, op = .13) => E(cx, cy, rx, ry, '#27103a', 0, `opacity="${op}"`);
const shine = (d, w = 6, op = .8) => L(d, '#ffffff', w, `opacity="${op}"`);
const spark = (x, y, s = 1, col = '#ffffff') => `<path transform="translate(${x} ${y}) scale(${s})" d="M0,-12 C1.5,-4 4,-1.5 12,0 C4,1.5 1.5,4 0,12 C-1.5,4 -4,1.5 -12,0 C-4,-1.5 -1.5,-4 0,-12Z" fill="${col}"/>`;
const dots = (arr, r, col, ex = '') => arr.map(([x, y, rr]) => C(x, y, rr || r, col, ex)).join('');
const shade = (d, op = .18, col = '#27103a') => P(d, col, `opacity="${op}"`);
const arcD = (cx, cy, r, a0, a1) => { const s = polar(cx, cy, r, a0), e = polar(cx, cy, r, a1); return `M${s[0]} ${s[1]}A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${e[0]} ${e[1]}`; };
const rays = (cx, cy, r1, r2, n, col, w) => {
  let s = '';
  for (let i = 0; i < n; i++) { const a = i * 2 * Math.PI / n; s += L(`M${fx(cx + Math.cos(a) * r1)} ${fx(cy + Math.sin(a) * r1)} L${fx(cx + Math.cos(a) * r2)} ${fx(cy + Math.sin(a) * r2)}`, col, w); }
  return s;
};
const zig = (x0, x1, y, amp, step, col, w) => {
  let d = `M${x0} ${y}`;
  for (let x = x0; x < x1; x += step) d += ` L${fx(x + step / 2)} ${y - amp} L${fx(x + step)} ${y}`;
  return L(d, col, w, 'stroke-linecap="butt"');
};
const hexp = (cx, cy, r, rot = 0) => {
  const pts = []; for (let i = 0; i < 6; i++) { const a = (rot + i * 60) * Math.PI / 180; pts.push(fx(cx + Math.cos(a) * r) + ',' + fx(cy + Math.sin(a) * r)); }
  return 'M' + pts.join('L') + 'Z';
};
const polyN = (cx, cy, r, n, rot = -90) => {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = (rot + i * 360 / n) * Math.PI / 180;
    pts.push(fx(cx + Math.cos(a) * r) + ',' + fx(cy + Math.sin(a) * r));
  }
  return pts.join(' ');
};
const HEART_PATH = 'M50,88 C10,56 0,38 0,24 C0,10 12,0 26,0 C36,0 45,6 50,14 C55,6 64,0 74,0 C88,0 100,10 100,24 C100,38 90,56 50,88 Z';
const heartD = (cx, cy, w) => `M${fx(cx)} ${fx(cy + w * .44)}C${fx(cx - w * .4)} ${fx(cy + w * .12)} ${fx(cx - w * .5)} ${fx(cy - w * .06)} ${fx(cx - w * .5)} ${fx(cy - w * .2)}C${fx(cx - w * .5)} ${fx(cy - w * .34)} ${fx(cx - w * .38)} ${fx(cy - w * .44)} ${fx(cx - w * .24)} ${fx(cy - w * .44)}C${fx(cx - w * .14)} ${fx(cy - w * .44)} ${fx(cx - w * .05)} ${fx(cy - w * .38)} ${fx(cx)} ${fx(cy - w * .3)}C${fx(cx + w * .05)} ${fx(cy - w * .38)} ${fx(cx + w * .14)} ${fx(cy - w * .44)} ${fx(cx + w * .24)} ${fx(cy - w * .44)}C${fx(cx + w * .38)} ${fx(cy - w * .44)} ${fx(cx + w * .5)} ${fx(cy - w * .34)} ${fx(cx + w * .5)} ${fx(cy - w * .2)}C${fx(cx + w * .5)} ${fx(cy - w * .06)} ${fx(cx + w * .4)} ${fx(cy + w * .12)} ${fx(cx)} ${fx(cy + w * .44)}Z`;
const starD = (cx, cy, rad, inner = .46, rot = -90) => {
  const pts = [];
  for (let i = 0; i < 10; i++) { const a = (rot + i * 36) * Math.PI / 180, r = i % 2 ? rad * inner : rad; pts.push(fx(cx + Math.cos(a) * r) + ',' + fx(cy + Math.sin(a) * r)); }
  return 'M' + pts.join('L') + 'Z';
};
const leafD = (x1, y1, x2, y2, w) => {   /* hoja entre dos puntos */
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, l = Math.hypot(dx, dy) || 1, nx = -dy / l * w, ny = dx / l * w;
  return `M${x1} ${y1}Q${fx(mx + nx)} ${fx(my + ny)} ${x2} ${y2}Q${fx(mx - nx)} ${fx(my - ny)} ${x1} ${y1}Z`;
};

const inPoly = (pts, x, y) => {
  let c = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i], [xj, yj] = pts[j];
    if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c;
  }
  return c;
};
const edgeDist = (pts, x, y) => {
  let m = 1e9;
  for (let i = 0; i < pts.length; i++) {
    const [ax, ay] = pts[i], [bx, by] = pts[(i + 1) % pts.length], dx = bx - ax, dy = by - ay;
    const t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy || 1)));
    m = Math.min(m, Math.hypot(x - ax - t * dx, y - ay - t * dy));
  }
  return m;
};
const pairs = f => { const o = []; for (let i = 0; i < f.length; i += 2) o.push([f[i], f[i + 1]]); return o; };

/* lista de modelos: cada archivo shapes_*.js añade los suyos */
const SHAPES = [];

/* ---------- QR ---------- */
function qrMatrix(text) {
  qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];
  const qr = qrcode(0, 'M');
  qr.addData(text);
  qr.make();
  const n = qr.getModuleCount(), m = [];
  for (let r = 0; r < n; r++) {
    const row = [];
    for (let c = 0; c < n; c++) row.push(qr.isDark(r, c));
    m.push(row);
  }
  return m;
}

/* Si parece una web sin "https://", se lo añade. */
function normalizeInput(v) {
  v = (v || '').trim();
  if (!v) return '';
  if (/^[a-z][a-z0-9+.-]*:/i.test(v)) return v;
  if (!/\s/.test(v) && /^[^\s@]+\.[a-z]{2,}([\/?#:].*)?$/i.test(v)) return 'https://' + v;
  return v;
}

/* ---------- SVG final ---------- */
const QUIET = 3; /* módulos de margen claro dentro del cuadro del QR */
const pn = (cx, cy, s, r) => ({ x: fx(cx - s / 2), y: fx(cy - s / 2), s, r: r == null ? 16 : r });
const pno = (cx, cy, s, r, o) => Object.assign(pn(cx, cy, s, r), { o: o || 5 });

function buildSVG(shape, pal, mat, opts) {
  opts = opts || {};
  const p = resolvePal(shape, pal);
  CUR = p;
  const n = mat.length, pa = shape.panel, m = pa.s / (n + 2 * QUIET), e = 0.25;
  let d = '';
  for (let r = 0; r < n; r++) {
    let c = 0;
    while (c < n) {
      if (mat[r][c]) {
        const s = c;
        while (c < n && mat[r][c]) c++;
        const w = fx((c - s) * m + e);
        d += `M${fx(pa.x + (QUIET + s) * m)} ${fx(pa.y + (QUIET + r) * m)}h${w}v${fx(m + e)}h-${w}z`;
      } else c++;
    }
  }
  const back = shape.back(p);
  const panel = (opts.transparent && shape.plain) ? '' :
    `<rect x="${pa.x}" y="${pa.y}" width="${pa.s}" height="${pa.s}" rx="${pa.r || 0}" fill="${pa.f || p.paper}"${pa.o ? ` stroke="${p.ol}" stroke-width="${pa.o}" stroke-linejoin="round"` : ''}/>`;
  const inner =
    (opts.transparent ? '' : '<rect width="600" height="600" fill="#ffffff"/>') +
    back + panel +
    `<path d="${d}" fill="${p.ink}"/>` +
    (shape.front ? shape.front(p) : '');
  if (opts.inner) return inner;
  const size = opts.px ? ` width="${opts.px}" height="${opts.px}"` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"${size}>${inner}</svg>`;
}
