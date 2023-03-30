import { DashboardCard } from "@src/components/ui/DashboardCard";
import React from "react";
import Link from "next/link";
import { DashboardPreviewItem } from "@src/components/ui/DashboardPreviewItem";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { upcomingAppointmentsQuery } from "@src/components/patient/Dashboard/Appointments";
import * as Sentry from "@sentry/react";

// setup dayjs
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isToday from "dayjs/plugin/isToday";
import isTomorrow from "dayjs/plugin/isTomorrow";
import { CalendarIcon } from "@heroicons/react/outline";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isToday);
dayjs.extend(isTomorrow);
dayjs.tz.setDefault(dayjs.tz.guess());

export function UpcomingAppointments() {
  const router = useRouter();

  const { data, loading, error } = useQuery(upcomingAppointmentsQuery, {
    variables: {
      input: {
        timezone: dayjs.tz.guess(),
        selectedDate: dayjs().format("YYYY-MM-DD H:mm"),
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

  const renderItems =
    data?.upcomingAppointments?.length === 0 ? (
      <div className="flex flex-col items-center justify-center bg-gray-100 py-10 h-80 rounded-xl border">
        <CalendarIcon className="h-8 w-8" />
        <p className="text-gray-600 pt-5 max-w-[200px] text-center">
          You have no upcoming appointments.
        </p>
      </div>
    ) : (
      data?.upcomingAppointments?.slice(0, 2).map((item: any, i: number) => {
        const date = dayjs(item.start);

        return (
          <DashboardPreviewItem
            key={`items-${i}`}
            onClick={() =>
              router.push(`/dashboard/appointments/${item.eaAppointmentId}`)
            }
            renderDate={{
              date: date.isToday()
                ? "Today"
                : date.isTomorrow()
                ? "Tomorrow"
                : date.format("MM-DD-YYYY"),
              time: `${dayjs(item.start).format("h:mm A")} - ${dayjs(
                item.end
              ).format("h:mm A")}`,
            }}
            title={item.eaCustomer?.name}
            subtitle="Patient"
            placeHolderIcon="user"
          />
        );
      })
    );

  const renderLoadItems = [0, 1, 2].map((place, i) => (
    <DashboardPreviewItem {...(place as any)} isLoading key={i} />
  ));

  return (
    <DashboardCard
      className="w-full md:max-w-[75%] py-4"
      cardHeader={
        <div className="flex justify-between pb-7">
          <h3 className="font-bold">Upcoming Appointments</h3>{" "}
          <Link href="/dashboard/appointments">
            <p className="font-semibold hover:underline">View all</p>
          </Link>
        </div>
      }
    >
      <div className="w-full max-h-96 overflow-auto">
        {renderItems}
        {loading && renderLoadItems}
      </div>
    </DashboardCard>
  );
}
