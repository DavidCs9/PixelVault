import { createContext, useContext, useReducer } from "react";
import type { Game } from "../schemas/gameSchema";
import type { WishListAction } from "../schemas/wishListActionsSchema";

export type WishlistState = Map<string, Game>;

interface WishlistContextType {
  wishlist: WishlistState;
  dispatch: React.Dispatch<WishListAction>;
}

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

interface WishlistProviderProps {
  children: React.ReactNode;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);

export function WishlistProvider({ children }: WishlistProviderProps) {
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

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
