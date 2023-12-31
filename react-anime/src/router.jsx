import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import About from "@/pages/About";
import AnimeList from "@/pages/AnimeList";
import AnimeDetail from "@/pages/AnimeDetail";
import Login from "@/pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AllAnime from "./pages/AllAnime";

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
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/all",
    element: <AllAnime />,
  }
]);

export default router;
