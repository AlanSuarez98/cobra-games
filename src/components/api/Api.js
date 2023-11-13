import axios from "axios";

const API_KEY = "325a35f9f2534372b10e611a7d71bbea";
const BASE_URL = "https://api.rawg.io/api/";

// Obtener todos los juegos
export const getAllGames = async () => {
  try {
    const response = await axios.get(`${BASE_URL}games?key=${API_KEY}`);
    const games = response.data.results;
    localStorage.setItem("allGames", JSON.stringify(games));
    console.log(response.data.results);
    return games;
  } catch (error) {
    console.error("Error al obtener todos los juegos:", error);
    throw error;
  }
};

export const getPurchaseDetails = (currentUser) => {
  try {
    const purchases = JSON.parse(localStorage.getItem("purchases")) || [];

    // Filtra las compras del usuario actual
    const userPurchases = purchases.filter(
      (purchase) => purchase.username === currentUser
    );

    return userPurchases;
  } catch (error) {
    console.error("Error al obtener los detalles de compras:", error);
    throw error;
  }
};
export const getGameDetails = async (gameId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}games/${gameId}?key=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener los detalles del juego:", error);
    throw error;
  }
};

export const getAllGameIds = async () => {
  try {
    // Supongamos que la API tiene una ruta que devuelve todos los IDs de los juegos
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error(
        "No se pudieron obtener los IDs de los juegos desde la API"
      );
    }

    const data = await response.json();

    // Transforma el arreglo de IDs en un objeto con el formato { id: true }
    const gameIdsWithStock = data.reduce((acc, id) => {
      acc[id] = true;
      return acc;
    }, {});

    // Almacena el objeto en el localStorage
    localStorage.setItem("gameIds", JSON.stringify(gameIdsWithStock));

    return Object.keys(gameIdsWithStock); // Devuelve solo los IDs
  } catch (error) {
    console.error("Error al obtener IDs de juegos:", error);
    return [];
  }
};
// Otros métodos para obtener detalles de juegos, categorías, etc.
