import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import LabServices from "./pages/LabServices.jsx";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Contact from "./pages/Contact.jsx";
import Book from "./pages/Book.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";


function LayoutWrapper() {
  const location = useLocation();
  const authRoutes = ["/login", "/signup", "/forgot-password"];
  const isResetPasswordRoute = location.pathname.startsWith("/reset-password");
  const shouldHideNavAndFooter = authRoutes.includes(location.pathname) || isResetPasswordRoute;
  
  return (
    <>
      {!shouldHideNavAndFooter && <Navbar />}
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<LabServices />} />
        <Route path="/book" element={<Book />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
      {!shouldHideNavAndFooter && <Footer />}
    </>
  );
}



function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  return (
    <>
      <Router>
        <LayoutWrapper user={user} />
      </Router>
    </>
  );
}

export default App;
