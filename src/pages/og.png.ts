import type { APIRoute } from "astro";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import satori from "satori";
import sharp from "sharp";
import { session, THEME_PALETTES } from "@/config/session";

export const prerender = true;

const WIDTH = 1200;
const HEIGHT = 630;
const ROOT = process.cwd();

interface SatoriNode {
  type: string;
  props: {
    style: Record<string, string | number>;
    children?: SatoriNode | SatoriNode[] | string | number;
  };
}

const node = (
  type: string,
  style: Record<string, string | number>,
  children?: SatoriNode | SatoriNode[] | string,
): SatoriNode => ({
  type,
  props: children === undefined ? { style } : { style, children },
});

export const GET: APIRoute = async () => {
  const palette = THEME_PALETTES[session.theme];
  const { session: info, copy, artistas, seo } = session;

  const [regular, bold] = await Promise.all([
    readFile(join(ROOT, "src/assets/fonts/Syne-Regular.woff")),
    readFile(join(ROOT, "src/assets/fonts/Syne-Bold.woff")),
  ]);

  const artistsLine = artistas.map((a) => a.nombre).join(" · ");

  const tree: SatoriNode = node(
    "div",
    {
      width: `${WIDTH.toString()}px`,
      height: `${HEIGHT.toString()}px`,
      background: palette.bg,
      color: palette.text,
      display: "flex",
      flexDirection: "column",
      padding: "60px 80px",
      fontFamily: "Syne",
      position: "relative",
      overflow: "hidden",
      letterSpacing: "-0.01em",
    },
    [
      // Watermark voltage (huge, accent color, 18% opacity)
      node(
        "div",
        {
          position: "absolute",
          top: "-40px",
          right: "20px",
          fontSize: 460,
          fontWeight: 700,
          color: palette.accent,
          opacity: 0.18,
          lineHeight: 0.85,
          letterSpacing: "-0.05em",
          display: "flex",
        },
        info.voltaje,
      ),
      // Top bar — date+city / REC voltaje
      node(
        "div",
        {
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
          textTransform: "uppercase",
          letterSpacing: "0.22em",
          fontWeight: 700,
          position: "relative",
          zIndex: 1,
        },
        [
          node("div", { display: "flex" }, `${info.fecha} · ${info.ciudad}`),
          node(
            "div",
            { display: "flex", color: palette.accent },
            `REC · ${info.voltaje}`,
          ),
        ],
      ),
      // Title block
      node(
        "div",
        {
          display: "flex",
          flexDirection: "column",
          marginTop: "70px",
          lineHeight: 0.85,
          position: "relative",
          zIndex: 1,
        },
        [
          node(
            "div",
            {
              display: "flex",
              fontSize: 188,
              fontWeight: 700,
              letterSpacing: "-0.03em",
            },
            "VOLTAJE",
          ),
          node(
            "div",
            {
              display: "flex",
              fontSize: 188,
              fontWeight: 700,
              color: palette.accent,
              marginLeft: "70px",
              letterSpacing: "-0.03em",
            },
            "SESSIONS",
          ),
        ],
      ),
      // Bottom row — artists + CTA
      node(
        "div",
        {
          display: "flex",
          justifyContent: "space-between",
          marginTop: "auto",
          alignItems: "flex-end",
          position: "relative",
          zIndex: 1,
        },
        [
          node(
            "div",
            {
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              maxWidth: "780px",
            },
            [
              node(
                "div",
                {
                  display: "flex",
                  fontSize: 24,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  fontWeight: 700,
                  color: palette.text,
                },
                artistsLine,
              ),
              node(
                "div",
                {
                  display: "flex",
                  fontSize: 22,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: palette.accent,
                  fontWeight: 700,
                },
                `${info.lugar} · ${info.hora}`,
              ),
            ],
          ),
          node(
            "div",
            {
              display: "flex",
              padding: "16px 32px",
              background: palette.cta,
              color: palette.ctaText,
              fontSize: 26,
              textTransform: "uppercase",
              fontWeight: 700,
              letterSpacing: "0.16em",
              border: `4px solid ${palette.text}`,
              boxShadow: `8px 8px 0 0 ${palette.text}`,
            },
            copy.cta_texto,
          ),
        ],
      ),
      // Brand mark / tagline at bottom
      node(
        "div",
        {
          display: "flex",
          marginTop: "20px",
          fontSize: 16,
          textTransform: "uppercase",
          letterSpacing: "0.4em",
          fontWeight: 400,
          color: palette.text,
          opacity: 0.6,
          position: "relative",
          zIndex: 1,
        },
        `${seo.brand.toUpperCase()} · ${copy.tagline.toUpperCase()}`,
      ),
    ],
  );

  // satori expects a ReactNode-like tree; the SatoriNode shape matches React element shape
  const svg = await satori(tree as unknown as Parameters<typeof satori>[0], {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      { name: "Syne", data: regular, weight: 400, style: "normal" },
      { name: "Syne", data: bold, weight: 700, style: "normal" },
    ],
  });

  const png = await sharp(Buffer.from(svg)).png({ quality: 90 }).toBuffer();

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
