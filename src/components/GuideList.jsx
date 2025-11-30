import { useEffect, useState } from 'react';

const API_BASE = '';

export default function GuideList() {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function loadGuides() {
      try {
        const res = await fetch(`${API_BASE}/api/guides`);
        if (!res.ok) {
          const txt = await res.text().catch(() => '');
          throw new Error(
            `HTTP ${res.status} ${res.statusText} – ${txt || '<sin cuerpo>'}`
          );
        }
        const data = await res.json();
        const list = Array.isArray(data.guides) ? data.guides : [];
        setGuides(list);
      } catch (err) {
        setErrorMsg(err.message || String(err));
      } finally {
        setLoading(false);
      }
    }

    loadGuides();
  }, []);

  return (
    <div
      style={{
        maxWidth: '960px',
        margin: '0 auto 2rem',
        padding: '0 1.5rem 1.5rem',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      <h2 style={{ marginBottom: '0.5rem' }}>I GUIDE U – Viajero (demo)</h2>
      <p style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.95rem' }}>
        Guías reales cargadas desde{' '}
        <strong>/api/guides</strong> en Render.
      </p>

      {loading && <p>Cargando guías...</p>}

      {errorMsg && (
        <p style={{ color: 'red', fontSize: '0.9rem' }}>
          Error al cargar guías: {errorMsg}
        </p>
      )}

      {!loading && !errorMsg && guides.length === 0 && (
        <p>No hay guías disponibles por ahora.</p>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem',
        }}
      >
        {guides.map((g) => (
          <article
            key={g._id}
            style={{
              background: '#ffffff',
              borderRadius: '0.75rem',
              padding: '1rem',
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <header>
              <h3 style={{ margin: 0, fontSize: '1.05rem' }}>{g.name}</h3>
              <p style={{ margin: '0.15rem 0', fontSize: '0.9rem' }}>
                {g.city}, {g.country}
              </p>
            </header>

            <p style={{ margin: 0, fontSize: '0.9rem' }}>{g.description}</p>

            <p style={{ margin: 0, fontSize: '0.9rem' }}>
              <strong>
                💲 {g.hourlyRate} / hora – {g.dailyRate} / día
              </strong>
            </p>

            <p style={{ margin: 0, fontSize: '0.9rem' }}>
              ⭐ {g.rating}{' '}
              {Array.isArray(g.languages) && g.languages.length > 0 && (
                <>· Idiomas: {g.languages.join(', ')}</>
              )}
            </p>

            <button
              type="button"
              style={{
                marginTop: '0.5rem',
                alignSelf: 'flex-start',
                padding: '0.4rem 0.9rem',
                borderRadius: '999px',
                border: 'none',
                background: '#111827',
                color: '#ffffff',
                fontSize: '0.9rem',
                cursor: 'pointer',
              }}
              onClick={() => alert(`(Demo) Reservar con ${g.name}`)}
            >
              Reservar ahora (demo)
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
