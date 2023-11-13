import React, { useState, useEffect } from "react";
import "./CardGames.css";

const CardGames = ({ game }) => {
  const [stockStatus, setStockStatus] = useState("stock");

  useEffect(() => {
    const storedStocks = JSON.parse(localStorage.getItem("Stocks")) || {};
    const initialStockStatus = storedStocks[game.id] || "stock";
    setStockStatus(initialStockStatus);
  }, [game.id]);

  const handleStockChange = (e) => {
    setStockStatus(e.target.value);
  };

  const handleStockConfirmation = () => {
    const storedStocks = JSON.parse(localStorage.getItem("Stocks")) || {};
    const updatedStocks = { ...storedStocks, [game.id]: stockStatus };
    localStorage.setItem("Stocks", JSON.stringify(updatedStocks));
    alert(`Stock actualizado para ${game.name}: ${stockStatus}`);
  };

  return (
    <div className="cardGames">
      {game && <h1>{game.name}</h1>}
      <div className="boxSelect">
        <select value={stockStatus} onChange={handleStockChange}>
          <option value={"stock"}>Stock</option>
          <option value={"sinstock"}>Sin stock</option>
        </select>
        <button onClick={handleStockConfirmation}>Confirmar</button>
      </div>
    </div>
  );
};

export default CardGames;
