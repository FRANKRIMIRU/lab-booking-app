import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function Book({user}) {
  const [userName, setUserName] = useState("");
const location = useLocation();
const selectedTest = location.state?.testName || "";

  const [formData, setFormData] = useState({
    name: user?.name ||"",
    email: user?.email||"",
    date: "",
    testType: selectedTest,
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user")); // Or from auth context
      if (user) {
        setFormData((prev) => ({
          ...prev,
          name: user.name,
          email: user.email,
        }));
      }
    }, [user]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/v1/bookings", formData)
      .then((res) => {
        setUserName(formData.name);
        setFormData({ name: "", email: "", date: "", testType: "" });
        console.log(res.data);
        setBookingSuccess(true);
      })
      .catch((err) => {
        console.error("Booking failed:", err);
        alert("Booking failed,please try again")
      });
  };

  if (bookingSuccess) {
    return (
      <section className="py-16 px-4 bg-white min-h-screen">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-700">
            Booking Successful!
          </h2>
          <p className="mb-6 text-lg">
            Thank you <span className="font-semibold">{userName}</span>.
            Your lab test has been booked.
          </p>
          <Link
            to="/"
            className="inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Back to Home
          </Link>
        </div>
      </section>
    );
  } else 
  

  return (
    <section className="py-16 px-4 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Book a Lab Test</h2>
        <p className="mb-6">Fill out the form to schedule your appointment.</p>

        <form className="space-y-4 text-left" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded"
          />
          <input
            type="date"
            name="date"
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded"
          />
          <input
            className="w-full border border-gray-300 p-3 rounded"
            name="testType"
            value={formData.testType}
            onChange={handleChange}
          >
          </input>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Book Now
          </button>
        </form>
      </div>
    </section>
  );
}

export default Book;
