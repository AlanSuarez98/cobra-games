import "./Cards.css";
import Platforms from "../platforms/Platforms";
import { useNavigate } from "react-router";
import { useAuth } from "../services/authContext/AuthContext";
import { useEffect, useState } from "react";
import Message from "../message/Message";

const Cards = (props) => {
  const { title, platforms, rating, image, id } = props;
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();
  const [gameStock, setGameStock] = useState("stock");
  const [purchaseMessage, setPurchaseMessage] = useState(null);

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

  const handleShop = (e) => {
    const id = e.currentTarget.getAttribute("data-id");
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      const purchases = JSON.parse(localStorage.getItem("purchases")) || [];

      // Verificar si el juego ya está en las compras del usuario
      const existingPurchase = purchases.find(
        (purchase) => purchase.id === id && purchase.username === currentUser
      );

      if (existingPurchase) {
        existingPurchase.gameCount++;
      } else {
        const newPurchase = {
          id,
          username: currentUser,
          gameCount: 1,
        };

        purchases.push(newPurchase);
        localStorage.setItem("purchases", JSON.stringify(purchases));

        // Si el usuario es "admin", también agregar la compra al arreglo específico
        if (currentUser === "admin") {
          const adminGames =
            JSON.parse(localStorage.getItem("adminGames")) || [];
          const updatedAdminGames = [...adminGames, newPurchase];
          localStorage.setItem("adminGames", JSON.stringify(updatedAdminGames));
        }
      }

      // Actualiza el arreglo de compras en el localStorage
      localStorage.setItem(
        `purchases_${currentUser}`,
        JSON.stringify(purchases)
      );
      setPurchaseMessage("Juego comprado con éxito.");
      setTimeout(() => setPurchaseMessage(null), 3000);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleViewReviews = () => {
    navigate(`/reviews/${id}`);
  };

  return (
    <div className="cards">
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
        <button className="btnShop" data-id={id} onClick={(e) => handleShop(e)}>
          Comprar
        </button>
        <button className="btnReview" onClick={handleViewReviews}>
          Ver Reseña
        </button>
      </div>
      {purchaseMessage && <Message message={purchaseMessage} />}
    </div>
  );
};

export default Cards;
