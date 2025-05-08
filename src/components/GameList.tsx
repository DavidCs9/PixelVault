import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import type { Game } from "../schemas/gameSchema";
import GameDetailModal from "./GameDetailModal";

function GameList() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  async function fetchGames() {
    try {
      const API_URL = `https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_API_KEY}&dates=1980-01-01,1999-12-31&ordering=-rating&page_size=12`;
      const response = await fetch(API_URL);
      if (!response.ok) {
        setError("Failed to fetch games");
        return;
      }
      const data = await response.json();
      setGames(data.results);
    } catch {
      setError("Failed to fetch games");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGames();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container h-[80vh] overflow-auto">
      <div className="grid h-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onClick={() => setSelectedGame(game)}
          />
        ))}
      </div>
      {selectedGame && (
        <GameDetailModal
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
        />
      )}
    </div>
  );
}

export default GameList;
