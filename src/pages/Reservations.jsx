import { getReservations } from "../lib/reservations";
import { guides } from "../lib/data";

export default function Reservations() {
  const list = getReservations();
  return (
    <div style={{ fontFamily:"system-ui,Segoe UI,Arial", maxWidth: 900, margin:"32px auto", padding:16 }}>
      <h1>Mis reservas</h1>
      {list.length === 0 && <p>No tenés reservas aún.</p>}
      <div style={{ display:"grid", gap:12 }}>
        {list.map(r => {
          const g = guides.find(x => x.id === r.guideId);
          return (
            <div key={r.id} style={{ border:"1px solid #ddd", borderRadius:12, padding:16 }}>
              <div><strong>Guía:</strong> {g ? g.name : r.guideId}</div>
              <div><strong>Fecha:</strong> {r.date} — <strong>Horas:</strong> {r.hours}</div>
              <div><strong>Notas:</strong> {r.notes || "-"}</div>
              <div><strong>Importe:</strong> ${r.amount} ARS</div>
              <div style={{ color:"#777", marginTop:6 }}><small>ID: {r.id}</small></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
