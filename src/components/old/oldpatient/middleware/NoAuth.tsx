import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../../../hooks/useAuth";

export const NoAuth = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user) {
    return <Navigate to="/dashboard" state={{ from: location }} />;
  }

  return children;
};
