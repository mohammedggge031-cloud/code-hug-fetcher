import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (/[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'vendor-react';
          if (/[\\/](react-router|react-router-dom|@remix-run[\\/]router)[\\/]/.test(id)) return 'vendor-router';
          if (id.includes('@tanstack/react-query')) return 'vendor-query';
          if (id.includes('framer-motion')) return 'vendor-motion';
          if (id.includes('@supabase/')) return 'vendor-supabase';
          if (id.includes('lucide-react')) return 'vendor-icons';
          if (id.includes('dompurify')) return 'vendor-dompurify';
          if (id.includes('date-fns')) return 'vendor-datefns';
          if (id.includes('zod')) return 'vendor-zod';
          if (id.includes('@radix-ui')) return 'vendor-radix';
          if (id.includes('@tiptap') || id.includes('prosemirror')) return 'vendor-editor';
          if (id.includes('embla-carousel')) return 'vendor-carousel';
          if (id.includes('recharts') || id.includes('d3-')) return 'vendor-charts';
          // Default: let Rollup auto-split per route via dynamic imports
          return undefined;
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
