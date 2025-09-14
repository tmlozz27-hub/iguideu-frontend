import { useParams, Link } from "react-router-dom";
import { guides } from "../lib/data";
import { useState } from "react";
import { saveReservation } from "../lib/reservations";

export default function GuideDetail() {
  const { id } = useParams();
  const g = guides.find(x => x.id === id);
  const [date, setDate] = useState("");
  const [hours, setHours] = useState(2);
  const [notes, setNotes] = useState("");
  const [out, setOut] = useState("");

  if (!g) {
    return (
      <div style={{ fontFamily:"system-ui,Segoe UI,Arial", maxWidth: 800, margin:"32px auto", padding:16 }}>
        <p>Guía no encontrada.</p>
        <Link to="/guides">Volver</Link>
      </div>
    );
  }

  const onReserve = () => {
    if (!date) { setOut("Elegí una fecha"); return; }
    const amount = g.price * Number(hours);
    const res = saveReservation({ guideId: g.id, date, hours: Number(hours), notes, amount });
    setOut("Reserva creada (stub): " + JSON.stringify(res, null, 2));
  };

  return (
    <div style={{ fontFamily:"system-ui,Segoe UI,Arial", maxWidth: 800, margin:"32px auto", padding:16 }}>
      <Link to="/guides">← Volver</Link>
      <h1 style={{ display:"flex", alignItems:"center", gap:10 }}>
        <span style={{ fontSize:40 }}>{g.avatar}</span> {g.name}
      </h1>
      <div style={{ color:"#555" }}>{g.city}</div>
      <div>⭐ {g.rating} — ${g.price} ARS/h</div>

      <h3 style={{ marginTop:20 }}>Reservar</h3>
      <div style={{ display:"grid", gap:8, maxWidth: 420 }}>
        <label>Fecha <input type="date" value={date} onChange={e=>setDate(e.target.value)} /></label>
        <label>Horas <input type="number" min="1" value={hours} onChange={e=>setHours(e.target.value)} /></label>
        <label>Notas <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={3} /></label>
        <button onClick={onReserve}>Reservar (stub)</button>
      </div>

      {out && (
        <>
          <h4>Resultado</h4>
          <pre style={{ background:"#111", color:"#0f0", padding:12, borderRadius:8, whiteSpace:"pre-wrap" }}>{out}</pre>
        </>
      )}
    </div>
  );
}
