// server.js — servidor de desarrollo simple (Express) para tu frontend web/prueba
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// ==== Config base ====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); // <<< ESTA LÍNEA FALTABA

// ==== CORS dinámico para permitir probar desde LAN o túnel ====
function dynamicCors(req, res, next) {
  const origin = req.headers.origin || '*';
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Vary', 'Origin');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Stripe-Signature');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
}

app.use(dynamicCors); // <<< ahora sí existe app

// ==== Archivos estáticos (si usás una carpeta web/dist opcional) ====
// app.use(express.static(path.join(__dirname, 'web')));

// Salud
app.get('/health', (_req, res) => {
  res.json({ ok: true, server: 'frontend-dev', ts: new Date().toISOString() });
});

// Arranque
const PORT = process.env.FRONTEND_PORT || 5173;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ FRONTEND dev server ON http://0.0.0.0:${PORT}`);
});

