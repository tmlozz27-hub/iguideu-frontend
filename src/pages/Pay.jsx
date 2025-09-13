import { useState } from "react";
import { createIntent } from "../lib/api";

export default function Pay() {
  const [amount, setAmount] = useState(1999);
  const [currency, setCurrency] = useState("usd");
  const [out, setOut] = useState("");

  const onPay = async () => {
    setOut("Enviando...");
    try {
      const data = await createIntent(Number(amount), currency);
      setOut(JSON.stringify(data, null, 2));
    } catch (e) {
      setOut("Error: " + (e?.message ?? e));
    }
  };

  return (
    <div
      style={{
        fontFamily: "system-ui,Segoe UI,Arial",
        maxWidth: 720,
        margin: "32px auto",
        padding: 16,
      }}
    >
      <h1>Pago (stub)</h1>
      <div style={{ margin: "8px 0" }}>
        <label style={{ marginRight: 8 }}>Amount (cents):</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div style={{ margin: "8px 0" }}>
        <label style={{ marginRight: 8 }}>Currency:</label>
        <input
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        />
      </div>
      <button onClick={onPay}>Crear Payment Intent (stub)</button>
      <h3>Respuesta</h3>
      <pre
        style={{
          background: "#111",
          color: "#0f0",
          padding: 12,
          borderRadius: 8,
          whiteSpace: "pre-wrap",
        }}
      >
        {out}
      </pre>
      <small>BASE: {import.meta.env.VITE_API_BASE}</small>
    </div>
  );
}

