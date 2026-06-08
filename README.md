# Empátika - Tofu Artesanal Poblano 🌱

**El tofu dejó de ser aburrido.** Tofu artesanal mexicano, proteína vegetal 100% natural. Extra Firme y Ahumado.

[![Sitio Web](https://img.shields.io/badge/Sitio_Web-empatika.shop-blue?style=for-the-badge)](https://empatika.shop)

## 🚀 Tecnologías

Este proyecto está construido con una pila de tecnologías modernas para garantizar rendimiento, escalabilidad y una excelente experiencia de usuario:

- **Frontend**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Estilos y UI**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Enrutamiento**: [React Router](https://reactrouter.com/)
- **Gestión de Estado / Fetching**: [React Query (@tanstack)](https://tanstack.com/query/latest)
- **Mapas Interactivos**: [React Leaflet](https://react-leaflet.js.org/)
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/)

## 🛠️ Instalación y Desarrollo Local

Para correr este proyecto localmente, necesitas tener [Node.js](https://nodejs.org/) instalado.

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd emptk-web
   ```

2. **Instalar las dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5173`.

## 📦 Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

- `npm run dev`: Inicia el servidor de desarrollo de Vite.
- `npm run build`: Construye la aplicación para producción.
- `npm run lint`: Ejecuta el linter (ESLint) para encontrar problemas en el código.
- `npm run preview`: Previsualiza la aplicación construida para producción localmente.
- `npm run test`: Ejecuta las pruebas utilizando Vitest.

## 📂 Estructura Principal del Proyecto

- `src/`
  - `components/`: Componentes React del sitio (UI, calculadora, secciones).
  - `contexts/`: Context Providers (OrderContext).
  - `data/`: Datos estáticos de la aplicación (ej. `restaurants.json`).
  - `hooks/`: Custom hooks.
  - `lib/`: Utilidades generales.
  - `pages/`: Vistas de la aplicación.
  - `services/`: Lógica de negocio (validación, envíos).
  - `types/`: Definiciones de TypeScript.

## 📄 Licencia

Derechos reservados © Empátika.
