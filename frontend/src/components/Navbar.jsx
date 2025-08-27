import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("token");

  const isAuthPage = location.pathname === "/" || location.pathname === "/register";

  const navBg = isAuthPage
    ? "bg-teal-700"
    : "bg-indigo-900 shadow-md border-b border-indigo-800";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav
      className={`${navBg} text-white px-8 py-3 flex justify-between items-center transition-all duration-300`}
    >
      {/* Left Side: Logo + Title */}
      <div className="flex items-center space-x-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/888/888879.png" // Replace with your logo
          alt="Logo"
          className="w-10 h-10 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <h1
          className="text-2xl font-extrabold tracking-wide cursor-pointer"
          onClick={() => navigate("/")}
        >
          InsightGrid
        </h1>
      </div>

      {/* Right Side Menu */}
      <div className="flex items-center space-x-6">
        <Link to="/about" className="hover:text-yellow-300 transition">
          About Us
        </Link>

        {!isLoggedIn ? (
          <>
            <Link to="/" className="hover:text-yellow-300 transition">Login</Link>
            <Link to="/register" className="hover:text-yellow-300 transition">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="hover:text-yellow-300 transition">Dashboard</Link>
            <div className="relative group">
              <img
                src="https://cdn-icons-png.freepik.com/512/10302/10302971.png"
                alt="User"
                className="w-9 h-9 rounded-full cursor-pointer border border-white shadow"
              />
              <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                <button
                  onClick={() => navigate("/profile")}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
