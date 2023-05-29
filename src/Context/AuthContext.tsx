import React, { createContext } from "react";

type AuthContextProps = {
  name: string;
};

const AuthContext = createContext<AuthContextProps>({ name: "" });

export default AuthContext;

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children
}) => {

  return (
    <AuthContext.Provider value={{ name: "damidu" }}>
      {children}
    </AuthContext.Provider>
  );
};