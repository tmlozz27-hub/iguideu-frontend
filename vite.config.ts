import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Config de Vite para I GUIDE U (dev local)
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5181,
    proxy: {
      // TODO lo que empiece con /api se manda al backend
      "/api": {
        target: "http://127.0.0.1:4026",
        changeOrigin: true,
      },
    },
  },
});
