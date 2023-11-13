import React, { useEffect, useState } from "react";
import Nav from "../nav/Nav";
import UserList from "../userList/UserList";
import GameList from "../gameList/GameList";
import ProductList from "../productList/ProductList";
import "./Dashboard.css";
import { useAuth } from "../services/authContext/AuthContext";
import { getGameDetails, getAllGames } from "../api/Api";
import Message from "../message/Message";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [allUsers, setAllUsers] = useState([]);
  const [userGames, setUserGames] = useState([]);
  const [adminGames, setAdminGames] = useState([]);
  const userType =
    localStorage.getItem(`type_${currentUser}`) || "Usuario Común";

  const handleAction = async (selectedOption, gameId) => {
    if (selectedOption === "reembolsar") {
      localStorage.setItem(`refunded_${currentUser}_${gameId}`, "true");
    } else if (selectedOption === "eliminar") {
      // Obtener la lista actual de compras del usuario
      const userPurchases =
        JSON.parse(localStorage.getItem(`purchases_${currentUser}`)) || [];

      // Filtrar la lista de compras del usuario actual excluyendo el juego a eliminar
      const updatedUserPurchases = userPurchases.filter(
        (purchase) => purchase.id !== gameId
      );

      // Actualizar el localStorage con la nueva lista de compras
      localStorage.setItem(
        `purchases_${currentUser}`,
        JSON.stringify(updatedUserPurchases)
      );

      setUserGames((prevUserGames) =>
        prevUserGames.filter((game) => game.id !== gameId)
      );

      // Evitar ejecutar el código adicional para "reembolsar"
      return;
    }

    localStorage.setItem(
      `refunded_${currentUser}_${gameId}`,
      selectedOption === "reembolsar" ? "true" : "false"
    );

    // Actualizar el estado local para reflejar el reembolso
    setUserGames((prevUserGames) =>
      prevUserGames.map((game) =>
        game.id === gameId
          ? { ...game, refunded: selectedOption === "reembolsar" }
          : game
      )
    );
  };

  useEffect(() => {
    const fetchGameDetails = async () => {
      console.log("Fetching game details...");

      const allPurchases =
        JSON.parse(localStorage.getItem(`purchases_${currentUser}`)) || [];
      const userPurchases = allPurchases.filter(
        (purchase) => purchase.username === currentUser
      );

      const userGamesWithDetails = [];

      if (currentUser === "sysadmin" || currentUser === "admin") {
        if (currentUser === "sysadmin") {
          // Obtener la lista completa de usuarios comunes y predefinidos
          const commonUsers =
            JSON.parse(localStorage.getItem("commonUsers")) || [];
          const predefinersUsers =
            JSON.parse(localStorage.getItem("users")) || [];

          const allUsers = [...commonUsers, ...predefinersUsers];

          setAllUsers(allUsers);
          console.log("Lista completa de usuarios:", allUsers);
        }

        if (currentUser === "admin") {
          // Obtener todos los juegos de la API
          try {
            const games = await getAllGames();
            setAdminGames(games);
            console.log("Lista de juegos para el admin:", adminGames);
          } catch (error) {
            console.error("Error al obtener la lista de juegos:", error);
          }
        }
      } else {
        for (const purchase of userPurchases) {
          try {
            const gameDetails = await getGameDetails(purchase.id);

            if (gameDetails) {
              userGamesWithDetails.push({
                id: purchase.id,
                name: gameDetails.name,
                platform: gameDetails.platform,
                gameCount: purchase.gameCount || 1,
                review: purchase.review || "SIN COMENTARIOS SOBRE EL JUEGO",
                refunded:
                  localStorage.getItem(
                    `refunded_${currentUser}_${purchase.id}`
                  ) === "true",
              });
            }
          } catch (error) {
            console.error("Error al obtener detalles del juego:", error);
          }
        }
      }

      setUserGames(userGamesWithDetails);
    };

    fetchGameDetails();
  }, [currentUser, adminGames]);

  const [showMessage, setShowMessage] = useState(true);
  const hideMessage = () => {
    setShowMessage(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(hideMessage, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <Nav />
      {showMessage && <Message message={`¡Bienvenido ${currentUser}!`} />}
      <div className="bodyDashboard">
        <div className="dashboard">
          <h1>Panel de Control</h1>
          <div className="boxLists">
            <div className="listCards">
              {currentUser === "sysadmin" && <UserList users={allUsers} />}
              {currentUser === "admin" && <GameList games={adminGames} />}
              {currentUser !== "sysadmin" &&
                currentUser !== "admin" &&
                userGames.map((game) => (
                  <ProductList
                    key={game.id}
                    title={game.name}
                    gameId={game.id}
                    gameCount={game.gameCount}
                    review={game.review}
                    userType={userType}
                    onAction={(selectedOption) =>
                      handleAction(selectedOption, game.id)
                    }
                    refunded={game.refunded}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
