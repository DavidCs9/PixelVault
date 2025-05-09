import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ThemeProvider from "./providers/ThemeProvider.tsx";
import WishlistProvider from "./providers/WhishlistProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";

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
          <RouterProvider router={router} />
        </WishlistProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
