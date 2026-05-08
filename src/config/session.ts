export type Theme = "verde" | "fucsia" | "amarillo" | "negro";

export interface Artist {
  nombre: string;
  rol?: string;
  instagram?: string;
}

export interface SessionInfo {
  nombre: string;
  voltaje: string;
  fecha: string;
  lugar: string;
  direccion: string;
  ciudad: string;
  hora: string;
}

export interface SessionCopy {
  tagline: string;
  frases: string[];
  descripcion: string;
  cta_texto: string;
  cta_url: string;
  cierre: string;
  sesion_terminada: string;
}

export interface SessionSocial {
  instagram: string;
  contacto?: string;
}

export interface SessionSeo {
  siteUrl: string;
  brand: string;
  twitterHandle?: string;
  locale: string;
  countryCode: string;
  timezoneOffset: string;
  keywords: string[];
}

export interface SessionConfig {
  theme: Theme;
  activa: boolean;
  session: SessionInfo;
  artistas: Artist[];
  aliados: string[];
  copy: SessionCopy;
  social: SessionSocial;
  seo: SessionSeo;
}

export interface ThemePalette {
  bg: string;
  accent: string;
  text: string;
  cta: string;
  ctaText: string;
}

export const THEME_PALETTES: Record<Theme, ThemePalette> = {
  verde: {
    bg: "#39FF00",
    accent: "#CC00FF",
    text: "#0A0A0A",
    cta: "#FFFF00",
    ctaText: "#0A0A0A",
  },
  fucsia: {
    bg: "#FF00A8",
    accent: "#FFFF00",
    text: "#0A0A0A",
    cta: "#000000",
    ctaText: "#FFFFFF",
  },
  amarillo: {
    bg: "#FFFF00",
    accent: "#CC00FF",
    text: "#0A0A0A",
    cta: "#CC00FF",
    ctaText: "#FFFFFF",
  },
  negro: {
    bg: "#0A0A0A",
    accent: "#39FF00",
    text: "#F5F5F5",
    cta: "#39FF00",
    ctaText: "#0A0A0A",
  },
};

export const session: SessionConfig = {
  theme: "verde",
  activa: true,

  session: {
    nombre: "330V",
    voltaje: "330V",
    fecha: "16 · 05 · 2026",
    lugar: "Berraco Gastrobar",
    direccion: "Cra 38 # 18-41, Palermo",
    ciudad: "Pasto",
    hora: "8PM",
  },

  artistas: [
    { nombre: "MOOB", rol: "DJ", instagram: "mobkhun" },
    { nombre: "NEATH", rol: "DJ", instagram: "i_neath_u" },
    { nombre: "LUKE REDDAHLIA", rol: "DJ", instagram: "reddahlia__" },
    { nombre: "LUKE_DDJ", rol: "DJ", instagram: "luke_ddj" },
  ],

  aliados: ["Berraco Gastrobar", "JASP"],

  copy: {
    tagline: "Una sola presencia.",
    frases: [
      "El cuerpo como conductor.",
      "La música como corriente.",
      "La pista como circuito.",
    ],
    descripcion:
      "Desde Bogotá hasta Pasto.\n3 DJs, 3 géneros, 1 mismo lenguaje: el baile.",
    cta_texto: "Entradas",
    cta_url: "https://wa.me/message/ZTZBZGTS6K5LI1",
    cierre: "Voltaje no se escucha: se conduce.",
    sesion_terminada: "La corriente ha pasado. Próxima sesión: pronto.",
  },

  social: {
    instagram: "https://instagram.com/____voltajesessions____",
  },

  seo: {
    siteUrl: "https://voltajesessions.com",
    brand: "Voltaje Sessions",
    locale: "es_CO",
    countryCode: "CO",
    timezoneOffset: "-05:00",
    keywords: [
      "voltaje sessions",
      "música electrónica",
      "rave",
      "fiesta electrónica",
      "DJ",
      "Pasto",
      "Bogotá",
      "techno",
      "house",
      "Berraco Gastrobar",
    ],
  },
};
