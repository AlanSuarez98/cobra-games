import "./Home.css";
import BarOpt from "../barOpt/BarOpt";
import React, { useEffect, useState } from "react";
import { getAllGames } from "../api/Api.js";
import Contain from "../containProducts/Contain";
import Nav from "../nav/Nav";
import Footer from "../footer/Footer";
import { useTheme } from "../services/themeContext/ThemeContext";

const Home = () => {
  const imgHead =
    "https://www.xtrafondos.com/descargar.php?id=6353&resolucion=2560x1440";

  const [originalGames, setOriginalGames] = useState([]);
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { darkTheme } = useTheme();

  useEffect(() => {
    async function fetchGames() {
      try {
        const allGames = await getAllGames();
        setOriginalGames(allGames);
        setGames(allGames);
      } catch (error) {
        console.error("Error al obtener los juegos:", error);
      }
    }

    fetchGames();
  }, []);

  const handleSearch = () => {
    const filteredGames = originalGames.filter((game) =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setGames(filteredGames);
    setIsSearchActive(true);
  };

  // Función para limpiar el campo de búsqueda y restaurar la lista original
  const handleClearSearch = () => {
    setSearchTerm("");
    setIsSearchActive(false);
    setGames(originalGames); // Restaura la lista original
  };

  return (
    <>
      <Nav />
      <header>
        <img src={imgHead} alt="" />
        <div id="boxHead">
          <BarOpt
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={handleSearch}
            onClearSearch={handleClearSearch}
            isSearchActive={isSearchActive}
            setIsSearchActive={setIsSearchActive}
          />
        </div>
      </header>
      <main className={`main ${darkTheme ? "dark-theme" : ""}`}>
        <Contain games={games} />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Home;
