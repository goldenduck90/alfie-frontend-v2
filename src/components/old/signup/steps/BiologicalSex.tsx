import React from "react";
import { SelectInput } from "../../../inputs/SelectInput";

export const BiologicalSex = () => {
  return (
    <div>
      <p className="mb-10 mt-4 font-md font-mulish font-bold text-lg text-indigo-800">
        Weight depends a lot on your hormones. Our program targets biological
        pathways to optimize weight management.
      </p>

      <div className="flex-flex-col mb-5">
        <p className="font-mulish text-gray-900">
          What sex were you assigned at birth?
        </p>
      </div>

      <div className="pb-2">
        <SelectInput
          name="biologicalSex"
          placeholder="Select an option..."
          options={[
            {
              label: "Male",
              value: "male",
            },
            {
              label: "Female",
              value: "female",
            },
          ]}
        />
        <p className="font-mulish text-gray-500 text-sm mt-2">
          This information is passed securely to the provider and is needed for
          them to provide care.
        </p>
      </div>
    </div>
  );
};
