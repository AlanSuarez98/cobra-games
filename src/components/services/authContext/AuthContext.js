import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children, authenticatedUser }) {
  const [isAuthenticated, setIsAuthenticated] = useState(!!authenticatedUser);
  const [currentUser, setCurrentUser] = useState(authenticatedUser);

  const login = (username) => {
    setIsAuthenticated(true);
    setCurrentUser(username);
    localStorage.setItem("authenticatedUser", username); // Actualizado a "authenticatedUser"
    localStorage.setItem(`user_${username}`, JSON.stringify({ username }));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem("authenticatedUser");
    localStorage.removeItem(`user_${currentUser}`);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, currentUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
