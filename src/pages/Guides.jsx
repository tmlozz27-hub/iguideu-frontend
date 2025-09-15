import { Link } from "react-router-dom";
import { guides } from "../lib/data";

export default function Guides(){
  return (
    <div style={{ fontFamily:"system-ui,Segoe UI,Arial", maxWidth: 900, margin:"24px auto", padding:16 }}>
      <h2>Guías</h2>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:12 }}>
        {guides.map(g => (
          <div key={g.id} style={{ border:"1px solid #ddd", borderRadius:12, padding:12 }}>
            <h3 style={{ margin:"4px 0" }}>{g.name}</h3>
            <div>Idiomas: {g.languages.join(", ")}</div>
            <div>Rating: {g.rating}</div>
            <div>Desde: ${g.price}</div>
            <p style={{ color:"#666" }}>{g.bio}</p>
            <Link to={`/guides/${g.id}`}>Ver detalle</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
