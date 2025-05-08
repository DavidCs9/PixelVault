import ThemeToggleButton from "./ThemeToggleButton";
import { Gamepad } from "lucide-react";
function Navbar() {
  return (
    <div className={`flex w-full items-center justify-between`}>
      <h1
        className={`flex items-center justify-center gap-2 text-2xl font-bold`}
      >
        <Gamepad className="h-8 w-8" /> PixelVault
      </h1>
      <ThemeToggleButton />
    </div>
  );
}

export default Navbar;
