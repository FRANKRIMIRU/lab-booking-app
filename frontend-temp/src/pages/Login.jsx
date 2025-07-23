import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loginImage from "../assets/signup.avif";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate()
  
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:5000/api/v1/auth/sign-in",
        { email, password },
        { withCredentials: true }
      )
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        alert(res.data.message);
        navigate("/");
      })
      .catch((err) => {
        console.error(err.message);
      });
  }


  return (
    <section className="relative bg-gray-50">
      {/* mobile heading */}
      <div className="block lg:hidden text-center py-6 px-4">
        <h1 className="text-3xl font-bold text-blue-600">
          Login
        </h1>
      </div>
      {/* Image + Overlay for larger screens */}
      <div className="relative w-full overflow-hidden shadow-md  block h-[80vh] lg:h-[90vh]">
        <img
          src={loginImage}
          alt="Contact Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-600/40 flex items-center p-8  ">
          <h1 className="hidden lg:block text-5xl font-bold text-white ">
            Login
          </h1>
        </div>

        <div className="absolute inset-0 flex justify-center  lg:justify-end p-12 h-full">
          <form
            onSubmit={handleSubmit}
            className="bg-white max-w-md w-full p-8 rounded shadow-lg space-y-4"
          >
            <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 p-3 rounded"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              className="w-full border border-gray-300 p-3 rounded"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Login
            </button>
            <p className="">
              Don't have an account?
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

     
  export default Login;           