import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">

        <h1
          className="font-semibold text-lg cursor-pointer tracking-wide"
          onClick={() => navigate(role === "doctor" ? "/doctor" : "/patient")}
        >
          MediTrack
        </h1>

        <div className="flex items-center gap-4">

          <span className="bg-white/20 px-3 py-1 rounded-full text-sm capitalize">
            {role}
          </span>

        
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/30 font-semibold">
            {role?.charAt(0).toUpperCase()}
          </div>

          <button
            onClick={logout}
            className="bg-white text-blue-600 px-4 py-1.5 rounded-lg font-medium hover:bg-blue-50 transition transform hover:scale-105"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;