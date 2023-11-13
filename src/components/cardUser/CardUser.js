import "./CardUser.css";

const CardUser = ({ user, onDeleteUser }) => {
  const handleConfirmDelete = () => {
    onDeleteUser(user.username, user.type);
  };

  return (
    <div className="cardUser">
      <h1>{user.username}</h1>
      <p>Tipo de usuario: {user.type}</p>
      {user.username !== "sysadmin" && user.username !== "SYSADMIN" && (
        <div className="containerOptions">
          <select>
            <option value={null}>----</option>
            <option value={"delete"}>Eliminar</option>
          </select>
          <button onClick={handleConfirmDelete}>Confirmar</button>
        </div>
      )}
    </div>
  );
};

export default CardUser;
