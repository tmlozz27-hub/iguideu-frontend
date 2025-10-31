const BASE = import.meta.env.VITE_API_BASE; // ej: https://iguideu15-mnur.onrender.com

async function http(path, opts = {}) {
  const url = `${BASE.replace(/\/$/, "")}${path}`;
  const res = await fetch(url, {
    method: opts.method || "GET",
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
    credentials: "omit",
    mode: "cors"
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} ${txt}`);
  }
  return res.json();
}

export default {
  get: (p) => http(p),
  post: (p, body) => http(p, { method: "POST", body })
};
