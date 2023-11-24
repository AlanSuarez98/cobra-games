import Nav from "../nav/Nav";
import Message from "../message/Message";
import Platforms from "../platforms/Platforms";
import "./GameDetails.css";
import Footer from "../footer/Footer";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../services/authContext/AuthContext";
import { getGameDetails } from "../api/Api";
import { useTheme } from "../services/themeContext/ThemeContext";

const GameDetails = () => {
  const [purchaseMessage, setPurchaseMessage] = useState(null);
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();
  const { gameId } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const { darkTheme } = useTheme();

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const details = await getGameDetails(gameId);
        console.log("Detalles del juego:", details); // Agrega este console.log
        setGameDetails(details);
      } catch (error) {
        console.error("Error al obtener detalles del juego:", error);
      }
    };

    fetchGameDetails();
  }, [gameId]);

  const handleShop = (e) => {
    const id = e.currentTarget.getAttribute("data-id");
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      const purchases =
        JSON.parse(localStorage.getItem(`purchases_${currentUser}`)) || [];

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
        localStorage.setItem(
          `purchases_${currentUser}`,
          JSON.stringify(purchases)
        );

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
    navigate(`/reviews/${gameId}`);
  };

  if (!gameDetails) {
    // Si los detalles del juego aún no se han cargado, puedes mostrar un mensaje de carga o simplemente no renderizar nada.
    return <p>Cargando detalles del juego...</p>;
  }
  const descriptionGame = gameDetails.description_raw;

  const paragraphs = descriptionGame
    .split(". ")
    .reduce((acc, sentence, index) => {
      const paragraphIndex = Math.floor(index / 6);
      if (!acc[paragraphIndex]) {
        acc[paragraphIndex] = [];
      }
      acc[paragraphIndex].push(sentence);
      return acc;
    }, [])
    .map((paragraph, index) => <p key={index}>{paragraph.join(". ")}</p>);
  const uniquePlatforms = {};
  gameDetails.platforms.forEach((platform) => {
    const platformName = platform.platform.name;
    if (!uniquePlatforms[platformName]) {
      uniquePlatforms[platformName] = true;
    }
  });
  return (
    <>
      <Nav />
      {purchaseMessage && <Message message={purchaseMessage} />}
      <main className={`mainDetailsGames ${darkTheme ? "dark-theme" : ""}`}>
        <div className={`mainGame ${darkTheme ? "dark-theme" : ""}`}>
          <div className="containerImage">
            <img src={gameDetails.background_image} alt="" />
          </div>
          <div className="detailsGame">
            <h1>{gameDetails.name}</h1>
            <p>{paragraphs}</p>
            <div className="boxPlatform">
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
            <div className="boxButtons">
              <button
                className="btnShop"
                data-id={gameDetails.id}
                onClick={(e) => handleShop(e)}
              >
                Comprar
              </button>
              <button
                className="btnReview"
                onClick={() => handleViewReviews(gameId)}
              >
                Reseña
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default GameDetails;
