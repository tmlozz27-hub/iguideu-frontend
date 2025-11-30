import React, { useState } from "react";

const API_BASE = "https://iguideu-backend-1.onrender.com";

export default function PaymentScreen() {
  const [status, setStatus] = useState("idle"); // idle | loading | ok | error
  const [message, setMessage] = useState("");

  async function handlePay() {
    setStatus("loading");
    setMessage("Creando Checkout en Stripe (USD 10)...");

    try {
      const resp = await fetch(`${API_BASE}/api/payments/create-checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // valores fijos de test; más adelante los llenamos con la reserva real
          successUrl: `${API_BASE}/api/payments/test-success`,
          cancelUrl: `${API_BASE}/api/payments/test-cancel`,
        }),
      });

      const text = await resp.text();

      if (!resp.ok) {
        setStatus("error");
        setMessage(`Error (${resp.status}): ${text}`);
        return;
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        setStatus("error");
        setMessage(`Respuesta inesperada del backend: ${text}`);
        return;
      }

      if (data && data.url) {
        setStatus("ok");
        setMessage("Checkout creado. Redirigiendo a Stripe...");
        window.location.href = data.url;
      } else {
        setStatus("error");
        setMessage("El backend no devolvió URL de Stripe.");
      }
    } catch (err) {
      setStatus("error");
      setMessage(`Error de red: ${err.message}`);
    }
  }

  const isLoading = status === "loading";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f3f4f6",
        padding: 16,
      }}
    >
      <div
        style={{
          maxWidth: 420,
          width: "100%",
          background: "#ffffff",
          borderRadius: 16,
          padding: 24,
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          fontFamily:
            'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <h1
          style={{
            fontSize: 22,
            marginTop: 0,
            marginBottom: 8,
            color: "#111827",
          }}
        >
          Reserva con guía (test)
        </h1>

        <p style={{ marginTop: 0, marginBottom: 16, color: "#4b5563" }}>
          Este es un pago de <strong>prueba</strong> de I GUIDE U usando Stripe.
        </p>

        <div
          style={{
            borderRadius: 12,
            border: "1px solid #e5e7eb",
            padding: 16,
            marginBottom: 20,
            background: "#f9fafb",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 6,
            }}
          >
            <span style={{ color: "#6b7280" }}>Concepto</span>
            <span style={{ fontWeight: 600, color: "#111827" }}>
              Reserva con guía (test)
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 6,
            }}
          >
            <span style={{ color: "#6b7280" }}>Importe</span>
            <span style={{ fontWeight: 700, color: "#111827" }}>
              USD 10.00
            </span>
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: "#6b7280" }}>
            No se realizará ningún cobro real. Es solo para probar el flujo
            completo de pago.
          </div>
        </div>

        <button
          onClick={handlePay}
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "10px 16px",
            borderRadius: 9999,
            border: "none",
            cursor: isLoading ? "default" : "pointer",
            fontWeight: 600,
            fontSize: 15,
            background: "#111827",
            color: "#ffffff",
          }}
        >
          {isLoading ? "Conectando con Stripe..." : "Pagar con Stripe (test USD 10)"}
        </button>

        {message && (
          <div
            style={{
              marginTop: 16,
              fontSize: 13,
              padding: 10,
              borderRadius: 8,
              background:
                status === "error"
                  ? "#fef2f2"
                  : status === "ok"
                  ? "#ecfdf3"
                  : "#eff6ff",
              color:
                status === "error"
                  ? "#b91c1c"
                  : status === "ok"
                  ? "#166534"
                  : "#1d4ed8",
            }}
          >
            {message}
          </div>
        )}

        <p
          style={{
            marginTop: 18,
            fontSize: 11,
            color: "#9ca3af",
            textAlign: "center",
          }}
        >
          Modo test · Stripe · I GUIDE U 24
        </p>
      </div>
    </div>
  );
}
