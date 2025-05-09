import { createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Navbar from "../components/Navbar";
import Layout from "../layout/Layout";
export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <Layout />
      <TanStackRouterDevtools />
    </>
  ),
});
