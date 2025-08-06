
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import bloodIcon from "../assets/blood-drop.png";
import covidIcon from "../assets/virus.png";
import urineTest from "../assets/reagent-strip.png";

function LabServices() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/tests", {
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8  max-w-6xl mx-auto">
        <Link to="/services#blood-test" className="block">
          <div className="bg-white p-7 mb-5 shadow-md rounded-lg hover:shadow-lg transition duration-300 hover:bg-red-200">
            <div className="flex justify-center">
              <img src={bloodIcon} alt="blood test" className="w-26" />
            </div>
            <h4 className="font-bold">Blood Test</h4>
            <p>Accurate and fast blood tests.</p>
          </div>
        </Link>

        <Link to="/services#covid-test" className="block">
          <div className="bg-white p-7  shadow-md rounded-lg hover:shadow-lg transition duration-300 hover:bg-green-200">
            <div className="flex justify-center">
              <img src={covidIcon} alt="covid-19 test" className="w-26" />
            </div>
            <h4 className="font-bold">COVID-19 Test</h4>
            <p>RT-PCR and Antigen options.</p>
          </div>
        </Link>
        <Link to="/services#urine-test" className="block">
          <div className="bg-white p-7 shadow-md rounded-lg hover:shadow-lg transition duration-300 hover:bg-yellow-200">
            <div className="flex justify-center">
              <img src={urineTest} alt="urine analysis" className="w-26" />
            </div>
            <h4 className="font-bold">Urine Analysis</h4>
            <p>Detailed urinalysis report.</p>
          </div>
        </Link>
      </div>
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
            <Link to="/book" state={{ testName: test.name }} key={test._id}>
              <div className="bg-white p-6 rounded-lg shadow-md hover:bg-blue-50 transition flex flex-col justify-between min-h-[200px]">
                <div className="flex justify-center ">
                  <span className="text-4xl">{test.emoji}</span>
                </div>
                <h4 className="font-semibold text-xl mb-2 flex justify-center">
                  {test.name}
                </h4>
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