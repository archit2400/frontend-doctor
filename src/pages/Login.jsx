import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      res.data.user.role === "doctor"
        ? navigate("/doctor")
        : navigate("/patient");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-200 via-blue-100 to-blue-300">

      <div className="bg-white shadow-2xl rounded-3xl p-8 w-96 transition transform hover:scale-[1.01]">

      
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🩺</div>
          <h2 className="text-2xl font-bold text-gray-800">MediTrack</h2>
          <p className="text-gray-500 text-sm">Smart Appointment System</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div className="flex items-center border rounded-lg px-3 focus-within:ring-2 focus-within:ring-blue-500">
            <span className="mr-2">📧</span>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 outline-none"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Password */}
          <div className="flex items-center border rounded-lg px-3 focus-within:ring-2 focus-within:ring-blue-500">
            <span className="mr-2">🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 outline-none"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <span
              className="text-sm text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* Button */}
          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition shadow-md hover:shadow-lg disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register */}
        <p className="text-sm text-center mt-5 text-gray-600">
          New user?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Create account
          </span>
        </p>

        {/* Footer */}
        <p className="text-xs text-center text-gray-400 mt-6">
          © 2026 MediTrack • Healthcare Simplified
        </p>

      </div>
    </div>
  );
}

export default Login;