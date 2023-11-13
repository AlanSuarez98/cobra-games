import CardGames from "../cardGames/CardGames";

const GameList = ({ games }) => {
  // Verificar si la variable 'games' está definida
  if (!games || games.length === 0) {
    return <p>No hay juegos disponibles.</p>;
  }

  // Si 'games' está definida y no está vacía, realizar la operación 'map'
  return (
    <>
      {games.map((game) => (
        <CardGames game={game} />
      ))}
    </>
  );
};

export default GameList;
