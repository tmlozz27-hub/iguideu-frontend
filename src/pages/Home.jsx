import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div style={{ fontFamily:"system-ui,Segoe UI,Arial", maxWidth: 800, margin:"32px auto", padding:16 }}>
      <h1>iGuideU</h1>
      <p>Encontrá tu guía local y reservá en minutos.</p>
      <div style={{ display:"flex", gap:12 }}>
        <Link to="/guides">Ver guías</Link>
        <Link to="/reservations">Mis reservas</Link>
        <Link to="/pay">Pago (stub)</Link>
      </div>
    </div>
  );
}
