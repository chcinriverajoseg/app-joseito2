
/* eslint-disable */

import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const loginUser = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("token", authToken);
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, token, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook oficial
export function useUserContext() {
  return useContext(UserContext);
}

// Alias para evitar errores donde pones useUser
export function useUser() {
  return useUserContext();
}
