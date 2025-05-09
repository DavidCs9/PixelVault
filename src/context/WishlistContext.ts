import { createContext } from "react";
import type { Game } from "../schemas/gameSchema";
import type { WishListAction } from "../schemas/wishListActionsSchema";

interface WishlistContextType {
  wishlist: Game[];
  dispatch: React.Dispatch<WishListAction>;
}

const WishlistContext = createContext<WishlistContextType>({
  wishlist: [],
  dispatch: () => {},
});

export default WishlistContext;
