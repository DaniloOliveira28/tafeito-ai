import React, { ReactNode }  from 'react';

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext<{
  token?:string|null;
  setToken: (newToken:string|null) => void
}>({
  token: null,
  setToken: () => {}
});

const AuthProvider = (props:{children:ReactNode}) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token"));

  // Function to set the authentication token
  const setToken = (newToken:string|null) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem('token',token);
    } else {
      localStorage.removeItem('token')
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo<{
    token?:string|null;
    setToken: (newToken:string|null) => void
  }>(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;