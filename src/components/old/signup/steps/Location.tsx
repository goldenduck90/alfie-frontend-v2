import React from "react";
import { SelectInput } from "../../../inputs/SelectInput";
import { States } from "../../../../utils/states";

export const Location = () => {
  return (
    <div>
      <p className="mb-10 mt-4 font-md font-bold text-lg text-brand-berry">
        Alfie is available in select US states. Check to see if we&apos;re in
        yours now!
      </p>

      <div className="flex-flex-col mb-5">
        <p className="text-gray-900">Where do you live?</p>
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
