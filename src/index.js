import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./components/services/authContext/AuthContext";
import { ThemeProvider } from "./components/services/themeContext/ThemeContext";

const authenticatedUser = localStorage.getItem("authenticatedUser");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider authenticatedUser={authenticatedUser}>
    <ThemeProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>
  </AuthProvider>
);
