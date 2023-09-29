import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "@/routes";
import { useAuthContext } from "@/context";

function App() {
  const { user } = useAuthContext();
  const router = createBrowserRouter([
    user ? PrivateRoute() : {},
    ...PublicRoute(),
  ]);

  return <RouterProvider router={router} />;
}

export default App;
