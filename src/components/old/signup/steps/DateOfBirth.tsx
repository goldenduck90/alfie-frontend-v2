import { CalendarIcon } from "@heroicons/react/solid";
import React from "react";
import { IconInput } from "../../../inputs/IconInput";

export const DateOfBirth = () => {
  return (
    <div>
      <p className="mb-10 mt-4 font-md font-bold text-lg text-brand-berry">
        Millions of people, including us, have struggled with weight. Alfie uses
        precision medicine to tackle your biology and maximize your weight loss.
      </p>

      <div className="flex-flex-col mb-5">
        <p className="text-gray-900">What is your birthday?</p>
      </div>

      <div className="pb-2">
        <IconInput
          name="dateOfBirth"
          placeholder="MM/DD/YYYY"
          type="date"
          icon={<CalendarIcon className="h-5 w-5 text-brand-berry" />}
        />
      </div>
    </div>
  );
};
