import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
<<<<<<< HEAD

const Menu = () => {
  const [aboutOpen, setAboutOpen] = useState(false);
=======
import { useAuth } from "../context/AuthContext"; // Import auth hook if you are protecting it

const Menu = () => {
  const [masterOpen, setMasterOpen] = useState(false);
>>>>>>> 210a85b79888dad9acb66359e8ea659ad2d5ca0d
  const aboutRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

<<<<<<< HEAD
  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (aboutRef.current && !aboutRef.current.contains(event.target)) {
        setAboutOpen(false);
      }
    }
    if (aboutOpen) {
=======
  useEffect(() => {
    function handleClickOutside(event) {
      if (aboutRef.current && !aboutRef.current.contains(event.target)) {
        setMasterOpen(false);
      }
    }
    if (masterOpen) {
>>>>>>> 210a85b79888dad9acb66359e8ea659ad2d5ca0d
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
<<<<<<< HEAD
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
=======
  }, [masterOpen]);

  useEffect(() => {
    setMasterOpen(false);
  }, [location.pathname]);

  return (
    <nav className="w-full bg-gray-50 border-b border-gray-200 flex justify-center py-2 px-6">
      {/* justify-center moves the entire ul list to the absolute middle */}
      <ul className="flex items-center gap-6">
        <li>
          <Link
            to="/"
            className={`text-xs font-medium tracking-wide uppercase transition-colors ${
              location.pathname === "/" ? "text-blue-600" : "text-gray-500 hover:text-blue-600"
            }`}
>>>>>>> 210a85b79888dad9acb66359e8ea659ad2d5ca0d
          >
            Home
          </Link>
        </li>
<<<<<<< HEAD
        <li className="relative" ref={aboutRef}>
          <button
            className={`text-lg font-semibold flex items-center gap-1 focus:outline-none transition-colors ${location.pathname.startsWith("/about") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
            onClick={() => setAboutOpen((prev) => !prev)}
            type="button"
          >
            About
            <svg
              className="w-4 h-4 text-gray-500"
=======
        
        <li className="relative" ref={aboutRef}>
          <button
            className={`text-xs font-medium tracking-wide uppercase flex items-center gap-1 focus:outline-none transition-colors ${
              location.pathname.startsWith("/about") ? "text-blue-600" : "text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => setMasterOpen((prev) => !prev)}
            type="button"
          >
            Master
            <svg
              className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${masterOpen ? "rotate-180" : ""}`}
>>>>>>> 210a85b79888dad9acb66359e8ea659ad2d5ca0d
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
<<<<<<< HEAD
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
=======
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
>>>>>>> 210a85b79888dad9acb66359e8ea659ad2d5ca0d
              </button>
            </div>
          )}
        </li>
<<<<<<< HEAD
        <li>
          <Link
            to="/contact"
            className={`text-lg font-semibold transition-colors ${location.pathname === "/contact" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
          >
            Contact
=======

        <li>
          <Link
            to="/transaction"
            className={`text-xs font-medium tracking-wide uppercase transition-colors ${
              location.pathname === "/transaction" ? "text-blue-600" : "text-gray-500 hover:text-blue-600"
            }`}
          >
            Transaction
>>>>>>> 210a85b79888dad9acb66359e8ea659ad2d5ca0d
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
