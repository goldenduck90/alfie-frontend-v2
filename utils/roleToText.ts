import { Role } from "../graphql/generated"

export const roleToText = (role: Role) => {
  switch (role) {
    case Role.Doctor:
    case Role.Practitioner:
      return "Clinician"
    case Role.HealthCoach:
      return "Health Coach"
    case Role.CareCoordinator:
      return "Care Coordinator"
    case Role.Patient:
      return "Patient"
    case Role.Admin:
      return "Administrator"
    default:
      return "Unknown"
  }
}
