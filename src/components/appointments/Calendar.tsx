import { gql, useQuery } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { AppointmentPreviewItem } from "../ui/AppointmentPreviewItem";
import {
  CalendarIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/outline";
import { Line } from "../ui/Line";
import { upcomingAppointmentsQuery } from "../patient/Dashboard/Appointments";
import { useUserStateContext } from "@src/context/SessionContext";

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
    type: string;
  };
}

export const CalendarView = () => {
  const [value, onChange] = useState(new Date());
  const session = useUserStateContext();
  const isProvider = session[0]?.user?.role !== "Patient";
  const [reloaded, setReloaded] = useState(false);

  const {
    loading,
    error,
    data,
    refetch: refetchAll,
  } = useQuery(getAppointmentsByMonthQuery, {
    variables: {
      input: {
        timezone: dayjs.tz.guess(),
        month: dayjs().month() + 1,
      },
    },
  });

  const {
    loading: loadingUpcoming,
    data: upcomingData,
    error: upcomingError,
    refetch: refetchUpcoming,
  } = useQuery(upcomingAppointmentsQuery, {
    variables: {
      input: {
        timezone: dayjs.tz.guess(),
        selectedDate: dayjs(new Date()).format("YYYY-MM-DD H:mm"),
      },
    },
  });

  useEffect(() => {
    // If there is an error with the query, we want to log it to Sentry
    if (error) {
      Sentry.captureException(new Error(error.message), {
        tags: {
          query: "get",
          component: "appointmentsByMonth",
        },
      });
    }

    if (upcomingError) {
      Sentry.captureException(new Error(upcomingError.message), {
        tags: {
          query: "getProviderAppointments",
          component: "upcomingAppointments",
        },
      });
    }
  }, [error, upcomingError]);

  const meetings: IMeeting[] = data?.appointmentsByMonth || [];
  const meetingListBySelectedDate = meetings.filter((meeting) => {
    const isSameDay = dayjs(meeting.start).isSame(value, "date");

    if (isSameDay) {
      return true;
    }

    return false;
  });

  const upcomingAppointment =
    upcomingData?.upcomingAppointments.length > 0
      ? upcomingData?.upcomingAppointments[0]
      : undefined;
  const lastMonth = dayjs(value).subtract(1, "month").set("date", 2);
  const nextMonth = dayjs(value).add(1, "month").set("date", 2);

  return (
    <div className="flex flex-col md:flex-row gap-6 bg-white md:bg-transparent border md:border-none p-4 md:p-0 rounded-xl">
      <div className="bg-white p-2 md:border rounded-xl md:p-7">
        <div className="flex justify-between pb-6 items-center">
          <h2 className="font-semibold">{dayjs(value).format("MMMM YYYY")}</h2>
          <div className="">
            <button
              className="p-2 border mr-2 rounded-xl"
              disabled={
                loading || loadingUpcoming || lastMonth.year() < dayjs().year()
              }
              onClick={() => onChange(new Date(lastMonth.format("YYYY-MM-DD")))}
            >
              <ChevronLeftIcon className="h-5 w-5" id="backLabel" />
            </button>
            <button
              className="p-2 border rounded-xl"
              disabled={
                loading ||
                loadingUpcoming ||
                nextMonth.year() > dayjs().year() + 1
              }
              onClick={() => onChange(new Date(nextMonth.format("YYYY-MM-DD")))}
            >
              <ChevronRightIcon className="h-5 w-5" id="nextLabel" />
            </button>
          </div>
        </div>
        <Calendar
          tileClassName=""
          onChange={(val) => val instanceof Date && onChange(val)}
          showNavigation={false}
          value={value}
          tileDisabled={({ date }) => {
            if (loading || loadingUpcoming) return true;

            const isSameMonth = dayjs(value).isSame(date, "month");
            if (!isSameMonth) {
              return true;
            }

            return false;
          }}
          tileContent={({ date, view }) =>
            // If a date in the month view has meetings, show a dot the meetings are found in the meetings array
            view === "month" &&
            meetings.filter((meeting) => {
              const isSameDay = dayjs(meeting.start).isSame(date, "date");

              if (isSameDay) {
                return true;
              }

              return false;
            }).length > 0 ? (
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
            {meetingListBySelectedDate.length > 0 ? (
              meetingListBySelectedDate.map((meetingToShow, i) => (
                <div
                  className={
                    i + 1 === meetingListBySelectedDate.length ? "" : "mb-4"
                  }
                >
                  <AppointmentPreviewItem
                    isLoading={loading}
                    name={
                      isProvider
                        ? meetingToShow.eaCustomer?.name
                        : meetingToShow.eaProvider?.name
                    }
                    providerTitle={
                      isProvider ? "Patient" : meetingToShow.eaProvider?.type
                    }
                    renderDate={{
                      time: dayjs(meetingToShow.start).format("h:mm A"),
                      date: dayjs(meetingToShow.start).isToday()
                        ? "Today"
                        : dayjs(meetingToShow.start).isTomorrow()
                        ? "Tomorrow"
                        : dayjs(meetingToShow.start).format("MM-DD-YYYY"),
                    }}
                    appointmentId={meetingToShow.eaAppointmentId}
                  />
                </div>
              ))
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
            </div>
            {upcomingData?.upcomingAppointments.length > 0 ? (
              <AppointmentPreviewItem
                isLoading={loading}
                name={
                  isProvider
                    ? upcomingAppointment.eaCustomer?.name
                    : upcomingAppointment.eaProvider?.name
                }
                providerTitle={
                  isProvider ? "Patient" : upcomingAppointment.eaProvider?.type
                }
                renderDate={{
                  time: dayjs(upcomingAppointment.start).format("h:mm A"),
                  date: dayjs(upcomingAppointment.start).isToday()
                    ? "Today"
                    : dayjs(upcomingAppointment.start).isTomorrow()
                    ? "Tomorrow"
                    : dayjs(upcomingAppointment.start).format("MM-DD-YYYY"),
                }}
                appointmentId={upcomingAppointment.eaAppointmentId}
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
