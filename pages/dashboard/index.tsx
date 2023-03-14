import { Layout } from "@src/components/layouts/Layout";
import React from "react";
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import { Role } from "@src/graphql/generated";
import { PatientDashboard } from "@src/components/patient/Dashboard";
import { PractitionerDashboard } from "@src/components/practitioner/dashboard/PractitionerDashboard";

function Dashboard() {
  const { user } = useCurrentUserStore();

  if (user?.role === Role.Patient) {
    return <PatientDashboard />;
  } else if (user?.role === Role.Practitioner || user?.role === Role.Admin) {
    return <PractitionerDashboard />;
  }
  return null;
}

Dashboard.getLayout = (page: React.ReactNode) => {
  const user = useCurrentUserStore.getState().user;

  return (
    <Layout
      title="Dashboard"
      subtitle={
        user?.role == Role.Patient
          ? "Complete your active tasks and manage archived ones."
          : "Manage your patients and plan working hours."
      }
    >
      {page}
    </Layout>
  );
};

Dashboard.isAuthRequired = true;

export default Dashboard;
