import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";

function Home() {
  return (
    <div className="p-8">
      <p className="text-3xl font-bold underline">Hello world</p>
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

function Contact() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-2">Contact</h2>
      <p>Contact page content here.</p>
    </div>
  );
}

function App() {
  const location = useLocation();
  return (
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default App;
