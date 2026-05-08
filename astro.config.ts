import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { session } from "./src/config/session";

export default defineConfig({
  site: session.seo.siteUrl,

  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
});
