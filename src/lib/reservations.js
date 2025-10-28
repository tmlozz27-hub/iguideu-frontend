/**
 * src/lib/reservations.js
 * Acepta { guideId, date, pax } para ser compatible con GuideDetail.jsx actual.
 * Si el backend falla o no responde, vuelve un stub local con id "stub_<ts>".
 */
const API_BASE = import.meta?.env?.VITE_API_BASE || "http://127.0.0.1:3000";

export async function addReservation({ guideId, date, pax }) {
  // Adaptación mínima: si usás backend real, mapearíamos a startAt/endAt/price según tu API.
  const payload = { guide: guideId, date, pax };

  try {
    const res = await fetch(`${API_BASE}/api/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    // Normalizo forma de respuesta para GuideDetail (quiere r.id)
    const id = data?.booking?._id || data?.id || data?._id || `srv_${Date.now()}`;
    return { ok: true, id, raw: data };
  } catch (e) {
    // Fallback stub (sin backend)
    const id = `stub_${Date.now()}`;
    return {
      ok: true,
      id,
      stub: true,
      error: e?.message,
      raw: { guide: guideId, date, pax, status: "pending" },
    };
  }
}

export async function listReservations() {
  try {
    const res = await fetch(`${API_BASE}/api/bookings`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return { ok: true, results: [] };
  }
}
