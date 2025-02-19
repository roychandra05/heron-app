"use client";

import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_DEV;
  const [user, setUser] = useState({});
  const getUser = async () => {
    const response = await fetch(`${baseUrl}/api/session`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (!response.ok) {
      return setUser((prev) => (prev = {}));
    }
    return setUser((prev) => (prev = result));
  };

  useEffect(() => {
    getUser();
  }, []);

  const contextValue = {
    user,
    setUser,
  };
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUserSession = () => useContext(UserContext);

export default UserProvider;
