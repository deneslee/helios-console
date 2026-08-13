import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Vite resolves a leading slash from the project root — no node:path needed.
    alias: { '@': '/src' },
  },
  server: { port: 5173 },
});
