import { gql, useQuery } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { useEffect } from "react";
import { AppointmentList } from "../appointments/AppointmentList";

import { Loading } from "../Loading";
import { useAuth } from "../../hooks/useAuth";
import PractitionerDashboard from "../practitioner/dashboard/PractitionerDashboard";
import { DashboardTaskList } from "../patient/Dashboard/DashboardTaskList";

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

const PatientDashboard = () => {
  const { data, loading, error } = useQuery(appointmentsQuery, {
    variables: {
      limit: 20,
    },
  });
  useEffect(() => {
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
  return (
    <div className="flex md:flex-row sm:flex-col bg-white p-6 rounded-lg">
      <DashboardTaskList />
      {loading && <Loading />}
      {error && <div>{error.message}</div>}
      {data?.appointments.length > 0 && (
        <AppointmentList appointments={data.appointments} />
      )}
    </div>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  Sentry.setUser(
    user
      ? {
          id: user._id,
          email: user.email,
        }
      : null
  );
  if (user?.role === "Doctor" || user?.role === "Practitioner") {
    return <PractitionerDashboard />;
  } else {
    return <PatientDashboard />;
  }
};

export default Dashboard;
