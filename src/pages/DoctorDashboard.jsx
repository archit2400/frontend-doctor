import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");


  useEffect(() => {
    API.get("/appointments", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setAppointments(res.data))
      .catch(err => console.error("Error fetching appointments"))
      .finally(() => setLoading(false));
  }, []);

  
  const updateStatus = async (id, status) => {
    try {
      const res = await API.put(
        `/appointments/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      
      setAppointments(prev =>
        prev.map(a => (a._id === id ? res.data : a))
      );

    } catch (err) {
      console.error("Status update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Doctor Dashboard
        </h2>

        {loading && (
          <p className="text-gray-500 animate-pulse">
            Loading appointments...
          </p>
        )}

        {!loading && appointments.length === 0 && (
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-gray-500">No appointments yet</p>
          </div>
        )}

        <div className="space-y-4">
          {appointments.map(a => (
            <div
              key={a._id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="text-lg font-medium text-gray-700">
                  {a.patientName}
                </p>

                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium
                    ${
                      a.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : a.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {a.status || "pending"}
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-4">
                Time: {a.timeSlot}
              </p>

              <div className="flex gap-3">
                {/* Approve Button */}
                <button
                  disabled={a.status === "approved"}
                  onClick={() => updateStatus(a._id, "approved")}
                  className={`flex-1 py-2 rounded-lg text-white transition
                    ${
                      a.status === "approved"
                        ? "bg-green-300 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                >
                  Approve
                </button>

                {/* Reject Button */}
                <button
                  disabled={a.status === "rejected"}
                  onClick={() => updateStatus(a._id, "rejected")}
                  className={`flex-1 py-2 rounded-lg text-white transition
                    ${
                      a.status === "rejected"
                        ? "bg-red-300 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;