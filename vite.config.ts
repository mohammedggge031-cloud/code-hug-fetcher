import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: false,
      },
      includeAssets: [
        "favicon.ico",
        "favicon.png",
        "favicon-48.png",
        "favicon-180.png",
        "favicon-192.png",
        "favicon-512.png",
        "og-image.jpg",
        "quran-hero.webp",
        "quran-hero-640.webp",
        "quran-hero-1024.webp",
      ],
      manifest: {
        name: "Alhamd Academy — Online Quran, Arabic & Islamic Studies",
        short_name: "Alhamd Academy",
        description: "One-on-one online Quran, Arabic & Islamic studies classes with certified Al-Azhar teachers for kids and adults worldwide.",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#102840",
        categories: ["education", "religion"],
        lang: "en",
        dir: "ltr",
        icons: [
          { src: "/favicon-48.png", sizes: "48x48", type: "image/png" },
          { src: "/favicon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "/favicon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
          { src: "/favicon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
        shortcuts: [
          { name: "Free Trial", url: "/free-trial", description: "Book a free Quran class" },
          { name: "Courses", url: "/#courses", description: "Browse our courses" },
        ],
      },
      workbox: {
        navigateFallbackDenylist: [/^\/~oauth/, /^\/admin/],
        globPatterns: ["**/*.{js,css,html,ico,png,webp,jpg,svg,woff2}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "gstatic-fonts-cache",
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/flagcdn\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "flag-icons-cache",
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/rest\/v1\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "supabase-api-cache",
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 },
              cacheableResponse: { statuses: [0, 200] },
              networkTimeoutSeconds: 5,
            },
          },
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': [
            'react',
            'react-dom',
            'react/jsx-runtime',
            'react/jsx-dev-runtime',
            'scheduler',
          ],
          'vendor-router': ['react-router-dom', 'react-router'],
          'vendor-query': ['@tanstack/react-query'],
          'vendor-motion': ['framer-motion'],
          'vendor-supabase': ['@supabase/supabase-js'],
          'vendor-icons': ['lucide-react'],
          'vendor-utils': ['date-fns', 'zod', 'dompurify'],
          'vendor-ui': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-tooltip', '@radix-ui/react-accordion'],
        },
      },
    },
    target: 'es2020',
    cssCodeSplit: true,
    cssMinify: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 3,
        pure_getters: true,
        unsafe_comps: true,
        toplevel: true,
        ecma: 2020,
      },
      mangle: { toplevel: true },
      format: { comments: false },
    },
    reportCompressedSize: false,
    chunkSizeWarningLimit: 600,
    modulePreload: { polyfill: false },
    sourcemap: false,
  },
}));
