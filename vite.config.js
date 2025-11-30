// vite.config.js
// Config básico de React + Vite con proxy a Render para /api

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5181,
    proxy: {
      '/api': {
        target: 'https://iguideu-backend-1.onrender.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
