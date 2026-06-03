import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { SessionProvider } from "./contexts/SessionContext";

function App() {
  return (
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  );
}

export default App;
