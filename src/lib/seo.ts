import { session, THEME_PALETTES, type ThemePalette } from "@/config/session";

const palette: ThemePalette = THEME_PALETTES[session.theme];

const artistsList = session.artistas.map((a) => a.nombre).join(", ");

const fullTitle = `${session.seo.brand} ${session.session.voltaje} · ${session.session.lugar}, ${session.session.ciudad}`;

const metaDescription = `${session.seo.brand} ${session.session.voltaje} — ${session.session.fecha} · ${session.session.hora} · ${session.session.lugar}, ${session.session.ciudad}. Line up: ${artistsList}. ${session.copy.tagline}`;

const keywords = Array.from(
  new Set([
    ...session.seo.keywords,
    ...session.artistas.map((a) => a.nombre),
    session.session.lugar,
    session.session.ciudad,
    session.session.voltaje,
  ]),
).join(", ");

export const seo = {
  brand: session.seo.brand,
  siteUrl: session.seo.siteUrl,
  locale: session.seo.locale,
  countryCode: session.seo.countryCode,
  twitterHandle: session.seo.twitterHandle,
  title: fullTitle,
  description: metaDescription,
  keywords,
  themeColor: palette.bg,
  ogImagePath: "/og.png",
  ogImageAlt: `${session.seo.brand} ${session.session.voltaje} · ${session.session.fecha}`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
} as const;

export function parseSessionStartDate(): string {
  const parts = session.session.fecha.split(" · ").map((s) => parseInt(s, 10));
  const day = parts[0] ?? 1;
  const month = parts[1] ?? 1;
  const year = parts[2] ?? new Date().getFullYear();

  const hourMatch = /^\s*(\d+)\s*(AM|PM)?\s*$/i.exec(session.session.hora);
  let hour = 0;
  if (hourMatch && hourMatch[1] !== undefined) {
    hour = parseInt(hourMatch[1], 10);
    const period = hourMatch[2]?.toUpperCase();
    if (period === "PM" && hour < 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;
  }

  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${year.toString()}-${pad(month)}-${pad(day)}T${pad(hour)}:00:00${session.seo.timezoneOffset}`;
}

interface EventSchema {
  "@context": "https://schema.org";
  "@type": "MusicEvent";
  name: string;
  startDate: string;
  eventStatus: string;
  eventAttendanceMode: string;
  location: {
    "@type": "Place";
    name: string;
    address: {
      "@type": "PostalAddress";
      streetAddress: string;
      addressLocality: string;
      addressCountry: string;
    };
  };
  image: string;
  url: string;
  description: string;
  performer: Array<{ "@type": "MusicGroup"; name: string; sameAs?: string }>;
  organizer: {
    "@type": "Organization";
    name: string;
    url: string;
    sameAs: string;
  };
  offers?: {
    "@type": "Offer";
    url: string;
    availability: string;
    validFrom: string;
  };
}

export function buildEventSchema(canonicalUrl: string, ogImageUrl: string): EventSchema {
  const performer = session.artistas.map((a) => {
    const base = { "@type": "MusicGroup" as const, name: a.nombre };
    return a.instagram
      ? { ...base, sameAs: `https://instagram.com/${a.instagram}` }
      : base;
  });

  const schema: EventSchema = {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: `${session.seo.brand} ${session.session.voltaje}`,
    startDate: parseSessionStartDate(),
    eventStatus: session.activa
      ? "https://schema.org/EventScheduled"
      : "https://schema.org/EventPostponed",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: session.session.lugar,
      address: {
        "@type": "PostalAddress",
        streetAddress: session.session.direccion,
        addressLocality: session.session.ciudad,
        addressCountry: session.seo.countryCode,
      },
    },
    image: ogImageUrl,
    url: canonicalUrl,
    description: metaDescription,
    performer,
    organizer: {
      "@type": "Organization",
      name: session.seo.brand,
      url: session.seo.siteUrl,
      sameAs: session.social.instagram,
    },
  };

  if (session.activa && session.copy.cta_url && session.copy.cta_url !== "#") {
    schema.offers = {
      "@type": "Offer",
      url: session.copy.cta_url,
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString(),
    };
  }

  return schema;
}
