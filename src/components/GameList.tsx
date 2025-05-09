import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import GameCard from "./GameCard";
import GameDetailModal from "./GameDetailModal";
import { GameSchema, type Game } from "../schemas/gameSchema";

function GameList() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  async function fetchGames() {
    const API_URL = `https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_API_KEY}&dates=1980-01-01,1999-12-31&ordering=-rating&page_size=12`;
    const response = await fetch(API_URL);
    const rawData = await response.json();
    const cleanData = rawData.results.map((game: Game) => {
      return {
        ...game,
        updated: new Date(game.updated).toISOString(),
      };
    });
    const games = GameSchema.array().parse(cleanData);
    return games;
  }

  const {
    data: games,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["games"],
    queryFn: () => fetchGames(),
  });

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
      </div>
    );
  }

  if (error) {
    console.error(error);
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-red-500">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="container h-[80vh] overflow-auto">
      <div className="grid h-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {games?.map((game) => (
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
