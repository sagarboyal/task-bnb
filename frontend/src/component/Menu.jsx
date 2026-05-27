import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Menu = () => {
  const [masterOpen, setMasterOpen] = useState(false);
  const aboutRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (aboutRef.current && !aboutRef.current.contains(event.target)) {
        setMasterOpen(false);
      }
    }
    if (masterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [masterOpen]);

  useEffect(() => {
    setMasterOpen(false);
  }, [location.pathname]);

  return (
    <nav className="w-full bg-gray-50 border-b border-gray-200 flex justify-center py-2 px-6">
      <ul className="flex items-center gap-6">
        <li>
          <Link
            to="/"
            className={`text-xs font-medium tracking-wide uppercase transition-colors ${
              location.pathname === "/" ? "text-blue-600" : "text-gray-500 hover:text-blue-600"
            }`}
          >
            Home
          </Link>
        </li>

        <li className="relative" ref={aboutRef}>
          <button
            className={`text-xs font-medium tracking-wide uppercase flex items-center gap-1 focus:outline-none transition-colors ${
              location.pathname.startsWith("/account") ? "text-blue-600" : "text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => setMasterOpen((prev) => !prev)}
            type="button"
          >
            Master
            <svg
              className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${masterOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {masterOpen && (
            <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-md z-20 py-1">
              <button
                className="block w-full text-left px-4 py-2 text-xs text-gray-600 hover:bg-gray-50 hover:text-blue-600 font-medium transition-colors"
                onClick={() => navigate("/account")}
              >
                Account Ledger
              </button>
            </div>
          )}
        </li>

        <li>
          <Link
            to="/transaction"
            className={`text-xs font-medium tracking-wide uppercase transition-colors ${
              location.pathname === "/transaction" ? "text-blue-600" : "text-gray-500 hover:text-blue-600"
            }`}
          >
            Transaction
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
