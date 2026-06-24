import { useState } from "react";
import { AutheticationContext } from "./auth.context";
import { jwtDecode } from "jwt-decode";

const tokenValue = localStorage.getItem("ferreteria-token");

const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}

export const AutheticationContextProvider = ({ children }) => {
  const [token, setToken] = useState(tokenValue);
  const [user, setUser] = useState(decodeToken(tokenValue))

  const handleUserLogin = (newToken) => {
    localStorage.setItem("ferreteria-token", newToken);
    setToken(newToken);
    setUser(decodeToken(newToken));
  };

  const handleUserLogout = () => {
    localStorage.removeItem("ferreteria-token", token);
    setToken(null);
    setUser(null);
  };
  return (
    <AutheticationContext.Provider
      value={{ token, user, handleUserLogin, handleUserLogout }}
    >
      {children}
    </AutheticationContext.Provider>
  );
};