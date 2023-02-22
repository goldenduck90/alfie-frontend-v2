import { useField } from "formik";
import { format } from "date-fns";
import { Timeslot } from "@src/graphql/generated";

const TimeslotButton = ({
  timeslot,
  tz,
}: {
  timeslot: Timeslot;
  tz: string;
}) => {
  // const [
  //   ,
  //   { value: startTimeInUtc },
  //   { setValue: setStartTimeInUtc, setError: setStartTimeError },
  // ] = useField("startTimeInUtc");
  // const [, , { setValue: setEndTimeInUtc, setError: setEndTimeError }] =
  //   useField("endTimeInUtc");
  // const [, , { setValue: setEaProvider, setError: setEaProviderError }] =
  //   useField("eaProvider");

  const onClick = () => {
    // setEaProvider(timeslot.eaProvider);
    // setStartTimeInUtc(timeslot.startTimeInUtc);
    // setEndTimeInUtc(timeslot.endTimeInUtc);
    // setStartTimeError(undefined);
    // setEndTimeError(undefined);
    // setEaProviderError(undefined);
  };

  return (
    <button
      onClick={onClick}
      // disabled={timeslot.startTimeInUtc === startTimeInUtc}
      className="bg-gray-100 disabled:text-white text-gray-600 font-eudoxus font-base py-1 md:py-2 px-4 rounded w-full mb-3 ease-in-out duration-300 text-sm md:text-md"
    >
      {format(new Date(timeslot.startTimeInUtc), "h:mm aa")} -{" "}
      {format(new Date(timeslot.endTimeInUtc), "h:mm aa")} ({tz})
    </button>
  );
};

export default TimeslotButton;
