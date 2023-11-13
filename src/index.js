import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./components/services/authContext/AuthContext";

const authenticatedUser = localStorage.getItem("authenticatedUser");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider authenticatedUser={authenticatedUser}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthProvider>
);
