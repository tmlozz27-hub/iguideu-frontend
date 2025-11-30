import React, { useState } from "react";

// rawBase puede ser:
// - window.BACKEND_BASE (si lo definimos a mano)
// - VITE_API_BASE (por ejemplo: https://iguideu-backend-1.onrender.com/api)
// - o el backend con /api como fallback
const rawBase =
  window.BACKEND_BASE ||
  import.meta.env.VITE_API_BASE ||
  "https://iguideu-backend-1.onrender.com/api";

// Quitamos posibles barras finales, por prolijidad
const backendBase = rawBase.replace(/\/+$/, "");

function now() {
  const d = new Date();
  return d.toTimeString().split(" ")[0]; // HH:MM:SS
}

export default function App() {
  const [backendUrl] = useState(backendBase);
  const [logLines, setLogLines] = useState([
    `[${now()}] Frontend simple cargado. Probá los botones de arriba.`,
  ]);
  const [guides, setGuides] = useState([]);

  const pushLog = (line) => {
    setLogLines((prev) => [...prev, line]);
  };

  const handleCheckHealth = async () => {
    const t = now();
    pushLog(`[${t}] [INFO] Consultando /health ...`);

    try {
      const res = await fetch(`${backendBase}/health`);
      const data = await res.json();
      pushLog(`[${now()}] [OK] Health: ${JSON.stringify(data)}`);
    } catch (err) {
      pushLog(`[${now()}] [ERROR] /health -> ${err.message}`);
    }
  };

  const handleLoadGuides = async () => {
    const t = now();
    pushLog(`[${t}] [INFO] Cargando guías desde /guides ...`);

    try {
      const res = await fetch(`${backendBase}/guides`);
      const data = await res.json();

      const list = Array.isArray(data.guides) ? data.guides : [];
      setGuides(list);

      pushLog(
        `[${now()}] [OK] Guías recibidas: ${list.length}`
      );
      pushLog(
        `[${now()}] [DEBUG] Respuesta /guides: ${JSON.stringify(
          data
        )}`
      );
    } catch (err) {
      pushLog(`[${now()}] [ERROR] /guides -> ${err.message}`);
    }
  };

  const handleTestStripe = async () => {
    const t = now();
    pushLog(
      `[${t}] [INFO] Creando Checkout Stripe (USD 10) ...`
    );

    try {
      const res = await fetch(
        `${backendBase}/payments/create-checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: "{}",
        }
      );

      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        pushLog(
          `[${now()}] [ERROR] No se pudo parsear JSON de /payments/create-checkout -> ${jsonErr.message}`
        );
        return;
      }

      if (!res.ok || !data || !data.ok || !data.url) {
        pushLog(
          `[${now()}] [ERROR] Respuesta inesperada de /payments/create-checkout: ${JSON.stringify(
            data
          )}`
        );
        return;
      }

      pushLog(
        `[${now()}] [OK] Checkout creado. Abriendo Stripe...`
      );

      // Redirigir a la URL de Stripe
      window.location.href = data.url;
    } catch (err) {
      pushLog(
        `[${now()}] [ERROR] /payments/create-checkout -> ${err.message}`
      );
    }
  };

  return (
    <div
      style={{
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        padding: "16px",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      <h1>I GUIDE U – Frontend simple</h1>

      <p>
        <strong>Conectado al backend en:</strong>{" "}
        <code>{backendUrl}</code>
      </p>

      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "12px",
          flexWrap: "wrap",
        }}
      >
        <button onClick={handleCheckHealth}>
          Ver estado del backend
        </button>
        <button onClick={handleLoadGuides}>Cargar guías</button>
        <button onClick={handleTestStripe}>
          Test pago Stripe (USD 10)
        </button>
      </div>

      <h2>Log</h2>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "8px",
          minHeight: "160px",
          background: "#fafafa",
          fontFamily: "monospace",
          fontSize: "12px",
          whiteSpace: "pre-wrap",
          marginBottom: "16px",
        }}
      >
        {logLines.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>

      <h2>Guías cargadas</h2>
      {guides.length === 0 && (
        <p style={{ color: "#666", fontSize: "14px" }}>
          No hay guías cargadas todavía. Hacé clic en{" "}
          <strong>"Cargar guías"</strong>.
        </p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "16px",
          marginTop: "8px",
        }}
      >
        {guides.map((g) => (
          <div
            key={g._id || g.guideId || g.code || g.name}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "12px",
              background: "#fff",
              boxShadow:
                "0 1px 3px rgba(0,0,0,0.06)",
            }}
          >
            {g.photo && (
              <div
                style={{
                  marginBottom: "8px",
                  textAlign: "center",
                }}
              >
                <img
                  src={g.photo}
                  alt={g.name}
                  style={{
                    maxWidth: "100%",
                    borderRadius: "6px",
                    maxHeight: "160px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}

            <h3
              style={{
                margin: "0 0 4px",
                fontSize: "16px",
              }}
            >
              {g.name}
            </h3>
            <p
              style={{
                margin: "0 0 4px",
                fontSize: "14px",
              }}
            >
              {g.city}, {g.country}
            </p>

            <p
              style={{
                margin: "0 0 4px",
                fontSize: "14px",
              }}
            >
              💲 {g.hourlyRate} / hora – {g.dailyRate} / día
            </p>

            <p
              style={{
                margin: "0 0 4px",
                fontSize: "14px",
              }}
            >
              ⭐ {g.rating} · Idiomas:{" "}
              {Array.isArray(g.languages)
                ? g.languages.join(", ")
                : "N/D"}
            </p>

            {g.description && (
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: "13px",
                  color: "#444",
                }}
              >
                {g.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
