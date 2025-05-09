import { createFileRoute } from "@tanstack/react-router";
import { useWishlist } from "../context/WishlistContext";
import GameCard from "../components/GameCard";

export const Route = createFileRoute("/wishlist")({
  component: RouteComponent,
});

function RouteComponent() {
  const { wishlist } = useWishlist();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-center text-2xl font-bold">Wishlist</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from(wishlist.values()).map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
