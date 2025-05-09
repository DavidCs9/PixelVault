import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import GameCard from "./GameCard";
import GameDetailModal from "./GameDetailModal";
import { GameSchema, type Game } from "../schemas/gameSchema";
import { SkipBack, SkipForward } from "lucide-react";

function GameList() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 8;
  const FROM_DATE = "1980-01-01";
  const TO_DATE = "1999-12-31";
  const ORDERING = "-rating";

  async function fetchGames(pageNumber: number) {
    const API_URL = `https://api.rawg.io/api/games?key=${
      import.meta.env.VITE_RAWG_API_KEY
    }&dates=${FROM_DATE},${TO_DATE}&ordering=${ORDERING}&page_size=${PAGE_SIZE}&page=${pageNumber}`;
    const response = await fetch(API_URL);
    const rawData = await response.json();
    const cleanData = rawData.results.map((game: Game) => {
      return {
        ...game,
        updated: new Date(game.updated).toISOString(),
      };
    });
    const games = GameSchema.array().parse(cleanData);
    return {
      games,
      totalPages: Math.ceil(rawData.count / PAGE_SIZE),
    };
  }

  const { data, isLoading, error, isPlaceholderData } = useQuery({
    queryKey: ["games", page], // Include page in the query key
    queryFn: () => fetchGames(page),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
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
    <div className="container flex h-[80vh] flex-col gap-3 overflow-auto">
      <div className="grid h-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.games?.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onClick={() => setSelectedGame(game)}
          />
        ))}
      </div>
      <div className="flex justify-end gap-4">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          <SkipBack />
        </button>
        <span className="flex items-center">
          Page {page} of {data?.totalPages || "?"}
        </span>
        <button
          onClick={() => {
            if (
              !isPlaceholderData &&
              data?.totalPages &&
              page < data.totalPages
            ) {
              setPage((old) => old + 1);
            }
          }}
          disabled={
            isPlaceholderData ||
            (data?.totalPages ? page >= data.totalPages : false)
          }
        >
          <SkipForward />
        </button>
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
