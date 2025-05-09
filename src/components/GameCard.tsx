import { useState } from "react";
import { useWishlist } from "../context/WishlistContext";
import type { Game } from "../schemas/gameSchema";
import { Link } from "@tanstack/react-router";
import { HeartMinus, HeartPlus } from "lucide-react";

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
    icon,
    onClick,
  }: {
    variant: "inWishlist" | "notInWishlist";
    icon: React.ReactNode;
    onClick: () => void;
  }) {
    const colorStyles = {
      inWishlist: {
        backgroundColor: "rgba(72, 187, 120, 0.85)",
        hoverBackgroundColor: "rgba(72, 187, 120, 0.95)",
      },
      notInWishlist: {
        backgroundColor: "rgba(113, 128, 150, 0.85)",
        hoverBackgroundColor: "rgba(113, 128, 150, 0.95)",
      },
    };

    return (
      <div
        className={`absolute top-2 right-2 z-10 cursor-pointer rounded-full px-2 py-1 text-xs font-medium text-white transition-all duration-200 hover:shadow-sm md:left-1 md:w-fit`}
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
        {icon}
      </div>
    );
  }

  return (
    <div className="relative h-full">
      <WishlistButton
        variant={isInWishlist ? "inWishlist" : "notInWishlist"}
        icon={isInWishlist ? <HeartMinus /> : <HeartPlus />}
        onClick={isInWishlist ? handleRemoveFromWishlist : handleAddToWishlist}
      />
      <Link
        to="/gamedetails/$gameId"
        params={{ gameId: game.id.toString() }}
        className="group flex h-full cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg md:flex-col dark:bg-gray-800"
      >
        <div className="relative h-24 w-24 overflow-hidden md:h-40 md:w-full">
          <img
            src={game.background_image ?? ""}
            alt={game.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-1 left-1 rounded-full bg-black/70 px-1.5 py-0.5 text-xs font-medium text-white sm:top-2 sm:right-2 sm:left-auto sm:px-2 sm:py-1 md:w-fit">
            {game.rating}
          </div>
        </div>
        <div className="my-auto ml-2 flex flex-1 flex-col p-2 sm:p-3">
          <h2 className="line-clamp-2 font-semibold tracking-tight text-gray-900 sm:text-base md:text-sm dark:text-white">
            {game.name}
          </h2>
          <p className="text-gray-500 sm:text-sm md:text-xs dark:text-gray-400">
            Released: {game.released}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default GameCard;
