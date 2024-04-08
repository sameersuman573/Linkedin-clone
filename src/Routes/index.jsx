import { createBrowserRouter } from "react-router-dom";
// IMPORT ALL PAGES
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import HomeLayout from "../layouts/HomeLayout"
import ErrorPage from "../error-page"
import ProfileLayout from "../layouts/ProfileLayout";
import ConnectionLayout from "../layouts/ConnectionLayout";
 

// so to use createbrowserRouter, we need to import it from react-router-dom
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/register",
    element: <Register/>,
    errorElement:<ErrorPage/>
  },
  {
    path: "/home",
    element: <HomeLayout/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/profile",
    element: <ProfileLayout/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/connections",
    element: <ConnectionLayout/>,
    errorElement: <ErrorPage/>
  },

]);
