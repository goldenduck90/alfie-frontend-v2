import { gql, useQuery } from "@apollo/client";
import { TimeslotButton } from "@src/components/ui/TimeslotButton";
import { useField } from "formik";
import { useEffect } from "react";
import { DateSelector } from "../Schedule";
import * as Sentry from "@sentry/react";
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

export const getTimeslotsQuery = gql`
  query GetTimeslotsQuery($input: GetTimeslotsInput!) {
    timeslots(input: $input) {
      selectedDate
      timezone
      total 
      eaProvider {
        id
        name
        type
        email
      }
      eaCustomer {
        id
        name
        email
      }
      timeslots {
        start
        end
      }
    }
  }
`;


export const TimeslotSelection = () => {
  const [, { value: selectedDate }] = useField("selectedDate");
  const [, { value: eaProvider }, { setValue: setProvider }] = useField("eaProvider");
  const [, { value: eaCustomer }, { setValue: setCustomer }] = useField("eaCustomer");
  const [, { value: eaAppointmentId }] = useField("eaAppointmentId");
  const [, { value: healthCoach }] = useField("healthCoach");
  const [, { value: userId }] = useField("userId");

  const session = useUserStateContext();
  const isProvider = session[0]?.user?.role !== "Patient";
  const timezone = dayjs.tz.guess();

  const { loading, data, error } = useQuery(getTimeslotsQuery, {
    variables: {
      input: {
        timezone,
        selectedDate: dayjs(selectedDate).format("YYYY-MM-DD"),
        bypassNotice: isProvider ? true : false,
        healthCoach,
        ...(eaAppointmentId && {
          appointmentId: eaAppointmentId,
        }),
        ...(userId && {
          userId,
        })
      }
    },
  });

  useEffect(() => {
    if (!error) return;

    console.log(error)
    Sentry.captureException(new Error(error.message), {
      tags: {
        query: "get",
        component: "appointmentsByMonth",
      },
    });
  }, [error])

  useEffect(() => {
    if (loading) return;
    if (eaProvider) return;
    if (eaCustomer) return;
    if (!data?.timeslots?.eaProvider) return;
    if (userId && !data?.timeslots?.eaCustomer) return;

    setProvider(data?.timeslots?.eaProvider);

    if (userId) {
      setCustomer(data?.timeslots?.eaCustomer);
    }
  }, [data, eaCustomer, eaProvider, loading, setCustomer, setProvider, userId])

  const timeslots = data?.timeslots?.timeslots.filter((t: any) => {
    const start = dayjs(t.start).isBefore(dayjs());
    return !start;
  })

  return (
    <div className="flex flex-col gap-y-2">
      <DateSelector />
      <div className="flex justify-between">
        <p className="font-bold text-sm text-gray-600">Choose time</p>
      </div>
      <div className={`grid grid-cols-1 gap-2 ${loading || timeslots?.length === 0 ? "" : "sm:grid-cols-2"} overflow-scroll pt-2`} style={{ height: 300, width: 380 }}>
        {loading ? (
          <p>Loading...</p>
        ) : timeslots?.length === 0 ? (
          <p className="w-full">No timeslots available for this date. Please try another.</p>
        ) : timeslots?.map((timeslot: any) => (
          <TimeslotButton
            key={timeslot.start}
            timeslot={timeslot}
          />
        ))}
      </div>
    </div>
  );
};
