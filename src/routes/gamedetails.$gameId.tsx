import { createFileRoute } from "@tanstack/react-router";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

export const Route = createFileRoute("/gamedetails/$gameId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { gameId } = Route.useParams();
  const { theme } = useContext(ThemeContext);

  if (!game) {
    return <div>Game not found</div>;
  }

  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-white" : "bg-gray-900"}`}
    >
      {/* Hero image section */}
      <div className="relative h-96 w-full">
        <img
          src={game.background_image || ""}
          alt={game.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

        <div className="absolute bottom-8 left-8">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-green-500 px-2 py-1 text-sm font-bold text-white">
              {game.rating.toFixed(1)}
            </span>
            <span className="text-sm text-white">
              {game.ratings_count} ratings
            </span>
          </div>
          <h1 className="mt-1 text-4xl font-bold text-white">{game.name}</h1>
          <p className="text-gray-200">Released: {game.released}</p>
        </div>
      </div>

      {/* Content section */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="mb-4 text-2xl font-semibold">About</h2>

            <div className="space-y-4">
              <p className="text-lg">
                {game.slug.split("-").join(" ")} is a game released on{" "}
                {new Date(game.released).toLocaleDateString()}.
              </p>

              {game.playtime > 0 && (
                <p className="text-lg">
                  Average playtime:{" "}
                  <span className="font-medium">{game.playtime} hours</span>
                </p>
              )}
            </div>

            {game.platforms && game.platforms.length > 0 && (
              <div className="mt-8">
                <h3 className="mb-3 text-xl font-medium">Platforms</h3>
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

          <div className="space-y-8">
            {game.esrb_rating && (
              <div>
                <h3 className="mb-3 text-xl font-medium">ESRB Rating</h3>
                <span className="inline-block rounded-md bg-gray-200 px-3 py-1 font-medium">
                  {game.esrb_rating.name}
                </span>
              </div>
            )}

            <div>
              <h3 className="mb-3 text-xl font-medium">Game Details</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span
                    className={`${theme === "light" ? "text-gray-700" : "text-gray-400"}`}
                  >
                    Added by users:
                  </span>
                  <span className="font-medium">{game.added}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span
                    className={`${theme === "light" ? "text-gray-700" : "text-gray-400"}`}
                  >
                    Suggestions:
                  </span>
                  <span className="font-medium">{game.suggestions_count}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span
                    className={`${theme === "light" ? "text-gray-700" : "text-gray-400"}`}
                  >
                    Updated:
                  </span>
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
