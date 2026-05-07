import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const buildVersion =
  process.env.GITHUB_SHA?.slice(0, 7) ||
  new Date().toISOString().slice(0, 16).replace("T", " ");

export default defineConfig({
  define: {
    __BUILD_VERSION__: JSON.stringify(buildVersion),
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      manifest: {
        name: "JLPT N5 Quiz",
        short_name: "JLPT Quiz",
        description: "Japanese vocabulary quiz for JLPT N5",
        theme_color: "#1a1a2e",
        background_color: "#fafaf8",
        display: "standalone",
        orientation: "portrait",
        start_url: "/jnlp-quiz/",
        scope: "/jnlp-quiz/",
        icons: [
          {
            src: "icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
      },
    }),
  ],
  base: "/jnlp-quiz/",
  server: {
    port: 5173,
  },
});
