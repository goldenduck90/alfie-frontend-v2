import { gql, useQuery } from "@apollo/client";
import { AppointmentList } from "@src/components/appointments/AppointmentList";
import { Layout } from "@src/components/layouts/Layout";
import { Loading } from "@src/components/Loading";
import { DashboardTaskList } from "@src/components/tasks/DashboardTaskList";
import * as Sentry from "@sentry/react";
import error from "next/error";
import React from "react";
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import { Role } from "@src/graphql/generated";

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
    return (
      <div className="flex md:flex-row sm:flex-col bg-white p-6 border border-gray-300 rounded-lg">
        <DashboardTaskList />
        {loading && <Loading />}
        {error && <div>{error.message}</div>}
        {data?.appointments.length > 0 && (
          <AppointmentList appointments={data.appointments} />
        )}
      </div>
    );
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
