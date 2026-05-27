import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { Login } from "./component/Login";
import { Register } from "./component/Register";
import Menu from "./component/Menu";
import Navbar from "./component/Navbar";
import { AccountLedger } from "./component/AccountLedger";

function Home() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-2">Welcome!!!</h2>
      <p>Home page content here.</p>
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

function Transaction() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-2">Transaction</h2>
      <p>Transaction page content here.</p>
    </div>
  );
}

function App() {
  const location = useLocation();
  const hideMenuRoutes = ["/login", "/register"];
  const shouldHideMenu = hideMenuRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideMenu && <Navbar />}
      {!shouldHideMenu && <Menu />}

      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<AccountLedger />} />
      </Routes>
    </>
  );
}

export default App;
