import "./App.css";
import GameList from "./components/GameList";
import ThemeContext from "./context/ThemeContext";
import { useContext } from "react";
import ThemeToggleButton from "./components/ThemeToggleButton";
function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`flex h-screen flex-col items-center gap-3 p-10`}
      style={{
        backgroundColor:
          theme === "light" ? "var(--color-light)" : "var(--color-dark)",
        color: theme === "light" ? "var(--color-dark)" : "var(--color-light)",
      }}
    >
      <h1
        className={`flex flex-col items-center justify-center text-3xl font-bold`}
      >
        PixelVault - Retro Game Finder
      </h1>
      <ThemeToggleButton />
      <GameList />
    </div>
  );
}

export default App;
