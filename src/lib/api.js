export const BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:3000";

export async function createIntent(amount = 1999, currency = "usd") {
  const res = await fetch(`${BASE}/api/payments/intent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, currency }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
