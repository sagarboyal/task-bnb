import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Menu = () => {
  const [aboutOpen, setAboutOpen] = useState(false);
  const aboutRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (aboutRef.current && !aboutRef.current.contains(event.target)) {
        setAboutOpen(false);
      }
    }
    if (aboutOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [aboutOpen]);

  // Close About dropdown when route changes
  useEffect(() => {
    setAboutOpen(false);
  }, [location.pathname]);

  return (
    <nav className="w-full bg-white shadow flex items-center px-8 py-3">
      <ul className="flex items-center gap-8">
        <li>
          <Link
            to="/"
            className={`text-lg font-semibold transition-colors ${location.pathname === "/" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
          >
            Home
          </Link>
        </li>
        <li className="relative" ref={aboutRef}>
          <button
            className={`text-lg font-semibold flex items-center gap-1 focus:outline-none transition-colors ${location.pathname.startsWith("/about") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
            onClick={() => setAboutOpen((prev) => !prev)}
            type="button"
          >
            About
            <svg
              className="w-4 h-4 text-gray-500"
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
          {aboutOpen && (
            <div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
              <button
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => navigate("/about?section=team")}
              >
                Our Team
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => navigate("/about?section=mission")}
              >
                Mission
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => navigate("/about?section=careers")}
              >
                Careers
              </button>
            </div>
          )}
        </li>
        <li>
          <Link
            to="/contact"
            className={`text-lg font-semibold transition-colors ${location.pathname === "/contact" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
