import React, { createContext } from "react";
import { useState, useEffect } from "react";

export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [userToken, setUserToken] = useState(localStorage.getItem("token") || "");

  const value = {
    userToken,
    setUserToken,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
