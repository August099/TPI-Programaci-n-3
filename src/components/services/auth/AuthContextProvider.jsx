import { useState } from "react";
import { AutheticationContext } from "./auth.context";

const tokenValue = localStorage.getItem("ferreteria-token");

export const AutheticationContextProvider = ({ children }) => {
  const [token, setToken] = useState(tokenValue);

  const handleUserLogin = (newToken) => { // modificar esto
    localStorage.setItem("ferreteria-token", newToken);
    setToken(newToken);
  };

  const handleUserLogout = () => { // modificar esto
    localStorage.removeItem("ferreteria-token", token);
    setToken(null);
  };
  return (
    <AutheticationContext.Provider
      value={{ token, handleUserLogin, handleUserLogout }}
    >
      {children}
    </AutheticationContext.Provider>
  );
};