import { Layout } from "@/components";
import { Profile, Home } from "@/pages";

const routes = () => {
  return {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/profile", element: <Profile /> },
    ],
  };
};
export default routes;
