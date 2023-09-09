import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import About from "@/pages/About";
import AnimeList from "@/pages/AnimeList";
import AnimeDetail from "@/pages/AnimeDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/anime",
    element: <AnimeList />,
  },
  {
    path: "/anime/:id",
    element: <AnimeDetail />,
  },
]);

export default router;
