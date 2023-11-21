import React, { useState, useRef } from "react";
import { useAuth } from "../services/authContext/AuthContext";
import { useNavigate } from "react-router";
import Nav from "../nav/Nav";
import Message from "../message/Message";

import "./Login.css";
import { useTheme } from "../services/themeContext/ThemeContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const messageRef = useRef(null);
  const { darkTheme } = useTheme();

  const showMessageForTime = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  const handleUserLogin = () => {
    // Obtener usuarios predefinidos y usuarios comunes del localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const commonUsers = JSON.parse(localStorage.getItem("commonUsers")) || [];

    const allUsers = [...existingUsers, ...commonUsers];

    // Buscar el usuario en la lista de usuarios
    const user = allUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      login(user.username);

      localStorage.setItem("isAuthenticated", user.username);

      navigate("/dashboard");
    } else {
      showMessageForTime();
    }
  };

  const handleRegister = () => {
    navigate("/registrarse");
  };

  return (
    <>
      <Nav />
      {showMessage && (
        <Message message={"Credenciales incorrectas."} ref={messageRef} />
      )}
      <div className={`loginContainer ${darkTheme ? "dark-theme" : ""}`}>
        <div className={`login ${darkTheme ? "dark-theme" : ""}`}>
          <h1>Iniciar Sesion</h1>
          <input
            type="text"
            placeholder="usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleUserLogin}>Iniciar Sesion</button>
          <div className="changeRegister">
            <h2>¿No tienes cuenta?</h2>
            <button onClick={handleRegister}>Registrarme</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
