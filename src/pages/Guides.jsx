import { Link } from "react-router-dom";
import { guides } from "../lib/data";

export default function Guides() {
  return (
    <div style={{ fontFamily:"system-ui,Segoe UI,Arial", maxWidth: 900, margin:"32px auto", padding:16 }}>
      <h1>Guías disponibles</h1>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:16 }}>
        {guides.map(g => (
          <div key={g.id} style={{ border:"1px solid #ddd", borderRadius:12, padding:16 }}>
            <div style={{ fontSize:32 }}>{g.avatar}</div>
            <h3 style={{ margin:"8px 0" }}>{g.name}</h3>
            <div style={{ color:"#555" }}>{g.city}</div>
            <div style={{ margin:"6px 0" }}>⭐ {g.rating} — ${g.price} ARS/h</div>
            <Link to={`/guides/${g.id}`}>Ver perfil</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
