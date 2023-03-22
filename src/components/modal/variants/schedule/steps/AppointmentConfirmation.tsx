import { useField } from "formik";
import { format } from "date-fns";
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
} from "@heroicons/react/outline";
import Image from "next/image";

// setup dayjs
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(dayjs.tz.guess());

export const AppointmentConfirmation = () => {
  const [, { value: eaProvider }] = useField("eaProvider");
  const [, { value: eaCustomer }] = useField("eaCustomer");
  const [, { value: start }] = useField("start");
  const [, { value: end }] = useField("end");

  return (
    <div className="w-full max-w-[480px] min-w-full">
      <div className="w-full min-w-full px-6 flex flex-col gap-y-2">
        <div className="flex flex-col gap-y-2 w-full">
          <div className="flex flex-col">
            <Image
              src={require("../../../../../assets/green-checkmark.png")}
              alt="green checkmark"
              height={40}
              width={40}
              className="self-center mb-4"
            />
            <p className="font-eudoxus text-xl text-successGreen self-center font-bold mb-1">
              Appointment scheduled
            </p>
            <p className="font-eudoxus text-sm text-gray-700 self-center font-medium mb-9">
              Your appointment with doctor is now scheduled.
            </p>
          </div>
          <div className="w-full py-4 px-2 rounded-md flex gap-x-4 bg-gray-100 text-sm whitespace-nowrap">
            <div className="flex gap-x-4 items-start">
              <UserIcon className="h-6 w-6 text-gray-500" />
              <div>
                <h2 className="text-gray-900 font-medium">
                  {eaProvider?.name}
                </h2>
                <p className="text-gray-600 font-normal">
                  {eaProvider?.type}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full py-4 px-2 rounded-md flex gap-x-4 bg-gray-100 text-sm whitespace-nowrap">
            <div className="flex gap-x-4 items-start">
              <CalendarIcon className="w-6 h-6 text-gray-500" />
              <div className="flex flex-col">
                <p className="font-bold">{dayjs(start).format("h:mm A")} -{" "}
                  {dayjs(end).format("h:mm A")}</p>
                <p className="text-gray-500 font-medium">
                  {dayjs(start).format("MMMM DD, YYYY")}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full py-4 px-2 rounded-md flex gap-x-4 bg-gray-100 text-sm whitespace-nowrap">
            <div className="flex gap-x-4 items-start">
              <ClockIcon className="w-6 h-6 text-gray-500" />
              <div className="flex flex-col">
                <p className="font-bold">{"30 min"}</p>
                <p className="text-gray-500 font-medium">
                  {"Online video meeting duration"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
