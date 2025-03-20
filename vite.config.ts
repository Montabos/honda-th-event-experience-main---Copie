import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8081,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ['react', 'react-dom']
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      '@radix-ui/react-compose-refs',
      '@radix-ui/react-context',
      '@radix-ui/react-collection'
    ],
    force: true
  },
  build: {
    modulePreload: {
      polyfill: true
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('@radix-ui')) {
              return 'vendor';
            }
          }
        }
      }
    },
    commonjsOptions: {
      include: [/node_modules/],
      extensions: ['.js', '.cjs', '.jsx', '.tsx'],
      transformMixedEsModules: true
    }
  }
}));
