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
import dayjs from "dayjs";
import { Button } from "@src/components/ui/Button";
import { RescheduleAppointment } from "../modal/variants/RescheduleAppointment";
import { DialogModal } from "@src/components/modal/Dialog";
import { ConfirmModal } from "../modal/variants/ConfirmModal";
const getAllProviderPatientsQuery = gql`
  query getProviderAppointments($eaProviderId: String!) {
    providerAppointments(eaProviderId: $eaProviderId) {
      eaAppointmentId
      notes
      startTimeInUtc
      location
      endTimeInUtc
      eaAppointmentId
      eaCustomer {
        name
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
  endTimeInUtc: string;
  startTimeInUtc: string;
  location: string;
  eaCustomer: {
    name: string;
  };
}
export const CalendarView = () => {
  const [value, onChange] = useState(new Date());

  const { loading, error, data } = useQuery(appointmentsQuery, {
    variables: { limit: 2 },
  });

  const { eaProvider, startTimeInUtc, eaAppointmentId } =
    data?.appointments?.[1] || {};

  console.log({ data });

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

  const meetings: IMeeting[] = data?.appointments || [];
  const meetingListBySelectedDate = meetings.filter(
    (meeting) =>
      new Date(meeting.startTimeInUtc).toDateString() ===
      new Date(value).toDateString()
  );
  const meetingsToShow: IMeeting[] = meetingListBySelectedDate || [];

  const meetingToShow = data?.appointments?.find((appointment: any) => {
    return dayjs(appointment.startTimeInUtc).isSame(dayjs(value), "day");
  });

  console.log({ meetingToShow });

  return (
    <div className="flex flex-col md:flex-row gap-6 bg-white md:bg-transparent border md:border-none p-4 md:p-0 rounded-xl">
      <div className="bg-white p-2 md:border rounded-xl md:p-7">
        <div className="flex justify-between pb-6 items-center">
          <h2 className="font-semibold">Date</h2>
          <div className="">
            <DialogModal
              trigger={<Button buttonType="secondary">Reschedule</Button>}
            >
              {/* <RescheduleAppointment  title="Reschedule appointment"/> */}
              <ConfirmModal cancellation={true} />
            </DialogModal>
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
                new Date(meeting.startTimeInUtc).toDateString() ===
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
                  time: dayjs(meetingToShow.startTimeInUtc).format("h:mm a"),
                  date: dayjs(meetingToShow.startTimeInUtc).format(
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
        {data?.appointments?.length > 0 && (
          <div className="p-6 rounded-xl md:border bg-white">
            <>
              <Line color="medium" className="pb-7 md:hidden" />
              <div className="flex justify-between pb-6">
                <h3 className="font-bold">Next Visit</h3>{" "}
                <Link href="/dashboard/appointments">
                  <p className="font-semibold">View all</p>
                </Link>
              </div>
              <AppointmentPreviewItem
                isLoading={loading}
                name={eaProvider?.name}
                providerTitle={eaProvider?.type}
                renderDate={{
                  time: dayjs(startTimeInUtc).format("h:mm a"),
                  date: dayjs(startTimeInUtc).format("MMM D, YYYY"),
                }}
                appointmentId={eaAppointmentId}
              />
            </>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarView;
