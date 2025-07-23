
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function LabServices() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tests", {
          withCredentials: true,
        });
        setTests(res.data);
      } catch (err) {
        setError("Failed to fetch tests");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  return (
    <section className="py-16 px-4 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-10">
        Explore Our Lab Services
      </h2>
{/*ternary operator which is nested */}
      {loading ? (
        <p className="text-center text-gray-500">Loading lab tests...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : tests.length === 0 ? (
        <p className="text-center text-gray-600">No lab tests available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tests.map((test) => (
            <Link to={`/book/${test._id}`} key={test._id}>
              <div className="bg-white p-6 rounded-lg shadow-md hover:bg-blue-50 transition">
                <h4 className="font-semibold text-xl mb-2">{test.name}</h4>
                <p className="text-sm mb-2 text-gray-600">
                  {test.description.length > 100
                    ? test.description.slice(0, 100) + "..."
                    : test.description}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  Category: {test.category}
                </p>
                <p className="text-lg font-bold text-green-700">
                  KES {test.price.toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default LabServices;