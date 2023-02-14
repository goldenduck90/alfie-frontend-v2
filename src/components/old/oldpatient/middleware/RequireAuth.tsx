import React from "react";
import { Navigate, useLocation } from "react-router";
import { Role } from "../../../../graphql/generated";
import { useAuth } from "../../../../hooks/useAuth";

export const RequireAuth = ({
  role = [Role.Patient],
  children,
}: {
  role?: Role[];
  children: JSX.Element;
}) => {
  const location = useLocation();
  const { user } = useAuth();

  if (!user) {
    return (
      <Navigate
        to={`/login?redirect=${location.pathname}`}
        state={{ from: location }}
      />
    );
  }

  if (user.role !== Role.Admin && !role.includes(user.role)) {
    return (
      <Navigate
        to={`/login?redirect=${location.pathname}`}
        state={{ from: location }}
      />
    );
  }

  return children;
};
