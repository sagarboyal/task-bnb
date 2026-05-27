import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Navbar from "./component/Navbar.jsx";
import Menu from "./component/Menu.jsx";
import App from "./App.jsx";
<<<<<<< HEAD
=======
import { AuthProvider } from "./context/AuthContext.jsx";
>>>>>>> 210a85b79888dad9acb66359e8ea659ad2d5ca0d

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
<<<<<<< HEAD
      <Navbar />
      <Menu />
      <App />
=======
      <AuthProvider>
        <App />
      </AuthProvider>
>>>>>>> 210a85b79888dad9acb66359e8ea659ad2d5ca0d
    </BrowserRouter>
  </StrictMode>,
);
