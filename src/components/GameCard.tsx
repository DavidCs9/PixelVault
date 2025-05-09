import { useState } from "react";
import { useWishlist } from "../context/WishlistContext";
import type { Game } from "../schemas/gameSchema";
import { Link } from "@tanstack/react-router";

function GameCard({ game }: { game: Game }) {
  const { wishlist, dispatch } = useWishlist();
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
    variant,
    text,
    onClick,
  }: {
    variant: "inWishlist" | "notInWishlist";
    text: string;
    onClick: () => void;
  }) {
    const colorStyles = {
      inWishlist: {
        backgroundColor: "rgba(72, 187, 120, 0.85)", // Soft green with transparency
        hoverBackgroundColor: "rgba(72, 187, 120, 0.95)",
      },
      notInWishlist: {
        backgroundColor: "rgba(113, 128, 150, 0.85)", // Soft slate gray with transparency
        hoverBackgroundColor: "rgba(113, 128, 150, 0.95)",
      },
    };

    return (
      <div
        className={`absolute top-1 left-1 z-10 cursor-pointer rounded-full px-2 py-1 text-xs font-medium text-white transition-all duration-200 hover:shadow-sm`}
        style={{
          backgroundColor: colorStyles[variant].backgroundColor,
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor =
            colorStyles[variant].hoverBackgroundColor;
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor =
            colorStyles[variant].backgroundColor;
        }}
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
    <div className="relative">
      <WishlistButton
        variant={isInWishlist ? "inWishlist" : "notInWishlist"}
        text={isInWishlist ? "In Wishlist" : "Add to Wishlist"}
        onClick={isInWishlist ? handleRemoveFromWishlist : handleAddToWishlist}
      />
      <Link
        to="/gamedetails/$gameId"
        params={{ gameId: game.id.toString() }}
        className="group block cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800"
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={game.background_image ?? ""} // TODO: Add a default image
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
      </Link>
    </div>
  );
}

export default GameCard;
