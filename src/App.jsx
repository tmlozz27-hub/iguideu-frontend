import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/Login.jsx";
import SignupPage from "./pages/Signup.jsx";
import Pay from "./pages/Pay.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: 12, borderBottom: "1px solid #ddd", fontFamily: "system-ui,Segoe UI,Arial" }}>
        <Link to="/login" style={{ marginRight: 12 }}>Login</Link>
        <Link to="/signup" style={{ marginRight: 12 }}>Signup</Link>
        <Link to="/pay">Pay</Link>
      </nav>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/pay" element={<Pay />} />
      </Routes>
    </BrowserRouter>
  );
}
