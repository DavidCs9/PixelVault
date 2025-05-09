import GameList from "../components/GameList";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <GameList />;
}

export default Index;
