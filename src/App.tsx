import "./App.css";
import GameList from "./components/GameList";

function App() {
  return (
    <div className="flex h-screen flex-col items-center gap-3 bg-gray-700 p-10">
      <h1 className="flex flex-col items-center justify-center text-3xl font-bold text-white">
        PixelVault - Retro Game Finder
      </h1>
      <GameList />
    </div>
  );
}

export default App;
