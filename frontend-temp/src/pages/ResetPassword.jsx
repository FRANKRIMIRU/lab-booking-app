// pages/ResetPassword.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/email/reset-password", {
        token,
        password,
      });
      alert("Password reset successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <form onSubmit={handleReset} className="  p-4  max-w-md mx-auto ">
      <h2 className="text-xl font-bold mb-4">Reset Password</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="New password"
        className="w-full border border-gray-300 p-3 rounded mb-3"
      />
      <button type="submit" className=" bg-green-500 text-white px-4 py-2 rounded">
        Reset Password
      </button>
    </form>
  );
}
