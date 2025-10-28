export async function createPaymentIntent(amount=1999, currency="usd") {
  const base = import.meta.env.VITE_API_BASE || "http://localhost:3000";
  const res = await fetch(`${base}/api/payments/create-intent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, currency }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
