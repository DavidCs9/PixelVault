import { createContext } from "react";
import type { Game } from "../schemas/gameSchema";
import type { WishListAction } from "../schemas/wishListActionsSchema";
import type { WishlistState } from "../providers/WhishlistProvider";

interface WishlistContextType {
  wishlist: WishlistState;
  dispatch: React.Dispatch<WishListAction>;
}

const WishlistContext = createContext<WishlistContextType>({
  wishlist: new Map<string, Game>(),
  dispatch: () => {},
});

export default WishlistContext;
