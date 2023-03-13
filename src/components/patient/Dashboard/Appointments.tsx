import React from "react";
import { DashboardCard } from "@src/components/ui/DashboardCard";
import { DashboardPreviewItem } from "@src/components/ui/DashboardPreviewItem";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { roleToText } from "@src/utils/roleToText";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { GrayPlaceHolderBox } from "@src/components/GrayPlaceHolderBox";

export const appointmentsQuery = gql`
  query AppointmentsQuery($limit: Float) {
    appointments(limit: $limit) {
      eaAppointmentId
      startTimeInUtc
      endTimeInUtc
      location
      eaProvider {
        name
        type
      }
    }
  }
`;

export function DashboardAppointments() {
  const router = useRouter();
  const { data, loading, error } = useQuery(appointmentsQuery, {
    variables: {
      limit: 2,
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
    <DashboardPreviewItem
      key={`items-${i}`}
      onClick={() =>
        router.push(`/dashboard/appointments/${item.eaAppointmentId}`)
      }
      renderDate={{
        date: dayjs(item.startTimeInUtc).format("MMMM D, YYYY"),
        time: `${dayjs(item.startTimeInUtc).format("H:mma")} - ${dayjs(
          item.endTimeInUtc
        ).format("H:mma")}`,
      }}
      title={item.eaProvider.name}
      //TODO: maybe this is going to be there later
      subtitle={roleToText(item.eaProvider.type)}
      placeHolderIcon="user"
    />
  ));
  const loadItems = [0, 1]?.map((item, i) => (
    <DashboardPreviewItem
      key={`load-${i}`}
      {...(item as any)}
      isLoading
      placeHolderIcon="user"
      subtitle=""
    />
  ));

  return (
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
      {(error || data?.appointments.length === 0) && (
        <GrayPlaceHolderBox content="No upcoming appointments" />
      )}
      {loading && loadItems}
      {data && renderItems}
    </DashboardCard>
  );
}
