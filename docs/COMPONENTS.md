# COMPONENTS.md — Qué construir

## Estructura de archivos

```
src/
├── config/
│   └── session.ts
├── layouts/
│   └── BaseLayout.astro        ← aplica data-theme al <html>
├── pages/
│   └── index.astro
├── components/
│   ├── VTJLogo.astro           ← SVG del logo, reutilizable
│   ├── Hero.astro
│   ├── HeroText.tsx            ← island React + Framer Motion
│   ├── SessionInfo.astro
│   ├── ArtistList.tsx          ← island React + Framer Motion
│   ├── EsenciaBlock.astro
│   ├── EsenciaText.tsx         ← island React + Framer Motion
│   ├── Gallery.astro
│   └── Footer.astro
└── styles/
    └── global.css
```

---

## Componentes

### VTJLogo.astro
SVG inline. Tres círculos superpuestos con letras V, T, J.
- fill: `var(--color-cta)`
- stroke: `var(--color-accent)`, 5px
- Letras en Dirty Stains, color `var(--color-accent)`
- Hereda colores del tema automáticamente. Reutilizar en Hero, Esencia y Footer.

### Hero.astro + HeroText.tsx
100vh. Primera impresión — imposible de ignorar.
- Fondo: `var(--color-bg)`
- `VTJLogo` en esquina superior izquierda
- "VOLTAJE SESSIONS" en Dirty Stains, gigante, casi todo el ancho
- Número de sesión ("330V") como elemento decorativo grande y semitransparente detrás del título
- Tagline debajo del título
- CTA button con `var(--color-cta)`

Animaciones en `HeroText.tsx` con Framer Motion:
- Título entra desde abajo con spring
- Tagline y CTA aparecen después con stagger
- Pulso muy sutil en el título una vez en pantalla

Si `activa: false` → mostrar `copy.sesion_terminada`, ocultar CTA.

### SessionInfo.astro + ArtistList.tsx
- Fondo negro (`#0A0A0A`)
- Número de sesión ("330") enorme como watermark de fondo (opacity ~8%)
- Fecha, lugar, hora en blanco
- `ArtistList.tsx`: nombres en Dirty Stains grande, instagram pequeño, stagger con Framer Motion

### EsenciaBlock.astro + EsenciaText.tsx
- Fondo: `var(--color-bg)`
- Las tres frases de `copy.frases` como titulares independientes, Dirty Stains, muy grandes
- `EsenciaText.tsx`: cada frase entra desde la izquierda con `whileInView` y stagger (0s, 0.15s, 0.3s)

### Gallery.astro
- Grid asimétrico (no columnas iguales)
- Fotos con `grayscale` por defecto
- Hover: recuperan color con transición suave (`transition-all duration-500`)
- Dejar placeholders con comentarios indicando dónde van las fotos reales

### Footer.astro
- `VTJLogo`
- `copy.cierre` en Dirty Stains
- Link a Instagram
- Año
- Fondo negro o inverso del tema activo

---

## BaseLayout.astro

Lee `session.theme` y lo aplica al `<html data-theme={session.theme}>`.
Importa `global.css` y la fuente Syne de Google Fonts.

## global.css

- `@font-face` para Dirty Stains desde `public/fonts/`
- Variables CSS de tema por defecto y por `[data-theme]`
- Reset base
- `body { background: var(--color-bg); color: var(--color-text); }`
