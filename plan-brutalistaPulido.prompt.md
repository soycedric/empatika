## Plan: Brutalista pulido en español

Afinar el home hacia brutalismo pulido: navegación visible, jerarquía clara, tipografía/espaciados más legibles, copiar todo a español coherente y placeholders estilizados mientras llegan assets. Mantener energía brutalista con bordes duros, acentos rotos y textura, pero con orden visual.

### Steps
1. Activar header global en [src/pages/Index.tsx](src/pages/Index.tsx), priorizando CTA “Comprar”/“Contacto” y anclas a secciones clave.
2. Ajustar tokens y globales en [tailwind.config.ts](tailwind.config.ts) y [src/index.css](src/index.css): reducir uppercase rígido, leading más cómodo, paddings responsivos, bordes rectos y sombras duras moderadas.
3. Reordenar hero en [src/pages/Index.tsx](src/pages/Index.tsx): titular corto, badge de prueba social (es), CTA primario/secundario y fondo con ruido moderado; bajar rotaciones para legibilidad.
4. Unificar grids en [src/components/ProductsSection.tsx](src/components/ProductsSection.tsx), [src/components/RecipesSection.tsx](src/components/RecipesSection.tsx), [src/components/RestaurantsSection.tsx](src/components/RestaurantsSection.tsx): usar tarjetas brutales coherentes (sin rotaciones excesivas), placeholders estilizados para imágenes/logos, copy 100% español.
5. Pulir secciones auxiliares ([src/components/DistributorsSection.tsx](src/components/DistributorsSection.tsx), [src/components/B2BSection.tsx](src/components/B2BSection.tsx), [src/components/Footer.tsx](src/components/Footer.tsx)): CTA y signos en español, mapas/logos placeholder consistentes, contraste accesible.

### Further Considerations
1. ¿Prefieres mantener la textura de ruido de fondo actual o usar un patrón más sutil para el “pulido”?  Me gusta la textura del ruido.
2. ¿Inventamos un set de placeholders coherentes (ej. tramas vectoriales) hasta tener fotos reales?  Si.
3. ¿Incluimos una sola fuente secundaria más legible para cuerpo (ej. Manrope) y mantener Anton solo en headings cortos? Quiero usar la fuente Gunplay y cmu Typewriter.
