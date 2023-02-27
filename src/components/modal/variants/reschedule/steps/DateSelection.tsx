import { FormCalendar } from "../Reschedule";

export const DateSelection = () => {
    return (
        <div className="flex flex-col gap-y-2 w-full">
            <div className="flex flex-col gap-y-2">
                <p className="font-bold text-sm text-gray-600">Choose date</p>
                <FormCalendar />
            </div>
        </div>
    );
};
