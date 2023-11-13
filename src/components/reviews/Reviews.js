import React, { useEffect, useState } from "react";
import Nav from "../nav/Nav";
import { useParams } from "react-router";
import "./Reviews.css";
import { getGameDetails } from "../api/Api";

const Reviews = () => {
  const { gameId } = useParams();
  const [gameName, setGameName] = useState("");
  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
    // Obtener detalles del juego usando la nueva función
    getGameDetails(gameId)
      .then((gameDetails) => {
        setGameName(gameDetails.name);
      })
      .catch((error) => {
        console.error("Error al obtener los detalles del juego:", error);
      });
  }, [gameId]);

  // Función para obtener todas las reseñas del juego específico del localStorage
  const getGameReviews = () => {
    const allCommonUsers =
      JSON.parse(localStorage.getItem("commonUsers")) || [];
    const allReviews = [];

    allCommonUsers.forEach((commonUser) => {
      const userReviews = JSON.parse(
        localStorage.getItem(`reviews_${commonUser.username}`)
      );

      if (userReviews) {
        const gameReview = userReviews[gameId];

        if (gameReview) {
          const reviewWithUsername = {
            ...gameReview,
            username: commonUser.username,
          };

          allReviews.push(reviewWithUsername);
        }
      }
    });

    return allReviews;
  };

  useEffect(() => {
    const reviews = getGameReviews();
    setAllReviews(reviews);
  }, [gameId]);

  return (
    <>
      <Nav />
      <div className="containerReviews">
        <div className="titleGame">
          <h1>{gameName}</h1>
        </div>
        <div className="containerUserReview">
          {allReviews.map((review, index) => (
            <div className="cardsReview" key={index}>
              <h2>{review.username}</h2>
              <p>{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Reviews;
