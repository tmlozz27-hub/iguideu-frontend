import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,   // si 5173 está ocupado, falla en vez de abrir otro
    // open: "/pay",     // (quitado para que no abra nuevas ventanas solo)
  },
  preview: {
    host: "127.0.0.1",
    port: 5176,
    strictPort: true,
    // open: "/pay",
  },
});
