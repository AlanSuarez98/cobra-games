import React from "react";
import { useTheme } from "../services/themeContext/ThemeContext";
import "./ToggleTheme.css";
import Icon from "../icon/Icon";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const ToggleTheme = () => {
  const { darkTheme, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle">
      <button
        className={`theme-btn ${darkTheme ? "dark" : "light"}`}
        onClick={toggleTheme}
      >
        {darkTheme ? (
          <Icon css={"sun"} icon={faSun} />
        ) : (
          <Icon css={"moon"} icon={faMoon} />
        )}
      </button>
    </div>
  );
};

export default ToggleTheme;
