import "./App.css";
import GameList from "./components/GameList";
import ThemeContext from "./context/ThemeContext";
import { useContext } from "react";
import Navbar from "./components/Navbar";

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`flex h-screen flex-col items-center gap-6 p-6`}
      style={{
        backgroundColor:
          theme === "light" ? "var(--color-light)" : "var(--color-dark)",
        color: theme === "light" ? "var(--color-dark)" : "var(--color-light)",
      }}
    >
      <Navbar />
      <GameList />
    </div>
  );
}

export default App;
