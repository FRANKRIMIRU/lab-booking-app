import axios from "axios";
import { useEffect, useState } from "react";

function AdminDashboard() {
  const [userCount, setUserCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
 const [showTests, setShowTests] = useState(false);
  const [bookings, setBookings] = useState(0);
  const [availability, setAvailability] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [tests, setTests] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);




 const handleDelete = async (id) => {
   if (!window.confirm("Are you sure you want to delete this test?")) return;
   try {
     await axios.delete(`http://localhost:5000/api/v1/tests/${id}`, {
       withCredentials: true,
     });
     setTests((prev) => prev.filter((test) => test._id !== id));
   } catch (err) {
     console.error("Failed to delete test", err);
   }
 };

 const handleAddTest = async (e) => {
   e.preventDefault();

   try {
     if (isEditing && currentId) {
       // EDIT flow
       const res = await axios.put(
         `http://localhost:5000/api/v1/tests/${currentId}`,
         {
           name,
           category,
           price,
           description,
           availability
         },
         { withCredentials: true }
       );

       setTests((prev) =>
         prev.map((test) => (test._id === currentId ? res.data : test))
       );

       // ✅ Reset form and state after editing
       setIsEditing(false);
       setCurrentId(null);
     } else {
       // ADD flow
       const res = await axios.post(
         "http://localhost:5000/api/v1/tests",
         {
           name,
           category,
           price,
           description,
           availability
         },
         { withCredentials: true }
       );

       setTests((prev) => [res.data, ...prev]);
     }

     // ✅ Common reset actions for both edit and add
     setShowAddForm(false);
     setName("");
     setCategory("");
     setPrice("");
     setAvailability(false)
     setDescription("");
   } catch (err) {
     console.error(isEditing ? "Edit Test Failed": "Add Test Failed", err);
   }
 };

     
  
  const handleEdit = (test) => {
    setShowAddForm(true); // open the form if it's closed
    setIsEditing(true);
    setCurrentId(test._id);
    setName(test.name);
    setCategory(test.category);
    setPrice(test.price);
     setAvailability(test.availability);
    setDescription(test.description || "");
  };

  useEffect(() => {
    function fetchBookings() {
      axios.get("http://localhost:5000/api/v1/bookings", {
       withCredentials:true,
      })
        .then((res) => { setBookings(res.data) })
      .catch((err)=> console.error("Failed to fetch bookings", err))
    }
    function fetchCount() {
      axios
        .get("http://localhost:5000/api/v1/admin/count", {
          withCredentials: true,
        })
        .then((res) => {
          setUserCount(res.data.userCount);
        })
        .catch((err) => console.error("Failed to fetch user count", err));
    }
    function fetchUsers() {
      axios.get("http://localhost:5000/api/v1/users", {
    withCredentials:true,
      })
        .then((res) => {
          const sorted = res.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setUsers(sorted);
        })
      .catch((err) => console.error("Failed to fetch users", err))
    }
    function fetchTests() {
      axios.get("http://localhost:5000/api/v1/tests", { withCredentials: true })
      .then((res) => {
        setTests(res.data)
      })
      .catch((err)=> console.error('Failed to fetch tests',err))
    }
    fetchTests()
    fetchCount();
    fetchUsers();
    fetchBookings();
    const interval = setInterval(()=>{
      fetchCount();
      fetchUsers();
       fetchUsers();
       fetchBookings();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Admin Dashboard</h1>

      {/* Section: Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-sm text-gray-500">Total Users</h2>
          <p className="text-2xl font-bold text-blue-600">{userCount}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-sm text-gray-500">Total Lab Tests</h2>
          <p className="text-2xl font-bold text-blue-600">{tests.length}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-sm text-gray-500">Bookings</h2>
          <p className="text-2xl font-bold text-blue-600">{bookings.length}</p>
        </div>
      </div>

      {/* Section: Lab Test Controls */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold mb-4 ">Manage Lab Tests</h2>
          <button
            onClick={() => setShowTests((prev) => !prev)}
            className="bg-blue-600 text-white px-4 py-2 rounded:hover:bg-blue-700 cursor-pointer"
          >
            {showTests ? "Hide  Tests" : "Show  test"}
          </button>
        </div>

        {showAddForm && (
          <form
            onSubmit={handleAddTest}
            className="my-4 space-y-4 bg-white border p-4 text-sm grid grid-cols-1 md:grid-cols-1 gap-4"
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border w-full p-2"
              placeholder="Test Name"
            />
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border w-full p-2"
              placeholder="Category"
            />
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border w-full p-2"
              placeholder="Price (KES)"
            />
            <input
              type="string"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="border w-full p-2"
              placeholder="Availability"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border w-full p-2"
              placeholder="Description"
            />
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer "
              >
                {isEditing ? "Save changes" : "Add Test"}
              </button>
              <button
                type="submit"
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
                onClick={() => {
                  setShowAddForm(false);
                  setIsEditing(false);
                  setCurrentId(null);
                  setName("");
                  setCategory("");
                  setPrice("");
                  setAvailability("");
                  setDescription("");
                  }}
              >
                Cancel Test
              </button>
            </div>
          </form>
        )}

        {showTests && tests.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border text-sm">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Category</th>
                  <th className="p-2 border">Price</th>
                  <th className="p-2 border">Availability</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tests.map((t, i) => (
                  <tr key={t._id}>
                    <td className="p-2 border">{i + 1}</td>
                    <td className="p-2 border">{t.name}</td>
                    <td className="p-2 border">{t.category}</td>
                    <td className="p-2 border">Ksh {t.price}</td>
                    <td className="p-2 border">
                      {t.availability ? "Yes" : "No"}
                    </td>
                    <td className="p-2 border space-x-2">
                      <button
                        onClick={() => handleEdit(t)}
                        className="text-blue-600 hover:cursor-pointer "
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(t._id)}
                        className="text-red-500 hover:cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center">
            {!showAddForm && (
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                + Add Test
              </button>
            )}
          </div>
        )}

        {tests.length === 0 && (
          <div className="text-gray-500 text-center py-6">No tests yet.</div>
        )}
      </div>
      {/*users list */}
      <div className="bg-white p-6 rounded-lg shadow mt-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold mb-4">Show Users</h2>
          <button
            onClick={() => setShowUsers((prev) => !prev)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {showUsers ? "Hide Users" : "Show Users"}
          </button>
        </div>

        {showUsers && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border text-sm">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Role</th>
                  <th className="p-2 border">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={u._id}>
                    <td className="p-2 border">{i + 1}</td>
                    <td className="p-2 border capitalize">{u.name}</td>
                    <td className="p-2 border">{u.email}</td>
                    <td className="p-2 border capitalize">{u.role}</td>
                    <td className="p-2 border">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
