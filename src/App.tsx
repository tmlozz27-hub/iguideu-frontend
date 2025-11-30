import React, { useState } from "react";

type Guide = {
  code: string;
  name: string;
  city: string;
  country: string;
  hourlyRate: number;
  dailyRate: number;
  rating: number;
};

type LogEntry = {
  ts: string;
  level: "INFO" | "OK" | "ERROR";
  message: string;
};

// 🔹 Por ahora SIEMPRE usamos el backend en Render
const backendBaseUrl = "https://iguideu-backend-1.onrender.com";

function now(): string {
  const d = new Date();
  return d.toTimeString().slice(0, 8);
}

const App: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      ts: now(),
      level: "INFO",
      message:
        "Frontend simple cargado. Probá los botones de arriba.",
    },
  ]);
  const [guides, setGuides] = useState<Guide[]>([]);

  const pushLog = (level: LogEntry["level"], message: string) => {
    setLogs((prev) => [
      ...prev,
      {
        ts: now(),
        level,
        message,
      },
    ]);
  };

  const handleHealth = async () => {
    pushLog("INFO", "Consultando /api/health ...");
    try {
      const res = await fetch(`${backendBaseUrl}/api/health`);
      const data = await res.json();
      pushLog("OK", `Health: ${JSON.stringify(data)}`);
    } catch (err: any) {
      pushLog(
        "ERROR",
        `/api/health: ${err?.message || "Failed to fetch"}`
      );
    }
  };

  const handleGuides = async () => {
    pushLog("INFO", "Cargando guías desde /api/guides ...");
    try {
      const res = await fetch(`${backendBaseUrl}/api/guides`);
      const data = await res.json();

      if (!data.ok) {
        pushLog(
          "ERROR",
          `/api/guides: ${data.error || "Respuesta no OK"}`
        );
        return;
      }

      setGuides(data.guides || []);
      pushLog(
        "OK",
        `Guías cargadas: ${data.total || (data.guides || []).length}`
      );
    } catch (err: any) {
      pushLog(
        "ERROR",
        `/api/guides: ${err?.message || "Failed to fetch"}`
      );
    }
  };

  const handleCheckout = async () => {
    pushLog("INFO", "Creando Checkout Stripe (USD 10) ...");
    try {
      const res = await fetch(
        `${backendBaseUrl}/api/payments/create-checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      const data = await res.json();

      if (!data.ok || !data.url) {
        pushLog(
          "ERROR",
          `/api/payments/create-checkout: ${
            data.error || "Respuesta no OK"
          }`
        );
        return;
      }

      pushLog("OK", "Checkout creado. Abriendo Stripe...");
      window.location.href = data.url as string;
    } catch (err: any) {
      pushLog(
        "ERROR",
        `/api/payments/create-checkout: ${
          err?.message || "Failed to fetch"
        }`
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        margin: 0,
        background: "#020617",
        color: "#e5e7eb",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
        display: "flex",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "960px",
          display: "grid",
          gap: "16px",
        }}
      >
        <header
          style={{
            padding: "16px 20px",
            borderRadius: "16px",
            background:
              "linear-gradient(135deg, #0f172a, #020617)",
            border: "1px solid #1f2937",
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
          }}
        >
          <h1
            style={{
              fontSize: "1.5rem",
              margin: 0,
              marginBottom: "4px",
            }}
          >
            I GUIDE U – Frontend simple
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: "0.9rem",
              color: "#9ca3af",
            }}
          >
            Conectado al backend en{" "}
            <span style={{ color: "#a855f7" }}>
              {backendBaseUrl}
            </span>
            .
          </p>
        </header>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: "16px",
          }}
        >
          {/* Panel de acciones */}
          <div
            style={{
              padding: "16px",
              borderRadius: "16px",
              background: "#020617",
              border: "1px solid #1f2937",
            }}
          >
            <h2
              style={{
                fontSize: "1rem",
                marginTop: 0,
                marginBottom: "12px",
              }}
            >
              Acciones de prueba
            </h2>
            <div
              style={{
                display: "grid",
                gap: "8px",
                marginBottom: "16px",
              }}
            >
              <button onClick={handleHealth} style={buttonStyle}>
                Ver estado del backend
              </button>
              <button onClick={handleGuides} style={buttonStyle}>
                Cargar guías
              </button>
              <button
                onClick={handleCheckout}
                style={{
                  ...buttonStyle,
                  background:
                    "linear-gradient(135deg, #22c55e, #16a34a)",
                }}
              >
                Test pago Stripe (USD 10)
              </button>
            </div>

            <div
              style={{
                maxHeight: "220px",
                overflowY: "auto",
                padding: "8px",
                borderRadius: "12px",
                background: "#020617",
                border: "1px solid #1f2937",
                fontSize: "0.8rem",
              }}
            >
              <div
                style={{
                  color: "#9ca3af",
                  marginBottom: "4px",
                }}
              >
                [log] Frontend simple cargado. Probá los
                botones de arriba.
              </div>
              {logs.map((log, idx) => (
                <div
                  key={idx}
                  style={{
                    whiteSpace: "pre-wrap",
                    marginBottom: "2px",
                  }}
                >
                  [{log.ts}]{" "}
                  <span
                    style={{
                      color:
                        log.level === "ERROR"
                          ? "#f97316"
                          : log.level === "OK"
                          ? "#22c55e"
                          : "#60a5fa",
                    }}
                  >
                    [{log.level}]
                  </span>{" "}
                  {log.message}
                </div>
              ))}
            </div>
          </div>

          {/* Panel de guías */}
          <div
            style={{
              padding: "16px",
              borderRadius: "16px",
              background: "#020617",
              border: "1px solid #1f2937",
            }}
          >
            <h2
              style={{
                fontSize: "1rem",
                marginTop: 0,
                marginBottom: "12px",
              }}
            >
              Guías cargados
            </h2>
            {guides.length === 0 ? (
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#9ca3af",
                }}
              >
                Usa el botón &quot;Cargar guías&quot; para ver la lista.
              </p>
            ) : (
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "grid",
                  gap: "8px",
                  fontSize: "0.9rem",
                }}
              >
                {guides.map((g) => (
                  <li
                    key={g.code}
                    style={{
                      padding: "10px 12px",
                      borderRadius: "12px",
                      background: "#020617",
                      border: "1px solid #1f2937",
                    }}
                  >
                    <div style={{ fontWeight: 600 }}>
                      {g.code} – {g.name}
                    </div>
                    <div
                      style={{
                        color: "#e5e7eb",
                        fontSize: "0.85rem",
                      }}
                    >
                      {g.city}, {g.country} – 💲 {g.hourlyRate} / hora –{" "}
                      {g.dailyRate} / día – ⭐ {g.rating}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

const buttonStyle: React.CSSProperties = {
  border: "none",
  borderRadius: "999px",
  padding: "10px 16px",
  background: "#2563eb",
  color: "#f9fafb",
  fontSize: "0.9rem",
  fontWeight: 600,
  cursor: "pointer",
};

export default App;
