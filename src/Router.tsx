import { createBrowserRouter } from "react-router-dom";

import { PrivateRoute, PublicRoute } from "@/routes";
const router = createBrowserRouter([
  //checkAuth() ? PrivateRoute() : {},
  ...PublicRoute(),
]);

export default router;
