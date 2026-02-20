import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function PatientDashboard() {
  const doctorsByDepartment = {
    Cardiology: ["Dr. Archit", "Dr. Himanu", "Dr. Himanshi"],
  Neurology: ["Dr. Raghu", "Dr. Dev", "Dr. Kaur"],
  Orthopedics: ["Dr. Adarsh", "Dr. Ankita", "Dr. Bansal"],
  Pediatrics: ["Dr. Jain", "Dr. Khanna", "Dr. Sethi"],
  Dermatology: ["Dr. Mehta", "Dr. Arora", "Dr. Gill"],
  Gynecology: ["Dr. Sharma", "Dr. Kiran", "Dr. Pooja"],
  Ophthalmology: ["Dr. Verma", "Dr. Chopra", "Dr. Nanda"],
  ENT: ["Dr. Kapoor", "Dr. Bhalla", "Dr. Sandhu"],
  Psychiatry: ["Dr. Malhotra", "Dr. Sidhu", "Dr. Oberoi"],
  GeneralMedicine: ["Dr. Gupta", "Dr. Chawla", "Dr. Bajaj"]
  };

  const [form, setForm] = useState({
    department: "",
    doctorName: "",
    patientName: "",
    date: "",
    timeSlot: ""
  });

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const token = localStorage.getItem("token");

  /* ================= FETCH APPOINTMENTS ================= */
  const fetchAppointments = async () => {
    const res = await API.get("/appointments", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setAppointments(res.data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDepartmentChange = (e) => {
    setForm({
      ...form,
      department: e.target.value,
      doctorName: ""
    });
  };

  /* ================= BOOK APPOINTMENT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    await API.post("/appointments", form, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setLoading(false);
    setSuccess(true);

    fetchAppointments(); // refresh list

    setForm({
      department: "",
      doctorName: "",
      patientName: "",
      date: "",
      timeSlot: ""
    });
  };

  const doctorOptions = doctorsByDepartment[form.department] || [];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto p-6">

        {/* ================= BOOK FORM ================= */}
        <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Book Appointment
          </h2>

          {success && (
            <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700 text-sm">
              Appointment booked successfully 🎉
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>

            <select
              value={form.department}
              onChange={handleDepartmentChange}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Department</option>
              {Object.keys(doctorsByDepartment).map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            <select
              value={form.doctorName}
              onChange={(e) =>
                setForm({ ...form, doctorName: e.target.value })
              }
              disabled={!form.department}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Doctor</option>
              {doctorOptions.map(doc => (
                <option key={doc} value={doc}>{doc}</option>
              ))}
            </select>

            <input
              value={form.patientName}
              placeholder="Patient Name"
              className="w-full border rounded-lg p-3"
              onChange={(e) =>
                setForm({ ...form, patientName: e.target.value })
              }
            />

            <input
              type="date"
              value={form.date}
              className="w-full border rounded-lg p-3"
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
            />

            <input
              value={form.timeSlot}
              placeholder="Time Slot"
              className="w-full border rounded-lg p-3"
              onChange={(e) =>
                setForm({ ...form, timeSlot: e.target.value })
              }
            />

            <button
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
            >
              {loading ? "Booking..." : "Book Appointment"}
            </button>

          </form>
        </div>

        {/* ================= APPOINTMENT LIST ================= */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            My Appointments
          </h2>

          {appointments.length === 0 && (
            <p className="text-gray-500">No appointments yet</p>
          )}

          <div className="space-y-3">
            {appointments.map(a => (
              <div
                key={a._id}
                className="flex justify-between items-center border p-3 rounded-lg"
              >
                <div>
                  <p className="font-medium">{a.doctorName}</p>
                  <p className="text-sm text-gray-500">
                    {a.date} • {a.timeSlot}
                  </p>
                </div>

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
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default PatientDashboard;