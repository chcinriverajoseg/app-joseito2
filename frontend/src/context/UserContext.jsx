/* eslint-disable */
/* eslint-disable */
import { createContext, useContext, useState, useEffect } from "react";

export const UserContext = createContext(); // 👈 ahora se exporta

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch (e) {
        console.error("Error parseando user:", e);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
