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
