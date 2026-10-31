/* ===== QR Gratis · interfaz ===== */
(function () {
  'use strict';
  var SAMPLE = 'https://www.ejemplo.es';
  var $ = function (id) { return document.getElementById(id); };
  var inViewer = false /*V*/ || !!window.claude /*/V*/;

  var CATS = [
    ['todos', 'Todos'], ['basicos', 'Básicos'], ['comida', 'Comida y bebida'], ['animales', 'Animales'], ['naturaleza', 'Naturaleza'],
    ['objetos', 'Objetos'], ['fiestas', 'Fiestas'], ['temporada', 'Temporadas'], ['musica', 'Música'], ['estudios', 'Estudios'],
    ['salud', 'Salud'], ['viajes', 'Viajes'], ['negocio', 'Negocios']
  ];
  var CAT_NAME = {};
  CATS.forEach(function (c) { CAT_NAME[c[0]] = c[1]; });

  var state = { shape: 'sin-dibujo', pal: 'original', px: 1024, transparent: false, cat: 'todos', q: '' };
  var mat = null, empty = false, tooLong = false, shown = SAMPLE, timer = null, msgTimer = null;

  var elUrl = $('url'), elClear = $('clear'), elEncoded = $('encoded'), elHint = $('hint'),
      elImg = $('preview'), elStage = $('stage'), elMsg = $('msg'),
      btnCopy = $('btnCopy'), btnPng = $('btnPng'), btnSvg = $('btnSvg'), btnRandom = $('btnRandom'),
      elGallery = $('gallery'), elChips = $('palettes'), elCats = $('cats'), elTransparent = $('transparent'),
      elSearch = $('search'), elCount = $('count'), elEmpty = $('empty'), elPalNote = $('palNote'),
      elShapeNote = $('shapeNote'), elTrNote = $('trNote');

  function pal() { return PALETTES.filter(function (p) { return p.id === state.pal; })[0]; }
  function shape() { return SHAPES.filter(function (s) { return s.id === state.shape; })[0]; }
  function norm(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }

  /* ---------- colores ---------- */
  PALETTES.forEach(function (p) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip col';
    b.dataset.id = p.id;
    b.setAttribute('aria-pressed', 'false');
    var swatch = p.orig
      ? 'conic-gradient(from 30deg,#ef476f,#ffd166,#06d6a0,#4cc9f0,#9b5de5,#ef476f)'
      : 'linear-gradient(135deg,' + p.a1 + ' 50%,' + p.a2 + ' 50%)';
    b.innerHTML = '<span class="dot" style="background:' + swatch + ';border-color:' + (p.orig ? '#5b4a8a' : p.ink) + '"></span>' + p.name;
    if (p.orig) b.title = 'Multicolor: cada dibujo con sus colores naturales';
    b.addEventListener('click', function () { state.pal = p.id; drawAll(); pop(); });
    elChips.appendChild(b);
  });

  /* ---------- categorías ---------- */
  var present = {};
  SHAPES.forEach(function (s) { present[s.cat] = true; });
  CATS.forEach(function (c) {
    if (c[0] !== 'todos' && !present[c[0]]) return;
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.dataset.id = c[0];
    b.setAttribute('aria-pressed', 'false');
    b.textContent = c[1];
    b.addEventListener('click', function () {
      state.cat = c[0];
      state.q = ''; elSearch.value = '';          /* al elegir categoría (o «Todos») se limpia la búsqueda */
      applyFilter(); markSelected();
    });
    elCats.appendChild(b);
  });

  /* ---------- galería ---------- */
  var thumbs = SHAPES.map(function (sh) {
    var li = document.createElement('li');
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'thumb';
    b.dataset.id = sh.id;
    b.setAttribute('aria-pressed', 'false');
    b.setAttribute('aria-label', 'Modelo ' + sh.name);
    b.innerHTML = '<span class="art"></span><span class="lbl">' + sh.name + '</span>';
    b.addEventListener('click', function () { choose(sh.id, false); });
    li.appendChild(b);
    elGallery.appendChild(li);
    return { sh: sh, li: li, art: b.firstChild, btn: b, key: '', hay: norm(sh.name + ' ' + (sh.kw || '') + ' ' + (CAT_NAME[sh.cat] || '')) };
  });

  function choose(id, fromRandom) {
    state.shape = id;
    drawPreview(); markSelected(); pop();
    if (window.matchMedia('(max-width: 900px)').matches) {
      var top = $('result').getBoundingClientRect().top;
      if (top < 0) $('result').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function applyFilter() {
    var words = norm(state.q).split(/\s+/).filter(Boolean), n = 0;
    thumbs.forEach(function (t) {
      var ok = (state.cat === 'todos' || t.sh.cat === state.cat) && words.every(function (w) { return t.hay.indexOf(w) > -1; });
      t.li.hidden = !ok;
      if (ok) n++;
    });
    elCount.textContent = (state.cat === 'todos' && !words.length)
      ? SHAPES.length + ' modelos y ' + PALETTES.length + ' colores. Si no quieres dibujo, deja «Sin dibujo».'
      : n + ' de ' + SHAPES.length + ' modelos';
    elEmpty.hidden = n > 0;
    drawThumbs();
  }

  /* ---------- cálculo ---------- */
  function compute() {
    var t = normalizeInput(elUrl.value);
    empty = !t;
    shown = t || SAMPLE;
    tooLong = false;
    try { mat = qrMatrix(shown); }
    catch (e) { mat = null; tooLong = true; }
    elClear.hidden = !elUrl.value;
    elEncoded.textContent = shown;
  }

  function updateHint() {
    var h = '', cls = '', sh = shape();
    if (tooLong) { h = 'Ese texto es demasiado largo para un QR. Prueba con un enlace más corto.'; cls = 'err'; }
    else if (empty) { h = 'Estás viendo un ejemplo. Escribe o pega tu enlace arriba.'; }
    else if (elUrl.value.trim() === SAMPLE) { h = 'Este es un enlace de ejemplo. Bórralo y pega el tuyo.'; }
    else if (mat && mat.length >= 53 && sh.panel.s < 330 && !sh.plain) {
      h = 'Tu enlace es largo y el código sale muy denso. Para que se escanee mejor, elige «Sin dibujo» o «Con marco», o acorta el enlace.';
      cls = 'warn';
    }
    elHint.textContent = h;
    elHint.className = 'hint' + (cls ? ' ' + cls : '');
    elHint.hidden = !h;
  }

  /* ---------- dibujo ---------- */
  function pop() {
    elStage.classList.remove('pop');
    void elStage.offsetWidth;
    elStage.classList.add('pop');
  }

  function markSelected() {
    var sh = shape(), fixed = !!(sh.fixed && sh.fixed.ink);
    thumbs.forEach(function (t) { t.btn.setAttribute('aria-pressed', String(t.sh.id === state.shape)); });
    Array.prototype.forEach.call(elChips.children, function (c) { c.setAttribute('aria-pressed', String(c.dataset.id === state.pal)); });
    Array.prototype.forEach.call(elCats.children, function (c) { c.setAttribute('aria-pressed', String(c.dataset.id === state.cat)); });
    elChips.classList.toggle('off', fixed);
    var isOrig = !fixed && !!(pal() && pal().orig);
    elPalNote.hidden = !(fixed || isOrig);
    elPalNote.textContent = fixed ? 'Este modelo es siempre en blanco y negro: el color no le afecta.'
      : (isOrig ? 'Original: cada dibujo con sus colores naturales, como pintado a mano. Los demás colores pintan todo en un solo tono.' : '');
    elShapeNote.hidden = !sh.note;
    elShapeNote.textContent = sh.note || '';
    elTrNote.hidden = !state.transparent;
    elTrNote.textContent = sh.plain
      ? 'Sin fondo: el código queda suelto. Ponlo sobre un color claro para que se lea bien.'
      : 'El cuadro blanco donde va el código se mantiene, para que siempre se lea bien.';
  }

  var drawToken = 0;
  function drawThumbs() {
    if (!mat) return;
    var p = pal(), key = state.pal + '|' + shown, token = ++drawToken;
    var todo = thumbs.filter(function (t) { return !t.li.hidden && t.key !== key; });
    (function step() {                              /* se dibuja por tandas para que la página no se quede pillada */
      if (token !== drawToken) return;
      for (var n = 0; todo.length && n < 14; n++) {
        var t = todo.shift();
        t.art.innerHTML = buildSVG(t.sh, p, mat);
        t.key = key;
      }
      if (todo.length) requestAnimationFrame(step);
    })();
  }

  function drawPreview() {
    var ok = !!mat && !empty;
    [btnCopy, btnPng, btnSvg].forEach(function (b) { b.disabled = !ok; });
    if (!mat) { elImg.removeAttribute('src'); return; }
    var svg = buildSVG(shape(), pal(), mat, { transparent: state.transparent });
    elImg.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    elImg.alt = 'Código QR con el modelo ' + shape().name;
    elStage.classList.toggle('checker', state.transparent);
    updateHint();
  }

  function drawAll() { compute(); drawThumbs(); drawPreview(); markSelected(); }

  /* ---------- exportar ---------- */
  function svgFor(px) { return buildSVG(shape(), pal(), mat, { transparent: state.transparent, px: px }); }

  function toPng(px) {
    return new Promise(function (resolve, reject) {
      var img = new Image();
      img.onload = function () {
        try {
          var c = document.createElement('canvas');
          c.width = c.height = px;
          c.getContext('2d').drawImage(img, 0, 0, px, px);
          c.toBlob(function (b) { b ? resolve(b) : reject(new Error('blob')); }, 'image/png');
        } catch (e) { reject(e); }
      };
      img.onerror = function () { reject(new Error('img')); };
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgFor(px));
    });
  }

  function say(text, isErr) {
    elMsg.textContent = text;
    elMsg.className = 'msg' + (isErr ? ' err' : '');
    clearTimeout(msgTimer);
    msgTimer = setTimeout(function () { elMsg.textContent = ''; }, 7000);
  }

  function fileName(ext) { return 'qr-gratis-' + state.shape + '-' + state.pal + '.' + ext; }

  function save(blob, name) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  }

  btnCopy.addEventListener('click', function () {
    if (!navigator.clipboard || !window.ClipboardItem) { fallbackCopy(); return; }
    var item;
    try { item = new ClipboardItem({ 'image/png': toPng(Math.min(state.px, 2048)) }); }
    catch (e) { fallbackCopy(); return; }
    navigator.clipboard.write([item]).then(
      function () { say('Imagen copiada. Ya puedes pegarla donde quieras.'); },
      fallbackCopy
    );
  });

  function fallbackCopy() {
    say('Tu navegador no deja copiar con el botón. Haz clic derecho sobre el QR y elige «Copiar imagen» (en el móvil, mantén pulsado).', true);
  }

  btnPng.addEventListener('click', function () {
    toPng(state.px).then(
      function (b) { save(b, fileName('png')); say('PNG de ' + state.px + ' px listo.'); },
      function () { say('No se pudo crear una imagen tan grande en este dispositivo. Prueba con un tamaño menor o descarga el SVG.', true); }
    );
  });

  btnSvg.addEventListener('click', function () {
    save(new Blob([svgFor(1200)], { type: 'image/svg+xml' }), fileName('svg'));
    say('SVG listo: se puede ampliar a cualquier tamaño sin perder calidad. Ideal para carteles.');
  });

  Array.prototype.forEach.call(document.querySelectorAll('input[name="px"]'), function (r) {
    r.addEventListener('change', function () { if (r.checked) state.px = parseInt(r.value, 10); });
  });
  elTransparent.addEventListener('change', function () { state.transparent = elTransparent.checked; drawPreview(); markSelected(); });

  /* ---------- buscar y sorpresa ---------- */
  elSearch.addEventListener('input', function () {
    state.q = elSearch.value;
    state.cat = 'todos';                           /* buscar siempre mira en todos los modelos */
    applyFilter(); markSelected();
  });

  btnRandom.addEventListener('click', function () {
    var pool = SHAPES.filter(function (s) { return s.id !== state.shape && !s.fixed; });
    var s = pool[Math.floor(Math.random() * pool.length)];
    state.pal = PALETTES[Math.floor(Math.random() * PALETTES.length)].id;
    state.cat = 'todos'; state.q = ''; elSearch.value = '';
    applyFilter();
    state.shape = s.id;
    drawAll(); pop();
    var t = thumbs.filter(function (x) { return x.sh.id === s.id; })[0];
    if (t) t.btn.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    if (window.matchMedia('(max-width: 900px)').matches) {
      var top = $('result').getBoundingClientRect().top;
      if (top < 0) $('result').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  /* ---------- entrada ---------- */
  elUrl.addEventListener('input', function () {
    clearTimeout(timer);
    timer = setTimeout(drawAll, 120);
  });
  elUrl.addEventListener('focus', function () { if (elUrl.value === SAMPLE) elUrl.select(); });
  elClear.addEventListener('click', function () { elUrl.value = ''; drawAll(); elUrl.focus(); });

  if (inViewer) $('viewerNote').hidden = false;

  /* correo armado con JS para que no lo recojan los robots de spam */
  var mail = $('mail');
  if (mail) {
    var addr = mail.getAttribute('data-u') + '@' + mail.getAttribute('data-d');
    mail.textContent = addr;
    mail.href = 'mailto:' + addr;
  }

  /* si la página está en GitHub Pages, enseña el enlace al código */
  var repo = $('repo'), gh = /^([a-z0-9-]+)\.github\.io$/i.exec(location.hostname);
  if (repo && gh) {
    var seg = location.pathname.split('/')[1];
    repo.href = 'https://github.com/' + gh[1] + '/' + (seg || (gh[1] + '.github.io'));
    repo.hidden = false;
  }

  elUrl.value = SAMPLE;
  compute();
  applyFilter();
  drawPreview();
  markSelected();
})();
