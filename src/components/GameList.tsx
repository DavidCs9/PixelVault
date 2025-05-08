import { useEffect, useState } from "react";
import type { Game } from "../schemas/gameSchema";
import GameCard from "./GameCard";

function GameList() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  async function fetchGames() {
    const API_URL = `https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_API_KEY}&dates=1980-01-01,1999-12-31&ordering=-rating&page_size=12`;
    const response = await fetch(API_URL);
    const data = await response.json();
    setGames(data.results);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchGames();
  }, []);
  return (
    <div className="container">
      {isLoading ? (
        <div className="flex h-[80vh] items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
        </div>
      ) : games.length === 0 ? (
        <div className="flex h-[60vh] flex-col items-center justify-center text-center">
          <svg
            className="mb-4 h-16 w-16 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
          <h3 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
            No games found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className="grid h-[80vh] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}

export default GameList;
