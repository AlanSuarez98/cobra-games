import React from "react";
import Cards from "../cardsProducts/Cards";
import "./Contain.css";
const Contain = ({ games }) => {
  return (
    <div>
      <div className="containProducts">
        {games.map((game) => (
          <Cards
            key={game.id}
            title={game.name}
            platforms={game.platforms}
            rating={game.rating}
            image={game.background_image}
            id={game.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Contain;
