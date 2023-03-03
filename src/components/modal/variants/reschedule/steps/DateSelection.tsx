import { useField } from "formik";
import { useEffect } from "react";
import Calendar from "react-calendar";

export const DateSelection = () => {
    const [, , { setValue: setSelectedDate, setError: setSelectedDateError }] =
        useField("selectedDate");
    const appointments: any[] = []
    const tileDisabled = ({ date }: { date: Date }) => {
        return date < new Date()
    }
    return (
        <div className="flex flex-col gap-y-2 w-full">
            <div className="flex flex-col gap-y-2">
                <p className="font-bold text-sm text-gray-600">Choose date</p>
                <Calendar onChange={(date: any) => setSelectedDate(date)} tileContent={({ activeStartDate, date, view }) => {
                    return view === "month" && appointments?.filter(
                        (appointment) =>
                            new Date(appointment?.startTimeInUtc).toDateString() ===
                            new Date(date).toDateString()
                    ).length > 0 ? (
                        <div className="flex justify-center">
                            <div className="w-2 h-2 bg-red-400 absolute md:mt-2 rounded-full" />
                        </div>
                    ) : null
                }
                } tileDisabled={tileDisabled} />
            </div>
        </div>
    );
};
