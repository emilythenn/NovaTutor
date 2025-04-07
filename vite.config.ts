import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // Ensure this matches the port you're accessing
    open: true,
  },
  build: {
    outDir: 'dist',
  },
});