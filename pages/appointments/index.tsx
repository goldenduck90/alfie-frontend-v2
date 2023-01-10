import { PractitionerApplicationLayout } from "../../src/components/layouts/PractitionerApplicationLayout";
import { CalendarView } from "../../src/components/appointments/Calendar";
import React from "react";

const Appointments = () => {
  return <CalendarView />;
};

Appointments.getLAyout = (page: React.ReactNode) => (
  <PractitionerApplicationLayout title="Appointments">
    {page}
  </PractitionerApplicationLayout>
);

export default Appointments;
