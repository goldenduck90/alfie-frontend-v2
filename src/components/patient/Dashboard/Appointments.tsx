import React from "react";
import { DashboardCard } from "@src/components/ui/DashboardCard";
import { DashboardPreviewItem } from "@src/components/ui/DashboardPreviewItem";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import * as Sentry from "@sentry/react";

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

export function DashboardAppointments({ isLoading }: any) {
  const { data, loading, error } = useQuery(appointmentsQuery, {
    variables: {
      limit: 20,
    },
  });
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

  const renderItems = data?.appointments.map((item: any, i: number) => (
    <DashboardPreviewItem key={i} {...(item as any)} />
  ));
  const loadItems = [0, 1]?.map((item, i) => (
    <DashboardPreviewItem key={i} {...(item as any)} isLoading />
  ));

  return (
    <>
      <DashboardCard
        className="md:min-w-[49.3%]"
        cardHeader={
          <div className="flex justify-between pb-7">
            <h3 className="font-bold">Upcoming Appointments</h3>{" "}
            <Link href="/dashboard/appointments">
              <p className="font-semibold hover:underline">View all</p>
            </Link>
          </div>
        }
      >
        {(error || data?.appointments.length === 0) &&
          "no appointments scheduled"}
        {loading && loadItems}
        {data && renderItems}
      </DashboardCard>
    </>
  );
}
