import React from "react";
import { useAuth } from "../services/authContext/AuthContext";

import "./Nav.css";
import logo from "../../Logo.png";
import { useNavigate } from "react-router";
import ToggleTheme from "../toggleTheme/ToggleTheme";

const Nav = () => {
  const navigate = useNavigate();
  const { isAuthenticated, currentUser, logout } = useAuth();
  const handleNavigate = () => {
    navigate("/login");
  };
  const handleHome = () => {
    navigate("/");
  };

  const handleLogout = () => {
    navigate("/login");
    logout();
  };

  const handleNavigateDash = () => {
    navigate("/Dashboard");
  };
  return (
    <div id="nav">
      <img src={logo} className="App-logo" alt="logo" onClick={handleHome} />
      <div className="containerLogin">
        <ToggleTheme />
        {isAuthenticated ? (
          <>
            <button className="userButton" onClick={handleNavigateDash}>
              Mi cuenta
            </button>
            <button className="logout" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </>
        ) : (
          // Mostrar botón de inicio de sesión si el usuario no está autenticado
          <button className="btnLogin" onClick={handleNavigate}>
            Iniciar Sesión
          </button>
        )}
      </div>
    </div>
  );
};

export default Nav;
