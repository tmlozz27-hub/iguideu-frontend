import { useEffect, useState } from "react";
import { createPaymentIntent } from "../lib/payments";

export default function Pay() {
  const [status, setStatus] = useState("cargando...");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await createPaymentIntent(1999, "usd");
        setClientSecret(data.client_secret);
        setStatus(`OK (${data.provider})`);
      } catch (e) {
        setStatus("error: " + (e?.message || "desconocido"));
      }
    })();
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Checkout</h1>
      <p>Estado: {status}</p>
      <p>client_secret: <code>{clientSecret}</code></p>
      <p>Monto: 19.99 USD (demo)</p>
    </div>
  );
}
