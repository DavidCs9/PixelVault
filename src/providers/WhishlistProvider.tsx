import WishlistContext from "../context/WishlistContext";
import { useReducer } from "react";
import type { Game } from "../schemas/gameSchema";
import type { WishListAction } from "../schemas/wishListActionsSchema";

type WishlistState = Map<string, Game>;

function wishlistReducer(
  state: WishlistState,
  action: WishListAction,
): WishlistState {
  switch (action.type) {
    case "ADD_TO_WISHLIST": {
      const newState = new Map(state);
      newState.set(action.game.id.toString(), action.game);
      window.localStorage.setItem(
        "wishlist",
        JSON.stringify(Array.from(newState)),
      );
      return newState;
    }
    case "REMOVE_FROM_WISHLIST": {
      const newState = new Map(state);
      newState.delete(action.game.id.toString());
      window.localStorage.setItem(
        "wishlist",
        JSON.stringify(Array.from(newState)),
      );
      return newState;
    }
    default: {
      throw new Error("Invalid action");
    }
  }
}

function WishlistProvider({ children }: { children: React.ReactNode }) {
  const savedWishlist: WishlistState = (() => {
    const storedData = window.localStorage.getItem("wishlist");
    if (!storedData) {
      return new Map<string, Game>();
    }

    try {
      // Parse the JSON string into an array
      const parsedData = JSON.parse(storedData);
      // Create a new Set from the array
      return new Map<string, Game>(parsedData);
    } catch (error) {
      console.error("Error parsing wishlist from localStorage:", error);
      return new Map<string, Game>();
    }
  })();

  const [wishlist, dispatch] = useReducer(wishlistReducer, savedWishlist);
  return (
    <WishlistContext.Provider value={{ wishlist, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;
