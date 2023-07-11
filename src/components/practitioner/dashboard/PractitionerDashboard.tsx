import { Role } from "@src/graphql/generated";
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";

import { MyPatients } from "./MyPatients";
import { PatientAbnormalities } from "./PatientAbnormalities";
import { UpcomingAppointments } from "./UpcomingAppointments";

export function PractitionerDashboard() {
  const { user } = useCurrentUserStore();

  return (
    <div className="flex flex-col">
      {user?.role !== Role.Doctor && (
        <div className="md:flex md:gap-x-4">
          <UpcomingAppointments />
          <PatientAbnormalities />
        </div>
      )}
      <div className="md:flex">
        <MyPatients />
      </div>
    </div>
  );
}
