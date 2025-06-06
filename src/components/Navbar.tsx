import ThemeToggleButton from "./ThemeToggleButton";
import { Gamepad } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { Link } from "@tanstack/react-router";
function Navbar() {
  const { theme } = useContext(ThemeContext);
  const { wishlist } = useWishlist();
  return (
    <div
      className={`flex w-full items-center justify-between p-4`}
      style={{
        backgroundColor:
          theme === "light" ? "var(--color-light)" : "var(--color-dark)",
        color: theme === "light" ? "var(--color-dark)" : "var(--color-light)",
      }}
    >
      <Link to="/">
        <h1
          className={`flex items-center justify-center gap-2 text-2xl font-bold`}
        >
          <Gamepad className="h-8 w-8" /> PixelVault
        </h1>
      </Link>
      <div className={`flex items-center justify-center gap-2`}>
        <Link to="/wishlist">
          <div
            className={`text-gray-300 ${
              theme === "light" ? "text-gray-600" : "text-gray-300"
            }`}
          >
            Wishlist <span className={`font-bold`}>{wishlist.size}</span>
          </div>
        </Link>
        <ThemeToggleButton />
      </div>
    </div>
  );
}

export default Navbar;
