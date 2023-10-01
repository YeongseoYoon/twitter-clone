import { createBrowserRouter } from "react-router-dom";

import {
  PublicLayout,
  PrivateLayout,
  PrivateRoute,
  PublicRoute,
} from "@/components";
import { CreateAccount, Home, Login, Profile } from "@/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <PrivateLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <PublicRoute>
        <PublicLayout />
      </PublicRoute>
    ),
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "create-account",
        element: <CreateAccount />,
      },
    ],
  },
]);

export default router;
