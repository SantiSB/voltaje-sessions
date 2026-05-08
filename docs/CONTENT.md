# CONTENT.md — Contenido del evento activo

Todo este contenido debe vivir en `src/config/session.ts`. Nunca hardcodeado en componentes.

## session.ts

```typescript
export type Theme = 'verde' | 'fucsia' | 'amarillo' | 'negro';

export interface Artist {
  nombre: string;
  rol?: string;
  instagram?: string;
}

export interface SessionConfig {
  theme: Theme;
  activa: boolean;
  session: {
    nombre: string;
    voltaje: string;
    fecha: string;
    lugar: string;
    direccion: string;
    ciudad: string;
    hora: string;
  };
  artistas: Artist[];
  aliados: string[];
  copy: {
    tagline: string;
    frases: string[];
    descripcion: string;
    cta_texto: string;
    cta_url: string;
    cierre: string;
    sesion_terminada: string;
  };
  social: {
    instagram: string;
    contacto?: string;
  };
}

export const session: SessionConfig = {
  theme: 'verde',
  activa: true,

  session: {
    nombre: '330V',
    voltaje: '330V',
    fecha: '16 · 05 · 2026',
    lugar: 'Barraco Gastrobar',
    direccion: 'Cra 38 # 18-41, Palermo',
    ciudad: 'Bogotá',
    hora: '10PM',
  },

  artistas: [
    { nombre: 'MOOB',           rol: 'DJ', instagram: 'mobkhun' },
    { nombre: 'NEATH',          rol: 'DJ', instagram: 'i_neath_u' },
    { nombre: 'LUKE REDDAHLIA', rol: 'DJ', instagram: 'reddahlia__' },
    { nombre: 'LUKE_DDJ',       rol: 'DJ', instagram: 'luke_ddj' },
  ],

  aliados: ['Barraco Gastrobar', 'JASP'],

  copy: {
    tagline: 'Una sola presencia.',
    frases: [
      'El cuerpo como conductor.',
      'La música como corriente.',
      'La pista como circuito.',
    ],
    descripcion: 'Desde Bogotá hasta Pasto.\n3 DJs, 3 géneros, 1 mismo lenguaje: el baile.',
    cta_texto: 'Entradas',
    cta_url: '#',
    cierre: 'Voltaje no se escucha: se conduce.',
    sesion_terminada: 'La corriente ha pasado. Próxima sesión: pronto.',
  },

  social: {
    instagram: 'https://instagram.com/____voltajesessions____',
  },
};
```
