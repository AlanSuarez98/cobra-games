import "./Error.css";
import logo from "../../ErrorLogo.png";
import { useNavigate } from "react-router";
import { useTheme } from "../services/themeContext/ThemeContext";

const Error = () => {
  const navigate = useNavigate();
  const { darkTheme } = useTheme();

  const handleHomeNavigate = () => {
    navigate("/");
  };
  return (
    <div className={`container ${darkTheme ? "dark-theme" : ""}`}>
      <img src={logo} alt="" />
      <div className="containerMessage">
        <h1>¡UPS!</h1>
        <h2>Página no encontrada</h2>
        <button onClick={handleHomeNavigate}>Volver al inicio</button>
      </div>
    </div>
  );
};

export default Error;
