import { SkipBack, SkipForward, Search } from "lucide-react";
import GameCard from "./GameCard";
import ThemeContext from "../context/ThemeContext";
import { useContext } from "react";
import { useGames } from "../context/GamesContext";

function GameList() {
  const { theme } = useContext(ThemeContext);
  const {
    games,
    isLoading,
    error,
    page,
    setPage,
    search,
    setSearch,
    totalPages,
    isPlaceholderData,
  } = useGames();

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
      {/* Search and Pagination */}
      <div className="flex justify-between gap-4">
        {/* Search */}
        <div
          className="flex items-center gap-2 rounded-md border-2 p-2"
          style={{
            backgroundColor: theme === "dark" ? "#111827" : "#fff",
            borderColor: theme === "dark" ? "#252525" : "#e0e0e0",
            color: theme === "dark" ? "#fff" : "#000",
          }}
        >
          <Search className="h-4 w-4" />
          <input
            type="text"
            className="outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a game"
          />
        </div>
        {/* Pagination */}
        <div className="flex justify-end gap-4">
          <button
            className="cursor-pointer"
            onClick={() => setPage(Math.max(page - 1, 1))}
            disabled={page === 1}
          >
            <SkipBack />
          </button>
          <span className="flex items-center">
            Page {page} of {totalPages || "?"}
          </span>
          <button
            className="cursor-pointer"
            onClick={() => {
              if (!isPlaceholderData && totalPages && page < totalPages) {
                setPage(page + 1);
              }
            }}
            disabled={
              isPlaceholderData || (totalPages ? page >= totalPages : false)
            }
          >
            <SkipForward />
          </button>
        </div>
      </div>
      {games?.length === 0 ? (
        <p className="text-center text-gray-500">No games found</p>
      ) : (
        <div className="grid h-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {games?.map((game) => <GameCard key={game.id} game={game} />)}
        </div>
      )}
    </div>
  );
}

export default GameList;
