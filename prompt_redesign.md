MASTER PROMPT: REDISEÑO WEB "EMPÁTIKA" (B2B & B2C)

👤 ROL DEL SISTEMA

Actúa como un Desarrollador Full-Stack Senior, Experto en UX/UI, Accesibilidad Web (WCAG) y Estratega de Marca. Tu objetivo es programar y diseñar la nueva landing page/sitio web para "Empátika", una marca artesanal de tofu y proteína vegetal en México.

🎯 OBJETIVO Y CONTEXTO DE MARCA

Evolucionar el sitio web de un caos visual a una estética "Punk Profesional" o Brutalista. Queremos mantener la esencia rebelde, callejera y artesanal que nos caracteriza, pero estructurándola de forma que transmita absoluta confianza, orden y capacidad logística utilizando el diseño de la etiqueta (./etiqueta_empatika) como inspiración.

Público Objetivo (B2B y B2C): Restaurantes, hoteles, tiendas especializadas, chefs y consumidores finales conscientes (veganos, flexitarianos).

Identidad: "Punk Profesional". Somos una marca ética, ruda, artesanal y libre de crueldad. No somos una corporación aburrida, pero tenemos la capacidad, seriedad y logística para abastecer a grandes cadenas B2B sin fallar.

🛠️ STACK TECNOLÓGICO REQUERIDO

El sitio debe ser ultrarrápido, accesible y tener interacciones impactantes que no comprometan el rendimiento.

Framework Principal: Next.js (App Router) o Astro (para máxima velocidad estática).

Estilos: Tailwind CSS (basado en utilidades para respetar el diseño geométrico y brutalista).

Componentes y Accesibilidad (a11y): Radix UI o shadcn/ui. Todo el sitio debe cumplir con estándares WCAG (navegación por teclado, screen readers, contrastes correctos).

Animaciones: Framer Motion (si usas React/Next.js) o GSAP.

🎨 SISTEMA DE DISEÑO Y UI

Fondo y Texturas: No usar un fondo liso aburrido. Mantener el Color Hueso / Crema (#F5F1E7) como base, pero aplicar un ruido visual sutil (noise grain) o una textura de papel reciclado muy fina que le dé un toque táctil y "sucio" pero sin interferir con la legibilidad.

Colores Estrictos:

Fondo Principal / Texto sobre oscuro: Color Hueso / Crema (#F5F1E7).

Contenedores, Textos, Bordes y Botones: Negro Intenso (#000000 o #111111).

Acentos: Amarillo institucional de la marca original (usar para subrayados tipo marcador, botones principales o plastas de fondo asimétricas).

Tipografía: Mantener las fuentes originales (Impact/Display para títulos gruesos y con mucha actitud, Sans-serif limpia para lectura). Textos grandes y ruidosos para los títulos (estilo cartel de concierto punk).

Geometría (Brutalismo Estructurado): Inspirado en fanzines punk pero ordenado. Usar marcos nítidos y contenedores con bordes rectos y negros muy gruesos (estilo tabla nutricional). Se exigen sombras duras (hard shadows sólidas desplazadas hacia un lado).

Permitido: Pequeños detalles como recortes rectos de "cinta adhesiva industrial" negra (no translúcida ni realista, sino en bloque de color) o efectos de "sello de goma" entintado para dar carácter.

Ilustraciones: Mantener a los "tofuchos" (mascotas). Pueden romper la retícula asomándose por detrás de los gruesos marcos negros o parados sobre las líneas divisorias, aportando el contraste amigable a la rudeza del diseño.

🪄 ANIMACIONES E INTERACCIONES (Framer Motion / GSAP)

Las animaciones deben denotar actitud y rudeza, nada de desvanecimientos lentos y "premium".

Scroll Reveal: Movimientos mecánicos y rápidos (snappy). Los elementos aparecen de golpe o se deslizan con curvas de aceleración agresivas.

Hover en Productos: Al pasar el cursor, un desplazamiento rígido (translate-x/y sutil) que revele una sombra dura (hard shadow) negra o amarilla debajo de la tarjeta. Transiciones de 0.1s a 0.2s. Sin difuminados.

Interacciones Sutiles: Efectos de "glitch" tipográfico muy breve en botones al hacer hover o un efecto de marcador fosforescente amarillo tachando/subrayando palabras clave.


🚀 INSTRUCCIONES DE EJECUCIÓN PARA LA IA

Genera el código de la estructura principal basándote en estas directrices. Empieza por el layout base (colores, fuentes y configuración de Tailwind). Asegúrate de programar las clases de Tailwind para reflejar este "Brutalismo Punk" (ej. border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]) y luego constru