import type { APIRoute } from "astro";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { session, THEME_PALETTES } from "@/config/session";

export const prerender = true;

const SIZE = 180;
const PADDING = 18;
const ROOT = process.cwd();

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const cleaned = hex.replace("#", "");
  const value = parseInt(cleaned, 16);
  return {
    r: (value >> 16) & 0xff,
    g: (value >> 8) & 0xff,
    b: value & 0xff,
  };
}

export const GET: APIRoute = async () => {
  const palette = THEME_PALETTES[session.theme];
  const bg = hexToRgb(palette.bg);

  const mascotBuffer = await readFile(
    join(ROOT, "src/assets/images/brand/logo-mascot.png"),
  );

  const mascot = await sharp(mascotBuffer)
    .resize(SIZE - PADDING * 2, SIZE - PADDING * 2, { fit: "contain" })
    .toBuffer();

  const png = await sharp({
    create: {
      width: SIZE,
      height: SIZE,
      channels: 4,
      background: { r: bg.r, g: bg.g, b: bg.b, alpha: 1 },
    },
  })
    .composite([{ input: mascot, gravity: "center" }])
    .png()
    .toBuffer();

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
