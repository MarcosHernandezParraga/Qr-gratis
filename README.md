# QR Gratis

**Generador de códigos QR gratis, con modelos originales.**
Pega tu enlace, elige un dibujo (o ninguno) y copia o descarga tu QR en alta calidad.
Sin registro, sin marcas de agua, sin anuncios.

🔗 **Web:** https://marcoshernandezparraga.github.io/Qr-gratis/

## Qué hace

- Crea códigos QR a partir de cualquier enlace o texto.
- **113 modelos originales** (comida, animales, naturaleza, objetos, fiestas, música, estudios, salud, viajes, negocios…) o «Sin dibujo» para un QR clásico.
- Color **Original** (cada dibujo con sus colores naturales) y otros 8 colores de un solo tono.
- Descarga en **PNG** (512, 1024, 2048 y 4096 px), **SVG** (ideal para carteles e imprenta) o copia la imagen al portapapeles.
- Opción de **fondo transparente**.
- Todo ocurre **en tu navegador**: el enlace que escribes no se envía a ningún servidor. Sin cookies ni analítica.

## Uso

Es una sola página web sin dependencias. Abre `index.html` en tu navegador o súbela a cualquier alojamiento estático (GitHub Pages, Cloudflare Pages, Netlify…).

### Publicarla con GitHub Pages

1. Sube el contenido de esta carpeta a un repositorio **público** de GitHub.
2. En el repositorio: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save**.
3. En un par de minutos estará en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPOSITORIO/`.
4. Edita `robots.txt` y `sitemap.xml` y cambia `TU-USUARIO` (y el nombre del repositorio, si es otro) por tus datos reales.

## Estructura

```
index.html        La página completa, lista para publicar (se genera con build.py)
src/              Código fuente
  core.js           Motor de dibujo, paletas y código QR
  shapes_*.js       Los modelos (un archivo por familia)
  app.js            Interfaz
  template.html     Estructura y estilos de la página
build.py          Une todo y escribe index.html
```

Para volver a generar `index.html` tras cambiar algo en `src/`:

```bash
npm install
python3 build.py
```

## Añadir un modelo nuevo

Cada modelo es un objeto que se añade con `SHAPES.push({...})` en alguno de los `src/shapes_*.js`:

```js
SHAPES.push({
  id: 'mi-dibujo', name: 'Mi dibujo', cat: 'objetos', kw: 'palabras para buscarlo',
  panel: pn(300, 300, 290, 18),          // cuadro blanco del QR: centro x, centro y, tamaño, esquinas
  orig: { a1: '#e63946', a2: '#ff8a93', a3: '#a81d2d', ink: '#7a1520' },   // colores del modo «Original»
  back: p => vc(300, 300, 270, p.a1, { t: 'r' })   // dibujo que queda DETRÁS del cuadro del QR
});
```

Reglas: el dibujo nunca debe tapar el código (va siempre detrás del cuadro blanco) y el cuadro debe medir al menos unos 280 px de lado para que se escanee bien.

## Licencia

Código y dibujos publicados bajo licencia **MIT** (ver [`LICENSE`](LICENSE)): puedes usarlo, copiarlo, modificarlo y distribuirlo, incluso con fines comerciales, conservando el aviso de copyright.
Los códigos QR y dibujos que crees con la herramienta puedes usarlos libremente, sin necesidad de citar.

Componentes de terceros (librería de generación de QR y tipografías) en [`THIRD-PARTY-NOTICES.md`](THIRD-PARTY-NOTICES.md).

## Marcas y aviso

«QR Code» es una marca registrada de DENSO WAVE INCORPORATED. Este proyecto no tiene relación con esa empresa.
Los dibujos son originales y genéricos; cualquier nombre de marca citado pertenece a sus propietarios.
Proyecto personal de Marcos Hernández Párraga: no representa oficialmente a ninguna universidad ni asociación.
Cada persona es responsable del contenido al que apunta su código QR.

---

Hecho por **Marcos Hernández Párraga**.
