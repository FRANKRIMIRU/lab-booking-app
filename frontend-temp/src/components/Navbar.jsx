import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600 hover:text-blue-700 cursor-pointer">
          <Link to="/"></Link>
          LabBooking
        </h1>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <Link to="/services" className="hover:text-blue-600">
              Services
            </Link>
          </li>
          <li>
            <Link to="/book" className="hover:text-blue-600">
              Book
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-blue-600">
              Contact
            </Link>
          </li>
          {/* ✅ Show Admin Dashboard only if user is admin */}
          {user?.role === "admin" && location.pathname === "/" && (
            <li>
              <Link to="/admin-dashboard">Admin dashboard</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
