import React, { useState } from "react";

const BASE = "https://iguideu-backend-1.onrender.com";

export default function Home() {
  const [log, setLog] = useState([]);

  function addLog(msg, type = "info") {
    setLog((prev) => [...prev, { msg, type, time: new Date().toLocaleTimeString() }]);
  }

  async function testPayment() {
    addLog("[INFO] Llamando a /api/payments/create-checkout ...");

    try {
      const res = await fetch(`${BASE}/api/payments/create-checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
      });

      const data = await res.json();

      if (data.url) {
        addLog("[OK] Checkout creado. Abriendo Stripe...", "ok");
        window.location.href = data.url;
      } else {
        addLog("[ERROR] Respuesta sin URL desde el backend", "error");
      }
    } catch (err) {
      addLog(`[ERROR] ${err.message}`, "error");
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>I GUIDE U – Test Home</h1>

      <button
        style={{
          padding: "10px 20px",
          background: "#111827",
          color: "white",
          borderRadius: 8,
          border: "none",
          cursor: "pointer",
          marginBottom: 20
        }}
        onClick={testPayment}
      >
        Test Pago Stripe (USD 10)
      </button>

      <div
        style={{
          background: "#0b1120",
          color: "white",
          padding: 10,
          borderRadius: 8,
          maxHeight: 300,
          overflowY: "auto",
          fontFamily: "Consolas",
          fontSize: 12
        }}
      >
        {log.map((l, i) => (
          <div key={i}>
            <span style={{ color: "#9ca3af" }}>[{l.time}] </span>
            <span
              style={{
                color:
                  l.type === "ok"
                    ? "#22c55e"
                    : l.type === "error"
                    ? "#f97373"
                    : "#38bdf8"
              }}
            >
              {l.msg}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
