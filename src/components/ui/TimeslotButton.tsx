import { useField } from "formik";
import { format } from "date-fns";
import { Timeslot } from "@src/graphql/generated";
import React from 'react';

// setup dayjs
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(dayjs.tz.guess());

export const TimeslotButton = ({
  timeslot,
}: {
  timeslot: Timeslot;
}) => {
  const [
    ,
    { value: start },
    { setValue: setStart, setError: setStartError },
  ] = useField("start");
  const [, , { setValue: setEnd, setError: setEndError }] =
    useField("end");

  const onClick = () => {
    setStart(timeslot.start);
    setEnd(timeslot.end);
    setStartError(undefined);
    setEndError(undefined);
  };

  return (
    <button
      onClick={onClick}
      disabled={dayjs(timeslot.start).isSame(start, "milliseconds")}
      className="bg-gray-100 hover:bg-primary-400 focus:border-primary-700 hover:text-white disabled:bg-primary-400 disabled:text-white text-gray-600 font-eudoxus font-base py-1 md:py-2 px-4 rounded w-full mb-3 ease-in-out duration-300 text-sm md:text-md"
    >
      {dayjs(timeslot.start).format("h:mm A")} -{" "}
      {dayjs(timeslot.end).format("h:mm A")}
    </button>
  );
};
