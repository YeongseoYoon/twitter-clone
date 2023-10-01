import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks";

const PublicRoute = ({ children }: PropsWithChildren<{}>) => {
  const { init, userInformation } = useAuth();
  if (init) {
    if (userInformation) {
      return <Navigate to="/" />;
    }
    return children;
  }
};

export default PublicRoute;
