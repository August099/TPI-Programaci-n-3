import { Navigate, Outlet } from "react-router";
import { useContext } from "react";
import { AutheticationContext } from "../services/auth/auth.context";
import { isTokenValid } from "../Auth/auth.helpers";

const Protected = () => {
  const { token } = useContext(AutheticationContext);
  console.log(token)
  if (!isTokenValid(token)) {
    console.log(isTokenValid(token))
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default Protected;