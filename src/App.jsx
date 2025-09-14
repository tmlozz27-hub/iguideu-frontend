import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Guides from "./pages/Guides.jsx";
import GuideDetail from "./pages/GuideDetail.jsx";
import Reservations from "./pages/Reservations.jsx";
import LoginPage from "./pages/Login.jsx";
import SignupPage from "./pages/Signup.jsx";
import Pay from "./pages/Pay.jsx";

export default function App() {
  const navStyle = { padding: 12, borderBottom: "1px solid #ddd", fontFamily: "system-ui,Segoe UI,Arial", display:"flex", gap:12 };
  return (
    <BrowserRouter>
      <nav style={navStyle}>
        <Link to="/">Home</Link>
        <Link to="/guides">Guías</Link>
        <Link to="/reservations">Reservas</Link>
        <span style={{ marginLeft:"auto" }}>
          <Link to="/login" style={{ marginRight: 12 }}>Login</Link>
          <Link to="/signup" style={{ marginRight: 12 }}>Signup</Link>
          <Link to="/pay">Pay</Link>
        </span>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/guides" element={<Guides />} />
        <Route path="/guides/:id" element={<GuideDetail />} />
        <Route path="/reservations" element={<Reservations />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/pay" element={<Pay />} />
      </Routes>
    </BrowserRouter>
  );
}
