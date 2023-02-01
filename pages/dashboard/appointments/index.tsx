import { Layout } from "../../../src/components/layouts/Layout";
import { CalendarView } from "../../../src/components/appointments/Calendar";
import React from "react";

const Appointments = () => {
  return <CalendarView />;
};

Appointments.getLayout = (page: React.ReactNode) => (
  <Layout
    title="Appointments"
    subtitle="View and manage your medical appointments."
  >
    {page}
  </Layout>
);

export default Appointments;
