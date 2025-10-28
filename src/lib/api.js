// src/lib/api.js
const API_BASE = import.meta.env.VITE_API_BASE;

export async function createOrderIntent({ amount = 1999, currency = "usd", metadata = {} } = {}) {
  if (!API_BASE) throw new Error("VITE_API_BASE no está definido en el .env");

  const url = `${API_BASE}/orders/create-intent`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, currency, metadata }),
  });

  let data = null;
  try {
    data = await res.json();
  } catch (_) {
    // si no es JSON, forzamos un error con info
    throw new Error(`Backend no devolvió JSON válido (status ${res.status})`);
  }

  // Log DIAGNÓSTICO: lo podés ver en la consola del navegador (F12 -> Console)
  console.debug("[create-intent] status:", res.status, "data:", data);

  if (!res.ok) {
    const msg = data?.error || `HTTP ${res.status}`;
    throw new Error(`Backend error: ${msg}`);
  }

  // Acepta camelCase y snake_case
  const clientSecret =
    data?.clientSecret ??
    data?.client_secret ??
    data?.payment_intent_client_secret ?? // por si algún proxy lo renombra
    null;

  if (!clientSecret) {
    throw new Error("Backend no devolvió client_secret");
  }

  return {
    clientSecret,
    orderId: data?.orderId ?? data?.order_id ?? null,
    paymentIntentId: data?.paymentIntentId ?? data?.payment_intent_id ?? null,
    raw: data,
  };
}
