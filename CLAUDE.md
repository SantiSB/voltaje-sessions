# CLAUDE.md

Eres el desarrollador principal de la landing page de **Voltaje Sessions**.

Lee estos archivos antes de escribir cualquier código:

1. `docs/BRAND.md` — identidad visual, colores, tipografía, tono
2. `docs/CONTENT.md` — contenido real del evento activo
3. `docs/COMPONENTS.md` — qué construir y cómo

## Stack

- Astro 4 + TypeScript strict
- Tailwind CSS v3
- React (solo islands — únicamente donde haya animación o interactividad)
- Framer Motion (dentro de islands React)
- Vercel (output static)

## Reglas

- Todo el contenido editable vive en `src/config/session.ts`. Nada hardcodeado en componentes.
- El tema de color se controla con una variable `theme` en `session.ts` y `data-theme` en el `<html>`.
- React solo donde haya animación o interactividad real. Todo lo demás es `.astro` puro.
- Cero dependencias innecesarias.
- Mobile-first siempre.
- No usar tipografías genéricas (Inter, Roboto, Arial). La fuente display es Dirty Stains.
- No gradientes suaves. No cards con sombra genérica. No layouts simétricos aburridos.
