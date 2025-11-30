import { useState } from 'react';

const API_BASE = '';

export default function ApiTestPanel() {
  const [logLines, setLogLines] = useState([
    'Frontend simple cargado. Probá los botones de arriba.',
  ]);

  function addLog(line) {
    const ts = new Date().toLocaleTimeString('es-AR', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    setLogLines((prev) => [...prev, `[${ts}] ${line}`]);
  }

  async function getApi(path) {
    const url = `${API_BASE}${path}`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        const txt = await res.text().catch(() => '');
        throw new Error(
          `HTTP ${res.status} ${res.statusText} – ${txt || '<sin cuerpo>'}`
        );
      }
      const data = await res.json().catch(() => null);
      return { ok: true, data };
    } catch (err) {
      return { ok: false, error: err.message || String(err) };
    }
  }

  async function postApi(path, bodyObj) {
    const url = `${API_BASE}${path}`;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyObj || {}),
      });
      if (!res.ok) {
        const txt = await res.text().catch(() => '');
        throw new Error(
          `HTTP ${res.status} ${res.statusText} – ${txt || '<sin cuerpo>'}`
        );
      }
      const data = await res.json().catch(() => null);
      return { ok: true, data };
    } catch (err) {
      return { ok: false, error: err.message || String(err) };
    }
  }

  async function handleHealth() {
    addLog('[INFO] Consultando /api/health ...');
    const r = await getApi('/api/health');
    if (r.ok) addLog(`[OK] Health: ${JSON.stringify(r.data)}`);
    else addLog(`[ERROR] /api/health: ${r.error}`);
  }

  async function handleGuides() {
    addLog('[INFO] Cargando guías desde /api/guides ...');
    const r = await getApi('/api/guides');
    if (r.ok) {
      const guides = Array.isArray(r.data.guides) ? r.data.guides : [];
      addLog(`[OK] Guías cargados: ${guides.length}`);
      addLog(`[DEBUG] ${JSON.stringify(r.data)}`);
    } else addLog(`[ERROR] /api/guides: ${r.error}`);
  }

  async function handleStripeTest() {
    addLog('[INFO] Creando Checkout Stripe (USD 10) ...');
    const r = await postApi('/api/payments/create-checkout', {});
    if (r.ok && r.data?.url) {
      addLog('[OK] Checkout creado. Abriendo Stripe...');
      window.open(r.data.url, '_blank');
    } else if (r.ok) {
      addLog(
        `[ERROR] /api/payments/create-checkout: respuesta sin URL: ${JSON.stringify(
          r.data
        )}`
      );
    } else {
      addLog(
        `[ERROR] /api/payments/create-checkout: ${
          r.error || 'Error desconocido'
        }`
      );
    }
  }

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '1.5rem',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      <h1>I GUIDE U – Frontend simple (React)</h1>
      <p>
        Frontend en <strong>http://127.0.0.1:5181</strong> → proxy →
        <strong> https://iguideu-backend-1.onrender.com</strong>
      </p>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <button onClick={handleHealth}>Ver estado del backend</button>
        <button onClick={handleGuides}>Cargar guías</button>
        <button onClick={handleStripeTest}>Test pago Stripe (USD 10)</button>
      </div>

      <textarea
        readOnly
        value={logLines.join('\n')}
        style={{
          width: '100%',
          height: '260px',
          fontFamily:
            'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          fontSize: '0.85rem',
          padding: '0.5rem',
        }}
      />
    </div>
  );
}
