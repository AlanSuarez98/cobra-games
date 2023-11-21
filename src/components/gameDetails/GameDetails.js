import Nav from "../nav/Nav";
import Platforms from "../platforms/Platforms";
import "./GameDetails.css";
import Footer from "../footer/Footer";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../services/authContext/AuthContext";
import { getGameDetails } from "../api/Api";

const GameDetails = () => {
  const [purchaseMessage, setPurchaseMessage] = useState(null);
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();
  const { gameId } = useParams();
  const [gameDetails, setGameDetails] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const details = await getGameDetails(gameId);
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
    navigate(`/reviews/${gameId}`);
  };

  if (!gameDetails) {
    // Si los detalles del juego aún no se han cargado, puedes mostrar un mensaje de carga o simplemente no renderizar nada.
    return <p>Cargando detalles del juego...</p>;
  }
  return (
    <>
      <Nav />
      <main className="mainDetailsGames">
        <div className="mainGame">
          <div className="containerImage">
            <img src={gameDetails.image} alt="" />
          </div>
          <div className="detailsGame">
            <h1>{gameDetails.title}</h1>
            <p>{gameDetails.description}</p>
            <Platforms platforms={gameDetails.platforms} />
            <div className="boxButtons">
              <button
                className="btnShop"
                data-id={gameId}
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
        <div className="containerVideo">
          <iframe
            width="790"
            height="444"
            src={gameDetails.videoUrl}
            title={`${gameDetails.title} Trailer`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default GameDetails;
