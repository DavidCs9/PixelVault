import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ThemeProvider from "./providers/ThemeProvider.tsx";
import WishlistProvider from "./providers/WhishlistProvider.tsx";
import { GamesProvider } from "./context/GamesContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { routeTree } from "./routeTree.gen";

const router = createRouter({
  routeTree,
});

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <WishlistProvider>
          <GamesProvider>
            <ReactQueryDevtools />
            <RouterProvider router={router} />
          </GamesProvider>
        </WishlistProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
