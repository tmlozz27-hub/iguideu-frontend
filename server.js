// ===== CORS SÚPER EXPLÍCITO PARA DEV + PREVIEW =====
import cors from "cors";

const ALLOWED_ORIGINS = [
  "http://127.0.0.1:5177",
  "http://localhost:5177",
  "http://192.168.0.4:5177",
  "http://127.0.0.1:5178",
  "http://localhost:5178",
  "http://192.168.0.4:5178"
];

const dynamicCors = cors({
  origin(origin, cb) {
    // Permite herramientas tipo curl/PowerShell sin Origin
    if (!origin) return cb(null, true);
    // Permite si está en la lista
    if (ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    // (Opcional) Permite previews hospedados (ajusta dominio si usas otro)
    try {
      const host = new URL(origin).hostname;
      if (host.endsWith(".onrender.com")) return cb(null, true);
      if (host.endsWith(".netlify.app")) return cb(null, true);
      if (host.endsWith(".vercel.app")) return cb(null, true);
    } catch (e) {}
    return cb(new Error("CORS not allowed for origin: " + origin));
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "x-admin-key"],
  credentials: false,
  maxAge: 86400
});

// Aplica CORS y responde a OPTIONS
app.use(dynamicCors);
app.options("*", dynamicCors);
// ===== FIN CORS =====
