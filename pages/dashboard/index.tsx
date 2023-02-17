import { gql, useQuery } from "@apollo/client";
import { AppointmentList } from "@src/components/appointments/AppointmentList";
import { Layout } from "@src/components/layouts/Layout";
import React from "react";
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import { Role } from "@src/graphql/generated";
import { PatientDashboard } from "@src/components/patient/Dashboard";
import PractitionerDashboard from "@src/components/practitioner/dashboard/PractitionerDashboard";

function Dashboard() {
  const { user } = useCurrentUserStore();

  if (user?.role === Role.Patient) {
    return <PatientDashboard />;
  } else if (user?.role === Role.Practitioner) {
    return <PractitionerDashboard />;
  }
  return null;
}

Dashboard.getLayout = (page: React.ReactNode) => (
  <Layout
    title="Dashboard"
    subtitle="Complete your active tasks and manage archived ones."
  >
    {page}
  </Layout>
);

Dashboard.isAuthRequired = true;

export default Dashboard;
