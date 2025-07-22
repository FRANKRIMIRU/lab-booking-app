import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Book() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    testType: "",
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/v1/bookings", formData)
      .then((res) => {
        setFormData({ name: "", email: "", date: "", testType: "" });
        console.log(res.data);
        setBookingSuccess(true);
      })
      .catch((err) => {
        console.error("Booking failed:", err);
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
            Thank you<span className="font-semibold">{formData.name}</span>.
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
  }

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
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded"
          />
          <input
            type="date"
            name="date"
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded"
          />
          <select
            className="w-full border border-gray-300 p-3 rounded"
            name="testType"
            onChange={handleChange}
          >
            <option value="disabled selected">Select test</option>
            <option>Blood Test</option>
            <option>COVID-19 Test</option>
            <option>Urine Analysis</option>
            <option>Other</option>
          </select>
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
