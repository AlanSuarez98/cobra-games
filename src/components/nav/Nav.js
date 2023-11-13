import React from "react";
import { useAuth } from "../services/authContext/AuthContext";

import "./Nav.css";
import logo from "../../Logo.png";
import { useNavigate } from "react-router";

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
        {isAuthenticated ? (
          <>
            <button className="logout" onClick={handleLogout}>
              Cerrar Sesión
            </button>
            <button className="userButton" onClick={handleNavigateDash}>
              {currentUser}
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
