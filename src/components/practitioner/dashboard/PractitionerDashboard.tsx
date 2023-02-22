import * as Sentry from "@sentry/react";
import { MyPatients } from "./MyPatients";
import { PatientAbnormalities } from "./PatientAbnormalities";

import { UpcomingAppointments } from "./UpcomingAppointments";

export function PractitionerDashboard() {
  return (
    <div className="flex flex-col">
      <div className="md:flex md:gap-x-4">
        <UpcomingAppointments />
        <PatientAbnormalities />
      </div>
      <div className="md:flex">
        <MyPatients />
      </div>
    </div>
  );
}
