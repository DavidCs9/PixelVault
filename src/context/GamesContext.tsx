import { createContext, useContext, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { GameSchema, type Game } from "../schemas/gameSchema";
import useDebounce from "../hooks/useDebounce";
import type { ReactNode } from "react";

interface GamesContextType {
  games: Game[] | undefined;
  isLoading: boolean;
  error: Error | null;
  page: number;
  setPage: (page: number) => void;
  search: string;
  setSearch: (search: string) => void;
  totalPages: number | undefined;
  isPlaceholderData: boolean;
}

const GamesContext = createContext<GamesContextType | undefined>(undefined);

interface GamesProviderProps {
  children: ReactNode;
}

export function GamesProvider({ children }: GamesProviderProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const PAGE_SIZE = 8;
  const FROM_DATE = "1980-01-01";
  const TO_DATE = "1999-12-31";
  const ORDERING = "-rating";

  async function fetchGames(pageNumber: number) {
    const API_URL = `https://api.rawg.io/api/games?key=${
      import.meta.env.VITE_RAWG_API_KEY
    }&dates=${FROM_DATE},${TO_DATE}&ordering=${ORDERING}&page_size=${PAGE_SIZE}&page=${pageNumber}&search=${debouncedSearch}`;
    const response = await fetch(API_URL);
    const rawData = await response.json();
    const cleanData = rawData.results.map((game: Game) => {
      return {
        ...game,
        updated: new Date(game.updated).toISOString(),
      };
    });
    const games = GameSchema.array().parse(cleanData);
    return {
      games,
      totalPages: Math.ceil(rawData.count / PAGE_SIZE),
    };
  }

  const { data, isLoading, error, isPlaceholderData } = useQuery({
    queryKey: ["games", page, debouncedSearch],
    queryFn: () => fetchGames(page),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });

  const value = {
    games: data?.games,
    isLoading,
    error: error as Error | null,
    page,
    setPage,
    search,
    setSearch,
    totalPages: data?.totalPages,
    isPlaceholderData,
  };

  return (
    <GamesContext.Provider value={value}>{children}</GamesContext.Provider>
  );
}

export function useGames() {
  const context = useContext(GamesContext);
  if (context === undefined) {
    throw new Error("useGames must be used within a GamesProvider");
  }
  return context;
}
