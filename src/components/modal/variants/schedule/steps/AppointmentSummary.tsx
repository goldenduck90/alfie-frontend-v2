import { UserIcon, CalendarIcon, ClockIcon } from "@heroicons/react/solid";
import { TextArea } from "@src/components/inputs/TextArea";
import { useField } from "formik";
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

export const AppointmentSummary = () => {
  const [, { value: selectedDate }] = useField("selectedDate");
  const [, { value: eaProvider }] = useField("eaProvider");
  const [, { value: eaCustomer }] = useField("eaCustomer");
  const [, { value: eaCustomerName }] = useField("eaCustomerName");
  const [, { value: start }] = useField("start");
  const [, { value: end }] = useField("end");

  const session = useUserStateContext();
  const isProvider = session[0]?.user?.role !== "Patient";

  return (<div className="flex flex-col gap-y-2">
    <p className="font-bold text-sm text-gray-600">
      Appointment summary
    </p>
    <div className="flex flex-row my-2 gap-4 w-full">
      <div className="flex rounded-full bg-lime-100 w-10 h-10 items-center justify-center min-w-[40px]">
        <UserIcon className="h-6 w-6 text-lime-700" />
      </div>
      <div>
        <h2 className="text-gray-900 font-medium">
          {isProvider ? eaCustomer?.name ? eaCustomer.name : eaCustomerName : eaProvider?.name}
        </h2>
        <p className="text-gray-600 font-normal">
          {isProvider ? "Patient" : String(eaProvider?.type)}
        </p>
      </div>
    </div>
    <div className="w-full py-4 px-2 rounded-md flex gap-x-4 bg-gray-100 text-sm whitespace-nowrap">
      <div className="flex gap-x-4 items-start">
        <CalendarIcon className="w-6 h-6 text-gray-500" />
        <div className="flex flex-col">
          <p className="font-bold">
            {dayjs(start).format("h:mm A")} -{" "}
            {dayjs(end).format("h:mm A")}
          </p>
          <p className="text-gray-500 font-medium">
            {dayjs(selectedDate).format("MMMM DD, YYYY")}
          </p>
        </div>
      </div>
    </div>
    <div className="w-full py-4 px-2 rounded-md flex gap-x-4 bg-gray-100 text-sm whitespace-nowrap">
      <div className="flex gap-x-4 items-start">
        <ClockIcon className="w-6 h-6 text-gray-500" />
        <div className="flex flex-col">
          {/* TODO: update to be programmatic duration */}
          <p className="font-bold">{"30 min"}</p>
          <p className="text-gray-500 font-medium">
            {"Online video meeting duration"}
          </p>
        </div>
      </div>
    </div>
    <div className="flex-flex-col mb-5">
      <div className="font-eudoxus font-bold text-gray-900 text-sm mb-3 mt-4">
        Please share anything that will help the doctor prepare for
        the meeting
      </div>
      <div className="pb-2">
        <TextArea
          name="notes"
          rows={5}
        />
      </div>
    </div>
  </div>)
}