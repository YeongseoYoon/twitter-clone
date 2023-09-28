import { Navigate } from "react-router-dom";

import { CreateAccount, Login } from "@/pages";

const routes = () => {
  return [
    { path: "/login", element: <Login /> },
    { path: "/create-account", element: <CreateAccount /> },
    { path: "*", element: <Navigate to="/login" replace /> },
  ];
};
export default routes;
