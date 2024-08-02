//manage routes of app
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Profile from "./pages/Profile/index";
import Photos from "./pages/Photos";
import Post from "./pages/Post";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoutes from "./components/ui/ProtectedRoutes";
import EditProfile from "./pages/Profile/EditProfile";

const protectedRoutes = [
  { path: "/", element: <Home />, errorElement: <Error /> },
  { path: "/post", element: <Post />, errorElement: <Error /> },
  { path: "/profile", element: <Profile />, errorElement: <Error /> },
  { path: "/edit-profile", element: <EditProfile />, errorElement: <Error /> },
  { path: "/myphotos", element: <Photos />, errorElement: <Error /> },
];
const routes = [
  { path: "/login", element: <Login />, errorElement: <Error /> },
  { path: "/signup", element: <Signup />, errorElement: <Error /> },
];
const router = createBrowserRouter([
  { element: <ProtectedRoutes />, children: protectedRoutes },
  ...routes,
]);
export default router;
