import { listReservations } from "../lib/reservations";
import { getGuide } from "../lib/data";

export default function Reservations(){
  const rows = listReservations().map(r => ({
    ...r,
    guide: getGuide(r.guideId)?.name ?? r.guideId
  }));

  return (
    <div style={{ fontFamily:"system-ui,Segoe UI,Arial", maxWidth: 900, margin:"24px auto", padding:16 }}>
      <h2>Mis Reservas</h2>
      {rows.length === 0 ? (
        <p>Aún no tenés reservas.</p>
      ) : (
        <table border="1" cellPadding="6" style={{ borderCollapse:"collapse", width:"100%" }}>
          <thead>
            <tr>
              <th>ID</th><th>Guía</th><th>Fecha</th><th>PAX</th><th>Creada</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.guide}</td>
                <td>{r.date}</td>
                <td>{r.pax}</td>
                <td>{new Date(r.ts).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
