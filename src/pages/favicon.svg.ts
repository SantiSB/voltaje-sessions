import type { APIRoute } from "astro";
import { session, THEME_PALETTES } from "@/config/session";

export const prerender = true;

export const GET: APIRoute = () => {
  const palette = THEME_PALETTES[session.theme];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 32">
  <rect width="64" height="32" fill="${palette.bg}"/>
  <g fill="${palette.cta}" stroke="${palette.accent}" stroke-width="2">
    <circle cx="14" cy="16" r="11"/>
    <circle cx="32" cy="16" r="11"/>
    <circle cx="50" cy="16" r="11"/>
  </g>
  <g fill="${palette.accent}" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" font-weight="900" font-size="14" text-anchor="middle" dominant-baseline="central">
    <text x="14" y="17">V</text>
    <text x="32" y="17">T</text>
    <text x="50" y="17">J</text>
  </g>
</svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
};
