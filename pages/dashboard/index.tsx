import { gql, useQuery } from "@apollo/client";
import { AppointmentList } from "@src/components/appointments/AppointmentList";
import { Layout } from "@src/components/layouts/Layout";
import { Loading } from "@src/components/Loading";
import * as Sentry from "@sentry/react";
import error from "next/error";
import React from "react";
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import { Role } from "@src/graphql/generated";
import { PatientDashboard } from "@src/components/patient/Dashboard";

export const appointmentsQuery = gql`
  query AppointmentsQuery($limit: Float) {
    appointments(limit: $limit) {
      eaAppointmentId
      startTimeInUtc
      location
      eaProvider {
        name
        type
      }
    }
  }
`;
function Dashboard() {
  const { data, loading, error } = useQuery(appointmentsQuery, {
    variables: {
      limit: 20,
    },
  });
  const { user } = useCurrentUserStore();
  React.useEffect(() => {
    // If there is an error with the query, we want to log it to Sentry
    if (error) {
      Sentry.captureException(new Error(error.message), {
        tags: {
          query: "AppointmentsQuery",
          component: "PatientDashboard",
        },
      });
    }
  }, [error]);
  if (user?.role === Role.Patient) {
    return <PatientDashboard />;
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
