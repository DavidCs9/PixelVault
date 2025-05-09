import { Outlet } from "@tanstack/react-router";
import ThemeContext from "../context/ThemeContext";
import { useContext } from "react";

function Layout() {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className="flex h-[calc(100vh-72px)] w-full flex-col items-center"
      style={{
        backgroundColor:
          theme === "light" ? "var(--color-light)" : "var(--color-dark)",
        color: theme === "light" ? "var(--color-dark)" : "var(--color-light)",
      }}
    >
      {/* children */}
      <Outlet />
    </div>
  );
}

export default Layout;
