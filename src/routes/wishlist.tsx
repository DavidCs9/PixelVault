import { createFileRoute } from "@tanstack/react-router";
import { useWishlist } from "../context/WishlistContext";
import GameCard from "../components/GameCard";
import { useMemo } from "react";

export const Route = createFileRoute("/wishlist")({
  component: RouteComponent,
});

function RouteComponent() {
  const { wishlist } = useWishlist();
  const wishlistGames = useMemo(
    () => Array.from(wishlist.values()).sort((a, b) => b.rating - a.rating),
    [wishlist],
  );
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-center text-2xl font-bold">Wishlist</h1>
      {wishlistGames.length === 0 ? (
        <p className="text-center text-gray-500">No games in wishlist</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {wishlistGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}
