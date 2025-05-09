import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ThemeProvider from "./providers/ThemeProvider.tsx";
import WishlistProvider from "./providers/WhishlistProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <WishlistProvider>
          <App />
        </WishlistProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
