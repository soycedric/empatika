# CONTEXTO PRINCIPAL
Actúa como un Diseñador UX/UI Senior y Desarrollador Full-Stack especializado en CSS avanzado, arquitecturas web minimalistas y diseño de estilo Brutalista / Fanzine Punk. 

Mi empresa se llama Empátika. Producimos y vendemos tofu artesanal y veganesa. Nuestro público objetivo son: veganos, atletas/personas fit, y clientes B2B (restaurantes y tiendas mayoristas). 

# EL PROBLEMA
Actualmente, mi sitio web tiene una estética demasiado corporativa (fondos claros, sombras suaves). Acabamos de hacer un rebranding en nuestras etiquetas físicas hacia un estilo crudo, directo, rebelde e industrial (bloques negros, alto contraste, estilo "declaración nutrimental"). Necesito refactorizar el código (HTML/CSS/JS) de mi web para alinearla a esta nueva identidad, resolviendo problemas de jerarquía sin perder la esencia de la marca.

# REGLAS ESTRICTAS DE DISEÑO (QUÉ HACER Y QUÉ NO HACER)

1. **REGLA DE ORO TIPOGRÁFICA (Cero fuentes nuevas):** Queda ESTRICTAMENTE PROHIBIDO importar o sugerir nuevas fuentes (nada de `@import` o Google Fonts extra). Debes utilizar exclusivamente las familias tipográficas que ya están declaradas en mi proyecto actual:
    * **Fuente Display (Estilo Stencil/Sello):** Úsala para encabezados masivos (H1, H2), botones de CTA principales y etiquetas de advertencia. Juega con el tamaño (muy grande) y el `text-transform: uppercase`.
    * **Fuente de Cuerpo (Estilo Máquina de escribir / Monospace):** Úsala para cuerpos de texto, listas de ingredientes, descripciones, navegación y datos técnicos.
    * *El rediseño debe lograrse manipulando únicamente `font-size`, `letter-spacing`, `line-height` y colores sobre estas dos fuentes.*

2. **El rol de los "Tofitos" (Mascotas):** El sitio actual tiene tofitos sonrientes como protagonistas. En este rediseño, pasan a un rol secundario para dar prioridad a la seriedad del producto. Úsalos como contraste irónico o "easter eggs". Pueden ir en el footer, en estados vacíos, en la página de error 404 o como pines pequeños en los mapas.

3. **Cero estética "Glitch":** Aléjate de efectos de distorsión, ruido digital, neón o animaciones rotas. El enfoque es orgánico e impreso: tinta negra sobre papel, sellos industriales, recortes tipo "cinta adhesiva" y bloques de color sólidos.

4. **Paleta de Colores y Estructura:** * Alto contraste radical: Fondo hueso (similar al papel de mi etiqueta) y Negro absoluto (#000000).
    * Reemplaza todas las sombras suaves (`box-shadow` difuminadas) y bordes redondeados por bordes negros sólidos y gruesos (ej. `border: 3px solid black;`). 
    * Aplica cajas y divisiones que imiten una tabla de "Declaración Nutrimental".

# TAREAS ESPECÍFICAS A DESARROLLAR
Por favor, implementa lo siguiente:

**Fase 1: Refactorización Tipográfica y Variables CSS**
Implementa el CSS base para resetear los colores y establecer las variables globales. Luego, crea un sistema de clases de utilidad para los encabezados y textos usando SOLO mis fuentes actuales, asegurando que los títulos se vean masivos y brutalistas.

**Fase 2: Tarjetas de Producto estilo "Etiqueta"**
Refactoriza las tarjetas de los productos (Tofu Extra Firme, Tofu Ahumado y Veganesa).
- Aplica bordes negros gruesos.
- Transforma la información de macros (ej. "8g proteina") de texto normal a una etiqueta visualmente agresiva (bloque negro con texto blanco calado, fuente monospace), diseñada para captar la atención de nuestro público fit.

**Fase 3: Layout de la Home y Mapas**
Reestructura el Hero Banner para que el producto sea el protagonista visual con tipografía gigante. Para la sección del mapa (Leaflet), implementa el código para ajustar el tamaño de los pines de los "tofitos" para que sean sutiles, y aplica un filtro CSS al mapa para que haga match con la paleta de colores crema/negro de la web.

