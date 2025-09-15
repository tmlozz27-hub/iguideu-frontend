import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Guides from "./pages/Guides.jsx";
import GuideDetail from "./pages/GuideDetail.jsx";
import Reservations from "./pages/Reservations.jsx";
import Pay from "./pages/Pay.jsx";
import LoginPage from "./pages/Login.jsx";
import SignupPage from "./pages/Signup.jsx";

const Nav = () => (
  <nav style={{ padding: 12, borderBottom: "1px solid #ddd", fontFamily: "system-ui,Segoe UI,Arial" }}>
    <Link to="/" style={{ marginRight: 12 }}>Home</Link>
    <Link to="/guides" style={{ marginRight: 12 }}>Guides</Link>
    <Link to="/reservations" style={{ marginRight: 12 }}>Reservations</Link>
    <Link to="/pay" style={{ marginRight: 12 }}>Pay</Link>
    <span style={{ float:"right" }}>
      <Link to="/login" style={{ marginRight: 12 }}>Login</Link>
      <Link to="/signup">Signup</Link>
    </span>
  </nav>
);

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/guides/:id" element={<GuideDetail />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </>
  );
}
