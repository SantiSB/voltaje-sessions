# BRAND.md — Identidad visual de Voltaje Sessions

## Qué es Voltaje

Colectivo de música electrónica y cultura de pista basado en Bogotá. Organiza sesiones y fiestas con DJs locales e invitados. Cada sesión tiene un número de voltaje (110V, 220V, 330V...) y un color dominante que define toda la identidad visual de esa edición.

La página debe sentirse como una extensión de su universo visual. Intensa, nocturna, bailable. No un sitio corporativo de eventos.

## Personalidad visual

- Colores neón planos y dominantes. Un color invade toda la pantalla.
- Tipografía con textura y carácter — no limpia ni sans-serif genérica.
- Fotografías en blanco y negro.
- Composiciones asimétricas. Elementos que rompen la grilla.
- Sensación de flyer de rave, no de landing page de startup.

## Tipografía

- **Display (títulos, marca, artistas):** Dirty Stains — cargar como fuente local desde `public/fonts/`
- **Body (textos secundarios):** Syne — Google Fonts

## Sistema de color

Cada sesión tiene su propio tema. El sitio cambia de paleta completa tocando solo `theme` en `session.ts`.

```
[data-theme="verde"]     bg:#39FF00  accent:#CC00FF  cta:#FFFF00
[data-theme="fucsia"]    bg:#FF00A8  accent:#FFFF00  cta:#000000
[data-theme="amarillo"]  bg:#FFFF00  accent:#CC00FF  cta:#CC00FF
[data-theme="negro"]     bg:#0A0A0A  accent:#39FF00  cta:#39FF00
```

Variables CSS globales:
```css
--color-bg
--color-accent
--color-text
--color-cta
--color-cta-text
```

## Tono de comunicación

Corto, sensorial, directo. Voltaje no explica: sugiere una experiencia.

- *"Una sola presencia."*
- *"El cuerpo como conductor. La música como corriente. La pista como circuito."*
- *"Voltaje no se escucha: se conduce."*

Nunca frases genéricas tipo "los mejores eventos de música electrónica de Bogotá".

## Lo que NO se hace

| ❌ | ✅ |
|---|---|
| Gradientes suaves | Colores planos y sólidos |
| Cards con sombra y border-radius grande | Bloques de color plano, bordes duros |
| Grid simétrico de columnas iguales | Layout asimétrico |
| Fotos a color estáticas | Fotos en `grayscale`, color en hover |
| Tipografías Inter / Roboto / Arial | Dirty Stains + Syne |
| Texto largo y explicativo | Frases cortas con peso visual |
| Animaciones en todo | Solo en hero y scroll de esencia |
