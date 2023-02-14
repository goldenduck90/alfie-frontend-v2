import { Role } from "../graphql/generated";

export const roleToText = (role: Role) => {
  if (role === Role.Doctor || role === Role.Practitioner) {
    return "Provider";
  } else {
    return role;
  }
};
