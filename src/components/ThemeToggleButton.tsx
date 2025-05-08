import ThemeContext from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { useContext } from "react";

function ThemeToggleButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button
      className={`absolute top-3 right-3 cursor-pointer rounded-md p-2`}
      onClick={toggleTheme}
    >
      {theme === "light" ? <Sun /> : <Moon />}
    </button>
  );
}

export default ThemeToggleButton;
