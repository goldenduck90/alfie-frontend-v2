import React from "react";
import { useCheckRole } from "@src/hooks/useCheckRole";
import type { Role } from "@src/graphql/generated";

interface Props {
  rolesRequired: Role[];
  children: React.ReactNode;
}

export function WithPermissions({
  rolesRequired,
  children,
}: Props): React.ReactNode {
  const hasRole = useCheckRole(rolesRequired);
  if (hasRole) {
    return <>{children}</>;
  }

  return null;
}
