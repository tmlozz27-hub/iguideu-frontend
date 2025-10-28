import React, { useEffect, useState } from "react";
import { apiGet, apiPost } from "../apiClient";

export default function Checkout() {
  const [status, setStatus] = useState("Cargando pago...");

  useEffect(() => {
    (async () => {
      try {
        const health = await apiGet("/api/health");
        console.log("health", health);
        const intent = await apiPost("/api/payments/create-intent", { amount: 1000, currency: "usd" });
        console.log("intent", intent);
        setStatus("Listo (mock): " + intent.clientSecret);
      } catch (e) {
        console.error(e);
        setStatus("Error al preparar el pago (mock)");
      }
    })();
  }, []);

  return (
    <main style={{padding: 24, fontFamily: "sans-serif"}}>
      <h1>I GUIDE U - Checkout</h1>
      <p>Pago de prueba con Stripe (USD 10.00)</p>
      <p>{status}</p>
    </main>
  );
}
