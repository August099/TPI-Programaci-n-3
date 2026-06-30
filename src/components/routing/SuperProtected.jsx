import { Navigate, Outlet } from "react-router";
import { useContext } from "react";
import { AutheticationContext } from "../services/auth/auth.context";
import { isTokenValid } from "../Auth/auth.helpers";

const SuperProtected = () => {
  const { user, token } = useContext(AutheticationContext);

  if (!isTokenValid(token)) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "Super") {
    return <Navigate to="/store" replace />;
  }

  return <Outlet />;
};

export default SuperProtected;