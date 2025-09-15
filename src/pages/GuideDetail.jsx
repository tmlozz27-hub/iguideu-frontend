import { useParams, Link } from "react-router-dom";
import { getGuide } from "../lib/data";
import { addReservation } from "../lib/reservations";
import { useState } from "react";

export default function GuideDetail(){
  const { id } = useParams();
  const g = getGuide(id);
  const [date, setDate] = useState("");
  const [pax, setPax] = useState(2);
  const [out, setOut] = useState("");

  if(!g){
    return (
      <div style={{ fontFamily:"system-ui,Segoe UI,Arial", maxWidth: 900, margin:"24px auto", padding:16 }}>
        <p>No existe la guía.</p>
        <Link to="/guides">Volver</Link>
      </div>
    );
  }

  const onReserve = () => {
    if(!date) return setOut("Elegí fecha.");
    const r = addReservation({ guideId: g.id, date, pax });
    setOut("Reserva creada: "+r.id);
  };

  return (
    <div style={{ fontFamily:"system-ui,Segoe UI,Arial", maxWidth: 900, margin:"24px auto", padding:16 }}>
      <Link to="/guides">← Volver</Link>
      <h2 style={{ marginTop: 8 }}>{g.name}</h2>
      <div>Idiomas: {g.languages.join(", ")}</div>
      <div>Rating: {g.rating}</div>
      <div>Tarifa base: ${g.price}</div>
      <p style={{ color:"#666" }}>{g.bio}</p>

      <h3>Reservar</h3>
      <div style={{ margin:"8px 0" }}>
        <label style={{ marginRight:8 }}>Fecha</label>
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
      </div>
      <div style={{ margin:"8px 0" }}>
        <label style={{ marginRight:8 }}>PAX</label>
        <input type="number" min={1} value={pax} onChange={e=>setPax(e.target.value)} />
      </div>
      <button onClick={onReserve}>Reservar</button>

      <div style={{ marginTop: 12 }}>{out}</div>
    </div>
  );
}
