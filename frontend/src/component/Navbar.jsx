import { useState, useRef, useEffect } from "react";
<<<<<<< HEAD
=======
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../api/service";
>>>>>>> 210a85b79888dad9acb66359e8ea659ad2d5ca0d

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

<<<<<<< HEAD
=======
  const navigate = useNavigate();
  const { user, loading, setUser } = useAuth();

>>>>>>> 210a85b79888dad9acb66359e8ea659ad2d5ca0d
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

<<<<<<< HEAD
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
          <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold">
            P
          </span>
          <svg
            className="w-4 h-4 text-gray-600"
=======
  if (loading || !user) return null;

  const handleLogout = async (e) => {
    e.preventDefault();
    setOpen(false);
    try {
      await logoutUser();
    } catch (error) {
      console.error("Backend logout failed:", error);
    } finally {
      setUser(null);
      navigate("/login");
    }
  };

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <nav className="w-full bg-white border-b border-gray-100 flex items-center justify-between px-8 py-3.5">
      <div className="flex items-center">
        <span className="text-lg font-bold text-gray-800">MyBrand</span>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-full hover:bg-gray-50 active:bg-gray-100 transition-colors duration-150 focus:outline-none"
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white text-xs font-semibold shadow-sm ring-2 ring-blue-50">
            {userInitial}
          </div>
          {/* FIXED: Changed {user} to {user?.name} */}
          <span className="text-xs font-semibold text-gray-700 hidden md:inline tracking-wide">
            {user || "User"}
          </span>
          <svg
            className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
>>>>>>> 210a85b79888dad9acb66359e8ea659ad2d5ca0d
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
<<<<<<< HEAD
              strokeWidth={2}
=======
              strokeWidth={2.5}
>>>>>>> 210a85b79888dad9acb66359e8ea659ad2d5ca0d
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
<<<<<<< HEAD
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Logout
            </a>
=======

        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-30 py-1.5">
            <div className="px-4 py-2 border-b border-gray-50">
              {/* FIXED: Changed {user} to {user?.name} */}
              <p className="text-xs font-semibold text-gray-800 truncate">
                {user || "User"}
              </p>
              <p className="text-[10px] text-gray-400 truncate mt-0.5">
                {user?.email || "Signed In"}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 font-medium transition-colors"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
>>>>>>> 210a85b79888dad9acb66359e8ea659ad2d5ca0d
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
