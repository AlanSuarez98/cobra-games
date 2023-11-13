import "./Error.css";
import logo from "../../ErrorLogo.png";
import { useNavigate } from "react-router";

const Error = () => {
  const navigate = useNavigate();

  const handleHomeNavigate = () => {
    navigate("/");
  };
  return (
    <div className="container">
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
