import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  root: './',
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1600,
  },
  publicDir: 'src/public',
  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 3000,
    },
    host: '0.0.0.0',
    port: 3000,
    fs: {
      strict: false,
    },
  },
  plugins: [react()],
});
