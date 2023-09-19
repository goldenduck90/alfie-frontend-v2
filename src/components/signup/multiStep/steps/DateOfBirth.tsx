import { CalendarIcon } from "@heroicons/react/solid";
import React from "react";
import { DateInput } from "@src/components/inputs/DateInput";

export const DateOfBirth = () => {
  return (
    <div className="px-8">
      <p className="mb-10 mt-4 font-md font-medium text-lg text-secondary-500">
        Because Alfie uses precision medication, if eligible, we need to know
        how old you are. We’ll verify this with your ID if you choose to sign up
        with Alfie!
      </p>

      <div className="flex-flex-col mb-5">
        <p className="text-primary-700 font-bold">What is your birthday?</p>
      </div>

      <div className="pb-2">
        <DateInput
          name="dateOfBirth"
          placeholder="MM/DD/YYYY"
          icon={<CalendarIcon className="h-5 w-5 text-brand-berry" />}
          maxDate={new Date()}
        />
      </div>
    </div>
  );
};
