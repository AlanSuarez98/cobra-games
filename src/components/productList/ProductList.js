import React, { useState, useEffect } from "react";
import { useAuth } from "../services/authContext/AuthContext";
import "./ProductList.css";

const ProductList = ({ title, gameId, gameCount, onAction, refunded }) => {
  const { currentUser } = useAuth();
  const [selectedOption, setSelectedOption] = useState("null");
  const [isCreatingReview, setIsCreatingReview] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [gameReviews, setGameReviews] = useState({});

  useEffect(() => {
    const storedReviews =
      JSON.parse(localStorage.getItem(`reviews_${currentUser}`)) || {};
    setGameReviews(storedReviews);
  }, [currentUser]);

  const updateReviewForCurrentUser = (gameId, review) => {
    // Obtener las revisiones actuales del usuario
    const storedReviews = { ...gameReviews };

    // Actualizar o agregar la revisión específica para el juego actual
    storedReviews[gameId] = { id: gameId, review };

    // Guardar las revisiones actualizadas
    localStorage.setItem(
      `reviews_${currentUser}`,
      JSON.stringify(storedReviews)
    );

    // Actualizar el estado local con las revisiones
    setGameReviews(storedReviews);
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleConfirmSelect = () => {
    onAction(selectedOption, gameId);
  };

  const handleConfirmReview = () => {
    updateReviewForCurrentUser(gameId, newReview);
    setIsCreatingReview(false);
  };

  const handleCreateReviewClick = () => {
    setIsCreatingReview(true);
  };

  return (
    <div className="productCard">
      <h1>{title}</h1>
      <div className="card">
        <div className="dateProduct">
          <h3>Cantidad: {gameCount}</h3>
        </div>
        <div className="containerReview">
          <p className="reseña">
            {isCreatingReview ? (
              <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
              />
            ) : (
              gameReviews[gameId]?.review || ""
            )}
          </p>
          <div className="containerButtons">
            {isCreatingReview ? (
              <button onClick={handleConfirmReview}>Confirmar</button>
            ) : (
              <button onClick={handleCreateReviewClick}>Crear reseña</button>
            )}
          </div>
        </div>
        {refunded ? (
          <p>Juego reembolsado</p>
        ) : (
          <div className="btnSelect">
            <select onChange={handleSelectChange}>
              <option value={"null"}>---</option>
              <option value={"reembolsar"}>Reembolsar</option>
              <option value={"eliminar"}>Eliminar</option>
            </select>
            <button onClick={handleConfirmSelect}>Confirmar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
