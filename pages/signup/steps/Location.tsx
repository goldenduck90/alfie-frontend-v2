import React from "react";
import { SelectInput } from "../../../src/components/inputs/SelectInput";
import { States } from "../../../src/utils/states";

export const Location = () => {
  return (
    <div>
      <p className="mb-10 mt-4 font-md font-mulish font-bold text-lg text-indigo-800">
        Alfie is available in select US states. Check to see if we're in yours
        now!
      </p>

      <div className="flex-flex-col mb-5">
        <p className="font-mulish text-gray-900">Where do you live?</p>
      </div>

      <div className="pb-2">
        <SelectInput
          name="location"
          placeholder="Select an option..."
          options={States}
        />
      </div>
    </div>
  );
};
