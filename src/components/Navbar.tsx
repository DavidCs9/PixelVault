import ThemeToggleButton from "./ThemeToggleButton";
import { Gamepad } from "lucide-react";
import WishlistContext from "../context/WishlistContext";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

function Navbar() {
  const { theme } = useContext(ThemeContext);
  const { wishlist } = useContext(WishlistContext);
  return (
    <div className={`flex w-full items-center justify-between`}>
      <h1
        className={`flex items-center justify-center gap-2 text-2xl font-bold`}
      >
        <Gamepad className="h-8 w-8" /> PixelVault
      </h1>
      <div className={`flex items-center justify-center gap-2`}>
        <div
          className={`text-gray-300 ${
            theme === "light" ? "text-gray-600" : "text-gray-300"
          }`}
        >
          Wishlist <span className={`font-bold`}>{wishlist.size}</span>
        </div>
        <ThemeToggleButton />
      </div>
    </div>
  );
}

export default Navbar;
