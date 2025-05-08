import type { Game } from "../schemas/gameSchema";
import { useEffect } from "react";

function GameDetailModal({
  game,
  onClose,
}: {
  game: Game;
  onClose: () => void;
}) {
  // Close modal when pressing Escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [onClose]);

  // Prevent scrolling of background content
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />

      <div
        className="relative h-auto w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-2xl transition-all dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero image section */}
        <div className="relative h-64 w-full sm:h-80">
          <img
            src={game.background_image}
            alt={game.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="absolute bottom-4 left-4">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-green-500 px-2 py-1 text-sm font-bold text-white">
                {game.rating.toFixed(1)}
              </span>
              <span className="text-sm text-white">
                {game.ratings_count} ratings
              </span>
            </div>
            <h1 className="mt-1 text-3xl font-bold text-white">{game.name}</h1>
            <p className="text-gray-200">Released: {game.released}</p>
          </div>
        </div>

        {/* Content section */}
        <div className="grid gap-6 p-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="mb-3 text-xl font-semibold dark:text-white">
              About
            </h2>

            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                {game.slug.split("-").join(" ")} is a game released on{" "}
                {new Date(game.released).toLocaleDateString()}.
              </p>

              {game.playtime > 0 && (
                <p>
                  Average playtime:{" "}
                  <span className="font-medium">{game.playtime} hours</span>
                </p>
              )}
            </div>

            {game.platforms && game.platforms.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-2 text-lg font-medium dark:text-white">
                  Platforms
                </h3>
                <div className="flex flex-wrap gap-2">
                  {game.platforms.map((platform, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-gray-200 px-3 py-1 text-sm dark:bg-gray-700 dark:text-gray-300"
                    >
                      {platform.platform.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {game.esrb_rating && (
              <div>
                <h3 className="mb-2 text-lg font-medium dark:text-white">
                  ESRB Rating
                </h3>
                <span className="inline-block rounded-md bg-gray-200 px-3 py-1 font-medium dark:bg-gray-700 dark:text-white">
                  {game.esrb_rating.name}
                </span>
              </div>
            )}

            <div>
              <h3 className="mb-2 text-lg font-medium dark:text-white">
                Game Details
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="text-gray-500">Added by users:</span>
                  <span className="font-medium">{game.added}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-500">Suggestions:</span>
                  <span className="font-medium">{game.suggestions_count}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-500">Updated:</span>
                  <span className="font-medium">
                    {new Date(game.updated).toLocaleDateString()}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameDetailModal;
