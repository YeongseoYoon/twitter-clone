import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "@/hooks";

const PrivateRoute = ({ children }: PropsWithChildren<{}>) => {
  const { init, userInformation } = useAuth();
  if (init) {
    if (userInformation === null) {
      return <Navigate to="/login" />;
    }
    return children;
  }
};

export default PrivateRoute;
