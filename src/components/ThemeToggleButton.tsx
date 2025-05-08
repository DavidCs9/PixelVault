import ThemeContext from "../context/ThemeContext";
import { useContext } from "react";

function ThemeToggleButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button
      className={`absolute top-0 right-0 cursor-pointer rounded-md p-2`}
      onClick={toggleTheme}
    >
      {theme === "light" ? "Light Mode" : "Dark Mode"}
    </button>
  );
}

export default ThemeToggleButton;
