// ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    // Al cargar la página, verifica si ya se ha elegido un tema oscuro
    const isDarkTheme = localStorage.getItem("darkTheme") === "true";
    setDarkTheme(isDarkTheme);
  }, []);

  const toggleTheme = () => {
    // Cambia entre temas oscuros y claros
    setDarkTheme((prevTheme) => {
      localStorage.setItem("darkTheme", String(!prevTheme));
      return !prevTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
