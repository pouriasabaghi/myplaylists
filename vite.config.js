import path from "path";
import eslint from "vite-plugin-eslint";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "My Playlists",
        short_name: "My Playlists",
        description: "Your music platform",
        start_url: "/explore",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/pwa-maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api.myplaylists.ir\/api\/songs\/\d+\/download/,
            handler: "CacheFirst",
            options: {
              cacheName: "audio-cache",
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/api.myplaylists.ir\/api\/(?!songs\/\d+\/stream)/, // negative lookahead : if address contains "stream" don't cache
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/, 
            handler: "NetworkFirst", 
            options: {
              cacheName: "image-cache", 
              expiration: {
                maxEntries: 50, 
                maxAgeSeconds: 60 * 24 * 60 * 60, 
              },
            },
          },
          {
            urlPattern: /\.(?:riv)$/, 
            handler: "CacheFirst", 
            options: {
              cacheName: "riv-cache", 
              expiration: {
                maxEntries: 10, 
                maxAgeSeconds: 7 * 24 * 60 * 60, 
              },
              cacheableResponse: {
                statuses: [0, 200], 
              },
            },
          }
        ],
      },
    }),
  ],
  assetsInclude: ['**/*.lottie', '**/*.riv'], 
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
/*   server: {
    https: {
      key: "/home/pouria/.ssl/localhost-key.pem",
      cert: "/home/pouria/.ssl/localhost.pem",
    },
    port: 5137,
    strictPort: true,
  },
  preview: {
    https: {
      key: "/home/pouria/.ssl/localhost-key.pem",
      cert: "/home/pouria/.ssl/localhost.pem",
    },
    port: 5137,
    strictPort: true,
  }, */
});
