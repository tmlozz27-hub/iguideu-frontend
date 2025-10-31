import React, { useState } from "react";
import api from "./apiClient";

export default function App() {
  const [status, setStatus] = useState("");
  const [url, setUrl] = useState("");

  const createCheckout = async () => {
    setStatus("Creando checkout...");
    try {
      const res = await api.post("/api/payments/create-checkout", {
        amount: 1000,
        currency: "usd",
        metadata: { source: "front-render" }
      });
      setUrl(res.url);
      setStatus("OK, abriendo Stripe...");
      window.location.href = res.url; // redirige
    } catch (e) {
      setStatus("Error: " + (e?.message || "desconocido"));
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>I GUIDE U – Test Payment</h1>
      <p>Backend: <code>{import.meta.env.VITE_API_BASE}</code></p>
      <button onClick={createCheckout} style={{ padding: "12px 18px", fontSize: 16 }}>
        Pagar (USD 10)
      </button>
      <p style={{ marginTop: 16 }}>Estado: {status}</p>
      {url && <p>URL checkout: <a href={url} target="_blank">{url}</a></p>}
      <hr />
      <p><a href="/success">Success</a> | <a href="/cancel">Cancel</a></p>
    </div>
  );
}
