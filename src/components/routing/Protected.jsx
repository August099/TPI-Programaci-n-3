import { Navigate, Outlet } from "react-router";
import { useContext } from "react";
// import { AutheticationContext } from "../../services/auth/auth.context";
// import { isTokenValid } from "../../auth/auth.helpers";

const Protected = ({IsSignedIn}) => {
//   const { token } = useContext(AutheticationContext);
  if (!IsSignedIn) {
    return <Navigate to="login" replace />;
  }
  return <Outlet />;
};

export default Protected;