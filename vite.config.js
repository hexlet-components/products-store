import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true,
    host: true,
    port: 8080,
  },
  preview: {
    allowedHosts: true,
    host: true,
    port: process.env.PORT || 8080,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
  },
});
