import React from "react";
import { DashboardCard } from "@src/components/ui/DashboardCard";
import { DashboardPreviewItem } from "@src/components/ui/DashboardPreviewItem";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { useRouter } from "next/router";
import { GrayPlaceHolderBox } from "@src/components/GrayPlaceHolderBox";
import { roleToText } from "@src/utils/roleToText";

// setup dayjs
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isToday from "dayjs/plugin/isToday";
import isTomorrow from "dayjs/plugin/isTomorrow";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isToday);
dayjs.extend(isTomorrow);
dayjs.tz.setDefault(dayjs.tz.guess());


export const upcomingAppointmentsQuery = gql`
  query UpcomingAppointmentsQuery($input: UpcomingAppointmentsInput!) {
    upcomingAppointments(input: $input) {
      eaAppointmentId
      start
      end
      eaProvider {
        id
        name
        email
        type
      }
    }
  }
`;

export function DashboardAppointments() {
  const router = useRouter();

  const { data, loading, error } = useQuery(upcomingAppointmentsQuery, {
    variables: {
      input: {
        timezone: dayjs.tz.guess(),
        selectedDate: dayjs(new Date()).format("YYYY-MM-DD"),
      },
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

  const renderItems = data?.upcomingAppointments?.slice(0, 1).map((item: any, i: number) => {
    const date = dayjs(item.start);

    return (
      <DashboardPreviewItem
        key={`items-${i}`}
        onClick={() =>
          router.push(`/dashboard/appointments/${item.eaAppointmentId}`)
        }
        renderDate={{
          date: date.isToday() ? "Today" : date.isTomorrow() ? "Tomorrow" : date.format("MM-DD-YYYY"),
          time: `${dayjs(item.start).format("h:mm A")} - ${dayjs(
            item.end
          ).format("h:mm A")}`,
        }}
        title={item.eaProvider.name}
        subtitle={roleToText(item.eaProvider.type)}
        placeHolderIcon="user"
      />
    );
  });


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
      {(error || data?.upcomingAppointments?.length === 0) && (
        <GrayPlaceHolderBox content="No upcoming appointments" />
      )}
      {loading && loadItems}
      {data && renderItems}
    </DashboardCard>
  );
}
