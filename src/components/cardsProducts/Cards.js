import "./Cards.css";
import Platforms from "../platforms/Platforms";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useTheme } from "../services/themeContext/ThemeContext";

const Cards = (props) => {
  const { title, platforms, rating, image, id } = props;
  const navigate = useNavigate();
  const [gameStock, setGameStock] = useState("stock");
  const { darkTheme } = useTheme();

  const showGameStock = () => {
    const storedStocks = JSON.parse(localStorage.getItem("Stocks")) || {};
    const stockStatus = storedStocks[id] || "stock"; // Establecer un valor predeterminado si no hay stock definido

    setGameStock(stockStatus);
  };

  console.log("Plataformas originales:", platforms);

  const uniquePlatforms = {};

  // Filtrar las plataformas duplicadas y agregarlas al objeto
  platforms.forEach((platform) => {
    const platformName = platform.platform.name;
    if (!uniquePlatforms[platformName]) {
      uniquePlatforms[platformName] = true;
    }
  });

  useEffect(() => {
    showGameStock();
  }, [id]);
  console.log("Plataformas únicas:", uniquePlatforms);

  const handleDetails = () => {
    navigate(`/game/${id}`);
  };

  return (
    <div className={`cards ${darkTheme ? "dark-theme" : ""}`}>
      <img src={image} alt="" />
      <h2>{title}</h2>
      <div className="boxDate">
        <div className="platform-icons">
          {Object.keys(uniquePlatforms).map((platformName) => {
            let icon = null;
            let namePlatforms = null;

            // Asigna el ícono adecuado según el nombre de la plataforma
            switch (platformName) {
              case "PlayStation 5":
                namePlatforms = "PS5";
                icon = <Platforms namePlatforms={namePlatforms} />;
                break;
              case "PlayStation 4":
                namePlatforms = "PS4";
                icon = <Platforms namePlatforms={namePlatforms} />;
                break;
              case "PlayStation 3":
                namePlatforms = "PS3";
                icon = <Platforms namePlatforms={namePlatforms} />;
                break;
              case "Xbox One":
                namePlatforms = "XBOX";
                icon = <Platforms namePlatforms={namePlatforms} />;
                break;
              case "PC":
                namePlatforms = "PC";
                icon = <Platforms namePlatforms={namePlatforms} />;
                break;
              default:
                break;
            }

            return icon && <span key={platformName}>{icon}</span>;
          })}
        </div>
        <p className="rate">{rating}</p>
      </div>
      <p className="stock">{gameStock}</p>
      <div className="containerButtons">
        <button
          className="btnShop"
          onClick={() => {
            handleDetails(id);
          }}
        >
          detalles
        </button>
      </div>
    </div>
  );
};

export default Cards;
