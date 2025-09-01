import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true,
    host: true,
    port: 8080
  },
  preview: {
    allowedHosts: true,
    host: true,
    port: process.env.PORT
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts'
  }
});
