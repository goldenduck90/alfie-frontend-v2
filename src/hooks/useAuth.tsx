import React, { createContext, useContext, useMemo, useState } from "react";
import { User } from "../graphql/generated";
// add an optional value to the User type of eaProviderId

// type AuthUser = Pick<User, "_id" | "name" | "email" | "role">
type AuthUser = Pick<User, "_id" | "name" | "email" | "role" | "provider">;
interface AuthContextType {
  user?: AuthUser;
  token?: string;
  setSession: ({
    newUser,
    newToken,
  }: {
    newUser: User;
    newToken: string;
  }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // const userData = localStorage.getItem("user")
  const [user, setUser] = useState<AuthUser | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);

  const value = useMemo(
    () => ({
      user,
      token,
      setSession: ({
        newUser,
        newToken,
      }: {
        newUser: AuthUser;
        newToken: string;
      }) => {
        setUser(newUser);
        setToken(newToken);
      },
      logout: () => {
        setUser(undefined);
        setToken(undefined);
      },
    }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const contextValue = useContext(AuthContext);
  if (contextValue === null) {
    throw Error("Context has not been Provided!");
  }
  return contextValue;
};
