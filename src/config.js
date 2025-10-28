// src/config.js
// ✅ Configuración central de la API usada por todo el frontend I GUIDE U
// Solo cambiá la URL cuando generes un nuevo túnel Cloudflare o uses IP local

export const API_BASE_URL = "https://firm-handed-planner-neutral.trycloudflare.com";

// ⚙️ Ejemplos alternativos:
// export const API_BASE_URL = "http://127.0.0.1:4025";           // para pruebas locales
// export const API_BASE_URL = "http://192.168.0.4:4025";          // red WiFi de casa u oficina
// export const API_BASE_URL = "https://<nuevo-tunnel>.trycloudflare.com"; // si se renueva el túnel

// ✅ Esta constante es usada en PaymentScreen.js y otros módulos para crear pagos,
// reservas y consultas al backend de I GUIDE U.
