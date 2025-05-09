import { useContext, useState } from "react";
import WishlistContext from "../context/WishlistContext";
import type { Game } from "../schemas/gameSchema";

function GameCard({ game, onClick }: { game: Game; onClick: () => void }) {
  const { wishlist, dispatch } = useContext(WishlistContext);
  const [isInWishlist, setIsInWishlist] = useState(
    wishlist.has(game.id.toString()),
  );

  function handleAddToWishlist() {
    dispatch({ type: "ADD_TO_WISHLIST", game });
    setIsInWishlist(true);
  }

  function handleRemoveFromWishlist() {
    dispatch({ type: "REMOVE_FROM_WISHLIST", game });
    setIsInWishlist(false);
  }

  function WishlistButton({
    color,
    text,
    onClick,
  }: {
    color: string;
    text: string;
    onClick: () => void;
  }) {
    return (
      <div
        className={`absolute top-1 left-1 z-10 cursor-pointer rounded-full px-2 py-1 text-xs font-medium text-white`}
        style={{ backgroundColor: color }}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        {text}
      </div>
    );
  }

  return (
    <button
      className="group relative cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800"
      onClick={onClick}
    >
      <WishlistButton
        color={isInWishlist ? "green" : "red"}
        text={isInWishlist ? "In Wishlist" : "Not in Wishlist"}
        onClick={isInWishlist ? handleRemoveFromWishlist : handleAddToWishlist}
      />
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
    </button>
  );
}

export default GameCard;
