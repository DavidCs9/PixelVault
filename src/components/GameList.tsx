import { SkipBack, SkipForward, Search } from "lucide-react";
import GameCard from "./GameCard";
import ThemeContext from "../context/ThemeContext";
import { useContext } from "react";
import { useGames } from "../context/GamesContext";
import GameListLoader from "./GameListLoader";

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
    return <GameListLoader theme={theme} />;
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
    <div className="container mx-auto flex h-[80vh] flex-col gap-4 overflow-auto px-4 py-2">
      {/* Search and Pagination */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        {/* Search */}
        <div
          className="flex w-full items-center gap-2 rounded-md border-2 p-2 sm:w-auto"
          style={{
            backgroundColor: theme === "dark" ? "#111827" : "#fff",
            borderColor: theme === "dark" ? "#252525" : "#e0e0e0",
            color: theme === "dark" ? "#fff" : "#000",
          }}
        >
          <Search className="h-4 w-4 flex-shrink-0" />
          <input
            type="text"
            className="w-full bg-transparent outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a game"
          />
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-center gap-4 sm:justify-end">
          <button
            className="cursor-pointer p-2 transition-opacity hover:opacity-80"
            onClick={() => setPage(Math.max(page - 1, 1))}
            disabled={page === 1}
          >
            <SkipBack className="h-5 w-5" />
          </button>
          <span className="text-sm sm:text-base">
            Page {page} of {totalPages || "?"}
          </span>
          <button
            className="cursor-pointer p-2 transition-opacity hover:opacity-80"
            onClick={() => {
              if (!isPlaceholderData && totalPages && page < totalPages) {
                setPage(page + 1);
              }
            }}
            disabled={
              isPlaceholderData || (totalPages ? page >= totalPages : false)
            }
          >
            <SkipForward className="h-5 w-5" />
          </button>
        </div>
      </div>
      {games?.length === 0 ? (
        <p className="my-8 text-center text-gray-500">No games found</p>
      ) : (
        <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {games?.map((game) => <GameCard key={game.id} game={game} />)}
        </div>
      )}
    </div>
  );
}

export default GameList;
