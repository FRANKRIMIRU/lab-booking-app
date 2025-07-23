import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import signImage from "../assets/signup.avif"


function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/api/v1/auth/sign-up",
        { name, email, password,adminCode: isAdmin? adminCode :undefined, },
       {withCredentials:true}
      )
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
        console.log(res);
      })
      .catch((error) => console.error("Sign up failed:", error));
   

}

  return (
    <section className="relative bg-gray-50">
      {/* Mobile heading */}
      <div className="block lg:hidden text-center py-6 px-4">
        <h1 className="text-3xl font-bold text-blue-600">Sign Up Today</h1>
      </div>

      <div className="relative w-full overflow-hidden shadow-md block h-[80vh] lg:h-[90vh] ">
        <div>
          <div className="absolute inset-0 bg-blue-600/40 flex items-center p-8  ">
            <h1 className="hidden lg:block text-5xl font-bold text-white ">
              Sign Up Today
            </h1>
          </div>
          <div className="relative w-full overflow-hidden shadow-md block h-[80vh] lg:h-[90vh]">
            <img
              src={signImage}
              alt="Sign Up Banner"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-blue-600/40 flex items-center p-8  ">
            <h1 className="hidden lg:block text-5xl font-bold text-white ">
              Sign Up Today
            </h1>
          </div>
        </div>

        <div className="absolute inset-0 flex justify-center  lg:justify-end p-12 h-full">
          <form
            className="bg-white max-w-md w-full p-8 rounded shadow-lg space-y-4 "
            onSubmit={Submit}
          >
            <label
              htmlFor="name"
              className="block text-sm text-gray-700 font-medium m-2"
            >
              Name
              <span className="text-red-500"> *</span>
            </label>
            <input
              placeholder="Name"
              type="text"
              className="w-full border border-gray-300 p-3 rounded"
              onChange={(e) => setName(e.target.value)}
            />
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 p-3 rounded"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
              <span className="text-red-500">*</span>
            </label>
            <input
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="Password"
              className="w-full border border-gray-300 p-3 rounded"
              onChange={(e) => setPassword(e.target.value)}
            />

            <label className="block">
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                className="mr-2"
              />
              Are you an admin?
            </label>

            {isAdmin && (
              <input
                type="text"
                placeholder="Enter Admin Code"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
                className="border p-2 w-full"
              />
            )}
            <button className="w-full border rounded px-2 py-3 bg-blue-600 text-white hover:cursor-pointer  ">
              Submit
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
export default SignUp;