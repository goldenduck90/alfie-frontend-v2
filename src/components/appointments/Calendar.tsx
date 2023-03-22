import { gql, useQuery } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import Link from "next/link";
import { AppointmentPreviewItem } from "../ui/AppointmentPreviewItem";
import {
  CalendarIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/outline";
import { Line } from "../ui/Line";

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


const getAppointmentsByMonthQuery = gql`
  query GetAppointmentsByMonthQuery($input: GetAppointmentsByMonthInput!) {
    appointmentsByMonth(input: $input) {
      eaAppointmentId
      notes
      location
      start
      end
      eaCustomer {
        id
        name
        email
      }
      eaProvider {
        id
        name
        email
      }
    }
  }
`;

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

interface IMeeting {
  eaAppointmentId: string;
  notes: string;
  start: string;
  end: string;
  location: string;
  eaCustomer: {
    id: string;
    name: string;
    email: string;
  };
  eaProvider: {
    id: string;
    name: string;
    email: string;
  }
}

export const CalendarView = () => {
  const [value, onChange] = useState(new Date());
  const { loading, error, data } = useQuery(getAppointmentsByMonthQuery, {
    variables: {
      input: {
        timezone: dayjs.tz.guess(),
        month: dayjs().month(),
      }
    },
  });

  const { eaProvider, start, eaAppointmentId } =
    data?.appointmentsByMonth?.[0] || {};

  useEffect(() => {
    // If there is an error with the query, we want to log it to Sentry
    if (error) {
      Sentry.captureException(new Error(error.message), {
        tags: {
          query: "getProviderAppointments",
          component: "CalendarView",
        },
      });
    }
  }, [error]);

  const meetings: IMeeting[] = data?.appointmentsByMonth || [];
  const meetingListBySelectedDate = meetings.filter(
    (meeting) =>
      new Date(meeting.start).toDateString() ===
      new Date(value).toDateString()
  );
  const meetingsToShow: IMeeting[] = meetingListBySelectedDate || [];

  const meetingToShow = data?.appointmentsByMonth?.find((appointment: any) => {
    return dayjs(appointment.start).isSame(dayjs(value), "day");
  });

  return (
    <div className="flex flex-col md:flex-row gap-6 bg-white md:bg-transparent border md:border-none p-4 md:p-0 rounded-xl">
      <div className="bg-white p-2 md:border rounded-xl md:p-7">
        <div className="flex justify-between pb-6 items-center">
          <h2 className="font-semibold">Date</h2>
          <div className="">
            <button className="p-2 border mr-2 rounded-xl">
              <ChevronLeftIcon className="h-5 w-5" id="backLabel" />
            </button>
            <button className="p-2 border rounded-xl">
              <ChevronRightIcon className="h-5 w-5" id="nextLabel" />
            </button>
          </div>
        </div>
        <Calendar
          tileClassName=""
          onChange={onChange}
          showNavigation={false}
          value={value}
          tileContent={({ activeStartDate, date, view }) =>
            // If a date in the month view has meetings, show a dot the meetings are found in the meetings array
            view === "month" &&
              meetings.filter(
                (meeting) =>
                  new Date(meeting.start).toDateString() ===
                  new Date(date).toDateString()
              ).length > 0 ? (
              <div className="flex justify-center">
                <div className="w-2 h-2 bg-red-400 absolute md:mt-2 rounded-full" />
              </div>
            ) : null
          }
        />
      </div>
      <div className="flex flex-col flex-auto md:gap-6">
        <div className="p-6 md:min-w-[360px] rounded-xl md:border bg-white ">
          <div className="">
            <h2 className="font-semibold text-gray-900 pb-6">
              {dayjs(value).format("MMMM D, YYYY")}
            </h2>
            {meetingToShow ? (
              <AppointmentPreviewItem
                isLoading={loading}
                name={meetingToShow.eaProvider?.name}
                providerTitle={meetingToShow.eaProvider?.type}
                renderDate={{
                  time: dayjs(meetingToShow.start).format("h:mm a"),
                  date: dayjs(meetingToShow.start).format(
                    "MMM D, YYYY"
                  ),
                }}
                appointmentId={eaAppointmentId}
              />
            ) : (
              <div className="flex flex-col items-center bg-gray-100 py-10">
                <CalendarIcon className="h-8 w-8" />
                <p className="text-gray-600 pt-5 max-w-[200px] text-center">
                  You have no appointments scheduled for{" "}
                  {dayjs(value).format("MMMM D, YYYY")}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="p-6 rounded-xl md:border bg-white">
          <>
            <Line color="medium" className="pb-7 md:hidden" />
            <div className="flex justify-between pb-6">
              <h3 className="font-bold">Next Visit</h3>{" "}
              <Link href="/dashboard/appointments">
                <p className="font-semibold">View all</p>
              </Link>
            </div>
            {data?.appointments?.length > 0 ? (
              <AppointmentPreviewItem
                isLoading={loading}
                name={eaProvider?.name}
                providerTitle={eaProvider?.type}
                renderDate={{
                  time: dayjs(start).format("h:mm a"),
                  date: dayjs(start).format("MMM D, YYYY"),
                }}
                appointmentId={eaAppointmentId}
              />
            ) : (
              <div className="flex flex-col items-center bg-gray-100 py-10">
                <CalendarIcon className="h-8 w-8" />
                <p className="text-gray-600 pt-5 max-w-[200px] text-center">
                  You have no future appointments scheduled
                </p>
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
};
