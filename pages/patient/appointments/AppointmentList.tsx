import { useQuery } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { useEffect } from "react";
import { AppointmentItem } from "../../../src/components/appointments/AppointmentItem";
import { ApplicationLayout } from "../../../src/components/layouts/ApplicationLayout";
import { Loading } from "../../../src/components/Loading";
import { EaAppointment } from "../../../graphql/generated";
import { appointmentsQuery } from "../Dashboard";

export const AppointmentsPage = ({ limit = 100 }: { limit?: number }) => {
  const { data, loading, error } = useQuery(appointmentsQuery, {
    variables: {
      limit,
    },
  });
  useEffect(() => {
    // If there is an error with the query, we want to log it to Sentry
    if (error) {
      Sentry.captureException(new Error(error.message), {
        tags: {
          query: "appointmentsQuery",
          component: "AppointmentsPage",
        },
      });
    }
  }, [error]);
  return (
    <ApplicationLayout title="Appointments">
      <div className="flex flex-col w-full lg:w-3/4">
        <h1 className="text-xl md:text-2xl font-bold font-mulish">
          All Appointments:
        </h1>
        {loading && <Loading />}
        {data?.appointments.length <= 0 && (
          <div className="py-4 px-4 border bg-yellow-50 border-yellow-700 rounded mt-6">
            <p className="font-mulish text-yellow-700 text-center">
              No appointments yet.
            </p>
          </div>
        )}
        {data?.appointments.length > 0 &&
          data.appointments.map((app: EaAppointment) => (
            <AppointmentItem
              key={app.eaAppointmentId}
              id={app.eaAppointmentId}
              providerName={app.eaProvider.name}
              providerType={app.eaProvider.type}
              startTimeInUtc={app.startTimeInUtc}
              meetLink={app.location}
              actions
            />
          ))}
      </div>
    </ApplicationLayout>
  );
};
