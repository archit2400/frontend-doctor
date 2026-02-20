import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await API.post("/auth/register", form);
      setSuccess(true);
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-green-200 via-green-100 to-green-300">

      <div className="bg-white shadow-2xl rounded-3xl p-8 w-96 transition transform hover:scale-[1.01]">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🩺</div>
          <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-500 text-sm">Join MediTrack today</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-700 text-sm p-2 rounded mb-4 text-center">
            Registered successfully 🎉 Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

           <div className="flex items-center border rounded-lg px-3 focus-within:ring-2 focus-within:ring-green-500">
            <span className="mr-2">👤</span>
            <input
              placeholder="Full Name"
              className="w-full p-3 outline-none"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          
          <div className="flex items-center border rounded-lg px-3 focus-within:ring-2 focus-within:ring-green-500">
            <span className="mr-2">📧</span>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 outline-none"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

      
          <div className="flex items-center border rounded-lg px-3 focus-within:ring-2 focus-within:ring-green-500">
            <span className="mr-2">🔒</span>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 outline-none"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

        
          <select
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>

          <button
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition shadow-md hover:shadow-lg disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        
        <p className="text-sm text-center mt-5 text-gray-600">
          Already have an account?{" "}
          <span
            className="text-green-600 cursor-pointer hover:underline"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>

        
        <p className="text-xs text-center text-gray-400 mt-6">
          © 2026 MediTrack • Healthcare Simplified
        </p>
      </div>
    </div>
  );
}

export default Register;