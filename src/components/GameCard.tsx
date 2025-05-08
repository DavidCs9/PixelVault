import type { Game } from "../schemas/gameSchema";

function GameCard({ game, onClick }: { game: Game; onClick: () => void }) {
  return (
    <div
      className="group relative overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={game.background_image}
          alt={game.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 rounded-full bg-black/70 px-2 py-1 text-xs font-medium text-white">
          {game.rating}
        </div>
      </div>
      <div className="absolute right-0 bottom-0 left-0 bg-black/80 p-2">
        <h2 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
          {game.name}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Released: {game.released}
        </p>
      </div>
    </div>
  );
}

export default GameCard;
