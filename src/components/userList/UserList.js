import React, { useEffect, useState } from "react";
import CardUser from "../cardUser/CardUser";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [commonUsers, setCommonUsers] = useState([]);

  useEffect(() => {
    // Cargar usuarios admin desde el almacenamiento local al montar el componente
    const storedAdminUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedAdminUsers);

    // Cargar usuarios comunes desde el almacenamiento local al montar el componente
    const storedCommonUsers =
      JSON.parse(localStorage.getItem("commonUsers")) || [];
    setCommonUsers(storedCommonUsers);
  }, []);

  const handleDeleteUser = (username, type) => {
    // Eliminar el usuario de la lista correspondiente al tipo
    const updatedUsers =
      type.toLowerCase() === "common"
        ? commonUsers.filter((user) => user.username !== username)
        : users.filter((user) => user.username !== username);

    if (type.toLowerCase() === "common") {
      setCommonUsers(updatedUsers);
      localStorage.setItem("commonUsers", JSON.stringify(updatedUsers));
    } else {
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  };

  const updateUsersList = () => {
    // Actualizar la lista de usuarios mostrados en base a commonUsers y users
    setUsers(JSON.parse(localStorage.getItem("users")) || []);
    setCommonUsers(JSON.parse(localStorage.getItem("commonUsers")) || []);
  };

  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    type: "Common",
    password: "",
  });

  const handleAddUser = () => {
    // Validar que se haya proporcionado un nombre de usuario
    if (!newUser.username.trim()) {
      alert("Por favor, proporciona un nombre de usuario");
      return;
    }

    // Crear un nuevo usuario
    const userToAdd = {
      username: newUser.username,
      password: newUser.password,
      type: newUser.type,
    };

    // Obtener los usuarios comunes actuales del localStorage
    const storedCommonUsers =
      JSON.parse(localStorage.getItem("commonUsers")) || [];

    // Agregar el nuevo usuario al array existente de commonUsers
    localStorage.setItem(
      "commonUsers",
      JSON.stringify([...storedCommonUsers, userToAdd])
    );

    // Actualizar la lista de commonUsers y reiniciar el formulario
    setCommonUsers([...storedCommonUsers, userToAdd]);
    setNewUser({ username: "", type: "Common", password: "" });
    setShowAddForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  useEffect(() => {
    updateUsersList();
  }, []);

  return (
    <>
      {users.map((user, index) => (
        <CardUser
          key={index}
          user={user}
          onDeleteUser={() => handleDeleteUser(user.username, user.type)}
        />
      ))}
      {commonUsers.map((user, index) => (
        <CardUser
          key={index}
          user={user}
          onDeleteUser={() => handleDeleteUser(user.username, user.type)}
        />
      ))}
      <button onClick={() => setShowAddForm(true)}>Agregar Usuario</button>
      {showAddForm && (
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={newUser.username}
            onChange={handleInputChange}
          />
          {/* El tipo ya está predefinido como "Common" */}
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
          />
          <button onClick={handleAddUser}>Confirmar</button>
        </div>
      )}
    </>
  );
};

export default UserList;
