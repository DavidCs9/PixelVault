import ThemeContext from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { useContext } from "react";

function ThemeToggleButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button className={`cursor-pointer rounded-md p-2`} onClick={toggleTheme}>
      {theme === "light" ? (
        <Sun data-testid="sun-icon" />
      ) : (
        <Moon data-testid="moon-icon" />
      )}
    </button>
  );
}

export default ThemeToggleButton;
