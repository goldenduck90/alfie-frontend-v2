import { UserIcon, CalendarIcon, ClockIcon } from "@heroicons/react/solid";
import { TextArea } from "@src/components/inputs/TextArea";
import { format } from "date-fns";
import { useField } from "formik";
import { useEffect } from "react";

export const AppointmentSummary = () => {
    const [, { value: selectedDate }] = useField("selectedDate");
    const [, { value: eaProvider }] = useField("eaProvider");
    const [, { value: startTimeInUtc }] = useField("startTimeInUtc");
    const [, { value: endTimeInUtc }] = useField("endTimeInUtc");

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
                    {eaProvider?.name}
                </h2>
                <p className="text-gray-600 font-normal">
                    {String(eaProvider?.type)}
                </p>
            </div>
        </div>
        <div className="w-full py-4 px-2 rounded-md flex gap-x-4 bg-gray-100 text-sm whitespace-nowrap">
            <div className="flex gap-x-4 items-start">
                <CalendarIcon className="w-6 h-6 text-gray-500" />
                <div className="flex flex-col">
                    <p className="font-bold">
                        {format(new Date(startTimeInUtc), "h:mm aa")} -{" "}
                        {format(new Date(endTimeInUtc), "h:mm aa")}
                    </p>
                    <p className="text-gray-500 font-medium">
                        {selectedDate.toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        }) || ""}
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
                <TextArea cache name="notes" rows={5} />
            </div>
        </div>
    </div>)
}