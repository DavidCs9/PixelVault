import { createFileRoute } from "@tanstack/react-router";
import { useContext } from "react";
import WishlistContext from "../context/WishlistContext";

export const Route = createFileRoute("/gamedetails/$gameId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { gameId } = Route.useParams();
  const { wishlist } = useContext(WishlistContext);
  const game = wishlist.get(gameId);

  if (!game) {
    return <div>Game not found</div>;
  }

  return <div>Hello {gameId} </div>;
}
