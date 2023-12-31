import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router";
import Nav from "../nav/Nav";
import Message from "../message/Message";
import { useTheme } from "../services/themeContext/ThemeContext";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const { darkTheme } = useTheme();

  const showMessageForTime = (setter) => {
    setter(true);
    setTimeout(() => {
      setter(false);
    }, 3000);
  };

  const handleRegister = () => {
    const commonUsers = JSON.parse(localStorage.getItem("commonUsers")) || [];

    const userExists = commonUsers.some((user) => user.username === username);

    if (!userExists) {
      const newUser = { username, password, type: "common" };
      commonUsers.push(newUser);

      localStorage.setItem("commonUsers", JSON.stringify(commonUsers));

      navigate("/login");
      showMessageForTime(setShowSuccessMessage);
    } else {
      showMessageForTime(setShowErrorMessage);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleRegister();
    }
  };

  return (
    <>
      <Nav />
      {showSuccessMessage && (
        <Message message={"Usuario registrado con éxito."} />
      )}
      {showErrorMessage && (
        <Message message={"El usuario ya está registrado."} />
      )}
      <div className={`registerContainer ${darkTheme ? "dark-theme" : ""}`}>
        <div className={`register ${darkTheme ? "dark-theme" : ""}`}>
          <h1>Registrarse</h1>
          <input
            type="text"
            placeholder="usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <input
            type="password"
            placeholder="contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleRegister}>Registrarse</button>
          <div className="changeLogin">
            <h2>¿Tienes cuenta?</h2>
            <button onClick={handleLogin}>Iniciar Sesión</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
