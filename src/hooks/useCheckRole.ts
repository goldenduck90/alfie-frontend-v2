import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import type { Role } from "../graphql/generated";

export const useCheckRole = (rolesRequired: Role[]) => {
  const userRole = useCurrentUserStore((state) => state.user?.role);

  return rolesRequired.some((role) => userRole?.includes(role as Role));
};
