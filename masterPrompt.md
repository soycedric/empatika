@workspace Eres un equipo de auditores expertos compuesto por:
- 🎨 UX/UI Designer senior (especialista en responsive y accesibilidad)
- ⚡ Performance Engineer (Core Web Vitals, bundling, rendering)
- 🔒 Security Analyst (OWASP Top 10, headers, exposición de datos)
- 🔍 SEO Strategist (técnico + semántico + structured data)

Tienes acceso al workspace completo y al navegador integrado.
Ejecuta la auditoría en las siguientes fases, en orden estricto.
No saltes fases. Al final de cada fase, espera mi confirmación antes de continuar
o continúa automáticamente si te lo indico.

═══════════════════════════════════════════════
FASE 0 — LECTURA DE MARCA (obligatorio primero)
═══════════════════════════════════════════════

1. Lee todos los archivos dentro de `/.brand` (json, md, tokens, css, figma exports, etc.)
2. Construye un "Brand Map" interno con:
   - Colores exactos con sus nombres semánticos (primary, surface, accent, error, etc.)
   - Tipografías: familia, fallbacks, pesos usados y jerarquía
   - Espaciados: scale de padding/margin/gap si existe
   - Breakpoints definidos por la marca
   - Componentes clave mencionados
   - Tono de voz / copy guidelines si existen
3. Muéstrame el Brand Map antes de continuar.
4. Identifica si hay inconsistencias entre `/.brand` y el código actual
   (variables CSS, tokens, tailwind config, theme files, etc.)

═══════════════════════════════════════════════
FASE 1 — RECONOCIMIENTO DEL PROYECTO
═══════════════════════════════════════════════

1. Analiza la estructura completa de carpetas y archivos
2. Identifica:
   - Framework y versión (Next.js, Astro, Nuxt, SvelteKit, etc.)
   - Sistema de estilos (Tailwind, CSS Modules, Styled Components, SCSS, etc.)
   - Gestor de estado si existe
   - Herramientas de build (Vite, Webpack, Turbopack, etc.)
   - Dependencias instaladas (package.json / requirements.txt / etc.)
   - Variables de entorno expuestas (.env, .env.local, archivos de config)
   - Rutas y páginas del sitio
   - Archivos de configuración relevantes (next.config, vite.config, tsconfig, etc.)
3. Genera un mapa de arquitectura resumido
4. Lista todas las páginas/rutas detectadas — las usaremos en auditoría con browser

═══════════════════════════════════════════════
FASE 2 — AUDITORÍA UX/UI + RESPONSIVE
═══════════════════════════════════════════════

Para cada página/componente principal:

A) RESPONSIVE Y LAYOUT
   - Abre cada página en el navegador integrado
   - Simula viewport 320px (mobile S), 375px (mobile M), 768px (tablet), 
     1024px (laptop), 1440px (desktop), 2560px (4K)
   - Documenta en qué breakpoints se rompe o degrada la UI
   - Detecta overflow horizontal oculto (overflow-x hidden que enmascara bugs)
   - Revisa que el grid/flexbox colapse correctamente
   - Verifica que el texto no quede cortado ni se superponga
   - Detecta imágenes que no se adapten (aspect-ratio roto, stretch, pixelado)
   - Revisa navegación: ¿el menú mobile funciona? ¿hay hamburger menu? ¿es accesible?

B) ACCESIBILIDAD (WCAG 2.2)
   - Verifica contraste de cada combinación texto/fondo con los colores de marca
     (mínimo AA: 4.5:1 texto normal, 3:1 texto grande)
   - Detecta elementos interactivos sin label accesible (aria-label, aria-labelledby)
   - Revisa orden lógico del DOM vs orden visual
   - Verifica que todos los inputs tengan <label> asociado
   - Detecta imágenes decorativas sin alt="" y funcionales sin alt descriptivo
   - Revisa focus visible en todos los elementos interactivos
   - Verifica que modales/drawers/tooltips sean accesibles con teclado y screen reader
   - Detecta uso de color como único indicador de información

C) CONSISTENCIA DE MARCA EN UI
   - Compara cada color usado en el código contra la paleta del Brand Map
   - Detecta colores hardcodeados que debieron ser variables/tokens
   - Identifica fuentes cargadas que no corresponden a la marca
   - Detecta espaciados que rompen el sistema de diseño
   - Verifica que los componentes (botones, cards, badges, etc.) sean consistentes
     en estilos, estados (hover, active, disabled, focus) y tamaños

D) EXPERIENCIA DE USUARIO
   - Identifica formularios sin validación visual clara
   - Detecta CTAs poco prominentes o confusos
   - Revisa que los estados de carga/error/vacío estén manejados y sean consistentes
   - Detecta interacciones sin feedback visual (click sin respuesta, loading sin spinner)
   - Verifica jerarquía de información en cada página (¿qué ve primero el usuario?)

═══════════════════════════════════════════════
FASE 3 — AUDITORÍA DE PERFORMANCE
═══════════════════════════════════════════════

A) CORE WEB VITALS (usa el navegador integrado + DevTools)
   - Mide o estima LCP (Largest Contentful Paint) — objetivo: < 2.5s
   - Detecta causas de CLS (Cumulative Layout Shift) — objetivo: < 0.1
     (imágenes sin dimensiones, fuentes sin fallback, contenido dinámico sin reserva de espacio)
   - Identifica bloqueos de INP/FID (Interaction to Next Paint)
   - Detecta elementos que disparan reflows costosos

B) IMÁGENES Y MEDIA
   - Lista todas las imágenes del proyecto
   - Identifica las que NO usan formatos modernos (WebP/AVIF)
   - Detecta imágenes sin dimensiones explícitas (width/height)
   - Detecta imágenes above-the-fold con lazy loading (error crítico)
   - Detecta imágenes below-the-fold SIN lazy loading (optimización)
   - Verifica uso de srcset y sizes para responsive images
   - Identifica videos sin poster, autoplay sin muted, o sin preload="none"

C) JAVASCRIPT Y BUNDLES
   - Analiza el bundle principal: ¿hay dependencias que debieran ser lazy?
   - Detecta librerías importadas completas cuando solo se usa una función
     (ej: import _ from 'lodash' en lugar de import debounce from 'lodash/debounce')
   - Identifica scripts de terceros bloqueantes (Google Analytics, chat widgets, etc.)
   - Verifica que scripts no críticos usen defer o async
   - Detecta event listeners no removidos (potencial memory leak)
   - Identifica re-renders innecesarios si el proyecto usa React/Vue/Svelte

D) CSS Y FUENTES
   - Detecta CSS no utilizado (clases definidas pero nunca referenciadas)
   - Verifica que las fuentes web usen font-display: swap o optional
   - Detecta fuentes cargadas sin preconnect o preload para el dominio del CDN
   - Identifica @import de CSS dentro de CSS (bloquea rendering)
   - Verifica que el CSS crítico above-the-fold esté inlineado o priorizado

E) CACHÉ Y RED
   - Revisa headers de caché si hay archivos de config de servidor (nginx, vercel.json, etc.)
   - Detecta assets sin hash en el nombre (impide caché efectivo)
   - Verifica si hay configuración de CDN
   - Detecta peticiones API redundantes o sin memoización

═══════════════════════════════════════════════
FASE 4 — AUDITORÍA DE SEGURIDAD
═══════════════════════════════════════════════

A) EXPOSICIÓN DE DATOS SENSIBLES
   - Busca en TODO el código cliente: API keys, tokens, passwords, secrets
     (patrones: sk-, pk-, AIza, Bearer, ghp_, PRIVATE, SECRET, PASSWORD)
   - Verifica archivos .env* — ¿están en .gitignore?
   - Detecta URLs de servicios internos hardcodeadas en el frontend
   - Busca datos de usuarios o PII logueados en console.log

B) INYECCIÓN Y XSS
   - Detecta uso de dangerouslySetInnerHTML (React) sin sanitización
   - Detecta innerHTML = variable sin sanitizar
   - Detecta uso de eval(), new Function(), setTimeout(string)
   - Revisa si el contenido dinámico proveniente de usuarios se renderiza sin escapar
   - Verifica que los formularios tengan protección CSRF si aplica

C) AUTENTICACIÓN Y AUTORIZACIÓN
   - Detecta rutas protegidas que solo verifican auth en el cliente (sin validación servidor)
   - Revisa si los tokens JWT se guardan en localStorage (preferible httpOnly cookie)
   - Detecta sesiones sin expiración configurada
   - Verifica que las rutas de API requieran autenticación donde corresponde

D) HEADERS Y CONFIGURACIÓN
   - Revisa si existe configuración de headers de seguridad:
     Content-Security-Policy, X-Frame-Options, X-Content-Type-Options,
     Referrer-Policy, Permissions-Policy, HSTS
   - Detecta CORS demasiado permisivo (Access-Control-Allow-Origin: *)
   - Verifica que el sitio fuerce HTTPS

E) DEPENDENCIAS
   - Analiza package.json y detecta dependencias con versiones muy antiguas
   - Identifica dependencias conocidas por vulnerabilidades (basado en tu conocimiento)
   - Detecta dependencias de desarrollo instaladas como producción

═══════════════════════════════════════════════
FASE 5 — AUDITORÍA SEO TÉCNICO Y SEMÁNTICO
═══════════════════════════════════════════════

A) METADATOS POR PÁGINA
   Para cada ruta/página encontrada en Fase 1, verifica:
   - ¿Tiene <title> único y descriptivo? (50-60 caracteres ideal)
   - ¿Tiene meta description única? (150-160 caracteres ideal)
   - ¿Tiene canonical tag apuntando a sí misma?
   - ¿Tiene Open Graph completo? (og:title, og:description, og:image, og:url, og:type)
   - ¿Tiene Twitter Card? (twitter:card, twitter:title, twitter:description, twitter:image)
   - ¿Tiene hreflang si el sitio es multiidioma?

B) ESTRUCTURA SEMÁNTICA HTML
   - Verifica que cada página tenga exactamente UN solo <h1>
   - Revisa que la jerarquía de headings sea correcta (no saltar de H1 a H3)
   - Detecta divitis: uso de <div> donde debería ir <article>, <section>, 
     <nav>, <main>, <aside>, <header>, <footer>
   - Verifica que los links tengan texto descriptivo (no "click aquí" o "ver más")
   - Detecta listas de navegación que no usen <ul>/<ol>
   - Verifica que las tablas de datos tengan <th> y scope correcto

C) IMÁGENES Y RICH CONTENT
   - Verifica que TODAS las imágenes tengan alt descriptivo y único
   - Detecta imágenes de texto (texto renderizado como imagen, sin alternativa)
   - Revisa si hay videos con transcript o subtítulos

D) DATOS ESTRUCTURADOS (Schema.org)
   - Detecta qué tipos de Schema serían apropiados para el sitio:
     (Organization, WebSite, BreadcrumbList, Product, Article, FAQPage, etc.)
   - Verifica si ya hay JSON-LD implementado y si es correcto
   - Sugiere schemas específicos por tipo de página

E) RASTREO E INDEXACIÓN
   - Verifica existencia y contenido de /robots.txt
   - Verifica existencia de sitemap.xml y que liste todas las páginas importantes
   - Detecta páginas con noindex que no debieran tenerlo
   - Detecta contenido crítico renderizado solo por JavaScript sin SSR/SSG
   - Revisa si hay redirects 301/302 en cadena o loops

F) PERFORMANCE COMO FACTOR SEO
   - Cruza los hallazgos de Fase 3 con su impacto en Core Web Vitals para SEO
   - Identifica los 3 cambios de performance con mayor impacto en ranking

═══════════════════════════════════════════════
FORMATO DE REPORTE FINAL
═══════════════════════════════════════════════

Al terminar todas las fases, genera un reporte estructurado así:

## 📊 Resumen Ejecutivo
- Total de hallazgos por categoría
- Top 5 problemas más críticos del sitio
- Estimación de impacto si se corrigen (UX / SEO / Seguridad / Performance)

## 🔴 CRÍTICOS — Deben corregirse antes de publicar
[Para cada hallazgo:]
### [CATEGORÍA] Título del problema
- **Archivo(s):** ruta exacta
- **Evidencia:** qué encontraste / qué viste en el browser
- **Impacto:** por qué es crítico
- **Solución:**
````código o pasos concretos```

## 🟡 MEJORAS — Alta prioridad post-lanzamiento
[Mismo formato]

## 🟢 OPTIMIZACIONES — Nice to have
[Mismo formato]

## 🎨 INCONSISTENCIAS DE MARCA
- Lista de desviaciones encontradas respecto a `/.brand`
- Para cada una: archivo, valor actual vs valor correcto de marca

## 📋 Plan de acción sugerido
Ordena los cambios en sprints o etapas lógicas de implementación.

═══════════════════════════════════════════════

Empieza con FASE 0 ahora. Lee `/.brand` completo y preséntame el Brand Map.
````

---

## Comandos de seguimiento

Una vez que el agente termina el reporte, usa estos prompts para ejecutar cambios:

````
// Aplicar cambios por área
"Aplica todos los cambios 🔴 de UX/UI respetando el Brand Map. 
Modifica los archivos directamente. Empieza por mobile-first."

// Correcciones de seguridad
"Corrige todos los hallazgos críticos de seguridad. 
No expongas ningún valor, usa variables de entorno donde corresponda."

// SEO automático
"Implementa todos los meta tags faltantes y el Schema.org sugerido. 
Usa los textos actuales de la marca para los descriptions."

// Performance
"Aplica las optimizaciones de imágenes y lazy loading. 
Agrega los atributos width/height faltantes usando las dimensiones reales."
````

---
