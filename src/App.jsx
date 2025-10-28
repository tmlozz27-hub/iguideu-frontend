import React from "react";
import Checkout from "./components/Checkout.jsx";

export default function App() {
  return (
    <main style={{ padding: 24, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial" }}>
      <h1 style={{ margin: 0, fontSize: 28 }}>I GUIDE U – Checkout</h1>
      <p style={{ color: "#666", marginTop: 4 }}>Pago de prueba con Stripe (USD 10.00)</p>
      <Checkout />
    </main>
  );
}
