import { Link } from "react-router-dom";

export default function Home(){
  return (
    <div style={{ fontFamily:"system-ui,Segoe UI,Arial", maxWidth: 900, margin:"24px auto", padding:16 }}>
      <h1>iGuideU</h1>
      <p>Bienvenido. Probá el flujo completo con datos de prueba.</p>
      <ul style={{ lineHeight: 1.9 }}>
        <li><Link to="/guides">Ver guías</Link></li>
        <li><Link to="/reservations">Mis reservas</Link></li>
        <li><Link to="/pay">Pago (stub)</Link></li>
        <li><Link to="/login">Login</Link> / <Link to="/signup">Signup</Link></li>
      </ul>
      <small>BASE: {import.meta.env.VITE_API_BASE}</small>
    </div>
  );
}
