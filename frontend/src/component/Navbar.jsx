import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 
import { useAuth } from "../context/AuthContext"; 

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const navigate = useNavigate();
  const { user, loading, setUser } = useAuth(); 

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  if (loading || !user) return null;

  const handleLogout = (e) => {
    e.preventDefault(); 
    setOpen(false); 
    setUser(null); 
    navigate("/login"); 
  };
  
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <nav className="w-full bg-white shadow flex items-center justify-between px-6 py-3">
      {/* Left: Branding */}
      <div className="text-xl font-bold text-gray-800">MyBrand</div>

      {/* Right: Profile */}
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center space-x-2 focus:outline-none"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
            {userInitial}
          </span>
          <span className="text-sm font-medium text-gray-700 hidden md:inline">
            {user?.name || "User"}
          </span>
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 font-semibold"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
