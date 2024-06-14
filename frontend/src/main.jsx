// Packages
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Contexts
import AuthProvider from "./providers/AuthContextProvider";

// Components
import App from "./App";

// Style
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <StrictMode>
      <AuthProvider>
        <App />
        <ToastContainer />
      </AuthProvider>
    </StrictMode>
  </Router>
);
