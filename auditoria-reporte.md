## 📊 Resumen Ejecutivo
- Total hallazgos: UX/UI 7, Performance 7, Seguridad 3, SEO 8, Marca 4
- Top 5 criticos:
  1) Canonical/OG apuntan a dominio incorrecto y no son unicos por pagina
  2) Falta `sitemap.xml` y `robots.txt` sin referencia al sitemap
  3) CLS por imagenes sin `width/height` + formatos no optimizados
  4) Leaflet en bundle inicial (impacta INP/LCP)
  5) `dangerouslySetInnerHTML` en charts (riesgo si config es dinamico)
- Impacto estimado si se corrigen: UX alto, SEO alto, Performance alto, Seguridad medio

## 🔴 CRÍTICOS — Deben corregirse antes de publicar

### [SEO] Canonical y OG apuntan a dominio incorrecto
- **Archivo(s):** [emptk-web/index.html](emptk-web/index.html), [emptk-web/src/components/SEOHead.tsx](emptk-web/src/components/SEOHead.tsx)
- **Evidencia:** `canonical`, `og:url`, `og:image` usan `https://empatika.shop` en una publicacion `soycedric.github.io/emptk-web/`.
- **Impacto:** duplicidad y perdida de ranking por canonical erroneo.
- **Solucion:**
```txt
Definir un `SITE_URL` real y usarlo en `SEOHead` para `canonical`, `og:url`, `og:image`.
```

### [SEO] Falta sitemap.xml
- **Archivo(s):** [emptk-web/public](emptk-web/public)
- **Evidencia:** no existe `sitemap.xml`.
- **Impacto:** menor rastreo/indexado de rutas.
- **Solucion:**
```xml
Generar sitemap con /, /aviso-privacidad, /terminos-condiciones.
```

### [SEO] NotFound indexable
- **Archivo(s):** [emptk-web/src/pages/NotFound.tsx](emptk-web/src/pages/NotFound.tsx), [emptk-web/src/components/SEOHead.tsx](emptk-web/src/components/SEOHead.tsx)
- **Evidencia:** 404 hereda title/description/canonical del home.
- **Impacto:** indexacion de pagina inexistente.
- **Solucion:**
```txt
Agregar `noindex` y title propio en 404.
```

### [Performance] CLS por imagenes sin dimensiones y formatos pesados
- **Archivo(s):** [emptk-web/src/components/ProductsSection.tsx](emptk-web/src/components/ProductsSection.tsx), [emptk-web/src/components/RestaurantsSection.tsx](emptk-web/src/components/RestaurantsSection.tsx), [emptk-web/src/components/Header.tsx](emptk-web/src/components/Header.tsx)
- **Evidencia:** imagenes sin `width/height` y JPG/PNG sin WebP/AVIF.
- **Impacto:** CLS alto + mayor LCP.
- **Solucion:**
```txt
Definir width/height reales y generar WebP/AVIF; usar `loading="lazy"` en below-the-fold.
```

### [Security] `dangerouslySetInnerHTML`
- **Archivo(s):** [emptk-web/src/components/ui/chart.tsx](emptk-web/src/components/ui/chart.tsx)
- **Evidencia:** inyeccion de CSS via string.
- **Impacto:** riesgo de inyeccion si config es dinamico.
- **Solucion:**
```txt
Asegurar que `config` es interno o sanitizar estrictamente valores.
```

## 🟡 MEJORAS — Alta prioridad post-lanzamiento

### [SEO] robots.txt sin referencia a sitemap
- **Archivo(s):** [emptk-web/public/robots.txt](emptk-web/public/robots.txt)
- **Evidencia:** no incluye `Sitemap:`.
- **Impacto:** menor visibilidad del sitemap.
- **Solucion:**
```txt
Agregar `Sitemap: https://<dominio>/sitemap.xml`.
```

### [SEO] Schema con URLs incorrectas
- **Archivo(s):** [emptk-web/src/components/SEOHead.tsx](emptk-web/src/components/SEOHead.tsx)
- **Evidencia:** `logo`, `image`, `url` apuntan a `https://empatika.mx`.
- **Impacto:** datos estructurados invalidos.
- **Solucion:**
```txt
Actualizar a URL real y a assets existentes.
```

### [UX/A11y] Link de Instagram sin soporte teclado
- **Archivo(s):** [emptk-web/src/components/RestaurantsSection.tsx](emptk-web/src/components/RestaurantsSection.tsx)
- **Evidencia:** `span` con `role="link"` y `onClick`.
- **Impacto:** accesibilidad limitada.
- **Solucion:**
```txt
Reemplazar por <a> con href o agregar `tabIndex` + `onKeyDown`.
```

### [Performance] Falta lazy load en productos
- **Archivo(s):** [emptk-web/src/components/ProductsSection.tsx](emptk-web/src/components/ProductsSection.tsx)
- **Evidencia:** imagenes de productos sin `loading="lazy"`.
- **Impacto:** mayor tiempo de carga inicial.
- **Solucion:**
```txt
Agregar `loading="lazy"` en imagenes below-the-fold.
```

### [Security] Cookie sin SameSite/Secure
- **Archivo(s):** [emptk-web/src/components/ui/sidebar.tsx](emptk-web/src/components/ui/sidebar.tsx)
- **Evidencia:** `document.cookie` sin flags.
- **Impacto:** no critico, pero mejorable.
- **Solucion:**
```txt
Agregar `; SameSite=Lax; Secure` si aplica HTTPS.
```

## 🟢 OPTIMIZACIONES — Nice to have

### [Performance] Preload selectivo de fuentes
- **Archivo(s):** [emptk-web/index.html](emptk-web/index.html), [emptk-web/src/index.css](emptk-web/src/index.css)
- **Evidencia:** solo `Gunplay` y `CMU Typewriter regular` preloaded.
- **Impacto:** menor, pero mejora LCP si se usa `Gunplay3D` above-the-fold.
- **Solucion:**
```txt
Preload solo si se usa en hero; si no, evitar su uso above-the-fold.
```

### [SEO] BreadcrumbList recomendado para paginas legales
- **Archivo(s):** [emptk-web/src/components/SEOHead.tsx](emptk-web/src/components/SEOHead.tsx)
- **Impacto:** mejora enriquecimiento en SERPs.
- **Solucion:**
```txt
Agregar JSON-LD BreadcrumbList con Home > Aviso / Terminos.
```

### [UX] Ajustes mobile en bloque distribuidores
- **Archivo(s):** [emptk-web/src/components/DistributorsSection.tsx](emptk-web/src/components/DistributorsSection.tsx)
- **Impacto:** scroll largo en mobile.
- **Solucion:**
```txt
Dividir mapa + lista en acordeon o tabs en 320/375.
```

## 🎨 INCONSISTENCIAS DE MARCA
- CTA WhatsApp con verde hardcodeado fuera de paleta: [emptk-web/src/components/Header.tsx](emptk-web/src/components/Header.tsx) (`#128C7E`, `#075E54` vs paleta marca).
- `--border` en negro vs marca `#e5e7eb`: [emptk-web/src/index.css](emptk-web/src/index.css)
- `--accent` y `--secondary` mapeados a `--orange-rust` pero marca sugiere `#ede8de` y `#e2ded4`: [emptk-web/src/index.css](emptk-web/src/index.css)
- Paleta extendida (yellow/cream/orange/destructive) no documentada en marca: [emptk-web/src/index.css](emptk-web/src/index.css)

## 📋 Plan de accion sugerido
1) Sprint 1 (SEO critico): corregir `SEOHead` con URL real, canonical por pagina, `noindex` en 404, agregar `sitemap.xml` y actualizar `robots.txt`.
2) Sprint 2 (Performance): WebP/AVIF + dimensiones de imagenes + lazy loading + lazy-load de Leaflet.
3) Sprint 3 (Seguridad y A11y): endurecer cookies, eliminar `span role=link`, validar `dangerouslySetInnerHTML`.
4) Sprint 4 (Marca): alinear colores y documentar paleta real en .brand.
