import { useState } from "react";
import { login } from "../lib/auth";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("demo@iguideu.com");
  const [password, setPassword] = useState("demo1234");
  const [out, setOut] = useState("");
  const nav = useNavigate();

  const onLogin = async () => {
    setOut("Enviando...");
    try {
      const data = await login({ email, password });
      setOut(JSON.stringify(data, null, 2));
      setTimeout(() => nav("/pay"), 400);
    } catch (e) {
      setOut("Error: " + (e?.message ?? e));
    }
  };

  return (
    <div style={{ fontFamily: "system-ui,Segoe UI,Arial", maxWidth: 420, margin: "40px auto", padding: 16 }}>
      <h1>Login</h1>
      <div style={{ margin: "8px 0" }}>
        <label style={{ display:"block" }}>Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} style={{ width:"100%" }} />
      </div>
      <div style={{ margin: "8px 0" }}>
        <label style={{ display:"block" }}>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width:"100%" }} />
      </div>
      <button onClick={onLogin}>Ingresar</button>
      <div style={{ marginTop: 12 }}>
        <Link to="/signup">Crear cuenta</Link>
      </div>
      <h3>Respuesta</h3>
      <pre style={{ background:"#111", color:"#0f0", padding:12, borderRadius:8, whiteSpace:"pre-wrap" }}>{out}</pre>
      <small>BASE: {import.meta.env.VITE_API_BASE}</small>
    </div>
  );
}
