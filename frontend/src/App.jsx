import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
<<<<<<< HEAD
=======
import { Login } from "./component/Login";
import { Register } from "./component/Register";
import Menu from "./component/Menu";
import Navbar from "./component/Navbar";
import { AccountLedger } from "./component/AccountLedger";
>>>>>>> 210a85b79888dad9acb66359e8ea659ad2d5ca0d

function Home() {
  return (
    <div className="p-8">
<<<<<<< HEAD
      <p className="text-3xl font-bold underline">Hello world</p>
=======
      <h2 className="text-2xl font-bold mb-2">Welcome!!!</h2>
      <p>Home page content here.</p>
>>>>>>> 210a85b79888dad9acb66359e8ea659ad2d5ca0d
    </div>
  );
}

function About() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-2">About Us</h2>
      <p>About page content here.</p>
    </div>
  );
}

<<<<<<< HEAD
function Contact() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-2">Contact</h2>
      <p>Contact page content here.</p>
=======
function Transaction() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-2">Transaction</h2>
      <p>Transaction page content here.</p>
>>>>>>> 210a85b79888dad9acb66359e8ea659ad2d5ca0d
    </div>
  );
}

function App() {
  const location = useLocation();
<<<<<<< HEAD
  return (
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
=======

  const hideMenuRoutes = ["/login", "/register"];
  const shouldHideMenu = hideMenuRoutes.includes(location.pathname);

  return (
    <>
      {/* Only show the Menu if the current path is NOT login or register */}
      {!shouldHideMenu && <Navbar />}
      {!shouldHideMenu && <Menu />}
      
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/account" element={<AccountLedger/>} />
      </Routes>
    </>
>>>>>>> 210a85b79888dad9acb66359e8ea659ad2d5ca0d
  );
}

export default App;
