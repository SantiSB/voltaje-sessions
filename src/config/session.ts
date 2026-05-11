export type Theme = "verde" | "fucsia" | "amarillo" | "negro";

export interface Artist {
  nombre: string;
  nombreReal?: string;
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
  cta_secundario_texto: string;
  cta_secundario_url: string;
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

export type BoleteriaTierId = "early" | "anytime" | "taquilla";

export interface BoleteriaTier {
  id: BoleteriaTierId;
  nombre: string;
  precio: number;
  descripcion: string;
  condicion?: string;
  horaLimite?: string;
  destacado?: boolean;
}

export interface BoleteriaCombo {
  id: string;
  baseId: BoleteriaTierId;
  nombre: string;
  precio: number;
  cantidad: number;
  pagan: number;
}

export interface BoleteriaCortesias {
  cantidad: number;
  valorOperativo: number;
  nota: string;
}

export interface BoleteriaCta {
  texto: string;
  url: string;
}

export interface BoleteriaConfig {
  aforo: number;
  ventaPaga: number;
  tiers: BoleteriaTier[];
  combos: BoleteriaCombo[];
  cortesias: BoleteriaCortesias;
  notas: string[];
  ctaPrimario: BoleteriaCta;
  ctaSecundario: BoleteriaCta;
  comboNota: string;
  earlyNota: string;
}

export interface SessionConfig {
  theme: Theme;
  activa: boolean;
  session: SessionInfo;
  artistas: Artist[];
  aliados: string[];
  copy: SessionCopy;
  boleteria: BoleteriaConfig;
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

export const formatCOP = (amount: number): string =>
  `$${amount.toLocaleString("es-CO")}`;

const SITE_URL = "https://voltajesessions.com";
const BUY_URL = "https://wa.me/message/ZTZBZGTS6K5LI1";

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
    { nombre: "Moob", rol: "DJ", instagram: "mobkhun" },
    {
      nombre: "Neath",
      nombreReal: "Camilo Andrés Del Real Támara",
      rol: "DJ",
      instagram: "i_neath_u",
    },
    {
      nombre: "Red Dahlia",
      nombreReal: "Mariana Marañón Lineros",
      rol: "DJ",
      instagram: "reddahlia__",
    },
    {
      nombre: "Luke",
      nombreReal: "Andrés Felipe Luque",
      rol: "DJ",
      instagram: "luke_ddj",
    },
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
    cta_texto: "Comprar en voltajesessions.com",
    cta_url: BUY_URL,
    cta_secundario_texto: "Ver boletería",
    cta_secundario_url: "#boleteria",
    cierre: "Voltaje no se escucha: se conduce.",
    sesion_terminada: "La corriente ha pasado. Próxima sesión: pronto.",
  },

  boleteria: {
    aforo: 190,
    ventaPaga: 150,
    tiers: [
      {
        id: "early",
        nombre: "Early Entrance",
        precio: 25000,
        descripcion: "La más económica. Para los que abren la pista.",
        condicion: "Válida solo hasta la hora indicada.",
        horaLimite: "10:30 PM",
      },
      {
        id: "anytime",
        nombre: "Anytime",
        precio: 35000,
        descripcion: "Entra a la hora que quieras. Preventa principal.",
        destacado: true,
      },
      {
        id: "taquilla",
        nombre: "Taquilla",
        precio: 50000,
        descripcion: "En puerta el día del evento.",
      },
    ],
    combos: [
      {
        id: "early-x4",
        baseId: "early",
        nombre: "Combo Early x4",
        precio: 75000,
        cantidad: 4,
        pagan: 3,
      },
      {
        id: "anytime-x4",
        baseId: "anytime",
        nombre: "Combo Anytime x4",
        precio: 105000,
        cantidad: 4,
        pagan: 3,
      },
      {
        id: "taquilla-x4",
        baseId: "taquilla",
        nombre: "Combo Taquilla x4",
        precio: 150000,
        cantidad: 4,
        pagan: 3,
      },
    ],
    cortesias: {
      cantidad: 40,
      valorOperativo: 1000,
      nota: "Control interno · no se venden al público.",
    },
    notas: [
      "Aforo total: 190 personas.",
      "Pago seguro en voltajesessions.com.",
    ],
    ctaPrimario: {
      texto: "Comprar en voltajesessions.com",
      url: BUY_URL,
    },
    ctaSecundario: {
      texto: "Ver boletería",
      url: "#boleteria",
    },
    comboNota: "Combos x4: pagan 3 y entran 4.",
    earlyNota:
      "Válida solo hasta la hora indicada. Después de esa hora puede aplicar ajuste en puerta.",
  },

  social: {
    instagram: "https://instagram.com/____voltajesessions____",
  },

  seo: {
    siteUrl: SITE_URL,
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
