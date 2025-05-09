import { createContext } from "react";
import type { Game } from "../schemas/gameSchema";
import type { WishListAction } from "../schemas/wishListActionsSchema";

interface WishlistContextType {
  wishlist: Map<string, Game>;
  dispatch: React.Dispatch<WishListAction>;
}

const WishlistContext = createContext<WishlistContextType>({
  wishlist: new Map<string, Game>(),
  dispatch: () => {},
});

export default WishlistContext;
