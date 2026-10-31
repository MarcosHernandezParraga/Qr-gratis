import os, re, base64, datetime

import glob, shutil, subprocess, zipfile
here = os.path.dirname(os.path.abspath(__file__))
# Modo repositorio: si existe src/, el código fuente está allí y el resultado (index.html) se escribe en la raíz.
src = os.path.join(here, 'src') if os.path.isdir(os.path.join(here, 'src')) else here
repo_mode = src != here
out = here if repo_mode else os.path.join(here, 'dist')
rd = lambda p: open(os.path.join(here, p), encoding='utf-8').read()
rds = lambda p: open(os.path.join(src, p), encoding='utf-8').read()
today = datetime.date.today().isoformat()

tpl = rds('template.html')
lib = rd('node_modules/qrcode-generator/dist/qrcode.js')
shape_files = sorted(os.path.basename(f) for f in glob.glob(os.path.join(src, 'shapes_*.js')))
core = '\n'.join(rds(f) for f in ['core.js'] + shape_files)
app = rds('app.js')

for name, code in (('lib', lib), ('core', core), ('app', app)):
    assert '</script' not in code.lower(), name + ' contiene </script'

# ---------- tipos de letra dentro de la página (sin pedir nada a Google) ----------
def font_face(family, pkg, fname, weights):
    b = open(os.path.join(here, 'node_modules/@fontsource-variable', pkg, 'files', fname), 'rb').read()
    return ("@font-face{font-family:'%s';font-style:normal;font-display:swap;font-weight:%s;"
            "src:url(data:font/woff2;base64,%s) format('woff2');}" % (family, weights, base64.b64encode(b).decode()))

fonts = (font_face('Bricolage Grotesque', 'bricolage-grotesque', 'bricolage-grotesque-latin-wght-normal.woff2', '200 800') + '\n' +
         font_face('Figtree', 'figtree', 'figtree-latin-wght-normal.woff2', '300 900'))

def fill(t, strip_viewer):
    a = app
    if strip_viewer:
        a = re.sub(r'/\*V\*/.*?/\*/V\*/', '', a, flags=re.S)
    return (t.replace('/*FONTS*/', fonts).replace('/*LIB*/', lib).replace('/*CORE*/', core).replace('/*APP*/', a))

os.makedirs(out, exist_ok=True)

# ---------- 1) vista previa (artefacto) ----------
if not repo_mode:
    open(os.path.join(out, 'qritos-preview.html'), 'w', encoding='utf-8').write(fill(tpl, False))

# ---------- 2) página completa para publicar (index.html) ----------
m = re.search(r'<!--HEAD-->(.*?)<!--/HEAD-->', tpl, re.S)
head_inner = m.group(1).replace('/*FONTS*/', fonts)
body = tpl[m.end():]

title = 'QR Gratis · Generador de códigos QR gratis, sin registro'
desc = ('Generador de códigos QR gratis: pega tu enlace, elige un dibujo original (o ninguno) y descarga tu QR en PNG o SVG. '
        'Sin registro ni marcas de agua.')
author = 'Marcos Hernández Párraga'

ld = '''{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "QR Gratis",
  "alternateName": "Generador de códigos QR gratis",
  "description": "Generador gratuito de códigos QR con dibujos originales. Sin registro y sin marcas de agua.",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Cualquiera (navegador web)",
  "inLanguage": "es",
  "isAccessibleForFree": true,
  "creator": { "@type": "Person", "name": "Marcos Hernández Párraga" },
  "license": "https://opensource.org/licenses/MIT",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
}'''

icon = ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%231d6fdc'/%3E"
        "%3Crect x='6' y='6' width='8' height='8' rx='2' fill='none' stroke='white' stroke-width='2.4'/%3E%3Crect x='18' y='6' width='8' height='8' rx='2' fill='none' stroke='white' stroke-width='2.4'/%3E"
        "%3Crect x='6' y='18' width='8' height='8' rx='2' fill='none' stroke='white' stroke-width='2.4'/%3E%3Cpath d='M22 27 C16.5 23.6 18 20 20 20 C21.2 20 21.8 20.6 22 21.2 C22.2 20.6 22.8 20 24 20 C26 20 27.5 23.6 22 27 Z' fill='%23ff6b81'/%3E%3C/svg%3E")

notice = '''<!--
  QR Gratis · Hecho por Marcos Hernández Párraga
  Copyright (c) 2026 Marcos Hernández Párraga · Licencia MIT (texto completo en el archivo LICENSE del repositorio).

  Componentes de terceros incluidos en este archivo:
  - qrcode-generator 2.0.4 · Copyright (c) 2009 Kazuhiko Arase · Licencia MIT.
  - Bricolage Grotesque · Copyright 2022 The Bricolage Grotesque Project Authors · SIL Open Font License 1.1.
  - Figtree · Copyright 2022 The Figtree Project Authors · SIL Open Font License 1.1.
  Los avisos y textos de licencia completos están en THIRD-PARTY-NOTICES.md.
  «QR Code» es una marca registrada de DENSO WAVE INCORPORATED.
-->'''

head = f'''<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
{notice}
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="author" content="{author}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta property="og:type" content="website">
<meta property="og:site_name" content="QR Gratis">
<meta property="og:locale" content="es_ES">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="{title}">
<meta name="twitter:description" content="{desc}">
<meta name="theme-color" content="#d6ecfc" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#10213f" media="(prefers-color-scheme: dark)">
<link rel="icon" href="{icon}">
{head_inner.strip()}
<script type="application/ld+json">
{ld}
</script>
</head>
<body>
<noscript><p style="padding:24px;font-family:sans-serif;position:relative;z-index:2">QR Gratis necesita JavaScript para crear los códigos QR en tu navegador. Actívalo y vuelve a cargar la página.</p></noscript>
'''
html = head + fill(body, True).strip() + '\n</body>\n</html>\n'
open(os.path.join(out, 'index.html'), 'w', encoding='utf-8').write(html)

if repo_mode:
    print('index.html', os.path.getsize(os.path.join(out, 'index.html')) // 1024, 'KB')
    raise SystemExit

SITE = 'https://TU-USUARIO.github.io/qr-gratis/'
# ---------- 3) robots.txt y sitemap.xml (hay que cambiar TU-USUARIO) ----------
open(os.path.join(out, 'robots.txt'), 'w', encoding='utf-8').write(
    'User-agent: *\nAllow: /\n\nSitemap: ' + SITE + 'sitemap.xml\n')
open(os.path.join(out, 'sitemap.xml'), 'w', encoding='utf-8').write(
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    f'  <url>\n    <loc>{SITE}</loc>\n    <lastmod>{today}</lastmod>\n  </url>\n</urlset>\n')

# ---------- 4) paquete para GitHub ----------
n = int(re.search(r'modelos: (\d+)', subprocess.run(['node', 'test.js', 'original'], cwd=here, capture_output=True, text=True).stdout).group(1))
pkg = os.path.join(out, 'github', 'qr-gratis')
shutil.rmtree(os.path.join(out, 'github'), ignore_errors=True)
os.makedirs(os.path.join(pkg, 'src'))
for f in ('index.html', 'robots.txt', 'sitemap.xml'):
    shutil.copy(os.path.join(out, f), os.path.join(pkg, f))
for f in ['core.js', 'app.js', 'template.html'] + shape_files:
    shutil.copy(os.path.join(src, f), os.path.join(pkg, 'src', f))
shutil.copy(os.path.join(here, 'build.py'), os.path.join(pkg, 'build.py'))
for f in ('LICENSE', '.gitignore', 'package.json'):
    shutil.copy(os.path.join(here, 'repo_files', f), os.path.join(pkg, f))
open(os.path.join(pkg, 'README.md'), 'w', encoding='utf-8').write(rd('repo_files/README.md').replace('{{N}}', str(n)))

ofl = rd('node_modules/@fontsource-variable/bricolage-grotesque/LICENSE')
ofl_text = ofl[ofl.index('-----------------------------------------------------------'):]
open(os.path.join(pkg, 'THIRD-PARTY-NOTICES.md'), 'w', encoding='utf-8').write(f"""# Componentes de terceros

QR Gratis incluye los siguientes componentes de terceros, cada uno bajo su propia licencia.

## 1. qrcode-generator 2.0.4 (generación del código QR)

Copyright (c) 2009 Kazuhiko Arase · http://www.d-project.com/ · Licencia MIT.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

La palabra «QR Code» es una marca registrada de DENSO WAVE INCORPORATED (http://www.denso-wave.com/qrcode/faqpatent-e.html).

## 2. Tipografías (incrustadas en index.html)

- **Bricolage Grotesque** — Copyright 2022 The Bricolage Grotesque Project Authors (https://github.com/ateliertriay/bricolage)
- **Figtree** — Copyright 2022 The Figtree Project Authors (https://github.com/erikdkennedy/figtree)

Ambas se distribuyen bajo la **SIL Open Font License, Version 1.1** (texto completo a continuación). Se obtienen del paquete Fontsource (https://fontsource.org). Las fuentes no se han modificado ni se venden por separado.

```
{ofl_text.strip()}
```
""")

# ---------- 5) zip final: carpeta qr-gratis + guía ----------
zp = os.path.join(out, 'qr-gratis-github.zip')
if os.path.exists(zp): os.remove(zp)
with zipfile.ZipFile(zp, 'w', zipfile.ZIP_DEFLATED) as z:
    for root, _, files in os.walk(pkg):
        for f in sorted(files):
            full = os.path.join(root, f)
            z.write(full, os.path.join('qr-gratis', os.path.relpath(full, pkg)))
    z.write(os.path.join(here, 'repo_files', 'GUIA-PUBLICAR.md'), 'GUIA-PUBLICAR.md')

for f in ('qritos-preview.html', 'index.html', 'qr-gratis-github.zip'):
    print(f, os.path.getsize(os.path.join(out, f)) // 1024, 'KB')
print('modelos:', n)
